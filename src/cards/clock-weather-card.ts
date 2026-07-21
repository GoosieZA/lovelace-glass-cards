import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassClockWeatherCardConfig extends LovelaceCardConfig {
  weather?: string; // weather.* (optional — omit for a clock-only card)
  layout?: 'full' | 'compact'; // full = desktop hero, compact = mobile strip
  show_seconds?: boolean;
  show_forecast?: boolean;
  forecast_days?: number;
}

// condition -> { glyph, label } — matches the weather card's mapping.
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

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface ForecastEntry {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
}

@customElement('glass-clock-weather-card')
export class GlassClockWeatherCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassClockWeatherCardConfig;
  @state() private _now = new Date();
  private _timer?: number;

  public setConfig(config: GlassClockWeatherCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return this._config?.layout === 'compact' ? 2 : 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassClockWeatherCardConfig, 'type'> {
    return { weather: '', layout: 'full', show_seconds: true, show_forecast: true, forecast_days: 4 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Tick to the top of each second so the clock stays in step with the wall clock.
    this._timer = window.setInterval(() => (this._now = new Date()), 1000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) window.clearInterval(this._timer);
  }

  private _greeting(h: number): string {
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  }

  private _forecast(): ForecastEntry[] {
    const w = this._config?.weather ? this.hass?.states[this._config.weather] : undefined;
    const raw = w?.attributes.forecast as ForecastEntry[] | undefined;
    if (!Array.isArray(raw)) return [];
    const days = this._config?.forecast_days ?? 4;
    return raw.slice(0, days);
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const compact = this._config.layout === 'compact';

    const d = this._now;
    const hhmm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    const secs = String(d.getSeconds()).padStart(2, '0');
    const dateLong = `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
    const greeting = this._greeting(d.getHours());

    const w = this._config.weather ? this.hass.states[this._config.weather] : undefined;
    if (this._config.weather && !w) return placeholder('Select a weather entity', 'schedule');

    let cond: { icon: string; label: string } | undefined;
    let temp = '';
    let unit = '';
    if (w) {
      cond = CONDITIONS[w.state] ?? { icon: 'thermostat', label: w.state };
      const a = w.attributes;
      unit = (a.temperature_unit as string) || `°${this.hass.config.unit_system.temperature.replace('°', '')}`;
      temp = a.temperature != null ? String(Math.round(Number(a.temperature))) : '—';
    }

    if (compact) {
      return html`
        <div class="card compact" @click=${this._open}>
          <div class="c-clock">
            <div class="c-hhmm">${hhmm}</div>
            <div class="c-date">${dateLong}</div>
          </div>
          ${w
            ? html`<div class="c-wx">
                ${icon(cond!.icon, 38, 'var(--g-amber)')}
                <div class="c-wx-txt">
                  <div class="c-temp">${temp}°</div>
                  <div class="c-cond">${cond!.label}</div>
                </div>
              </div>`
            : nothing}
        </div>
      `;
    }

    const showForecast = this._config.show_forecast !== false;
    const forecast = showForecast ? this._forecast() : [];

    return html`
      <div class="card full" @click=${this._open}>
        <div class="clock">
          <div class="greeting">${greeting}</div>
          <div class="hhmm-row">
            <span class="hhmm">${hhmm}</span>
            ${this._config.show_seconds !== false ? html`<span class="secs">${secs}</span>` : nothing}
          </div>
          <div class="date">${dateLong}</div>
        </div>

        ${w
          ? html`<div class="wx">
              ${icon(cond!.icon, 52, 'var(--g-amber)')}
              <div class="wx-temp"><span class="wx-num">${temp}</span><span class="wx-unit">${unit}</span></div>
              <div class="wx-cond">${cond!.label}</div>
            </div>`
          : nothing}

        ${forecast.length
          ? html`<div class="fc">
              ${forecast.map((f) => {
                const fd = new Date(f.datetime);
                const day = DAYS[fd.getDay()].slice(0, 3);
                const fc = f.condition ? CONDITIONS[f.condition] : undefined;
                return html`<div class="fc-day">
                  <span class="fc-lbl">${day}</span>
                  ${icon(fc?.icon ?? 'thermostat', 24, 'var(--g-text)')}
                  <div class="fc-hi">${f.temperature != null ? Math.round(Number(f.temperature)) : '—'}°</div>
                  <div class="fc-lo">${f.templow != null ? `${Math.round(Number(f.templow))}°` : ''}</div>
                </div>`;
              })}
            </div>`
          : nothing}
      </div>
    `;
  }

  private _open = (): void => {
    if (this._config?.weather) fireEvent(this, 'hass-more-info', { entityId: this._config.weather });
  };

  static styles = [
    glassBase,
    css`
      .card { cursor: pointer; }

      /* Full / desktop hero */
      .full { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
      .clock { flex: 1; min-width: 180px; }
      .greeting { font-size: 14px; color: var(--g-dim); font-weight: 600; }
      .hhmm-row { display: flex; align-items: baseline; gap: 6px; margin-top: 2px; }
      .hhmm { font-family: var(--g-display); font-size: 60px; font-weight: 600; letter-spacing: -2px; line-height: 1; font-variant-numeric: tabular-nums; }
      .secs { font-family: var(--g-mono); font-size: 18px; color: var(--g-amber); }
      .date { font-size: 14px; color: var(--g-text); font-weight: 600; margin-top: 4px; }

      .wx { flex: 0 0 auto; text-align: center; padding-left: 30px; border-left: 1px solid var(--g-border); }
      .wx-temp { display: flex; align-items: flex-start; justify-content: center; font-family: var(--g-display); }
      .wx-num { font-size: 40px; font-weight: 600; line-height: 1; }
      .wx-unit { font-size: 16px; color: var(--g-dim); margin-top: 3px; }
      .wx-cond { font-size: 12px; color: var(--g-dim); margin-top: 2px; }

      .fc { flex: 0 0 auto; display: flex; gap: 14px; padding-left: 26px; border-left: 1px solid var(--g-border); }
      .fc-day { display: flex; flex-direction: column; align-items: center; gap: 6px; }
      .fc-lbl { font-size: 11px; color: var(--g-dim); font-weight: 700; }
      .fc-hi { font-size: 11px; font-weight: 700; }
      .fc-lo { font-size: 11px; color: var(--g-faint); }

      /* Compact / mobile strip */
      .compact { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
      .c-hhmm { font-family: var(--g-display); font-size: 38px; font-weight: 600; letter-spacing: -1.5px; line-height: 1; font-variant-numeric: tabular-nums; }
      .c-date { font-size: 12px; color: var(--g-dim); font-weight: 600; margin-top: 3px; }
      .c-wx { display: flex; align-items: center; gap: 10px; }
      .c-wx-txt { text-align: right; }
      .c-temp { font-family: var(--g-display); font-size: 24px; font-weight: 600; line-height: 1; }
      .c-cond { font-size: 11px; color: var(--g-dim); margin-top: 2px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-clock-weather-card': GlassClockWeatherCard;
  }
}
