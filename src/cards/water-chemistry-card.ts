import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface Metric {
  entity: string;
  label?: string;
  icon?: string;
  color?: string;
  unit?: string;
  min?: number;
  max?: number;
  ok_min?: number;
  ok_max?: number;
}

interface GlassWaterChemistryCardConfig extends LovelaceCardConfig {
  title?: string;
  metrics: (string | Metric)[];
}

@customElement('glass-water-chemistry-card')
export class GlassWaterChemistryCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassWaterChemistryCardConfig;
  private _metrics: Metric[] = [];

  public setConfig(config: GlassWaterChemistryCardConfig): void {
    this._metrics = (config.metrics ?? []).map((m) => (typeof m === 'string' ? { entity: m } : m));
    this._config = { title: 'Water Chemistry', ...config };
  }

  public getCardSize(): number {
    return this._metrics.length + 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassWaterChemistryCardConfig, 'type'> {
    return { title: 'Water Chemistry', metrics: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    return this._metrics.some((m) => old.states[m.entity] !== this.hass!.states[m.entity]);
  }

  private _row(m: Metric) {
    const st = this.hass!.states[m.entity];
    if (!st) return html`<div class="row"><div class="miss">${m.entity} not found</div></div>`;
    const value = Number(st.state);
    const valid = !Number.isNaN(value);
    const unit = m.unit ?? (st.attributes.unit_of_measurement as string) ?? '';
    const label = m.label ?? (st.attributes.friendly_name as string) ?? m.entity;
    const color = m.color ?? 'var(--g-cyan)';
    const min = m.min ?? 0;
    const max = m.max ?? (valid ? Math.max(value * 2, 1) : 100);
    const pct = valid ? Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100)) : 0;

    let ok: { label: string; cls: string } | null = null;
    if (m.ok_min != null || m.ok_max != null) {
      if (valid && (m.ok_min == null || value >= m.ok_min) && (m.ok_max == null || value <= m.ok_max)) ok = { label: 'OK', cls: 'green' };
      else if (valid && m.ok_min != null && value < m.ok_min) ok = { label: 'Low', cls: 'amber' };
      else ok = { label: 'High', cls: 'red' };
    }
    const zoneL = m.ok_min != null ? Math.max(0, Math.min(100, ((m.ok_min - min) / (max - min)) * 100)) : 0;
    const zoneR = m.ok_max != null ? Math.max(0, Math.min(100, ((m.ok_max - min) / (max - min)) * 100)) : 100;

    return html`
      <div class="row" @click=${() => fireEvent(this, 'hass-more-info', { entityId: m.entity })}>
        <div class="well" style="background:color-mix(in srgb, ${color} 14%, transparent)">${icon(m.icon ?? 'science', 22, color)}</div>
        <div class="body">
          <div class="top">
            <div class="lhs"><span class="lbl">${label}</span>${ok ? html`<span class="badge ${ok.cls}">${ok.label}</span>` : nothing}</div>
            <div class="val"><span class="t-num">${valid ? value : st.state}</span> <span class="u">${unit}</span></div>
          </div>
          <div class="bar">
            <div class="zone" style="left:${zoneL}%;right:${100 - zoneR}%"></div>
            <div class="dot" style="left:${pct}%;background:${color}"></div>
          </div>
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._metrics.length) return placeholder('Add water metrics (pH, chlorine, …)', 'science');
    return html`
      <div class="card">
        <div class="hdr"><div class="hdr-l">${icon('water_drop', 22, 'var(--g-cyan)')}<span class="title">${this._config.title}</span></div></div>
        <div class="metrics">${this._metrics.map((m) => this._row(m))}</div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 16px; }
      .metrics { display: flex; flex-direction: column; gap: 16px; }
      .row { display: flex; align-items: center; gap: 14px; cursor: pointer; }
      .well { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex: none; }
      .body { flex: 1; min-width: 0; }
      .top { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 7px; }
      .lhs { display: flex; align-items: center; gap: 8px; }
      .lbl { font-size: 13.5px; font-weight: 700; }
      .val .t-num { font-size: 18px; }
      .u { font-size: 11px; color: var(--g-dim); }
      .bar { height: 8px; border-radius: 8px; background: var(--g-inset); position: relative; }
      .zone { position: absolute; top: 0; bottom: 0; background: rgba(185, 246, 166, 0.25); border-radius: 8px; }
      .dot { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; transform: translate(-50%, -50%); border: 2px solid var(--g-card); box-shadow: 0 0 6px rgba(0, 0, 0, 0.5); }
      .miss { color: var(--g-red-text); font-size: 12px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-water-chemistry-card': GlassWaterChemistryCard;
  }
}
