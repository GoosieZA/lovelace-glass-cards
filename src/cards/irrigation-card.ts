import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface Zone {
  entity: string;
  name?: string;
  icon?: string;
}

interface GlassIrrigationCardConfig extends LovelaceCardConfig {
  title?: string;
  zones: (string | Zone)[];
}

@customElement('glass-irrigation-card')
export class GlassIrrigationCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassIrrigationCardConfig;
  private _zones: Zone[] = [];

  public setConfig(config: GlassIrrigationCardConfig): void {
    this._zones = (config.zones ?? []).map((z) => (typeof z === 'string' ? { entity: z } : z));
    this._config = { title: 'Irrigation Zones', ...config };
  }

  public getCardSize(): number {
    return this._zones.length + 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassIrrigationCardConfig, 'type'> {
    return { title: 'Irrigation Zones', zones: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    return this._zones.some((z) => old.states[z.entity] !== this.hass!.states[z.entity]);
  }

  private _on(entity: string): boolean {
    const s = this.hass!.states[entity]?.state;
    return s === 'on' || s === 'open';
  }

  private _toggle(entity: string): void {
    this.hass!.callService('homeassistant', 'toggle', { entity_id: entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._zones.length) return placeholder('Add irrigation zones (switches/valves)', 'water_drop');
    const activeCount = this._zones.filter((z) => this._on(z.entity)).length;

    return html`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${icon('water_drop', 22, 'var(--g-cyan)')}<span class="title">${this._config.title}</span></div>
          <span class="badge ${activeCount ? 'cyan' : ''}">${activeCount ? `${activeCount} on` : 'All off'}</span>
        </div>
        <div class="zones">
          ${this._zones.map((z) => {
            const st = this.hass!.states[z.entity];
            if (!st) return html`<div class="zone"><div class="miss">${z.entity} not found</div></div>`;
            const on = this._on(z.entity);
            const name = z.name ?? (st.attributes.friendly_name as string) ?? z.entity;
            const color = on ? 'var(--g-cyan)' : 'var(--g-dim)';
            return html`
              <button class="zone ${on ? 'on' : ''}" @click=${() => this._toggle(z.entity)}>
                <div class="well">
                  ${on ? html`<span class="ripple"></span>` : nothing}
                  ${icon(z.icon ?? 'sprinkler', 22, color)}
                </div>
                <div class="txt"><div class="zn">${name}</div><div class="zs">${on ? 'Watering' : 'Idle'}</div></div>
                <div class="toggle ${on ? 'on' : ''}"><div class="knob"></div></div>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-ripple { 0% { transform: scale(0.7); opacity: 0.7; } 100% { transform: scale(2); opacity: 0; } }
      .card { display: flex; flex-direction: column; gap: 16px; }
      .badge.cyan { background: rgba(135, 221, 225, 0.14); color: var(--g-cyan); }
      .zones { display: flex; flex-direction: column; gap: 10px; }
      .zone {
        display: flex; align-items: center; gap: 14px; width: 100%; padding: 10px 12px;
        border-radius: 16px; cursor: pointer; text-align: left;
        background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi);
        transition: background 0.15s ease;
      }
      .zone.on { background: rgba(135, 221, 225, 0.08); border-color: rgba(135, 221, 225, 0.28); }
      .well { width: 44px; height: 44px; border-radius: 12px; background: var(--g-card); display: flex; align-items: center; justify-content: center; flex: none; position: relative; }
      .ripple { position: absolute; inset: 0; border-radius: 12px; border: 2px solid var(--g-cyan); animation: g-ripple 1.6s ease-out infinite; }
      .txt { flex: 1; min-width: 0; }
      .zn { font-size: 14.5px; font-weight: 700; }
      .zs { font-size: 11.5px; color: var(--g-dim); }
      .miss { color: var(--g-red-text); font-size: 12px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-irrigation-card': GlassIrrigationCard;
  }
}
