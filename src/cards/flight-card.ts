import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassFlightCardConfig extends LovelaceCardConfig {
  entity: string; // sensor.flightradar24_current_in_area
  title?: string;
  max?: number;
}

interface Flight {
  callsign?: string;
  flight_number?: string;
  aircraft_model?: string;
  aircraft_code?: string;
  airport_origin_code_iata?: string;
  airport_origin_city?: string;
  airport_destination_code_iata?: string;
  airport_destination_city?: string;
  altitude?: number;
  ground_speed?: number;
  heading?: number;
  distance?: number;
}

@customElement('glass-flight-card')
export class GlassFlightCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassFlightCardConfig;

  public setConfig(config: GlassFlightCardConfig): void {
    this._config = { title: 'Overhead', max: 4, ...config };
  }

  public getCardSize(): number {
    return 2;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassFlightCardConfig, 'type'> {
    return { entity: 'sensor.flightradar24_current_in_area', title: 'Overhead' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private _route(f: Flight): string {
    const o = f.airport_origin_code_iata || f.airport_origin_city;
    const d = f.airport_destination_code_iata || f.airport_destination_city;
    if (o && d) return `${o} → ${d}`;
    return o || d || '';
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    if (!st) return placeholder('Select a Flightradar24 sensor', 'flight');

    const flights = (st.attributes.flights as Flight[] | undefined) ?? [];
    const count = flights.length;

    return html`
      <div class="card" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        <div class="hdr">
          <div class="hdr-l">${icon('flight', 20, 'var(--g-amber)')}<span class="title">${this._config.title}</span></div>
          <span class="badge ${count ? 'amber' : 'green'}">${count ? `${count} overhead` : 'Clear skies'}</span>
        </div>

        ${count === 0
          ? html`<div class="empty">${icon('travel_explore', 30, 'var(--g-faint)')}<span>No aircraft in your area</span></div>`
          : flights.slice(0, this._config.max).map((f) => {
              const label = f.callsign || f.flight_number || 'Unknown';
              const details = [
                f.altitude != null ? `${Math.round(Number(f.altitude)).toLocaleString()} ft` : null,
                f.ground_speed != null ? `${Math.round(Number(f.ground_speed))} kt` : null,
                f.aircraft_code || f.aircraft_model,
              ].filter(Boolean);
              return html`
                <div class="row">
                  <div class="plane" style=${f.heading != null ? `transform:rotate(${Number(f.heading)}deg)` : ''}>
                    ${icon('flight', 20, 'var(--g-cyan)')}
                  </div>
                  <div class="info">
                    <div class="cs">${label}${this._route(f) ? html`<span class="rt">${this._route(f)}</span>` : nothing}</div>
                    ${details.length ? html`<div class="det">${details.join(' · ')}</div>` : nothing}
                  </div>
                  ${f.distance != null ? html`<span class="dist">${Number(f.distance).toFixed(1)} km</span>` : nothing}
                </div>
              `;
            })}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 8px; }
      .hdr { margin-bottom: 4px; }
      .empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px 0; color: var(--g-dim); font-size: 13px; }
      .row { display: flex; align-items: center; gap: 14px; padding: 10px 4px; border-bottom: 1px solid var(--g-hair); }
      .row:last-child { border-bottom: none; }
      .plane { flex: none; width: 32px; height: 32px; border-radius: 10px; background: var(--g-inset); display: flex; align-items: center; justify-content: center; }
      .info { flex: 1; min-width: 0; }
      .cs { font-size: 14px; font-weight: 700; display: flex; align-items: baseline; gap: 8px; }
      .rt { font-size: 12px; font-weight: 600; color: var(--g-dim); }
      .det { font-size: 11.5px; color: var(--g-dim); font-family: var(--g-mono); }
      .dist { font-family: var(--g-mono); font-size: 12px; color: var(--g-cyan); flex: none; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-flight-card': GlassFlightCard;
  }
}
