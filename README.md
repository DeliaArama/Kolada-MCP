<img width="640" height="320" alt="Kolada Banner" src="https://github.com/user-attachments/assets/514f2796-ea48-4e6e-a9c1-20121a7cfeb4" />

# Kolada MCP Server

[![npm version](https://img.shields.io/npm/v/kolada-mcp-server.svg)](https://www.npmjs.com/package/kolada-mcp-server)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-green.svg)](https://registry.modelcontextprotocol.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**MCP-server för svensk kommun- och regionstatistik från Kolada API.**

Kolada MCP-server kan LLMs ansluta till via lokal installation – och genom den få direkt tillgång till data och statistik för **5 000+ nyckeltal (KPI:er)** inom 264 områden (ex. skola, vård, miljö, ekonomi, demokrati o.s.v.) för Sveriges alla kommuner och regioner. Utvecklad av Isak Skogstad, fristående från Kolada/RKA.

> **English:** Kolada MCP Server connects LLMs and AI chatbots to 5,000+ Key Performance Indicators (KPIs) across 264 operating areas for all 290 Swedish municipalities and 21 regions. Kolada is Sweden's most comprehensive open data source for municipal and regional statistics. Developed by Isak Skogstad, not associated with Kolada/SKR.

https://github.com/user-attachments/assets/6791bb81-79dc-4af3-8028-44c3929d57d0

## Installation

**Med npx (snabbast):**

```bash
npx kolada-mcp-server
```

**Med global installation:**

```bash
npm install -g kolada-mcp-server
kolada-mcp-server
```

Paketet publiceras på npm: [`kolada-mcp-server`](https://www.npmjs.com/package/kolada-mcp-server).

## Klientkonfiguration

### Claude Desktop

Lägg till i konfigurationsfilen:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "kolada": {
      "command": "npx",
      "args": ["-y", "kolada-mcp-server"]
    }
  }
}
```

### Claude Code (CLI)

```bash
claude mcp add kolada -- npx -y kolada-mcp-server
```

Verifiera med:

```bash
claude mcp list
```

### OpenAI Codex CLI

Lägg till i `~/.codex/config.toml`:

```toml
[mcp_servers.kolada]
command = "npx"
args = ["-y", "kolada-mcp-server"]
```

### Gemini CLI

Lägg till i `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "kolada": {
      "command": "npx",
      "args": ["-y", "kolada-mcp-server"]
    }
  }
}
```

### Firebase Studio / Android Studio

Lägg till i `mcp.json` i projektroten:

```json
{
  "mcpServers": {
    "kolada": {
      "command": "npx",
      "args": ["-y", "kolada-mcp-server"]
    }
  }
}
```

### Andra MCP-klienter

De flesta MCP-klienter stödjer stdio-transport. Konfigurera med:

```json
{
  "mcpServers": {
    "kolada": {
      "command": "npx",
      "args": ["-y", "kolada-mcp-server"]
    }
  }
}
```

## Installation från källkod

```bash
git clone https://github.com/isakskogstad/kolada-mcp.git
cd kolada-mcp
npm install
npm run build
node dist/index.js
```

## Verktyg

### Nyckeltal (KPI)

| Verktyg                      | Beskrivning                              |
| ---------------------------- | ---------------------------------------- |
| `search_kpis`                | Fritextsökning bland 5 000+ nyckeltal    |
| `get_kpi`                    | Hämta metadata för ett nyckeltal via ID  |
| `get_kpis`                   | Hämta flera nyckeltal samtidigt (max 25) |
| `get_kpi_groups`             | Lista tematiska grupper                  |
| `get_kpi_group`              | Hämta alla nyckeltal i en grupp          |
| `list_operating_areas`       | Lista 264 verksamhetsområden             |
| `get_kpis_by_operating_area` | Filtrera nyckeltal per verksamhetsområde |

### Kommuner och regioner

| Verktyg                   | Beskrivning                                 |
| ------------------------- | ------------------------------------------- |
| `search_municipalities`   | Sök bland 290 kommuner och 21 regioner      |
| `get_municipality`        | Hämta detaljer via kommun-ID (t.ex. "0180") |
| `get_municipality_groups` | Lista kommungrupper                         |
| `get_municipality_group`  | Hämta kommuner i en grupp                   |

### Organisationsenheter

| Verktyg                       | Beskrivning                   |
| ----------------------------- | ----------------------------- |
| `search_organizational_units` | Sök skolor, äldreboenden m.m. |
| `get_organizational_unit`     | Hämta enhetsdetaljer          |
| `get_ou_types`                | Lista enhetstyper             |

### Data

| Verktyg                  | Beskrivning                             |
| ------------------------ | --------------------------------------- |
| `get_kpi_data`           | Hämta värden med könsfiltrering (T/M/K) |
| `get_municipality_kpis`  | Lista KPI:er för en kommun              |
| `compare_municipalities` | Jämför 2–10 kommuner                    |
| `get_kpi_trend`          | Tidsserieanalys                         |

### Analys

| Verktyg                             | Beskrivning                  |
| ----------------------------------- | ---------------------------- |
| `analyze_kpi_across_municipalities` | Statistik + rankning         |
| `filter_municipalities_by_kpi`      | Filtrera efter tröskelvärde  |
| `compare_kpis`                      | Korrelation mellan nyckeltal |

## Verksamhetsområden (urval)

| Område                 | Antal KPI:er |
| ---------------------- | ------------ |
| Kommunen, övergripande | 553          |
| Grundskola åk 0-9      | 470          |
| Gymnasieskola åk 1-3   | 215          |
| Hälso- och sjukvård    | 204          |
| Befolkning             | 199          |
| Region/Landsting       | 151          |
| Förskoleverksamhet     | 135          |
| Vuxenutbildning        | 126          |

_Totalt 264 verksamhetsområden._

## Enhetstyper

| Kod | Typ             |
| --- | --------------- |
| V11 | Förskola        |
| V15 | Grundskola      |
| V16 | Gymnasieskola   |
| V17 | Anpassad skola  |
| V18 | Vuxenutbildning |
| V21 | Äldreboende     |
| V31 | Fritidshem      |

## Huvudfunktioner

- **Könsfiltrering** – T (totalt), M (män), K (kvinnor)
- **Intelligent cachning** – 24-timmarscache för kataloger
- **Hastighetsbegränsning** – Respekterar Koladas API-gränser
- **Svensk dokumentation** – Optimerat för svenska AI-assistenter

## Säkerhet / Security

Kolada MCP Server använder flera lager av automatisk säkerhetsskanning för att säkerställa kodens integritet och upptäcka sårbarheter:

### 🛡️ Automatiska Säkerhetsverktyg

- **CodeQL**: Kontinuerlig kodanalys för säkerhetsbrister
- **GitGuardian**: Skannar efter exponerade API-nycklar och hemligheter
- **TruffleHog**: Kompletterande secret scanning i commit-historik
- **Bearer SAST**: Static Application Security Testing för applikationssårbarheter
- **Dependabot**: Automatiska säkerhetsuppdateringar för dependencies
- **npm audit**: Daglig granskning av sårbara paket

### 📋 Säkerhetspolicy

Se [SECURITY.md](SECURITY.md) för:

- Hur man rapporterar säkerhetsproblem
- Detaljer om säkerhetsskanningsprocessen
- Riktlinjer för säker användning
- Kontaktinformation

### 🔒 Bästa Praxis

- Inga hårdkodade hemligheter i källkoden
- Alla känsliga värden hanteras via miljövariabler
- Rate limiting och timeout-konfigurationer
- Regelbundna automatiska säkerhetsuppdateringar

**English**: For security policies and vulnerability reporting, see [SECURITY.md](SECURITY.md).

## Licens

MIT – se [LICENSE](LICENSE)

Skapat av Isak Skogstad.

<details>
<summary><strong>Kolada användarvillkor</strong></summary>

- Utnyttjande av data från Koladas API är avgiftsfritt och kräver inget avtal.
- Om du använder data från Kolada i en tjänst, ska källan anges ('Källa: Kolada').
- Gör du egna bearbetningar på vår data, får inte Kolada anges som källa.
- Det är tillåtet att använda vår data för kommersiella ändamål.
- API:et får inte användas för att sprida skadlig kod.
- Du får inte presentera den tjänst du utvecklat som ett 'officiellt samarbete' eller 'partnerskap' med RKA/Kolada.
- Tjänsten tillhandahålls i befintligt skick.
- Publicering av data i Kolada sker löpande under året i enlighet med respektive statistikkällas publiceringstidpunkt.
- Revideringar av data i Kolada kan ske och aviseras inte särskilt.
- Enskilda nyckeltal kan tas bort ur Kolada t.ex. pga. att underlag för nyckeltalen förändras, vilket inte aviseras.
</details>
