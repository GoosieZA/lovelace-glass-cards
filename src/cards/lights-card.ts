import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface LightGroup {
  name?: string;
  icon?: string;
  entities: string[];
}

interface GlassLightsCardConfig extends LovelaceCardConfig {
  title?: string;
  entities?: string[];
  groups?: LightGroup[];
}

@customElement('glass-lights-card')
export class GlassLightsCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassLightsCardConfig;
  private _groups: LightGroup[] = [];

  public setConfig(config: GlassLightsCardConfig): void {
    if (config.groups?.length) this._groups = config.groups;
    else if (config.entities?.length) this._groups = [{ entities: config.entities }];
    else this._groups = [];
    this._config = { title: 'Lights', ...config };
  }

  public getCardSize(): number {
    return 1 + this._groups.reduce((n, g) => n + Math.ceil(g.entities.length / 3), 0);
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassLightsCardConfig, 'type'> {
    return { title: 'Lights', entities: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    return this._all().some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _all(): string[] {
    return this._groups.flatMap((g) => g.entities);
  }

  private _isOn(id: string): boolean {
    return this.hass!.states[id]?.state === 'on';
  }

  private _toggle(id: string, e: Event): void {
    e.stopPropagation();
    this.hass!.callService('homeassistant', 'toggle', { entity_id: id });
  }

  private _master(g: LightGroup, e: Event): void {
    e.stopPropagation();
    const anyOn = g.entities.some((id) => this._isOn(id));
    this.hass!.callService('light', anyOn ? 'turn_off' : 'turn_on', { entity_id: g.entities });
  }

  private _name(id: string): string {
    return (this.hass!.states[id]?.attributes.friendly_name as string) ?? id;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._all().length) return placeholder('Add lights', 'lightbulb');
    const totalOn = this._all().filter((id) => this._isOn(id)).length;

    return html`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${icon('lightbulb', 22, 'var(--g-amber)')}<span class="title">${this._config.title}</span></div>
          <div class="meta"><span class="on-n">${totalOn}</span> on</div>
        </div>
        ${this._groups.map((g) => {
          const onCount = g.entities.filter((id) => this._isOn(id)).length;
          const anyOn = onCount > 0;
          return html`
            <div class="group">
              ${g.name
                ? html`<div class="g-hdr">
                    ${icon(g.icon ?? 'home', 18, 'var(--g-dim)')}
                    <span class="g-name">${g.name}</span>
                    <span class="g-sum">${onCount}/${g.entities.length}</span>
                    <div class="grow"></div>
                    <div class="toggle ${anyOn ? 'on' : ''}" @click=${(e: Event) => this._master(g, e)}><div class="knob"></div></div>
                  </div>`
                : nothing}
              <div class="tiles">
                ${g.entities.map((id) => {
                  const on = this._isOn(id);
                  const st = this.hass!.states[id];
                  const bri = on && st?.attributes.brightness != null ? `${Math.round((Number(st.attributes.brightness) / 255) * 100)}%` : on ? 'On' : 'Off';
                  return html`
                    <button class="lt ${on ? 'on' : ''}" @click=${(e: Event) => this._toggle(id, e)}>
                      <div class="lt-top">
                        ${icon('lightbulb', 20, on ? 'var(--g-amber-ink)' : 'var(--g-dim)')}
                        <div class="mini ${on ? 'on' : ''}"><div class="mknob"></div></div>
                      </div>
                      <div class="lt-b"><div class="ln">${this._name(id)}</div><div class="ls">${bri}</div></div>
                    </button>
                  `;
                })}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 16px; }
      .on-n { color: var(--g-amber); font-weight: 700; }
      .group { display: flex; flex-direction: column; gap: 10px; }
      .g-hdr { display: flex; align-items: center; gap: 10px; }
      .g-name { font-size: 14px; font-weight: 700; color: var(--g-text); }
      .g-sum { font-size: 12px; color: var(--g-faint); }
      .grow { flex: 1; }
      .tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      .lt {
        display: flex; flex-direction: column; justify-content: space-between; gap: 10px;
        min-height: 78px; min-width: 0; overflow: hidden; padding: 12px 13px; border-radius: 16px; cursor: pointer; text-align: left;
        background: var(--g-inset); color: var(--g-text-hi); border: 1px solid var(--g-hair);
        transition: background 0.18s ease, color 0.18s ease;
      }
      .ln { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .lt.on { background: var(--g-amber); color: var(--g-amber-ink); border-color: transparent; }
      .lt-top { display: flex; align-items: flex-start; justify-content: space-between; }
      .ln { font-size: 13.5px; font-weight: 700; line-height: 1.15; }
      .ls { font-size: 11.5px; margin-top: 2px; opacity: 0.75; }
      /* mini toggle inside a light tile */
      .mini { width: 34px; height: 20px; border-radius: 20px; background: rgba(255, 255, 255, 0.13); position: relative; flex: none; }
      .mini.on { background: rgba(0, 0, 0, 0.22); }
      .mknob { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #c7ccd3; transition: transform 0.18s; }
      .mini.on .mknob { transform: translateX(14px); background: var(--g-amber-ink); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-lights-card': GlassLightsCard;
  }
}
