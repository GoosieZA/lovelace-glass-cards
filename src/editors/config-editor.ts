import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';

// ha-form selector shorthands (ha-form/selectors are HA-frontend internals, untyped).
const ent = (domain?: string | string[], multiple = false) => ({
  entity: { ...(domain ? { domain } : {}), ...(multiple ? { multiple: true } : {}) },
});
const text = { text: {} };
const num = (min: number, max: number) => ({ number: { min, max, mode: 'box' } });
const sel = (options: unknown[]) => ({ select: { mode: 'dropdown', options } });
const bool = { boolean: {} };

type Schema = Array<Record<string, unknown>>;

// Per card-type ha-form schema. Order = field order in the editor.
const SCHEMAS: Record<string, Schema> = {
  'glass-person-card': [
    { name: 'title', selector: text },
    { name: 'entities', required: true, selector: ent('person', true) },
  ],
  'glass-weather-card': [
    { name: 'entity', required: true, selector: ent('weather') },
    { name: 'sun', selector: ent('sun') },
    { name: 'humidity', selector: ent('sensor') },
  ],
  'glass-camera-card': [
    { name: 'entity', required: true, selector: ent('camera') },
    { name: 'name', selector: text },
    { name: 'icon', selector: text },
  ],
  'glass-alarm-card': [
    { name: 'entity', required: true, selector: ent('alarm_control_panel') },
    {
      name: 'variant',
      selector: sel([
        { value: 'shield', label: 'Shield (default)' },
        { value: 'radial', label: 'Radial' },
        { value: 'bar', label: 'Compact bar' },
        { value: 'keypad', label: 'Keypad' },
        { value: 'triggered', label: 'Triggered / status' },
      ]),
    },
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
    { name: 'code', selector: text },
    { name: 'code_length', selector: num(1, 8) },
    {
      name: 'buttons',
      selector: {
        select: {
          multiple: true,
          mode: 'list',
          options: [
            { value: 'disarm', label: 'Disarm' },
            { value: 'arm_home', label: 'Arm Home' },
            { value: 'arm_away', label: 'Arm Away' },
            { value: 'arm_night', label: 'Arm Night' },
            { value: 'arm_vacation', label: 'Arm Vacation' },
          ],
        },
      },
    },
  ],
  'glass-media-card': [
    { name: 'entity', required: true, selector: ent('media_player') },
    { name: 'name', selector: text },
  ],
  'glass-flight-card': [
    { name: 'entity', required: true, selector: ent('sensor') },
    { name: 'title', selector: text },
    { name: 'max', selector: num(1, 10) },
  ],
  'glass-tile-card': [
    { name: 'entity', required: true, selector: ent() },
    { name: 'name', selector: text },
    { name: 'icon', selector: text },
  ],
  'glass-energy-card': [
    { name: 'title', selector: text },
    {
      name: 'variant',
      selector: sel([
        { value: 'flow', label: 'Power flow (default)' },
        { value: 'ring', label: 'Battery ring' },
        { value: 'stats', label: 'Stat trio' },
        { value: 'meters', label: 'Meters' },
        { value: 'production', label: 'Production bars' },
      ]),
    },
    { name: 'solar', selector: ent('sensor') },
    { name: 'grid', selector: ent('sensor') },
    { name: 'battery', selector: ent('sensor') },
    { name: 'battery_soc', selector: ent('sensor') },
    { name: 'house', selector: ent('sensor') },
    { name: 'today', selector: ent('sensor') },
    { name: 'imported', selector: ent('sensor') },
    { name: 'exported', selector: ent('sensor') },
    { name: 'saved', selector: ent('sensor') },
    { name: 'meters', selector: ent('sensor', true) },
    { name: 'production', selector: ent('sensor') },
  ],
  'glass-sensor-list-card': [
    { name: 'title', selector: text },
    { name: 'entities', required: true, selector: ent(['cover', 'binary_sensor'], true) },
  ],
  'glass-appliance-card': [
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
    { name: 'icon', selector: text },
    {
      name: 'icon_color',
      selector: { select: { mode: 'dropdown', options: ['cyan', 'amber', 'green', 'purple', 'red'] } },
    },
    { name: 'status', selector: ent(['sensor', 'binary_sensor']) },
    { name: 'remaining', selector: ent('sensor') },
    { name: 'total', selector: ent('sensor') },
    { name: 'toggle', selector: ent(['switch', 'input_boolean']) },
    { name: 'stats', selector: ent(['sensor', 'binary_sensor', 'number'], true) },
  ],
  'glass-fridge-card': [
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
    { name: 'door', selector: ent('binary_sensor') },
    { name: 'wifi', selector: ent('binary_sensor') },
    { name: 'fridge_temp', selector: ent('number') },
    { name: 'freezer_temp', selector: ent('number') },
    { name: 'toggles', selector: ent(['switch', 'input_boolean'], true) },
  ],
  'glass-pool-card': [
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
    { name: 'switch', selector: ent(['switch', 'input_boolean']) },
    { name: 'energy', selector: ent('sensor') },
    { name: 'color', selector: sel(['green', 'amber', 'cyan', 'purple', 'red']) },
  ],
  'glass-stat-card': [
    { name: 'entity', required: true, selector: ent() },
    { name: 'name', selector: text },
    { name: 'icon', selector: text },
    { name: 'color', selector: sel(['amber', 'green', 'cyan', 'purple', 'red', 'dim']) },
  ],
  'glass-lights-card': [
    { name: 'title', selector: text },
    { name: 'entities', required: true, selector: ent('light', true) },
  ],
  'glass-scenes-card': [
    { name: 'title', selector: text },
    { name: 'columns', selector: num(2, 6) },
    { name: 'scenes', required: true, selector: ent(['scene', 'script', 'automation'], true) },
  ],
  'glass-toggle-grid-card': [
    { name: 'title', selector: text },
    { name: 'columns', selector: num(2, 8) },
    { name: 'entities', required: true, selector: ent(['light', 'switch', 'fan', 'input_boolean', 'script', 'scene'], true) },
  ],
  'glass-heatpump-card': [
    { name: 'entity', required: true, selector: ent('climate') },
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
  ],
  'glass-garage-card': [
    { name: 'entity', required: true, selector: ent('cover') },
    { name: 'variant', selector: sel([{ value: 'full', label: 'Full (animated visual)' }, { value: 'compact', label: 'Compact tile' }]) },
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
  ],
  'glass-water-chemistry-card': [
    { name: 'title', selector: text },
    { name: 'metrics', selector: ent('sensor', true) },
  ],
  'glass-nav-card': [
    { name: 'variant', selector: sel([{ value: 'dock', label: 'Full-width dock' }, { value: 'pill', label: 'Floating pill' }]) },
    { name: 'fixed', selector: bool },
    { name: 'max_width', selector: num(320, 1600) },
  ],
  'glass-light-card': [
    { name: 'entity', required: true, selector: ent('light') },
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
  ],
  'glass-aircon-card': [
    { name: 'entity', required: true, selector: ent('climate') },
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
  ],
  'glass-geyser-card': [
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
    { name: 'power', selector: ent(['switch', 'input_boolean', 'water_heater']) },
    { name: 'current', selector: ent('sensor') },
    { name: 'target', selector: ent(['number', 'water_heater', 'climate']) },
    { name: 'min_temp', selector: num(0, 100) },
    { name: 'max_temp', selector: num(0, 100) },
    { name: 'solar', selector: ent('sensor') },
    { name: 'power_sensor', selector: ent('sensor') },
    { name: 'solar_mode', selector: ent(['switch', 'input_boolean']) },
    { name: 'modes', selector: ent(['switch', 'input_boolean'], true) },
  ],
  'glass-dishwasher-card': [
    { name: 'name', selector: text },
    { name: 'subtitle', selector: text },
    { name: 'status', selector: ent('sensor') },
    { name: 'alert', selector: ent('binary_sensor') },
    { name: 'alert_text', selector: text },
    { name: 'tiles', selector: ent(['binary_sensor', 'sensor'], true) },
    { name: 'levels', selector: ent('sensor', true) },
    { name: 'level_max', selector: num(1, 10) },
  ],
};

