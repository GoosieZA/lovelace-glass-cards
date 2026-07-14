import { LitElement, html, css, nothing, svg, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

interface GlassPoolCardConfig extends LovelaceCardConfig {
  name?: string;
  subtitle?: string;
  switch?: string; // switch / input_boolean
  energy?: string; // energy sensor (kWh)
  color?: 'green' | 'amber' | 'cyan' | 'purple' | 'red'; // accent when running
}

const ACCENTS: Record<string, string> = {
  green: 'var(--g-green)',
  amber: 'var(--g-amber)',
  cyan: 'var(--g-cyan)',
  purple: 'var(--g-purple)',
  red: 'var(--g-red-text)',
};

@customElement('glass-pool-card')
export class GlassPoolCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassPoolCardConfig;

  public setConfig(config: GlassPoolCardConfig): void {
    this._config = { name: 'Pool Pump', subtitle: 'Backyard', ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassPoolCardConfig, 'type'> {
    return { name: 'Pool Pump', subtitle: 'Backyard', switch: '', energy: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return [this._config.switch, this._config.energy].filter(Boolean).some((id) => old.states[id as string] !== this.hass!.states[id as string]);
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    if (this._config!.switch) this.hass!.callService('homeassistant', 'toggle', { entity_id: this._config!.switch });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const sw = c.switch ? this.hass.states[c.switch] : undefined;
    const unavailable = !sw || sw.state === 'unavailable';
    const on = sw?.state === 'on';
    const onColor = ACCENTS[c.color ?? 'green'] ?? 'var(--g-green)';
    const accent = unavailable ? 'var(--g-dim)' : on ? onColor : 'var(--g-amber)';
    const stateLabel = unavailable ? 'Unavailable' : on ? 'Running' : 'Idle';

    const energySt = c.energy ? this.hass.states[c.energy] : undefined;
    const energyVal = energySt && !Number.isNaN(Number(energySt.state)) ? Number(energySt.state).toFixed(1) : '—';
    const energyUnit = (energySt?.attributes.unit_of_measurement as string) ?? 'kWh';

    const spin = on ? 'animation:g-spin 1.1s linear infinite;transform-origin:48px 48px;' : '';
    const water = on ? 'animation:g-spin 6s linear infinite;transform-origin:48px 48px;' : '';

    return html`
      <div class="card" style="border-color:${on ? `color-mix(in srgb, ${onColor} 30%, transparent)` : 'var(--g-hair)'}">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${accent} 14%, transparent)">${icon('pool', 26, accent)}</div>
          <div class="who">
            <div class="title">${c.name}${on ? html` <span class="live">LIVE</span>` : nothing}</div>
            <div class="sub">${c.subtitle}</div>
          </div>
          <span class="pill" style="color:${accent}"><span class="dot" style="background:${accent}"></span>${stateLabel}</span>
        </div>

        <div class="body">
          <div class="impeller">
            <svg viewBox="0 0 96 96" width="96" height="96">
              ${svg`
                <circle cx="48" cy="48" r="43" fill="var(--g-panel)" stroke="${on ? `color-mix(in srgb, ${accent} 45%, transparent)` : 'rgba(255,255,255,0.1)'}" stroke-width="2"></circle>
                <g fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 10" style="${water}">
                  <path d="M48 8 A 40 40 0 0 1 88 48"></path>
                  <path d="M48 88 A 40 40 0 0 1 8 48"></path>
                </g>
                <g fill="none" stroke="${accent}" stroke-width="4.5" stroke-linecap="round" style="${spin}">
                  <path d="M48 30 A 20 20 0 0 1 66 41"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(60 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(120 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(180 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(240 48 48)"></path>
                  <path d="M48 30 A 20 20 0 0 1 66 41" transform="rotate(300 48 48)"></path>
                </g>
                <circle cx="48" cy="48" r="8" fill="${accent}"></circle>
                <circle cx="48" cy="48" r="3" fill="var(--g-panel)"></circle>
              `}
            </svg>
          </div>

          <div class="right">
            <div class="sw">
              <div>
                <div class="sw-n">${(sw?.attributes.friendly_name as string) ?? 'Switch'}</div>
                <div class="sw-s">${c.subtitle}</div>
              </div>
              <div class="toggle ${on ? 'on' : ''}" @click=${this._toggle}><div class="knob"></div></div>
            </div>
            <div class="hair"></div>
            <div class="energy" @click=${() => c.energy && fireEvent(this, 'hass-more-info', { entityId: c.energy })}>
              ${icon('bolt', 22, 'var(--g-amber)')}
              <div>
                <div class="t-num ev">${energyVal} <span class="eu">${energyUnit}</span></div>
                <div class="ec">Total energy used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-spin { to { transform: rotate(360deg); } }
      .card { display: flex; flex-direction: column; gap: 20px; border: 1px solid var(--g-hair); }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .title { display: flex; align-items: center; gap: 8px; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .body { display: flex; align-items: center; gap: 22px; }
      .impeller { width: 96px; height: 96px; flex: none; }
      .right { flex: 1; display: flex; flex-direction: column; gap: 14px; }
      .sw { display: flex; align-items: center; justify-content: space-between; }
      .sw-n { font-size: 14px; font-weight: 700; }
      .sw-s { font-size: 11.5px; color: var(--g-dim); }
      .hair { height: 1px; background: var(--g-hair); }
      .energy { display: flex; align-items: center; gap: 11px; cursor: pointer; }
      .ev { font-size: 22px; }
      .eu { font-size: 13px; color: var(--g-dim); }
      .ec { font-size: 11px; color: var(--g-dim); margin-top: 2px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-pool-card': GlassPoolCard;
  }
}
