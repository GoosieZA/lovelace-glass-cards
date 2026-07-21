import { LitElement, html, css, nothing, svg, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

type EnergyVariant = 'flow' | 'ring' | 'stats' | 'meters' | 'production' | 'strip' | 'bar';

interface GlassEnergyCardConfig extends LovelaceCardConfig {
  title?: string;
  variant?: EnergyVariant;
  // flow
  solar?: string;
  grid?: string;
  battery?: string;
  battery_soc?: string;
  house?: string;
  // stats
  today?: string;
  imported?: string;
  exported?: string;
  saved?: string;
  // meters
  meters?: string[];
  // production
  production?: string;
}

const METER_COLORS = [
  ['#7dd68a', 'var(--g-green)'],
  ['#e0b24a', 'var(--g-amber)'],
  ['#a97ff0', 'var(--g-purple)'],
  ['#5ab9bd', 'var(--g-cyan)'],
];

interface Bar {
  v: number;
  label: string;
}

@customElement('glass-energy-card')
export class GlassEnergyCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassEnergyCardConfig;
  @state() private _bars: Bar[] = [];
  private _fetchedFor?: string;

  public setConfig(config: GlassEnergyCardConfig): void {
    this._config = { title: 'Energy', variant: 'flow', ...config };
    this._fetchedFor = undefined;
  }

  public getCardSize(): number {
    const v = this._config?.variant;
    if (v === 'flow' || v === 'production') return 4;
    if (v === 'strip' || v === 'bar') return 1;
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassEnergyCardConfig, 'type'> {
    return { title: 'Energy', variant: 'flow', solar: 'sensor.solar_power', grid: 'sensor.grid_power', battery: 'sensor.battery_power' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config') || changed.has('_bars')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const c = this._config;
    const ids = [c.solar, c.grid, c.battery, c.battery_soc, c.house, c.today, c.imported, c.exported, c.saved, c.production, ...(c.meters ?? [])].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  protected updated(): void {
    if (!this.hass || !this._config || this._config.variant !== 'production' || !this._config.production) return;
    const st = this.hass.states[this._config.production];
    if (st && st.last_updated !== this._fetchedFor) {
      this._fetchedFor = st.last_updated;
      void this._loadProduction(this._config.production);
    }
  }

  private async _loadProduction(statId: string): Promise<void> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    try {
      const res = await this.hass!.callWS<Record<string, Array<Record<string, number>>>>({
        type: 'recorder/statistics_during_period',
        start_time: start.toISOString(),
        statistic_ids: [statId],
        period: 'hour',
      });
      const series = res[statId] ?? [];
      this._bars = series.map((b) => ({
        v: Math.max(0, Number(b.change ?? b.state ?? 0)),
        label: String(new Date(Number(b.start)).getHours()),
      }));
    } catch {
      this._bars = [];
    }
  }

  private _watts(id?: string): number | null {
    if (!id || !this.hass) return null;
    const st = this.hass.states[id];
    if (!st || st.state === 'unavailable' || st.state === 'unknown') return null;
    const n = Number(st.state);
    if (Number.isNaN(n)) return null;
    const unit = String(st.attributes.unit_of_measurement ?? '').toLowerCase();
    return unit === 'kw' ? n * 1000 : n;
  }

  private _kw(w: number): string {
    return (w / 1000).toFixed(1);
  }

  private _stateNum(id?: string): number | null {
    const n = id ? Number(this.hass!.states[id]?.state) : NaN;
    return Number.isNaN(n) ? null : n;
  }

  private _label(id: string): string {
    return (this.hass!.states[id]?.attributes.friendly_name as string) ?? id;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    switch (this._config.variant) {
      case 'ring':
        return this._renderRing();
      case 'stats':
        return this._renderStats();
      case 'meters':
        return this._renderMeters();
      case 'production':
        return this._renderProduction();
      case 'strip':
        return this._renderStrip();
      case 'bar':
        return this._renderBar();
      default:
        return this._renderFlow();
    }
  }

  private _head(right?: unknown) {
    return html`<div class="hdr"><div class="hdr-l">${icon('bolt', 22, 'var(--g-amber)')}<span class="title">${this._config!.title}</span></div>${right ?? nothing}</div>`;
  }

  private _renderFlow() {
    const solar = this._watts(this._config!.solar);
    const grid = this._watts(this._config!.grid);
    const batt = this._watts(this._config!.battery);
    let house = this._watts(this._config!.house);
    if (house == null) house = (solar ?? 0) + (grid ?? 0) + (batt ?? 0);
    const soc = this._stateNum(this._config!.battery_soc);

    const solarOn = (solar ?? 0) > 20;
    const importing = (grid ?? 0) > 20;
    const exporting = (grid ?? 0) < -20;
    const discharging = (batt ?? 0) > 20;
    const charging = (batt ?? 0) < -20;
    const status = exporting ? { label: 'Exporting', purple: false } : importing ? { label: 'Grid import', purple: true } : { label: 'Self-powered', purple: false };
    const flow = (on: boolean, color: string, rev = false) => (on ? `stroke:${color};animation:g-flow 0.7s linear infinite${rev ? ' reverse' : ''};` : 'stroke:rgba(255,255,255,0.06);');

    return html`<div class="card">
      ${this._head(html`<div class="badge ${status.purple ? '' : 'green'}" style=${status.purple ? 'background:rgba(201,166,255,0.14);color:var(--g-purple)' : ''}><span class="dot pulse"></span>${status.label}</div>`)}
      <div class="flow">
        <svg viewBox="0 0 408 264" preserveAspectRatio="xMidYMid meet">
          ${svg`
            <path d="M204 58 L204 108" fill="none" stroke-width="8" stroke-linecap="round" stroke="rgba(255,255,255,0.06)"></path>
            <path d="M92 176 L166 148" fill="none" stroke-width="8" stroke-linecap="round" stroke="rgba(255,255,255,0.06)"></path>
            <path d="M242 148 L316 176" fill="none" stroke-width="8" stroke-linecap="round" stroke="rgba(255,255,255,0.06)"></path>
            <path d="M204 58 L204 108" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 12" style=${flow(solarOn, 'var(--g-amber)')}></path>
            <path d="M92 176 L166 148" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 12" style=${flow(importing || exporting, 'var(--g-purple)', exporting)}></path>
            <path d="M242 148 L316 176" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="2 12" style=${flow(discharging || charging, 'var(--g-green)', charging)}></path>
          `}
        </svg>
        ${solar != null ? html`<div class="node solar"><div class="chip amber">${icon('solar_power', 20, 'var(--g-amber)')}<span>${this._kw(solar)}</span></div><span class="cap">Solar · kW</span></div>` : nothing}
        <div class="node home">${icon('home', 26, 'var(--g-amber)')}<span class="watts t-num">${Math.round(house)}</span><span class="cap">Watts now</span></div>
        ${grid != null ? html`<div class="node grid"><div class="chip">${icon('bolt', 20, 'var(--g-purple)')}<span style="color:var(--g-purple)">${this._kw(Math.abs(grid))}</span></div><span class="cap">Grid · kW${importing ? ' (import)' : exporting ? ' (export)' : ' (idle)'}</span></div>` : nothing}
        ${batt != null ? html`<div class="node batt"><div class="chip green">${icon(charging ? 'battery_charging_full' : 'battery_full', 20, 'var(--g-green)')}<span style="color:var(--g-green)">${this._kw(Math.abs(batt))}</span></div><span class="cap">Battery${soc != null ? ` · ${Math.round(soc)}%` : ' · kW'}</span></div>` : nothing}
      </div>
    </div>`;
  }

  private _renderRing() {
    const c = this._config!;
    const soc = this._stateNum(c.battery_soc) ?? 0;
    const solar = this._watts(c.solar);
    let house = this._watts(c.house);
    if (house == null) house = (solar ?? 0) + (this._watts(c.grid) ?? 0) + (this._watts(c.battery) ?? 0);
    const batt = this._watts(c.battery);
    const delta = batt != null && Math.abs(batt) > 5
      ? html`<div class="delta" style="color:${batt < 0 ? 'var(--g-green)' : 'var(--g-amber)'}">${batt < 0 ? '↓' : '↑'} ${Math.abs(Math.round(batt))} W</div>`
      : nothing;

    return html`<div class="card">
      ${this._head()}
      <div class="ring-row">
        <div class="bring" style="background:conic-gradient(var(--g-amber) 0 ${soc}%, rgba(255,255,255,0.07) ${soc}% 100%)">
          <div class="bring-in">
            <div class="t-num bpct">${Math.round(soc)}<span class="pctu">%</span></div>
            <div class="bcap">Battery</div>
            ${delta}
          </div>
        </div>
        <div class="ring-side">
          <div class="rside"><span class="ms" style="font-size:22px;color:var(--g-dim)">solar_power</span><div><div class="t-num rv">${solar != null ? Math.round(solar) : '—'} W</div><div class="rc">Solar production</div></div></div>
          <div class="hair"></div>
          <div class="rside"><span class="ms" style="font-size:22px;color:var(--g-dim)">home</span><div><div class="t-num rv">${Math.round(house)} W</div><div class="rc">House load</div></div></div>
        </div>
      </div>
      ${c.today || c.grid
        ? html`<div class="ring-tiles">
            ${c.today ? html`<div class="stat"><div class="t-num sv">${this._fmt(c.today).val} <span class="su">${this._fmt(c.today).unit || 'kWh'}</span></div><div class="sc">Solar today</div></div>` : nothing}
            ${c.grid ? html`<div class="stat"><div class="t-num sv">${(this._watts(c.grid) ?? 0) > 5 ? 'Import' : (this._watts(c.grid) ?? 0) < -5 ? 'Export' : 'On'} <span style="color:var(--g-green)">●</span></div><div class="sc">Grid status</div></div>` : nothing}
          </div>`
        : nothing}
    </div>`;
  }

  private _fmt(id?: string): { val: string; unit: string } {
    const st = id ? this.hass!.states[id] : undefined;
    if (!st) return { val: '—', unit: '' };
    const n = Number(st.state);
    return { val: Number.isNaN(n) ? st.state : n.toFixed(1), unit: (st.attributes.unit_of_measurement as string) ?? '' };
  }

  private _renderStats() {
    const c = this._config!;
    const today = this._fmt(c.today);
    const tiles: Array<{ id?: string; color: string }> = [
      { id: c.imported, color: 'var(--g-purple)' },
      { id: c.exported, color: 'var(--g-green)' },
      { id: c.saved, color: 'var(--g-amber)' },
    ].filter((t) => t.id);
    return html`<div class="card">
      <div class="section">Solar today</div>
      <div class="big-row"><div class="t-display">${today.val}</div><div class="big-unit">${today.unit || 'kWh'} ${c.today ? this._label(c.today) : ''}</div></div>
      ${tiles.length
        ? html`<div class="tri">
            ${tiles.map((t) => {
              const f = this._fmt(t.id);
              return html`<div class="stat"><div class="t-num sv" style="color:${t.color}">${f.val}${f.unit ? html` <span class="su">${f.unit}</span>` : nothing}</div><div class="sc">${this._label(t.id!)}</div></div>`;
            })}
          </div>`
        : nothing}
    </div>`;
  }

  private _renderMeters() {
    const c = this._config!;
    const ids = [...(c.battery_soc ? [c.battery_soc] : []), ...(c.meters ?? [])];
    return html`<div class="card">
      ${this._head()}
      <div class="meters">
        ${ids.map((id, i) => {
          const v = Math.max(0, Math.min(100, this._stateNum(id) ?? 0));
          const [c1, c2] = METER_COLORS[i % METER_COLORS.length];
          return html`<div class="m">
            <div class="m-h"><span class="m-l">${icon(i === 0 && c.battery_soc ? 'battery_charging_full' : 'bolt', 18, c2)}${this._label(id)}</span><span class="m-v">${Math.round(v)}%</span></div>
            <div class="m-track"><span style="width:${v}%;background:linear-gradient(90deg, ${c1}, ${c2})"></span></div>
          </div>`;
        })}
      </div>
    </div>`;
  }

  private _renderProduction() {
    const total = this._bars.reduce((a, b) => a + b.v, 0);
    const max = Math.max(0.001, ...this._bars.map((b) => b.v));
    return html`<div class="card">
      ${this._head(html`<div class="t-num total">${total.toFixed(1)} <span class="su">kWh</span></div>`)}
      ${this._bars.length
        ? html`<div class="bars">
            ${this._bars.map((b) => html`<div class="bar-col"><div class="bar" style="height:${(b.v / max) * 100}%;background:${b.v >= max * 0.66 ? 'var(--g-amber)' : 'var(--g-amber-deep)'}"></div><span class="bl">${b.label}</span></div>`)}
          </div>`
        : html`<div class="empty">No production data for today yet.</div>`}
    </div>`;
  }

  // Compact solar strip — a battery ring plus solar / load / grid mini-stats.
  private _renderStrip() {
    const c = this._config!;
    const solar = this._watts(c.solar);
    const grid = this._watts(c.grid);
    let house = this._watts(c.house);
    if (house == null) house = (solar ?? 0) + (grid ?? 0) + (this._watts(c.battery) ?? 0);
    const soc = this._stateNum(c.battery_soc);

    return html`<div class="card strip">
      ${soc != null
        ? html`<div class="soc-ring" style="background:conic-gradient(var(--g-amber) 0 ${soc}%, rgba(255,255,255,0.08) ${soc}% 100%)">
            <div class="soc-in">${Math.round(soc)}%</div>
          </div>`
        : nothing}
      <div class="strip-stats">
        <div class="ss"><div class="ss-h">${icon('solar_power', 14, 'var(--g-amber)')}Solar</div><div class="ss-v">${solar != null ? this._kw(solar) : '—'} kW</div></div>
        <div class="ss"><div class="ss-h">${icon('home', 14, 'var(--g-amber)')}Load</div><div class="ss-v">${house != null ? Math.round(house) : '—'} W</div></div>
        <div class="ss"><div class="ss-h">${icon('bolt', 14, 'var(--g-purple)')}Grid</div><div class="ss-v">${grid != null ? this._kw(Math.abs(grid)) : '—'} kW</div></div>
      </div>
    </div>`;
  }

  // Compact energy mix — a split bar of solar vs battery contribution.
  private _renderBar() {
    const c = this._config!;
    const solar = Math.max(0, this._watts(c.solar) ?? 0);
    const battW = this._watts(c.battery) ?? 0;
    const batt = battW > 0 ? battW : 0; // only discharge contributes to house
    const total = solar + batt;
    const solarPct = total > 0 ? Math.round((solar / total) * 100) : 0;
    const battPct = total > 0 ? 100 - solarPct : 0;
    const grid = this._watts(c.grid);
    const status = (grid ?? 0) > 20 ? 'Grid import' : (grid ?? 0) < -20 ? 'Exporting' : 'Self-powered';

    return html`<div class="card bar-card">
      <div class="bar-hdr">
        <div class="hdr-l">${icon('bolt', 20, 'var(--g-amber)')}<span class="title">${c.title}</span></div>
        <span class="bar-status ${status === 'Self-powered' || status === 'Exporting' ? 'green' : ''}">${status}</span>
      </div>
      <div class="mix">
        <span style="width:${solarPct}%;background:linear-gradient(90deg,var(--g-amber-deep),var(--g-amber))"></span>
        <span style="width:${battPct}%;background:var(--g-cyan)"></span>
      </div>
      <div class="mix-legend">
        <span><span class="d" style="color:var(--g-amber)">●</span> Solar ${solarPct}%</span>
        <span><span class="d" style="color:var(--g-cyan)">●</span> Battery ${battPct}%</span>
      </div>
    </div>`;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-flow { to { stroke-dashoffset: -16; } }

      /* Compact solar strip — row inside the card shell.
         .card.strip beats the later ".card { flex-direction: column }" on specificity. */
      .card.strip { flex-direction: row; align-items: center; gap: 16px; padding: 14px 16px; border-radius: var(--g-r-tile); }
      .soc-ring { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
      .soc-in { width: 36px; height: 36px; border-radius: 50%; background: var(--g-card); display: flex; align-items: center; justify-content: center; font-family: var(--g-display); font-size: 12px; font-weight: 700; }
      .strip-stats { flex: 1; display: flex; justify-content: space-between; gap: 8px; }
      .ss-h { display: flex; align-items: center; gap: 4px; color: var(--g-dim); font-size: 10.5px; }
      .ss-v { font-family: var(--g-display); font-size: 16px; font-weight: 600; margin-top: 2px; }

      /* Compact energy mix bar */
      .card.bar-card { gap: 12px; padding: 16px; border-radius: var(--g-r-tile); }
      .bar-hdr { display: flex; align-items: center; justify-content: space-between; }
      .bar-status { font-size: 12px; font-weight: 700; color: var(--g-dim); }
      .bar-status.green { color: var(--g-green); }
      .mix { height: 12px; border-radius: 12px; background: var(--g-inset); overflow: hidden; display: flex; }
      .mix > span { height: 100%; }
      .mix-legend { display: flex; justify-content: space-between; font-size: 11px; color: var(--g-dim); }
      .mix-legend .d { font-size: 10px; }

      .card { display: flex; flex-direction: column; gap: 18px; }
      .section { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--g-faint); font-weight: 700; }
      .dot.pulse { animation: g-pulse 1.4s ease-in-out infinite; }
      @keyframes g-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

      .flow { position: relative; height: 264px; }
      .flow svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
      .node { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 4px; }
      .chip { display: flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 14px; background: var(--g-inset); border: 1px solid var(--g-border); font-family: var(--g-display); font-size: 16px; font-weight: 700; }
      .chip.amber { background: rgba(243, 208, 106, 0.12); border-color: rgba(243, 208, 106, 0.35); color: var(--g-amber); }
      .chip.green { background: rgba(185, 246, 166, 0.1); border-color: rgba(185, 246, 166, 0.3); }
      .cap { font-size: 10.5px; color: var(--g-dim); font-weight: 600; }
      .solar { left: 50%; top: 0; transform: translateX(-50%); }
      .grid { left: 0; bottom: 0; }
      .batt { right: 0; bottom: 0; }
      .home { left: 50%; top: 50%; transform: translate(-50%, -50%); width: 96px; height: 96px; border-radius: 50%; gap: 2px; background: radial-gradient(circle at 50% 35%, #20242c, #14161a); border: 1.5px solid rgba(243, 208, 106, 0.4); box-shadow: 0 0 34px rgba(243, 208, 106, 0.18); justify-content: center; }
      .home .watts { font-size: 19px; }
      .home .cap { font-size: 9.5px; }

      .ring-row { display: flex; align-items: center; gap: 22px; }
      .bring { width: 148px; height: 148px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; }
      .bring-in { width: 118px; height: 118px; border-radius: 50%; background: var(--g-card); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .bpct { font-size: 36px; }
      .pctu { font-size: 17px; }
      .bcap { font-size: 12px; color: var(--g-dim); margin-top: 3px; }
      .delta { font-size: 11px; font-weight: 600; margin-top: 2px; }
      .ring-side { flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .rside { display: flex; align-items: center; gap: 12px; }
      .rv { font-size: 22px; }
      .rc { font-size: 12px; color: var(--g-dim); }
      .hair { height: 1px; background: var(--g-hair); }
      .ring-tiles { display: flex; gap: 12px; }
      .ring-tiles .stat { flex: 1; }

      .big-row { display: flex; align-items: flex-end; gap: 12px; }
      .big-unit { font-size: 16px; color: var(--g-dim); margin-bottom: 6px; }
      .tri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .stat { background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 14px; }
      .sv { font-size: 22px; }
      .su { font-size: 13px; color: var(--g-dim); }
      .sc { font-size: 11px; color: var(--g-dim); margin-top: 2px; }

      .meters { display: flex; flex-direction: column; gap: 16px; }
      .m-h { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 7px; }
      .m-l { display: flex; align-items: center; gap: 7px; font-weight: 600; }
      .m-v { font-family: var(--g-mono); color: var(--g-dim); }
      .m-track { height: 12px; border-radius: 12px; background: var(--g-inset); overflow: hidden; position: relative; }
      .m-track > span { position: absolute; inset: 0 auto 0 0; border-radius: 12px; }

      .total { font-size: 22px; }
      .bars { display: flex; align-items: flex-end; gap: 6px; height: 130px; }
      .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; justify-content: flex-end; height: 100%; }
      .bar { width: 100%; border-radius: 5px 5px 0 0; min-height: 2px; }
      .bl { font-size: 9px; color: var(--g-faint); }
      .empty { color: var(--g-dim); font-size: 13px; text-align: center; padding: 24px 0; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-energy-card': GlassEnergyCard;
  }
}
