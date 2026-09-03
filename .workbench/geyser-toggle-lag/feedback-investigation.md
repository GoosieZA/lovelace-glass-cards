# Debug Investigation — geyser-toggle-lag

## Reported Issue
On the Glass Geyser card (`src/cards/geyser-card.ts`), when the user toggles the geyser on or off, it takes a noticeable while for the card to register and visually show the new state. The state change is slow to reflect in the UI.

---

## Investigation Process

### Plan artifacts reviewed
- No prior workbench artifacts exist for this task. Investigation started from scratch.

### Source files traced
1. `src/cards/geyser-card.ts` — primary subject
2. `src/cards/toggle-grid-card.ts` — comparison: simple toggle
3. `src/cards/tile-card.ts` — comparison: single-entity toggle
4. `src/cards/light-card.ts` — comparison: light toggle
5. `src/cards/pool-card.ts` — comparison: another card with a toggle switch
6. `src/theme/tokens.ts` — CSS base, shared toggle styles

### Commands run
- Grep on geyser-card.ts for `water_heater|toggle|_isOn|shouldUpdate` patterns
- Full file reads of all cards listed above

---

## Root Cause

There are **two compounding problems** that together cause the perceived lag. Neither one alone fully explains all cases; together they guarantee the delay.

---

### Problem 1 — No optimistic state (primary cause, all entity types)

**File:** `src/cards/geyser-card.ts`  
**Method:** `_toggle()` (line 71–76)  
**Method:** `render()` — derivation of `powerOn` (line 113)

```ts
// Line 71–76
private _toggle(id: string | undefined, e: Event): void {
  e.stopPropagation();
  if (!id) return;
  const domain = id.startsWith('water_heater.') ? 'water_heater' : 'homeassistant';
  this.hass!.callService(domain, 'toggle', { entity_id: id });
}
```

```ts
// Line 113 inside render()
const powerOn = this._isOn(c.power);
```

```ts
// Line 64–69 _isOn()
private _isOn(id?: string): boolean {
  if (!id) return false;
  const st = this.hass!.states[id];
  if (!st) return false;
  return st.state === 'on' || (id.startsWith('water_heater.') && st.state !== 'off');
}
```

`_toggle()` fires `callService()` and returns immediately. There is **no local `@state` property** that flips the toggle appearance. The `powerOn` value that drives `class="${powerOn ? 'on' : ''}"` on the toggle DOM element is read **entirely from `this.hass!.states[id]`** on every render.

The card therefore looks unchanged until:
1. HA processes the service call,
2. The state change propagates back via the WebSocket subscription to the Lovelace frontend,
3. HA sets the new `hass` object on the card,
4. `shouldUpdate` returns `true`,
5. `render()` is called and re-reads the now-updated state.

On a local network this round-trip is typically 500 ms–2 s. On a loaded instance or when HA is controlling a physical relay (water heater contactor), it can be several seconds.

**All other cards examined (`toggle-grid-card`, `tile-card`, `light-card`, `pool-card`) have the exact same architecture** — they also rely on the HA round-trip with no optimistic state. The geyser card is not uniquely broken in this respect. However it is more noticeable because:

- The geyser's visual state change is richer and more prominent (the status pill changes colour + label, the element glow changes, heat-rise bubbles appear/disappear, the icon colour changes) — so the lag is more obvious to the user.
- The `water_heater` domain adds a second compounding issue (see Problem 2 below).

---

### Problem 2 — `water_heater.toggle` does not exist; service call likely silently fails or uses a slow path (secondary cause, `water_heater.*` entities only)

**File:** `src/cards/geyser-card.ts`  
**Method:** `_toggle()` (line 71–76)

```ts
const domain = id.startsWith('water_heater.') ? 'water_heater' : 'homeassistant';
this.hass!.callService(domain, 'toggle', { entity_id: id });
```

The `water_heater` domain in Home Assistant **does not expose a `toggle` service**. The valid services are `water_heater.set_operation_mode` and `water_heater.turn_on` / `water_heater.turn_off` (available since HA 2024.x). Calling `water_heater.toggle` will either:

