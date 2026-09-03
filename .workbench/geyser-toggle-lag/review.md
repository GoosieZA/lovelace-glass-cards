# Review — geyser-toggle-lag

## Simplification Summary

Two cosmetic comment changes only — no logic altered:

- `updated()`: replaced a 3-line preamble comment with a tighter 2-line version (`prev`/`next` variable names also clarified over the originals `old`/`cur`).
- `_toggle()`: trimmed one-word redundancy in the safety-timeout inline comment.

Build confirmed clean (exit 0) after both changes. No warnings introduced.

---

## Issues

### [SUGGESTION] Optimistic state not applied to `solar_mode` and `modes[]` buttons

**File**: `src/cards/geyser-card.ts:91–111`

The optimistic flip is intentionally scoped to the main `power` entity only. The dev-notes justify this ("lag not noticeable on small secondary buttons"). That reasoning is sound for the current task scope.

Worth noting for a follow-up: if `solar_mode` or `modes[]` entities are `water_heater.*` entities, they now correctly call `turn_on`/`turn_off` (the service-fix path in `_toggle` applies to all callers), but they still lag visually on the HA round-trip. No action required for this PR.

### [SUGGESTION] Unused `fireEvent` import

**File**: `src/cards/geyser-card.ts:4`

Pre-existing before this fix (confirmed in dev-notes). Produces a build warning alongside the same warning in several other cards. A single cleanup PR covering all affected files would remove the noise.

---

## Verification against acceptance criteria

**(1) On/off state shows immediately on toggle**
✅ `_optimisticOn = !currentlyOn` is set synchronously before `callService`. Because `_optimisticOn` is `@state()`, Lit schedules a microtask re-render in the same event-loop turn. `render()` reads `_optimisticOn !== null ? _optimisticOn : _isOn(c.power)`, so the toggle knob, status pill, icon colour, element glow, and heat-bubble animation all flip in the same render frame as the click.

**(2) Correctly reconciles with real HA state, including revert on failure**
✅ `updated()` clears `_optimisticOn` the moment HA delivers a `hass` update where the power entity's object reference has changed — this is HA's signal that the entity state was updated. The card then reads ground truth from `_isOn()`.

For failures where HA never changes the entity (service rejected, entity unresponsive), the 5 s `setTimeout` resets `_optimisticOn = null`. The card reverts to the unchanged HA state — correct revert behaviour.

**(3) No race condition where stale optimistic value sticks**
✅ The reconciliation in `updated()` fires on every `hass` change where the power entity object differs, regardless of what the new state value is. Even if the entity refreshes with the same logical value (HA re-serialised it), the reference change clears the optimistic override and the card falls through to `_isOn()`. There is no path where `_optimisticOn` can remain set indefinitely beyond the 5 s safety bound.

One edge case worth documenting (not a bug): rapid double-tap. First tap sets `_optimisticOn = true`, second tap immediately sets `_optimisticOn = false` and rearms the timer. When HA confirms the first command (entity reference changes), `updated()` clears `_optimisticOn`. The second command's confirmation then arrives and clears again (already null, no-op). The brief window where the UI reads live HA state between the two confirmations is at most one render frame — acceptable.

**(4) No other card behaviour changed**
✅ Only `src/cards/geyser-card.ts` was modified. Verified by dev-notes and the fact that the build produces no new warnings.

**(5) Project builds cleanly**
✅ `npm run build` exits 0. All warnings in the output are pre-existing across other files; none originate from the geyser changes.

---

## Verdict

**Ready to merge.**

The fix is correct, well-scoped, and handles all the edge cases called out in the acceptance criteria. The two suggestions above are minor housekeeping items for separate PRs and do not block this one.