const LABELS: Record<string, string> = {
  entity: 'Entity',
  entities: 'Entities',
  title: 'Title',
  name: 'Name (optional)',
  icon: 'Icon (optional)',
  sun: 'Sun entity (for sunrise/sunset)',
  humidity: 'Humidity sensor (optional)',
  code: 'Arm/disarm code (optional)',
  max: 'Max flights to show',
  buttons: 'Action buttons to show',
  variant: 'Layout / style',
  code_length: 'Keypad code length',
  today: 'Solar-today energy sensor (big number)',
  imported: 'Imported-today sensor',
  exported: 'Exported-today sensor',
  saved: 'Money-saved sensor',
  meters: 'Percentage sensors to show as meters',
  production: 'Production sensor for hourly bars (needs statistics)',
  subtitle: 'Subtitle (e.g. room/area)',
  icon_color: 'Icon accent colour',
  status: 'Status sensor (drives the pill)',
  remaining: 'Remaining-time sensor (timestamp → progress ring)',
  total: 'Total-time sensor (minutes, for the ring %)',
  toggle: 'Power switch (optional on/off button)',
  stats: 'Extra sensors shown as stat tiles',
  door: 'Door sensor',
  wifi: 'Wi-Fi / connectivity sensor (optional)',
  fridge_temp: 'Fridge temperature (number entity)',
  freezer_temp: 'Freezer temperature (number entity)',
  toggles: 'Feature switches (Express cool/mode, etc.)',
  switch: 'Pump switch',
  energy: 'Energy sensor (kWh)',
  color: 'Accent colour',
  columns: 'Columns',
  scenes: 'Scenes / scripts to show',
  alert: 'Alert sensor (e.g. refill needed)',
  alert_text: 'Alert message',
  tiles: 'Status tiles',
  levels: 'Level sensors (shown as bars)',
  level_max: 'Level bar maximum',
  power: 'Power switch (on/off)',
  current: 'Current temperature sensor',
  target: 'Target temperature (number / thermostat)',
  min_temp: 'Minimum temperature',
  max_temp: 'Maximum temperature',
  solar: 'Solar collector temperature sensor',
  power_sensor: 'Power draw sensor (kW)',
  solar_mode: 'Solar mode switch (toggleable)',
  modes: 'Extra mode switches (boost, element, timer)',
  metrics: 'Water metric sensors (pH, chlorine, …)',
  fixed: 'Stick to bottom of screen',
  max_width: 'Maximum width (px)',
  solar: 'Solar power sensor',
  grid: 'Grid power sensor (+import / −export)',
  battery: 'Battery power sensor (+discharge / −charge)',
  battery_soc: 'Battery charge % sensor',
  house: 'House load sensor (optional; derived if empty)',
};

const HELPERS: Record<string, string> = {
  icon: 'Material Symbols name, e.g. lightbulb, garage, kitchen',
  code: 'Only if your panel requires a code to arm/disarm',
};

@customElement('glass-config-editor')
export class GlassConfigEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: LovelaceCardConfig;

  public setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  private _label = (s: { name: string }): string => LABELS[s.name] ?? s.name;
  private _helper = (s: { name: string }): string => HELPERS[s.name] ?? '';

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const config = { ...this._config, ...ev.detail.value, type: this._config.type };
    fireEvent(this, 'config-changed', { config });
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const type = this._config.type.replace(/^custom:/, '');
    const schema = SCHEMAS[type];
    if (!schema) {
      return html`<div class="fallback">No visual editor for <code>${this._config.type}</code> — edit in YAML.</div>`;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._label}
        .computeHelper=${this._helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    .fallback { padding: 12px; color: var(--secondary-text-color, #8b9099); font-size: 14px; }
    code { font-family: monospace; }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-config-editor': GlassConfigEditor;
  }
}
