#!/usr/bin/env node
/**
 * Kolada MCP – Streamable HTTP entrypoint for Microsoft Copilot Studio.
 *
 * Copilot Studio only supports the *Streamable HTTP* MCP transport
 * (SSE was deprecated in August 2025). The repo's existing http-server.ts
 * uses the old SSE transport, so this file adds an official
 * StreamableHTTPServerTransport endpoint at POST /mcp instead.
 *
 * This is a NEW file. It does not modify any existing file in the repo,
 * so future updates from isakskogstad/Kolada-MCP merge without conflicts.
 *
 * Place at: src/streamable-http.ts
 * Build output: dist/streamable-http.js  (run: npm run build)
 * Start:  node dist/streamable-http.js   (with MCP_MODE=http)
 */
import express, { type Request, type Response } from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMCPServer } from './server/handlers.js';

const PORT = parseInt(process.env.PORT || '3000', 10);
const AUTH_TOKEN = process.env.MCP_AUTH_TOKEN; // optional API key

const app = express();
app.use(express.json({ limit: '4mb' }));

// Health probe used by Azure Container Apps
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', transport: 'streamable-http' });
});

// Optional API-key gate (recommended). Copilot Studio can send this header.
function authorized(req: Request): boolean {
  if (!AUTH_TOKEN) return true; // no auth configured -> open
  const header =
    req.header('x-api-key') ??
    (req.header('authorization') ?? '').replace(/^Bearer\s+/i, '');
  return header === AUTH_TOKEN;
}

// MCP endpoint – stateless Streamable HTTP (fresh server instance per request)
app.post('/mcp', async (req: Request, res: Response) => {
  if (!authorized(req)) {
    res.status(401).json({
      jsonrpc: '2.0',
      error: { code: -32001, message: 'Unauthorized' },
      id: null,
    });
    return;
  }

  try {
    const server = createMCPServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
    });

    res.on('close', () => {
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error('MCP request error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null,
      });
    }
  }
});

// Stateless mode does not use GET/DELETE sessions
app.get('/mcp', (_req: Request, res: Response) =>
  res.status(405).set('Allow', 'POST').end(),
);
app.delete('/mcp', (_req: Request, res: Response) =>
  res.status(405).set('Allow', 'POST').end(),
);

app.listen(PORT, () => {
  console.log(`Kolada MCP (Streamable HTTP) listening on :${PORT}/mcp`);
});
