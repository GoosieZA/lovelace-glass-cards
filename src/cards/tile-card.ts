import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassTileCardConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  icon?: string;
}

const TOGGLEABLE = new Set(['light', 'switch', 'fan', 'input_boolean', 'automation', 'script', 'siren', 'humidifier']);

const DOMAIN_ICON: Record<string, string> = {
  light: 'lightbulb',
  switch: 'toggle_on',
  fan: 'mode_fan',
  climate: 'thermostat',
  cover: 'garage',
  lock: 'lock',
  media_player: 'speaker',
  script: 'play_arrow',
  automation: 'bolt',
  humidifier: 'humidity_high',
  vacuum: 'cleaning_services',
};

const DEVICE_CLASS_ICON: Record<string, string> = {
  temperature: 'thermostat',
  humidity: 'water_drop',
  pressure: 'compress',
  power: 'bolt',
  energy: 'bolt',
  battery: 'battery_full',
  illuminance: 'light_mode',
  motion: 'sensors',
  door: 'sensor_door',
  window: 'window',
  co2: 'co2',
};

@customElement('glass-tile-card')
export class GlassTileCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassTileCardConfig;

  public setConfig(config: GlassTileCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassTileCardConfig, 'type'> {
    return { entity: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private get _domain(): string {
    return this._config!.entity.split('.')[0];
  }

  private _iconName(deviceClass?: string): string {
    if (this._config!.icon) return this._config!.icon;
    if (deviceClass && DEVICE_CLASS_ICON[deviceClass]) return DEVICE_CLASS_ICON[deviceClass];
    return DOMAIN_ICON[this._domain] ?? 'circle';
  }

  private _stateText(): string {
    const st = this.hass!.states[this._config!.entity];
    if (TOGGLEABLE.has(this._domain)) {
      if (this._domain === 'light' && st.state === 'on' && st.attributes.brightness != null) {
        return `${Math.round((Number(st.attributes.brightness) / 255) * 100)}%`;
      }
      return st.state === 'on' ? 'On' : 'Off';
    }
    const unit = st.attributes.unit_of_measurement as string | undefined;
    const val = Number(st.state);
    const num = !Number.isNaN(val) ? (Math.abs(val) >= 100 ? Math.round(val) : val) : st.state;
    return unit ? `${num}${unit.startsWith('°') ? '' : ' '}${unit}` : String(num);
  }

  private _tap(): void {
    if (!this.hass || !this._config) return;
    if (TOGGLEABLE.has(this._domain)) {
      this.hass.callService('homeassistant', 'toggle', { entity_id: this._config.entity });
    } else {
      fireEvent(this, 'hass-more-info', { entityId: this._config.entity });
    }
  }

  private _toggleClick(e: Event): void {
    e.stopPropagation();
    this.hass!.callService('homeassistant', 'toggle', { entity_id: this._config!.entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    if (!st) return placeholder('Select an entity', 'add_box');

    const on = st.state === 'on' || st.state === 'open' || st.state === 'home' || st.state === 'playing';
    const toggleable = TOGGLEABLE.has(this._domain);
    const name = this._config.name ?? (st.attributes.friendly_name as string) ?? this._config.entity;
    const dc = st.attributes.device_class as string | undefined;

    return html`
      <div class="tile ${on ? 'on' : ''}" @click=${this._tap}>
        <div class="row">
          ${icon(this._iconName(dc), 24, on ? 'var(--g-amber)' : 'var(--g-dim)')}
          ${toggleable
            ? html`<div class="toggle ${on ? 'on' : ''}" @click=${this._toggleClick}><div class="knob"></div></div>`
            : nothing}
        </div>
        <div class="body">
          <div class="name">${name}</div>
          <div class="state ${on ? 'lit' : ''}">${this._stateText()}</div>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .tile {
        background: var(--g-card);
        border: 1px solid var(--g-hair);
        border-radius: var(--g-r-tile);
        padding: 16px 18px;
        min-height: 104px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        cursor: pointer;
        transition: background 0.15s ease, border-color 0.15s ease;
      }
      .tile.on { background: rgba(243, 208, 106, 0.08); border-color: rgba(243, 208, 106, 0.28); }
      .tile:hover { border-color: var(--g-border-hi); }
      .row { display: flex; align-items: flex-start; justify-content: space-between; }
      .body { display: flex; flex-direction: column; gap: 2px; }
      .name { font-size: 14px; font-weight: 700; line-height: 1.15; }
      .state { font-size: 12px; color: var(--g-dim); }
      .state.lit { color: var(--g-amber); font-weight: 600; }
      .missing { color: var(--g-red-text); font-size: 12px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-tile-card': GlassTileCard;
  }
}
