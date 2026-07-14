import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassLightCardConfig extends LovelaceCardConfig {
  entity: string; // light.*
  name?: string;
  subtitle?: string;
}

const SWATCHES: Array<[number, number, number]> = [
  [255, 92, 92], [243, 208, 106], [185, 246, 166], [135, 221, 225],
  [130, 170, 255], [201, 166, 255], [255, 150, 200], [255, 244, 224],
];

@customElement('glass-light-card')
export class GlassLightCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassLightCardConfig;

  public setConfig(config: GlassLightCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassLightCardConfig, 'type'> {
    return { entity: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private get _st() {
    return this.hass!.states[this._config!.entity];
  }

  private _modes(): string[] {
    return (this._st?.attributes.supported_color_modes as string[]) ?? [];
  }

  private _brightPct(): number {
    const b = this._st?.attributes.brightness;
    return b != null ? Math.round((Number(b) / 255) * 100) : 0;
  }

  private _rgb(): [number, number, number] | null {
    const c = this._st?.attributes.rgb_color as number[] | undefined;
    return c && c.length === 3 ? [c[0], c[1], c[2]] : null;
  }

  private _clickPct(e: MouseEvent): number {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    this.hass!.callService('light', 'toggle', { entity_id: this._config!.entity });
  }

  private _setBright(e: MouseEvent): void {
    const pct = Math.max(1, Math.round(this._clickPct(e) * 100));
    this.hass!.callService('light', 'turn_on', { entity_id: this._config!.entity, brightness_pct: pct });
  }

  private _setTemp(e: MouseEvent): void {
    const min = Number(this._st.attributes.min_color_temp_kelvin ?? 2000);
    const max = Number(this._st.attributes.max_color_temp_kelvin ?? 6500);
    const k = Math.round(min + this._clickPct(e) * (max - min));
    this.hass!.callService('light', 'turn_on', { entity_id: this._config!.entity, color_temp_kelvin: k });
  }

  private _setRgb(rgb: [number, number, number]): void {
    this.hass!.callService('light', 'turn_on', { entity_id: this._config!.entity, rgb_color: rgb });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._st) return placeholder('Select a light', 'lightbulb');
    const on = this._st.state === 'on';
    const modes = this._modes();
    const hasBright = on && modes.some((m) => ['brightness', 'color_temp', 'hs', 'rgb', 'rgbw', 'rgbww', 'xy', 'white'].includes(m));
    const hasTemp = on && modes.includes('color_temp');
    const hasRgb = on && modes.some((m) => ['hs', 'rgb', 'rgbw', 'rgbww', 'xy'].includes(m));
    const rgb = this._rgb();
    const pct = this._brightPct();
    const name = this._config.name ?? (this._st.attributes.friendly_name as string) ?? this._config.entity;

    const bulbColor = !on ? 'var(--g-faint)' : rgb ? `rgb(${rgb.join(',')})` : 'var(--g-amber)';
    const glow = on
      ? `radial-gradient(circle at 50% 45%, ${rgb ? `rgba(${rgb.join(',')},0.35)` : 'rgba(243,208,106,0.3)'} 0%, transparent 70%)`
      : 'transparent';

    return html`
      <div class="card">
        <div class="head">
          <div class="who"><div class="title">${name}</div><div class="sub">${this._config.subtitle ?? (on ? `${pct}%` : 'Off')}</div></div>
          <div class="toggle ${on ? 'on' : ''}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="glow-wrap">
          <div class="glow" style="background:${glow}"></div>
          <span class="ms bulb" style="font-size:64px;color:${bulbColor};opacity:${on ? Math.max(0.4, pct / 100) : 0.4}">${hasRgb ? 'wb_incandescent' : 'lightbulb'}</span>
          <div class="state">${on ? `${pct}%` : 'Off'}</div>
        </div>

        ${hasBright
          ? html`<div class="ctl">
              <div class="ctl-h"><span>${icon('brightness_6', 16, 'var(--g-dim)')}Brightness</span><span class="mono">${pct}%</span></div>
              <div class="slider" @click=${this._setBright}><div class="fill bright" style="width:${pct}%"></div></div>
            </div>`
          : nothing}

        ${hasTemp
          ? html`<div class="ctl">
              <div class="ctl-h"><span>${icon('thermostat', 16, 'var(--g-dim)')}Color temp</span></div>
              <div class="slider temp" @click=${this._setTemp}></div>
            </div>`
          : nothing}

        ${hasRgb
          ? html`<div class="swatches">
              ${SWATCHES.map((s) => html`<button class="sw" style="background:rgb(${s.join(',')})" @click=${() => this._setRgb(s)}></button>`)}
            </div>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 12px; }
      .who { flex: 1; min-width: 0; }
      .title { font-size: 16px; font-weight: 700; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .glow-wrap { height: 150px; border-radius: 18px; background: var(--g-panel); position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
      .glow { position: absolute; inset: 0; transition: background 0.25s; }
      .bulb { z-index: 1; transition: all 0.25s; }
      .state { position: absolute; bottom: 12px; left: 0; right: 0; text-align: center; font-family: var(--g-display); font-size: 14px; font-weight: 700; z-index: 1; }
      .ctl-h { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--g-dim); margin-bottom: 8px; }
      .ctl-h span { display: flex; align-items: center; gap: 6px; }
      .mono { font-family: var(--g-mono); }
      .slider { height: 40px; border-radius: 13px; background: var(--g-inset); position: relative; overflow: hidden; cursor: pointer; }
      .fill { position: absolute; top: 0; left: 0; bottom: 0; }
      .fill.bright { background: linear-gradient(90deg, var(--g-amber-deep), var(--g-amber)); }
      .slider.temp { background: linear-gradient(90deg, #f3d06a, #fff5e0, #bfe3ff); }
      .swatches { display: flex; justify-content: space-between; gap: 8px; }
      .sw { width: 34px; height: 34px; border-radius: 10px; border: 2px solid rgba(255, 255, 255, 0.1); cursor: pointer; padding: 0; }
      .sw:hover { border-color: #fff; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-light-card': GlassLightCard;
  }
}
