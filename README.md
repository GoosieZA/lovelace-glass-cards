# Glass Cards

A custom [Lovelace](https://www.home-assistant.io/dashboards/) card library for Home Assistant with a dark, glassy design — amber/green accents, Manrope/Space Grotesk typography, frosted tiles. Built to reproduce a bespoke dashboard mockup as real, entity-bound cards.

## Cards

| Card | Status | Description |
|------|--------|-------------|
| `glass-person-card` | Available | Household presence — avatars, home/away status, last-changed |
| `glass-weather-card` | Available | Condition, temperature, wind, humidity/sunset tiles |
| `glass-camera-card` | Available | Live camera tile (Frigate) — snapshot, timestamp, LIVE badge |
| `glass-alarm-card` | Available | Alarm shield with arm/disarm actions |
| `glass-energy-card` | Available | Solar / grid / battery animated power-flow diagram |
| `glass-tile-card` | Available | Compact entity tile — lights, switches, sensors |
| `glass-sensor-list-card` | Available | Doors, windows, covers with animated state icons |
| `glass-media-card` | Available | Media player — album art, progress, transport |
| `glass-flight-card` | Available | Aircraft overhead via Flightradar24 |
| `glass-appliance-card` | Available | Washer / dishwasher — status, progress ring, stats, power |
| `glass-fridge-card` | Available | Refrigerator — fridge/freezer temp steppers, door, express modes |
| `glass-pool-card` | Available | Pool pump — animated impeller, switch, energy used |
| `glass-dishwasher-card` | Available | Dishwasher — status, refill alert, status tiles, level bars |
| `glass-stat-card` | Available | Compact stat tile — icon, value, label |
| `glass-lights-card` | Available | Lights grouped by area with master toggles |
| `glass-scenes-card` | Available | Scene / script buttons |
| `glass-light-card` | Available | Single light — brightness, colour temp, RGB swatches |
| `glass-aircon-card` | Available | Climate thermostat — hvac modes, fan speed, airflow |
| `glass-geyser-card` | Available | Water heater — tank visual, target temp, toggleable solar mode |
| `glass-toggle-grid-card` | Available | Square tap-to-toggle tiles (no dimmer) for any switchables |

## Install

### HACS (custom repository)
1. HACS → ⋮ → **Custom repositories**
2. Add this repo URL, category **Dashboard** (Lovelace)
3. Install **Glass Cards**, then reload resources

### Manual
1. Copy `dist/glass-cards.js` to `<config>/www/glass-cards.js`
2. Copy the `fonts/` folder to `<config>/www/glass-fonts/` (self-hosted typefaces — same-origin, no CDN/CSP issues)
3. Settings → Dashboards → ⋮ → **Resources** → add `/local/glass-cards.js?v=<version>` as **JavaScript Module**

> Bump the `?v=` query on every redeploy — HA caches `/local/*.js` hard, and a stale bundle shows "Custom element doesn't exist".

## Fonts

Text fonts (Manrope, Space Grotesk, IBM Plex Mono) are self-hosted from `/local/glass-fonts/` via `fonts/glass-fonts.css`. Material Symbols Rounded is loaded from the Google CDN. `src/theme/fonts.ts` injects both at the document level so they apply inside every card's shadow DOM.

## Usage

Every card has a **visual editor** (built on HA's `ha-form`), so you can add and
configure them from the dashboard UI — **Add Card → search "Glass"** — with no
YAML. Entity fields use HA's entity picker, filtered to the relevant domain.

YAML still works if you prefer it:

```yaml
type: custom:glass-person-card
title: Home
entities:
  - person.you
  - person.partner
```

## Development

```bash
npm install
npm run build      # -> dist/glass-cards.js
npm run watch      # rebuild on change
```

Design tokens live in `src/theme/tokens.ts`; each card is a Lit element in `src/cards/`.

## License

MIT
