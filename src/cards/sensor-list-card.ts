import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

type SensorType = 'garage' | 'door' | 'window' | 'auto';

interface SensorRow {
  entity: string;
  name?: string;
  type?: SensorType;
}

interface GlassSensorListCardConfig extends LovelaceCardConfig {
  title?: string;
  entities: (string | SensorRow)[];
}

@customElement('glass-sensor-list-card')
export class GlassSensorListCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassSensorListCardConfig;
  private _rows: SensorRow[] = [];

  public setConfig(config: GlassSensorListCardConfig): void {
    this._rows = (config.entities ?? []).map((e) => (typeof e === 'string' ? { entity: e } : e));
    this._config = { title: 'Sensors', ...config };
  }

  public getCardSize(): number {
    return this._rows.length + 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassSensorListCardConfig, 'type'> {
    return { title: 'Sensors', entities: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    return this._rows.some((r) => old.states[r.entity] !== this.hass!.states[r.entity]);
  }

  private _resolveType(row: SensorRow): SensorType {
    if (row.type && row.type !== 'auto') return row.type;
    const st = this.hass!.states[row.entity];
    const dc = st?.attributes.device_class as string | undefined;
    if (row.entity.startsWith('cover.') || dc === 'garage') return 'garage';
    if (dc === 'window') return 'window';
    return 'door';
  }

  private _isOpen(entity: string): boolean {
    const st = this.hass!.states[entity];
    if (!st) return false;
    return st.state === 'open' || st.state === 'on' || st.state === 'opening';
  }

  private _visual(type: SensorType, open: boolean) {
    if (type === 'garage') {
      return html`<div class="v garage">
        <div class="slats" style="transform:translateY(${open ? '-100%' : '0'})">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="floor"></div>
      </div>`;
    }
    if (type === 'window') {
      return html`<div class="v window">
        <div class="pane top" style="transform:translateY(${open ? '-60%' : '0'})"></div>
        <div class="pane bot"></div>
      </div>`;
    }
    return html`<div class="v door">
      <div class="frame"><div class="leaf" style="transform:rotateY(${open ? '-62deg' : '0deg'})"><span class="knob"></span></div></div>
    </div>`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._rows.length) return placeholder('Add door / window / cover sensors', 'sensors');
    const openCount = this._rows.filter((r) => this._isOpen(r.entity)).length;

    return html`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${icon('sensors', 20, 'var(--g-amber)')}<span class="title">${this._config.title}</span></div>
          <span class="badge ${openCount ? 'amber' : 'green'}">${openCount ? `${openCount} open` : 'All closed'}</span>
        </div>
        ${this._rows.map((row, i) => {
          const st = this.hass!.states[row.entity];
          if (!st) return html`<div class="line"><div class="missing">${row.entity} not found</div></div>`;
          const type = this._resolveType(row);
          const open = this._isOpen(row.entity);
          const name = row.name ?? (st.attributes.friendly_name as string) ?? row.entity;
          return html`
            <div class="line ${i < this._rows.length - 1 ? 'sep' : ''}" @click=${() => fireEvent(this, 'hass-more-info', { entityId: row.entity })}>
              ${this._visual(type, open)}
              <div class="txt">
                <div class="name">${name}</div>
                <div class="eid">${row.entity}</div>
              </div>
              <span class="badge ${open ? 'amber' : 'green'}">${open ? 'Open' : 'Closed'}</span>
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
      .hdr { margin-bottom: 6px; }
      .line { display: flex; align-items: center; gap: 14px; padding: 12px 4px; cursor: pointer; }
      .line.sep { border-bottom: 1px solid var(--g-hair); }
      .txt { flex: 1; min-width: 0; }
      .name { font-size: 14px; font-weight: 700; }
      .eid { font-size: 11.5px; color: var(--g-dim); }
      .missing { color: var(--g-red-text); font-size: 12px; }

      .v { width: 48px; height: 48px; flex: none; position: relative; }
      /* Garage roller */
      .garage { border-radius: 9px; overflow: hidden; background: #0a0c0f; border: 2px solid #3a3f47; }
      .garage .slats { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 2px; padding: 3px; transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1); }
      .garage .slats span { flex: 1; background: linear-gradient(#5a606a, #4a4f58); border-radius: 2px; }
      .garage .floor { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: #3a3f47; }
      /* Door swing */
      .door { perspective: 130px; display: flex; align-items: flex-end; justify-content: center; }
      .door .frame { width: 34px; height: 44px; border: 2px solid #3a3f47; border-bottom: none; border-radius: 4px 4px 0 0; background: #0a0c0f; position: relative; transform-style: preserve-3d; }
      .door .leaf { position: absolute; inset: 2px; transform-origin: left center; transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1); background: linear-gradient(#6a5030, #54401f); border-radius: 2px; box-shadow: 2px 0 6px rgba(0, 0, 0, 0.5); }
      .door .knob { position: absolute; top: 50%; right: 3px; width: 4px; height: 4px; border-radius: 50%; background: var(--g-amber); transform: translateY(-50%); }
      /* Window slide */
      .window { border-radius: 5px; overflow: hidden; background: #12303a; border: 2px solid #3a3f47; }
      .window::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(135, 221, 225, 0.35), rgba(135, 221, 225, 0.05)); }
      .window .pane { position: absolute; left: 0; right: 0; height: 50%; background: linear-gradient(135deg, #2a3138, #1c2228); border: 1.5px solid #4a4f58; box-sizing: border-box; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
      .window .top { top: 0; }
      .window .bot { bottom: 0; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-sensor-list-card': GlassSensorListCard;
  }
}
