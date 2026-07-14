import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

interface GlassDishwasherCardConfig extends LovelaceCardConfig {
  name?: string;
  subtitle?: string;
  status?: string; // sensor: current status
  alert?: string; // binary_sensor: refill/attention needed
  alert_text?: string;
  tiles?: string[]; // up to 3 status tiles (door, dishes, clean reminder)
  levels?: string[]; // level bars (enum states parsed to a number)
  level_max?: number;
}

const TILE_ICON: Record<string, string> = {
  door: 'door_front',
  window: 'window',
  connectivity: 'wifi',
  running: 'check_circle',
};

@customElement('glass-dishwasher-card')
export class GlassDishwasherCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassDishwasherCardConfig;

  public setConfig(config: GlassDishwasherCardConfig): void {
    this._config = { name: 'Dishwasher', subtitle: 'Kitchen', level_max: 4, ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassDishwasherCardConfig, 'type'> {
    return { name: 'Dishwasher', subtitle: 'Kitchen', status: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const c = this._config;
    const ids = [c.status, c.alert, ...(c.tiles ?? []), ...(c.levels ?? [])].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _label(id: string): string {
    let n = (this.hass!.states[id]?.attributes.friendly_name as string) ?? id;
    const name = this._config!.name;
    if (name && n.toLowerCase().startsWith(name.toLowerCase() + ' ')) n = n.slice(name.length + 1);
    return n;
  }

  private _pretty(state: string): string {
    return state.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  }

  private _statusLook(state: string): { color: string; label: string } {
    const s = state.toLowerCase();
    const label = this._pretty(state);
    if (/(run|washing|active|start)/.test(s)) return { color: 'var(--g-cyan)', label };
    if (/(complete|finish|clean|done)/.test(s)) return { color: 'var(--g-green)', label };
    if (/(pause|delay)/.test(s)) return { color: 'var(--g-amber)', label };
    if (/(off|idle|power_off|standby)/.test(s)) return { color: 'var(--g-dim)', label: 'Power off' };
    return { color: 'var(--g-dim)', label };
  }

  private _tile(id: string) {
    const st = this.hass!.states[id];
    if (!st) return nothing;
    const dc = st.attributes.device_class as string | undefined;
    const domain = id.split('.')[0];
    let value: string;
    let on = false;
    if (domain === 'binary_sensor' || domain === 'switch') {
      on = st.state === 'on';
      if (dc === 'door' || dc === 'window' || dc === 'opening') value = on ? 'Open' : 'Closed';
      else if (dc === 'connectivity') value = on ? 'Online' : 'Offline';
      else value = on ? 'On' : 'Off';
    } else {
      value = this._pretty(st.state);
    }
    const ico = TILE_ICON[dc ?? ''] ?? 'info';
    const good = (dc === 'door' && !on) || (dc === 'connectivity' && on);
    return html`<div class="tile" @click=${() => fireEvent(this, 'hass-more-info', { entityId: id })}>
      ${icon(ico, 20, good ? 'var(--g-green)' : 'var(--g-dim)')}
      <div><div class="tv">${value}</div><div class="tl">${this._label(id)}</div></div>
    </div>`;
  }

  private _level(id: string) {
    const st = this.hass!.states[id];
    if (!st) return nothing;
    const max = this._config!.level_max ?? 4;
    const m = String(st.state).match(/(\d+(\.\d+)?)/);
    const n = m ? Number(m[1]) : 0;
    const pct = Math.max(0, Math.min(100, (n / max) * 100));
    return html`<div class="lv">
      <div class="lv-h"><span>${this._label(id)}</span><span class="lv-n">${n} / ${max}</span></div>
      <div class="meter"><span style="width:${pct}%"></span></div>
    </div>`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const statusState = c.status ? this.hass.states[c.status]?.state : undefined;
    const look = statusState ? this._statusLook(statusState) : null;
    const alertOn = c.alert ? this.hass.states[c.alert]?.state === 'on' : false;
    const tiles = (c.tiles ?? []).filter((id) => this.hass!.states[id]);
    const levels = (c.levels ?? []).filter((id) => this.hass!.states[id]);

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox">${icon('dishwasher_gen', 26, 'var(--g-dim)')}</div>
          <div class="who"><div class="title">${c.name}</div><div class="sub">${c.subtitle}</div></div>
          ${look ? html`<span class="pill" style="color:${look.color}"><span class="dot" style="background:${look.color}"></span>${look.label}</span>` : nothing}
        </div>

        ${alertOn
          ? html`<div class="alert">${icon('opacity', 22, 'var(--g-amber)')}<div><div class="a-t">${c.alert_text ?? 'Attention needed'}</div></div></div>`
          : nothing}

        ${tiles.length ? html`<div class="tiles">${tiles.slice(0, 3).map((id) => this._tile(id))}</div>` : nothing}
        ${levels.length ? html`<div class="levels">${levels.map((id) => this._level(id))}</div>` : nothing}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 16px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; background: var(--g-inset); display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
      .alert { display: flex; align-items: center; gap: 11px; background: rgba(243, 208, 106, 0.1); border: 1px solid rgba(243, 208, 106, 0.3); border-radius: var(--g-r-ctl); padding: 12px 15px; }
      .a-t { font-size: 13.5px; font-weight: 700; color: var(--g-amber); }
      .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .tile { background: var(--g-inset); border-radius: var(--g-r-sm); padding: 13px; display: flex; flex-direction: column; gap: 6px; cursor: pointer; }
      .tv { font-size: 14px; font-weight: 700; line-height: 1; }
      .tl { font-size: 10.5px; color: var(--g-dim); margin-top: 3px; }
      .levels { display: flex; flex-direction: column; gap: 14px; }
      .lv-h { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; margin-bottom: 6px; }
      .lv-n { font-family: var(--g-mono); color: var(--g-dim); }
      .meter { height: 9px; border-radius: 9px; background: var(--g-inset); overflow: hidden; position: relative; }
      .meter > span { position: absolute; inset: 0 auto 0 0; border-radius: 9px; background: var(--g-amber); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-dishwasher-card': GlassDishwasherCard;
  }
}
