## Developer Notes — geyser-card toggle-lag fix

### Files Created
- none

### Files Modified
- `src/cards/geyser-card.ts` — three targeted changes (see below)

### Changes (file, method, lines)

**1. New class fields (lines ~36–38)**
```ts
@state() private _optimisticOn: boolean | null = null;
private _optimisticTimer: ReturnType<typeof setTimeout> | null = null;
```
`_optimisticOn` is a Lit reactive property (`@state`) so setting it triggers a synchronous re-render with no round-trip. `null` = use live HA state; `true`/`false` = override until HA confirms.

**2. New `updated()` lifecycle hook (added after `shouldUpdate`, lines ~68–83)**
Clears `_optimisticOn` (and cancels the safety timeout) as soon as HA delivers a `hass` update where the power entity's state has changed. This is the reconciliation step — the card reverts to HA ground truth the moment the round-trip completes.

**3. `_toggle()` rewritten (lines ~88–111)**
Two fixes in one method:
- **Optimistic flip**: before calling `callService`, sets `_optimisticOn = !currentlyOn` for the main power entity only, then arms a 5 s safety `setTimeout` that resets `_optimisticOn = null` if HA never confirms (guards against silent service failure).
- **Correct water_heater service**: replaced `water_heater.toggle` (which does not exist in HA and silently fails) with explicit `water_heater.turn_on` / `water_heater.turn_off` conditioned on `currentlyOn`. Non-water-heater entities continue to use `homeassistant.toggle` (unchanged).

**4. `render()` — `powerOn` derivation (line ~160)**
```ts
// before
const powerOn = this._isOn(c.power);
// after
const powerOn = this._optimisticOn !== null ? this._optimisticOn : this._isOn(c.power);
```
All visual state driven by `powerOn` (pill colour/label, icon colour, element glow, heat-bubble animation, toggle knob position) flips in the same synchronous render frame as the user's click.

### Key Decisions

- **Only the main `power` entity gets optimistic state.** Mode buttons (`solar_mode`, `modes[]`) still use the HA round-trip. The main power toggle is the rich visual change (6 simultaneous UI elements); the others are small secondary buttons where lag is not noticeable.
- **No new pattern introduced.** The optimistic `@state` + `updated()` reconciliation approach is self-contained inside the card class. Sibling cards don't have this yet — they could adopt it in future, but the task scope was geyser-only.
- **5 s safety timeout** chosen to match the investigation recommendation. Covers slow HA instances and physical relay latency. On typical local HA the round-trip is under 2 s so the timeout is never reached in the happy path.
- **CSS transitions not changed.** The `.water` (0.4s) and `.element` (0.3s) transitions are intentional tank-fill animations, not toggle indicators. Reducing them would degrade the tank visualisation. The optimistic state change means the toggle, pill, icon, glow and bubbles all flip instantly — which is the high-value visual feedback. The water fill level is a temperature indicator, not a power indicator, so its slow transition is correct.

### Library Docs Consulted (Context7)
none — Lit `@state`, `updated(PropertyValues)`, and `ReturnType<typeof setTimeout>` are stable, well-known APIs verified from prior knowledge.

### Build & Test Results
```
> lovelace-glass-cards@0.1.0 build
> rollup -c

src/glass-cards.ts → dist/glass-cards.js...
[pre-existing warnings in other files — none new]
created dist/glass-cards.js in 700ms

exit_status: 0
```
No new TypeScript errors introduced. All warnings in the output (unused `fireEvent` imports, duplicate object keys, etc.) were pre-existing across other files.

### Open Issues
- `fireEvent` is imported in `geyser-card.ts` but never used — this was pre-existing before this fix and is not introduced by these changes. A separate cleanup PR could remove it.
- Sibling cards (pool-card, tile-card, toggle-grid-card, light-card) have the same no-optimistic-state architecture and could benefit from the same pattern, but that is out of scope for this bug fix.
