import { ensureFonts } from './theme/fonts';
import './cards/person-card';
import './cards/weather-card';
import './cards/camera-card';
import './cards/alarm-card';
import './cards/energy-card';
import './cards/tile-card';
import './cards/sensor-list-card';
import './cards/media-card';
import './cards/flight-card';
import './cards/appliance-card';
import './cards/fridge-card';
import './cards/pool-card';
import './cards/dishwasher-card';
import './cards/stat-card';
import './cards/lights-card';
import './cards/scenes-card';
import './cards/light-card';
import './cards/aircon-card';
import './cards/geyser-card';
import './cards/toggle-grid-card';
import './cards/heatpump-card';
import './cards/water-chemistry-card';
import './cards/nav-card';
import './cards/garage-card';
import './cards/sprinkler-card';
import './cards/irrigation-card';
import './cards/badge-strip-card';
import './cards/person-badge-card';
import './cards/clock-weather-card';
import './cards/room-card';
import './cards/people-row-card';
import './cards/climate-tile-card';
import './editors/config-editor';
import './editors/toggle-grid-editor';

export const GLASS_VERSION = '0.20.1';

ensureFonts();

// Register cards with HA's card picker (Add Card dialog).
interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}
const w = window as unknown as { customCards?: CustomCardEntry[] };
w.customCards = w.customCards || [];
w.customCards.push(
  {
    type: 'glass-person-card',
    name: 'Glass Person Card',
    description: 'Household presence with avatars, Midnight style.',
    preview: true,
  },
  {
    type: 'glass-weather-card',
    name: 'Glass Weather Card',
    description: 'Conditions, temperature and sun/humidity tiles.',
    preview: true,
  },
  {
    type: 'glass-camera-card',
    name: 'Glass Camera Card',
    description: 'Live camera tile with timestamp and LIVE badge.',
    preview: true,
  },
  {
    type: 'glass-alarm-card',
    name: 'Glass Alarm Card',
    description: 'Alarm panel with shield and arm/disarm actions.',
    preview: true,
  },
  {
    type: 'glass-energy-card',
    name: 'Glass Energy Card',
    description: 'Solar / grid / battery power-flow diagram.',
    preview: true,
  },
  {
    type: 'glass-tile-card',
    name: 'Glass Tile Card',
    description: 'Compact entity tile: lights, switches, sensors.',
    preview: true,
  },
  {
    type: 'glass-sensor-list-card',
    name: 'Glass Sensor List Card',
    description: 'Doors, windows and covers with animated state icons.',
    preview: true,
  },
  {
    type: 'glass-media-card',
    name: 'Glass Media Card',
    description: 'Media player with album art, progress and transport.',
    preview: true,
  },
  {
    type: 'glass-flight-card',
    name: 'Glass Flight Card',
    description: 'Aircraft overhead via Flightradar24.',
    preview: true,
  },
  {
    type: 'glass-appliance-card',
    name: 'Glass Appliance Card',
    description: 'Washer / dishwasher: status, progress ring, stats.',
    preview: true,
  },
  {
    type: 'glass-fridge-card',
    name: 'Glass Fridge Card',
    description: 'Refrigerator: fridge/freezer temp steppers, door, express modes.',
    preview: true,
  },
  {
    type: 'glass-pool-card',
    name: 'Glass Pool Pump Card',
    description: 'Pool pump: animated impeller, switch, energy used.',
    preview: true,
  },
  {
    type: 'glass-dishwasher-card',
    name: 'Glass Dishwasher Card',
    description: 'Dishwasher: status, refill alert, tiles, level bars.',
    preview: true,
  },
  {
    type: 'glass-stat-card',
    name: 'Glass Stat Card',
    description: 'Compact stat tile: icon, value, label.',
    preview: true,
  },
  {
    type: 'glass-lights-card',
    name: 'Glass Lights Card',
    description: 'Lights grouped by area with master toggles.',
    preview: true,
  },
  {
    type: 'glass-scenes-card',
    name: 'Glass Scenes Card',
    description: 'Scene / script buttons.',
    preview: true,
  },
  {
    type: 'glass-light-card',
    name: 'Glass Light Card',
    description: 'Single light: brightness, colour temp, RGB swatches.',
    preview: true,
  },
  {
    type: 'glass-aircon-card',
    name: 'Glass Aircon Card',
    description: 'Climate thermostat: modes, fan speed, airflow.',
    preview: true,
  },
  {
    type: 'glass-geyser-card',
    name: 'Glass Geyser Card',
    description: 'Water heater: tank, target temp, toggleable solar mode.',
    preview: true,
  },
  {
    type: 'glass-toggle-grid-card',
    name: 'Glass Toggle Grid Card',
    description: 'Square tap-to-toggle tiles (no dimmer) for any switchables.',
    preview: true,
  },
  {
    type: 'glass-heatpump-card',
    name: 'Glass Heat Pump Card',
    description: 'Pool heat-pump thermostat: ring dial, heat/cool/auto.',
    preview: true,
  },
  {
    type: 'glass-water-chemistry-card',
    name: 'Glass Water Chemistry Card',
    description: 'Pool metrics (pH, chlorine, …) with in-range bars.',
    preview: true,
  },
  {
    type: 'glass-nav-card',
    name: 'Glass Bottom Nav Card',
    description: 'Bottom navigation — dock or floating pill, sticks to screen bottom.',
    preview: true,
  },
  {
    type: 'glass-garage-card',
    name: 'Glass Garage Card',
    description: 'Garage door — animated rolling-door visual or compact tile.',
    preview: true,
  },
  {
    type: 'glass-sprinkler-card',
    name: 'Glass Sprinkler Card',
    description: 'Sprinkler zone — animated spray hero or compact tile.',
    preview: true,
  },
  {
    type: 'glass-irrigation-card',
    name: 'Glass Irrigation Card',
    description: 'Multi-zone irrigation control with per-zone toggles.',
    preview: true,
  },
  {
    type: 'glass-badge-strip-card',
    name: 'Glass Badge Strip Card',
    description: 'Header status badges — strip or circular.',
    preview: true,
  },
  {
    type: 'glass-person-badge-card',
    name: 'Glass Person Badge Card',
    description: 'Header person card — avatar, zone, battery, activity.',
    preview: true,
  },
  {
    type: 'glass-clock-weather-card',
    name: 'Glass Clock & Weather Card',
    description: 'Live clock, greeting and current weather — full hero or mobile strip.',
    preview: true,
  },
  {
    type: 'glass-room-card',
    name: 'Glass Room Card',
    description: 'Per-room summary — temp, humidity, devices and a master light toggle.',
    preview: true,
  },
  {
    type: 'glass-people-row-card',
    name: 'Glass People Row Card',
    description: 'Compact presence row — stacked avatars and who’s home.',
    preview: true,
  },
  {
    type: 'glass-climate-tile-card',
    name: 'Glass Climate Tile Card',
    description: 'Compact climate tile — current temp for geyser / aircon.',
    preview: true,
  }
);

// eslint-disable-next-line no-console
console.info(
  `%c GLASS-CARDS %c v${GLASS_VERSION} `,
  'background:#f3d06a;color:#16181d;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px',
  'background:#16181d;color:#b9f6a6;border-radius:0 4px 4px 0;padding:2px 6px'
);
