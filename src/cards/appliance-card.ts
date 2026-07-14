import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

interface GlassApplianceCardConfig extends LovelaceCardConfig {
  name?: string;
  subtitle?: string;
  icon?: string;
  icon_color?: 'cyan' | 'amber' | 'green' | 'purple' | 'red';
  status?: string; // sensor whose state = the status label
  remaining?: string; // timestamp (finish time) or duration-string sensor
  total?: string; // total-time sensor (minutes) — for ring %
  toggle?: string; // switch / input_boolean for a power button
  stats?: string[]; // extra sensors shown as stat tiles
}

const ACCENT: Record<string, string> = {
  cyan: 'var(--g-cyan)',
  amber: 'var(--g-amber)',
  green: 'var(--g-green)',
  purple: 'var(--g-purple)',
  red: 'var(--g-red-text)',
};

const OPEN_CLASSES = ['door', 'window', 'opening', 'garage_door'];

@customElement('glass-appliance-card')
export class GlassApplianceCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassApplianceCardConfig;

  public setConfig(config: GlassApplianceCardConfig): void {
    this._config = { icon: 'local_laundry_service', icon_color: 'cyan', ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassApplianceCardConfig, 'type'> {
    return { name: 'Washer', icon: 'local_laundry_service', status: '', remaining: '', total: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const ids = [this._config.status, this._config.remaining, this._config.total, this._config.toggle, ...(this._config.stats ?? [])].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _val(id?: string): string | undefined {
    return id ? this.hass?.states[id]?.state : undefined;
  }

  /** Status pill treatment — device-class aware (doors read Open/Closed etc.). */
  private _statusLook(id?: string): { color: string; label: string } | null {
    if (!id) return null;
    const st = this.hass!.states[id];
    if (!st) return null;
    const dc = st.attributes.device_class as string | undefined;
    const s = st.state.toLowerCase();
    const cap = st.state.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    if (dc && OPEN_CLASSES.includes(dc)) {
      return s === 'on' ? { color: 'var(--g-amber)', label: 'Open' } : { color: 'var(--g-green)', label: 'Closed' };
    }
    if (dc === 'connectivity') {
      return s === 'on' ? { color: 'var(--g-green)', label: 'Online' } : { color: 'var(--g-dim)', label: 'Offline' };
    }
    if (/(run|active|washing|drying|cleaning|start)/.test(s) || s === 'on') return { color: 'var(--g-cyan)', label: cap };
    if (/(pause|delay|hold)/.test(s)) return { color: 'var(--g-amber)', label: cap };
    if (/(complete|finish|clean|done|ready)/.test(s)) return { color: 'var(--g-green)', label: cap };
    if (/(error|fault|alarm)/.test(s)) return { color: 'var(--g-red-text)', label: cap };
    return { color: 'var(--g-dim)', label: cap };
  }

  /** Returns {pct, label} for the ring, or null if we can't compute a real progress. */
  private _ring(): { pct: number; label: string } | null {
    const rem = this._val(this._config!.remaining);
    if (!rem || rem === 'unknown' || rem === 'unavailable') return null;
    const finish = Date.parse(rem);
    if (Number.isNaN(finish)) return null; // not a timestamp -> no ring
    const remMin = Math.max(0, (finish - Date.now()) / 60000);
    const totalRaw = Number(this._val(this._config!.total));
    const label = `${Math.floor(remMin / 60)}:${String(Math.round(remMin % 60)).padStart(2, '0')}`;
    const pct = totalRaw && !Number.isNaN(totalRaw) ? Math.max(0, Math.min(1, 1 - remMin / totalRaw)) : 0.5;
    return { pct, label };
  }

  private _statLabel(id: string): string {
    const st = this.hass!.states[id];
    let n = (st?.attributes.friendly_name as string) ?? id;
    const name = this._config!.name;
    if (name && n.toLowerCase().startsWith(name.toLowerCase() + ' ')) n = n.slice(name.length + 1);
    return n;
  }

  private _statValue(id: string): string {
    const st = this.hass!.states[id];
    if (!st) return '—';
    const unit = st.attributes.unit_of_measurement as string | undefined;
    const v = st.state.replace(/_/g, ' ');
    return unit ? `${v} ${unit}` : v;
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    const id = this._config!.toggle!;
    this.hass!.callService('homeassistant', 'toggle', { entity_id: id });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const accent = ACCENT[c.icon_color ?? 'cyan'] ?? 'var(--g-cyan)';
    const name = c.name ?? 'Appliance';

    const look = this._statusLook(c.status);
    const ring = this._ring();
    const stats = (c.stats ?? []).filter((id) => this.hass!.states[id]);
    const toggleOn = c.toggle ? this.hass.states[c.toggle]?.state === 'on' : false;

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${accent} 14%, transparent)">${icon(c.icon!, 26, accent)}</div>
          <div class="who">
            <div class="title">${name}</div>
            ${c.subtitle ? html`<div class="sub">${c.subtitle}</div>` : nothing}
          </div>
          ${look
            ? html`<span class="pill" style="color:${look.color}"><span class="dot" style="background:${look.color}"></span>${look.label}</span>`
            : nothing}
        </div>

        ${ring
          ? html`
              <div class="active">
                <div class="ring" style="background:conic-gradient(${accent} 0 ${(ring.pct * 100).toFixed(0)}%, rgba(255,255,255,0.07) 0 100%)">
                  <div class="ring-in">
                    <div class="t-num rem">${ring.label}</div>
                    <div class="rem-cap">remaining</div>
                  </div>
                </div>
                <div class="stat-rows">
                  ${stats.map(
                    (id) => html`<div class="srow"><div class="t-num sval">${this._statValue(id)}</div><div class="scap">${this._statLabel(id)}</div></div>`
                  )}
                </div>
              </div>
            `
          : stats.length
            ? html`<div class="stat-grid">
                ${stats.map(
                  (id) => html`<div class="stile"><div class="t-num sval">${this._statValue(id)}</div><div class="scap">${this._statLabel(id)}</div></div>`
                )}
              </div>`
            : nothing}

        ${c.toggle
          ? html`<button class="power ${toggleOn ? 'on' : ''}" @click=${this._toggle}>
              ${icon('power_settings_new', 18)}${toggleOn ? 'On' : 'Off'}
            </button>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 20px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .active { display: flex; align-items: center; gap: 22px; }
      .ring { width: 132px; height: 132px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; }
      .ring-in { width: 106px; height: 106px; border-radius: 50%; background: var(--g-panel); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .rem { font-size: 26px; }
      .rem-cap { font-size: 11px; color: var(--g-dim); margin-top: 2px; }
      .stat-rows { flex: 1; display: flex; flex-direction: column; gap: 14px; }
      .srow .sval { font-size: 19px; }
      .scap { font-size: 11px; color: var(--g-dim); margin-top: 3px; }

      .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .stile { background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 13px; }
      .stile .sval { font-size: 16px; text-transform: capitalize; }

      .power {
        display: flex; align-items: center; justify-content: center; gap: 7px;
        padding: 12px; border-radius: 13px; border: none; cursor: pointer;
        font-size: 13.5px; font-weight: 700; font-family: var(--g-font);
        background: rgba(255, 255, 255, 0.06); color: var(--g-text);
      }
      .power.on { background: var(--g-amber); color: var(--g-amber-ink); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-appliance-card': GlassApplianceCard;
  }
}