- **Fail silently** in HA (no matching service registration → the call is ignored), so the state never changes at all until the user tries again — this manifests as "very long lag" or "nothing happens".
- OR fall through to a platform-specific implementation that is slower or noisier.

Because `homeassistant.toggle` would be the correct generic fallback (the `homeassistant` domain's toggle delegates to the entity's own platform), replacing `water_heater` with `homeassistant` in the domain check fixes this path. However the most resilient fix is using `water_heater.turn_on` / `water_heater.turn_off` explicitly based on current state.

---

### Problem 3 — CSS `transition` on `.water` element (minor, visual masking)

**File:** `src/cards/geyser-card.ts`  
**Line ~196 in the `static styles` block:**

```css
.water { position: absolute; left: 0; right: 0; bottom: 0; transition: height 0.4s, background 0.4s; }
.element { position: absolute; left: 14px; right: 14px; bottom: 20px; height: 5px; border-radius: 5px; transition: all 0.3s; }
```

The water fill level transitions over 400 ms and the element glow transitions over 300 ms. This is not the cause of the lag (it is intentional animation), but it **visually extends** the perception of the delay: even after HA does return the new state, the "heating" indicators (element glow, bubble animation, colour gradient) fade in/out over ~300–400 ms, making the total perceived reaction time longer.

The `.toggle` CSS is inherited from `glassBase` (`tokens.ts` lines ~162–172):
```css
.toggle { transition: background 0.2s ease; }
.toggle .knob { transition: transform 0.2s ease; }
```
This 200 ms pill-slide is fast and is not a problem.

---

## Affected Files

| File | Lines | Issue |
|------|-------|-------|
| `src/cards/geyser-card.ts` | 71–76 | `_toggle()`: no optimistic state flip; wrong domain for `water_heater` |
| `src/cards/geyser-card.ts` | 49–61 | `shouldUpdate()`: correct, not the cause |
| `src/cards/geyser-card.ts` | 64–69 | `_isOn()`: reads live HA state only |
| `src/cards/geyser-card.ts` | 113 | `render()`: `powerOn` derived purely from `this.hass.states` |
| `src/cards/geyser-card.ts` | ~196 | `.water { transition: height 0.4s, background 0.4s }` — minor visual masking |

---

## Suggested Fix Direction

### Fix A — Optimistic state (resolves Problem 1 for all entity types)

Add a `@state() private _optimisticOn: boolean | null = null` property.

In `_toggle()`, immediately set `this._optimisticOn = !this._isOn(id)` before calling `callService`. This triggers a synchronous Lit re-render — the toggle flips instantly.

In `render()`, derive `powerOn` as:
```ts
const powerOn = this._optimisticOn !== null ? this._optimisticOn : this._isOn(c.power);
```

In `updated()` (or on next `hass` change that confirms the new state), clear `_optimisticOn` back to `null` so HA's confirmed state takes over and reconciles.

A safety timeout (e.g., 5 s) should also reset `_optimisticOn` in case the service call fails, to avoid the UI being permanently stuck in the wrong visual state.

### Fix B — Correct service for `water_heater` entities (resolves Problem 2)

Replace `water_heater.toggle` with the correct HA services:
```ts
if (id.startsWith('water_heater.')) {
  const newMode = this._isOn(id) ? 'off' : 'eco'; // or the entity's first supported mode
  this.hass!.callService('water_heater', 'set_operation_mode', { entity_id: id, operation_mode: newMode });
} else {
  this.hass!.callService('homeassistant', 'toggle', { entity_id: id });
}
```
This ensures the service call actually lands on the device and does not silently fail.

### Fix C — (Optional) Reduce CSS transition duration on element/water when toggling off (resolves Problem 3)

Make the `.water` and `.element` CSS transitions conditional on a class (e.g., `.animating`) that is only present when temperature is changing, not on power state changes. Or simply reduce the `transition: height 0.4s` to `0.2s` to shorten the visual tail.

**Recommended priority: Fix B first (correctness), then Fix A (perceived responsiveness).**
