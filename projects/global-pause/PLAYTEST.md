# Playtest Guide — Feedback-to-Mechanics Mapping

How to connect player feedback to specific knobs in the engine. Organized by what the player might *say*, not by what the engine does.

---

## "The game is too hard" / "I always lose"

**Which loss condition?** This is the most important diagnostic question.

### Losing to ASI (algorithmic progress hits 100)

The player can't keep algorithmic progress in check. Levers:

| Knob | Where | Current (Normal) | Effect of lowering |
|------|-------|-----------------|-------------------|
| `algorithmicProgressRate` | difficulties.ts | 0.08/week | Directly slows the clock. Most impactful knob. |
| Catastrophe effects (algorithmic) | state.ts `getDefaultCatastropheEffects` | +5 to +15 | Reduces punishment for missed events |
| `eventFrequency` | difficulties.ts | 0.8 | Fewer events = fewer potential catastrophes |
| Event `urgencyWeeks` | events.ts per template | 3-10 | Longer timers = more time to respond |

**Common pattern:** Player ignores events because they're overwhelmed, catastrophes spike progress, game ends. Fix: lower event frequency OR increase urgency windows so events don't expire while unresolved ones are queued.

### Losing to treaty collapse (3+ regions < 15 cooperation)

Regional cooperation is eroding. Levers:

| Knob | Where | Current (Normal) | Effect |
|------|-------|-----------------|--------|
| Starting cooperation | difficulties.ts | 65 | Higher start = more runway |
| Catastrophe cooperation effects | state.ts | -5 to -30 | Reduce to slow erosion |
| Region selection weights | events.ts `pickRegion` | `max(1, 100 - coop)` | Flatten weighting to reduce death spiral |
| Cooperation loss on response failure | events.ts per response | -3 to -20 | Reduce to make failed attempts less punishing |

**Common pattern:** One region spirals — gets hit repeatedly, cooperation drops, attracts more events. Fix: dampen the inverse-cooperation weighting (e.g., `max(10, 80 - coop)` instead of `max(1, 100 - coop)`) or add passive cooperation recovery.

### Losing to public revolt (support hits 0)

Global support decays faster than the player can rebuild it. Levers:

| Knob | Where | Current (Normal) | Effect |
|------|-------|-----------------|--------|
| `globalSupportDecay` | difficulties.ts | 0.12/week | Most direct lever |
| Starting support | state.ts | 70 (hardcoded) | Higher start = more runway |
| Support gains from successful responses | events.ts per response | +2 to +12 | Increase to reward good play |
| Public backlash weight modifier | events.ts | 1.8× when support < 50 | Lower to reduce death spiral |

**Common pattern:** Player doesn't prioritize support-affecting events (political pressure, public backlash), support silently erodes, then cascading backlash events finish it off. Fix: reduce decay rate OR make support more visible/alarming before it's critical.

---

## "The game is too easy" / "I won without trying"

**Probable cause:** Safety research is progressing too fast relative to threats.

| Knob | Where | Current (Normal) | Effect of lowering |
|------|-------|-----------------|-------------------|
| `safetyResearchBaseRate` | difficulties.ts | 0.08/week | Directly slows win path |
| Safety milestone event weight | events.ts | base 4, 1.5× when >30% | Reduce frequency of bonus progress |
| Safety milestone event effects | events.ts | +3 to +5 | Reduce bonus per event |
| `algorithmicProgressRate` | difficulties.ts | 0.08/week | Raising this increases pressure |

**Common pattern:** Player handles events routinely, funds safety at level 2-3, never feels threatened. Fix: increase algorithmic progress rate (makes the race tighter) or reduce safety base rate (forces reliance on events).

---

## "The game feels unfair" / "I got screwed by RNG"

Multiple possible causes:

### "I made the right choice and it failed"

Success probability is visible but outcomes are random. A 70% success can fail 3 times in a row (~2.7% chance, but feels terrible).

