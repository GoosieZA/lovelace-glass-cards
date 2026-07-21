import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassRoomCardConfig extends LovelaceCardConfig {
  name: string;
  icon?: string;
  color?: 'amber' | 'cyan' | 'purple' | 'green' | 'red';
  lights?: string[]; // light.* — master toggle switches them all
  temp?: string; // sensor.*
  humidity?: string; // sensor.*
  devices?: string; // numeric sensor OR any entity (count of lights used as fallback)
}

const ACCENTS: Record<string, string> = {
  amber: 'var(--g-amber)',
  cyan: 'var(--g-cyan)',
  purple: 'var(--g-purple)',
  green: 'var(--g-green)',
  red: 'var(--g-red-text)',
};

@customElement('glass-room-card')
export class GlassRoomCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassRoomCardConfig;

  public setConfig(config: GlassRoomCardConfig): void {
    this._config = { name: 'Room', ...config };
  }

  public getCardSize(): number {
    return 2;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassRoomCardConfig, 'type'> {
    return { name: 'Living Room', icon: 'weekend', color: 'amber', lights: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const c = this._config;
    const ids = [...(c.lights ?? []), c.temp, c.humidity, c.devices].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _num(id?: string): string {
    if (!id) return '—';
    const st = this.hass?.states[id];
    if (!st) return '—';
    const n = Number(st.state);
    return Number.isNaN(n) ? '—' : String(Math.round(n * 10) / 10);
  }

  private _lightsOn(): string[] {
    return (this._config?.lights ?? []).filter((id) => this.hass?.states[id]?.state === 'on');
  }

  private _toggle = (ev: Event): void => {
    ev.stopPropagation();
    const lights = this._config?.lights ?? [];
    if (!lights.length || !this.hass) return;
    const anyOn = this._lightsOn().length > 0;
    this.hass.callService('light', anyOn ? 'turn_off' : 'turn_on', { entity_id: lights });
  };

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._config.name && !(this._config.lights?.length || this._config.temp)) {
      return placeholder('Configure this room', 'meeting_room');
    }

    const accent = ACCENTS[this._config.color ?? 'amber'] ?? 'var(--g-amber)';
    const lights = this._config.lights ?? [];
    const onCount = this._lightsOn().length;
    const on = onCount > 0;

    const statusLabel = lights.length
      ? on
        ? `${onCount} of ${lights.length} lights on`
        : 'All off'
      : 'No lights';

    // Devices: numeric sensor if given, else the count of light entities.
    let devices = '—';
    if (this._config.devices) {
      const dv = this._num(this._config.devices);
      devices = dv !== '—' ? dv : String(this.hass.states[this._config.devices] ? 1 : 0);
    } else if (lights.length) {
      devices = String(lights.length);
    }

    return html`
      <div class="card ${on ? 'on' : ''}" style="--accent:${accent}">
        <div class="head">
          <div class="well">${icon(this._config.icon ?? 'meeting_room', 28, on ? 'var(--accent)' : 'var(--g-dim)')}</div>
          <div class="who">
            <div class="name">${this._config.name}</div>
            <div class="status" style="color:${on ? accent : 'var(--g-dim)'}">${statusLabel}</div>
          </div>
          ${lights.length
            ? html`<div class="track ${on ? 'on' : ''}" @click=${this._toggle} role="switch" aria-checked=${on}>
                <div class="knob"></div>
              </div>`
            : nothing}
        </div>

        <div class="tiles">
          <div class="tile">
            <div class="tile-h">${icon('device_thermostat', 15, 'var(--g-amber)')}Temp</div>
            <div class="tile-v">${this._num(this._config.temp)}°</div>
          </div>
          <div class="tile">
            <div class="tile-h">${icon('water_drop', 15, 'var(--g-cyan)')}Humid</div>
            <div class="tile-v">${this._num(this._config.humidity)}%</div>
          </div>
          <div class="tile">
            <div class="tile-h">${icon('devices_other', 15, 'var(--g-purple)')}Devices</div>
            <div class="tile-v">${devices}</div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 16px; transition: background 0.2s ease, border-color 0.2s ease; }
      .card.on { background: color-mix(in srgb, var(--accent) 8%, var(--g-card)); border-color: color-mix(in srgb, var(--accent) 33%, transparent); }
      .head { display: flex; align-items: center; gap: 14px; }
      .well { width: 52px; height: 52px; border-radius: 15px; background: var(--g-inset); display: flex; align-items: center; justify-content: center; flex: 0 0 auto; transition: background 0.2s ease; }
      .card.on .well { background: color-mix(in srgb, var(--accent) 14%, var(--g-inset)); }
      .who { flex: 1; min-width: 0; }
      .name { font-size: 17px; font-weight: 700; }
      .status { font-size: 12px; font-weight: 600; margin-top: 1px; }
      .track { width: 52px; height: 30px; border-radius: 30px; background: rgba(255, 255, 255, 0.13); position: relative; cursor: pointer; flex: 0 0 auto; transition: background 0.18s ease; }
      .track.on { background: var(--accent); }
      .track .knob { position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 50%; background: #c7ccd3; transition: transform 0.18s ease, background 0.18s ease; }
      .track.on .knob { transform: translateX(22px); background: #0a0c0f; }
      .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .tile { background: var(--g-inset); border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 5px; }
      .tile-h { display: flex; align-items: center; gap: 5px; color: var(--g-dim); font-size: 10.5px; }
      .tile-v { font-family: var(--g-display); font-size: 17px; font-weight: 600; line-height: 1; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-room-card': GlassRoomCard;
  }
}
