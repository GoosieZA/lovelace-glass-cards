import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassWeatherCardConfig extends LovelaceCardConfig {
  entity: string; // weather.*
  sun?: string; // sun.sun (optional, for sunset tile)
  humidity?: string; // sensor.* override (optional)
}

const CONDITIONS: Record<string, { icon: string; label: string }> = {
  'clear-night': { icon: 'bedtime', label: 'Clear night' },
  cloudy: { icon: 'cloud', label: 'Cloudy' },
  fog: { icon: 'foggy', label: 'Fog' },
  hail: { icon: 'weather_hail', label: 'Hail' },
  lightning: { icon: 'thunderstorm', label: 'Lightning' },
  'lightning-rainy': { icon: 'thunderstorm', label: 'Storms' },
  partlycloudy: { icon: 'partly_cloudy_day', label: 'Partly cloudy' },
  pouring: { icon: 'rainy', label: 'Heavy rain' },
  rainy: { icon: 'rainy', label: 'Rain' },
  snowy: { icon: 'weather_snowy', label: 'Snow' },
  'snowy-rainy': { icon: 'weather_mix', label: 'Sleet' },
  sunny: { icon: 'clear_day', label: 'Sunny' },
  windy: { icon: 'air', label: 'Windy' },
  'windy-variant': { icon: 'air', label: 'Windy' },
  exceptional: { icon: 'warning', label: 'Severe' },
};

const DIRS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

@customElement('glass-weather-card')
export class GlassWeatherCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassWeatherCardConfig;

  public setConfig(config: GlassWeatherCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassWeatherCardConfig, 'type'> {
    return { entity: '', sun: 'sun.sun' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const ids = [this._config.entity, this._config.sun, this._config.humidity].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _compass(bearing: unknown): string {
    if (typeof bearing === 'number') return DIRS[Math.round(bearing / 22.5) % 16];
    if (typeof bearing === 'string' && bearing) return bearing.toUpperCase();
    return '';
  }

  private _time(iso?: string): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const w = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    if (!w) return placeholder('Select a weather entity', 'partly_cloudy_day');

    const cond = CONDITIONS[w.state] ?? { icon: 'thermostat', label: w.state };
    const a = w.attributes;
    const unit = (a.temperature_unit as string) || `°${this.hass.config.unit_system.temperature.replace('°', '')}`;
    const temp = a.temperature != null ? Math.round(Number(a.temperature)) : '—';
    const windSpd = a.wind_speed != null ? `${Math.round(Number(a.wind_speed))} ${a.wind_speed_unit ?? 'km/h'}` : '';
    const wind = [this._compass(a.wind_bearing), windSpd].filter(Boolean).join(' ');

    const humId = this._config.humidity;
    const hum = humId ? this.hass.states[humId]?.state : a.humidity;
    const humVal = hum != null ? `${Math.round(Number(hum))}%` : '—';

    const sun = this._config.sun ? this.hass.states[this._config.sun] : undefined;
    const setting = sun?.attributes.next_setting as string | undefined;
    const rising = sun?.attributes.next_rising as string | undefined;
    // Show whichever comes next: if sun is below horizon show sunrise, else sunset.
    const showRise = sun?.state === 'below_horizon';

    return html`
      <div class="card" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        <div class="top">
          <div class="cond">
            ${icon(cond.icon, 48, 'var(--g-amber)')}
            <div>
              <div class="cond-label">${cond.label}</div>
              ${wind ? html`<div class="wind">Wind ${wind}</div>` : nothing}
            </div>
          </div>
          <div class="temp"><span class="t-num deg">${temp}</span><span class="unit">${unit}</span></div>
        </div>
        <div class="tiles">
          <div class="tile">
            <div class="tile-h">${icon('water_drop', 16, 'var(--g-dim)')}Humidity</div>
            <div class="t-num tile-v">${humVal}</div>
          </div>
          <div class="tile">
            <div class="tile-h">
              ${icon(showRise ? 'wb_sunny' : 'wb_twilight', 16, 'var(--g-dim)')}${showRise ? 'Sunrise' : 'Sunset'}
            </div>
            <div class="t-num tile-v">${this._time(showRise ? rising : setting)}</div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 18px; cursor: pointer; }
      .top { display: flex; align-items: flex-start; justify-content: space-between; }
      .cond { display: flex; align-items: center; gap: 16px; }
      .cond-label { font-size: 18px; font-weight: 700; }
      .wind { font-size: 13px; color: var(--g-dim); margin-top: 2px; }
      .temp { display: flex; align-items: flex-start; font-family: var(--g-display); }
      .deg { font-size: 56px; letter-spacing: -2px; }
      .unit { font-size: 20px; font-weight: 500; color: var(--g-dim); margin-top: 4px; }
      .tiles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
      .tile { background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 12px 14px; }
      .tile-h { display: flex; align-items: center; gap: 6px; color: var(--g-dim); font-size: 12px; }
      .tile-v { font-size: 19px; margin-top: 4px; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-weather-card': GlassWeatherCard;
  }
}