**Levers:**
- Raise base success probabilities across the board
- Reduce the penalty for failure effects (so failing isn't catastrophic)
- Add a "bad luck protection" mechanism (e.g., +5% cumulative boost per consecutive failure)
- Currently not implemented: could add `failStreak` counter to state

### "Events spawned in my weakest region repeatedly"

Region selection is weighted by inverse cooperation. This is by design (weak regions attract problems), but feels like bullying.

**Levers:**
- Flatten region selection weights (see treaty collapse section above)
- Add a "cooldown" so the same region can't be targeted twice in a row
- Currently not implemented: would need per-region cooldown tracking

### "I didn't have enough PC to respond to anything"

PC starvation cascade: funding drains PC, event comes, can't afford response, catastrophe, lose more PC.

**Levers:**
- Increase `politicalCapitalRegen`
- Lower funding PC cost (`fundingLevel × 0.5` — reduce the multiplier)
- Lower event response costs across the board
- Add a "minimum PC floor" (e.g., never drop below 5)
- Make some events cost 0 PC to respond to (currently cheapest is 5)

---

## "The game is boring" / "Nothing is happening"

### "I'm just waiting for events"

The game has quiet periods (especially early game, or when luck produces several 0-event weeks in a row via Poisson variance).

**Levers:**
- Increase `eventFrequency` (more events per week)
- Increase minimum event count (e.g., guarantee at least 1 event every 3 weeks)
- Start the game unpaused at 2x speed instead of paused
- Reduce Poisson variance by using a different distribution

### "All events feel the same"

Template pool (15 templates) may be too small for long games. Players see the same headlines.

**Levers:**
- Add more event templates (target: 25-30)
- Add headline variants per template
- Add region-specific flavor text

### "My choices don't seem to matter"

If success/failure effects are too small, or if the player can't perceive the impact.

**Levers:**
- Increase success effect magnitudes (currently +3 to +12)
- Add visual feedback for state changes (cooperation color shift, support number flash)
- Show "what happened" after each response (outcome + effects)

---

## "The game is too fast" / "I can't keep up"

**Levers:**
- Default to a slower starting speed (currently starts paused)
- Auto-pause on new event (not just on modal open)
- Increase event urgency windows (more weeks before catastrophe)
- Reduce event frequency

**Note:** If this feedback comes from mobile players specifically, the issue may be touch target size or modal opening speed rather than game speed.

---

## "The game is too slow" / "I want it to go faster"

**Levers:**
- Add a 8x speed option (125ms interval)
- Auto-pop all poppable events at high speed
- Skip animation delays
- Increase the pop-able threshold (from 5 PC to 8-10 PC, so more events auto-resolve)

---

## "I don't understand what's happening" / "The numbers are confusing"

**Levers:**
- Reduce visible numbers (current status overlay shows 4 values)
- Replace numbers with visual indicators (cooperation as map color already does this)
- Add a brief tutorial overlay on first game
- Show tooltips on first occurrence of each event type

**Note:** The target audience (people who don't appreciate x-risk) likely has low tolerance for complexity. If this feedback is common, the game needs to communicate state through feel and visuals rather than numbers.

---

## "I keep losing to the same thing"

Map which loss condition is most common. Expected distribution:

- **Tutorial:** Should almost always win. If losing, the Tutorial rates are wrong.
- **Normal:** Should be ~50-50 win/loss for engaged players. Most losses should be ASI (the "clock ran out" feeling). Treaty collapse and public revolt should be rare.
- **Realistic:** Should be ~10-20% winnable. Multiple loss conditions should feel plausible. This difficulty communicates "the problem might actually be unsolvable."

If the distribution doesn't match:
- Too many ASI losses → `algorithmicProgressRate` too high or safety rate too low
- Too many treaty losses → catastrophe cooperation effects too harsh or region targeting too punishing
- Too many support losses → `globalSupportDecay` too high or support recovery opportunities too rare
- Never losing to treaty/support → those systems are too lenient, reduce starting values or increase decay

---

## Specific Mechanics and Their Feel

### Funding allocation (0-3 slider)

**What it should feel like:** A constant dilemma. "I need this PC for events but I also need to fund safety."

**If it feels like a set-and-forget:** The funding PC cost (0.5 × level) is too cheap relative to regen. Increase cost or reduce regen.

**If it feels like funding is never worth it:** Safety base rate is too low. The player can't see the benefit of funding because progress is glacial. Increase base rate or show projected completion date.

### Inspector deployment

**What it should feel like:** Strategic positioning. "Where do I expect trouble next?"

**If inspectors feel useless:** The +10% success probability and +15 intel are too small to notice. Increase to +20% and +25.

**If inspectors feel mandatory:** Every response requiring an inspector forces a specific play pattern. Reduce the number of inspector-requiring responses, or make non-inspector responses viable alternatives.

### Pop-able bubbles

**What it should feel like:** Satisfying routine maintenance. Pop pop pop while watching for the big decision bubbles.

**If popping feels meaningless:** The auto-resolved responses have too-low success probability. The player pops but nothing good happens.

**If everything is poppable:** The 5 PC threshold is too generous. Raise it to 3, or make urgency the only criterion.

**If nothing is poppable:** The threshold is too strict. Lower to 8, or add more low-cost response options to event templates.

### News ticker

**What it should feel like:** Atmospheric background noise that occasionally alerts you to events.

**If it's ignored completely:** It's not providing useful information. Consider making it flash/highlight when red-urgency events appear.

**If it's the primary info source:** The map bubbles aren't doing their job. Make bubbles more visually prominent.

### Safety progress racing bar

**What it should feel like:** The scoreboard. Glancing at it should tell you "am I winning or losing?"

**If players don't understand it:** The dual-bar (green from left, red from right) is unclear. Consider separate bars, or a single bar that shows net position.

---

## Balance Simulation Cheatsheet

For back-of-envelope tuning without playtesting. All figures are Normal difficulty, max funding, no events.

| Week | Safety | ASI | Support | Notes |
|------|--------|-----|---------|-------|
| 0 | 0% | 0% | 70 | Game start |
| 52 (1yr) | 4.2% | 4.2% | 63.8 | Neck and neck |
| 104 (2yr) | 8.3% | 8.3% | 57.5 | Support eroding |
| 260 (5yr) | 20.8% | 20.8% | 38.8 | Support getting low |
| 389 | 31.1% | 31.1% | 23.3 | |
| 520 (10yr) | 41.6% | 41.6% | 7.6 | Support nearly dead |
| 583 | 46.6% | 46.6% | 0.0 | **Support loss (passive only)** |
| 833 | 66.6% | 66.6% | — | (would be dead already) |
| 1040 (20yr) | 83.2% | 83.2% | — | **Time runs out** |

**Key takeaway:** In a no-events vacuum, Normal is a perfect tie at 83% each — but support kills the player at week 583 first. Events break this symmetry: successful responses slow ASI and boost support, catastrophes accelerate ASI and erode support. The game is decided by event handling quality.

**For Realistic** (same format, no events):

| Week | Safety | ASI | Support | Notes |
|------|--------|-----|---------|-------|
| 0 | 0% | 0% | 70 | |
| 260 (5yr) | 15.6% | 31.2% | 23.2 | ASI pulling ahead |
| 389 | 23.3% | 46.7% | 0.0 | **Support loss** |
| 520 | 31.2% | 62.4% | — | |
| 833 | 50.0% | 100% | — | **ASI loss** |

Realistic is structurally harder: ASI progresses 2× faster than safety. Even with perfect event handling, the player needs the safety milestone events to close the gap. This communicates the thesis: "the problem might be unsolvable."
