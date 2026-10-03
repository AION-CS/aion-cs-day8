# Day 8 · Route 2 redesign (agreed 2026-10-03, built the same day)

Status: **built on 2026-10-03** (the user said "gas" after the discussion). The rule that governs it is `../CLAUDE.md` #47. The decisions below were taken in
the chat; the "Open interpretations" at the end were settled as written in the README's "Route 2 redesign" section.

## Why

- The two Core blocks (3.5, 3.6) asked for 15–20 fields: per funded item a start month, an owner and a trigger (20 characters and a number), then
  what is left out, a pickup point, three assumptions, a four-part tripwire and the board's challenge. Learners did not finish.
- Several of those fields (owner, trigger, pickup, assumptions, tripwire, board challenge) are not asked for by the plan's Day 8 column.
- The learner never *saw* what their decision does. A training task should show the consequence of a decision while it is being made.

## What the plan (Strukturplan, Day 8, Level 3) asks for

Role: Chief Digital Officer / Sales Manager. Build an AI-based control system for customer retention. Framework: budget limits, uncertain data
quality, time pressure. Develop: (1) target vision, (2) selection of technologies, (3) a KPI system for management, (4) a continuous optimisation
process (A/B testing), (5) a prioritised implementation architecture. Additional requirement: **make a technology decision despite an unclear
success forecast.** The plan gives no grading rubric for the Level 3 project; its only evaluation formula (Effect × Measurability × Scalability) is
for the Level 2 case. Level 3 feedback questions: which technology is strategically relevant, what is scalable, where is the greatest risk.

## The new shape: one task, one frame

```
Materi B (five cards, 60 min; B5 rewritten)
Case brief + "the numbers today" (now also prints data readiness and the KPI each item moves)
┌ TASK 2 · one frame ─────────────────────────────────────────────┐
│ Control panel (always on top): architecture diagram + 3 range bars │
│   + data switch: "as the brief says" / "15 points weaker"        │
│ Step A · Build the system (Core, Block 3.5)                      │
│ Step B · Decide (Core, Block 3.6)                                │
└──────────────────────────────────────────────────────────────────┘
Go deeper (Optional, folded): 3.1 Principles · 3.2 Technologies · 3.3 KPIs · 3.4 Roll out, test, stop   (unchanged)
Memo (full width, Hide / Show) → Export
```

- **Step A:** eight architecture items, each set to *Now / After data is ready / Not now*; then one text box: **target vision, two sentences** (what the
  system should do for AIConnect once it runs). It is the old "why this set" box with a sharper question, not a new field.
- **Step B:** one technology decision (the three existing decisions), why, and one sentence: what you will watch and when you would stop.
- **About five required fields** instead of 15–20. Core stays at two blocks (CLAUDE.md #35).
- **Go deeper** is extra practice for fast learners and for the mentor. It is not counted in the ring, the page map, the missing lists or the
  exported "missing" status; it is self-contained (#40) and nothing in the frame reads it. Block ids 3.5 and 3.6 are kept so the page map and
  documents do not break.

## The control panel

**It is live.** Every click on an item (and the data switch) moves the picture at once. It shows the consequences of the learner's own
architecture, not a fixed risk level. Interactive sketches of the versions below were drawn in the chat on 2026-10-03.

1. **Architecture diagram** (the version the user chose). Looks like a real architecture: layers with a direction of flow and **links that can
   break**. Top to bottom:
   - *What customers meet* (static band): offer e-mails, portal, sales calls.
   - *Full AI suite*: a stand-alone **black box** marked "?" with no working link to the KPI system.
   - *Engines*: recommendation engine, triggered e-mails, dynamic pricing (each with a link down to the A/B routine: "measured" or "not measured").
   - *A/B routine and dashboard* with the people box (KPI literacy) beside it; link down: "reads the KPIs" or "no KPI system to read".
   - *KPI system and data foundation*.
   - *Data clean-up*; link: "cleaner data" or "data used as it is".
   - *Where the data lives today* (static band): shop, CRM, e-mail, portal.
   Box states: solid teal = Now; dashed amber = After data is ready; faded = Not now. A short text note on a box states its consequence: "data
   below 80% when it starts", "nothing measures it yet", "black box: nobody can see inside", "after data is ready". Links are solid when they work and
   dashed amber with a text reason when they do not. Colour is never the only channel (dashes and words).
2. **Three range bars** (no more axes, by the user's choice), each with one plain sentence:
   - **Budget:** money on Now items against EUR 220,000 (a dashed limit line). Over the line is a hint, never a block.
   - **Measurable:** share of the Now money that sits on items that name a KPI, are measured (the KPI system and the A/B routine are both Now) and
     whose data is at least 80% ready (or that need no data). The black box never counts.
   - **Risk:** share of the Now money that rests on a black box or on data below 80% ready. The data clean-up lifts dynamic pricing to ready
     (interpretation, see below).
   - Measurable and Risk are **ranges**: the pale band spans the two data scenarios, a bold marker shows the active one. A single number would
     pretend a certainty the plan's additional requirement says does not exist.
3. **Data switch:** "as the brief says" / "15 points weaker" (readiness minus 15 points on items that depend on data).
4. All values are computed from constants in **one data file** (the same one the model answer and the mentor's worked answer read), so the
   picture, the model answer and the worked answer cannot drift. The learner calculates nothing (#44).

**Rejected after being drawn:** (a) a layered "tower" of boxes without links (reads as stacked boxes, not an architecture); (b) a six-month Gantt
timeline with a start month per item (the user found it ugly and heavier than needed). The choice per item stays the three tiers *Now / After data
is ready / Not now*.

## Three internal categories behind the reading (user idea, 2026-10-03)

The learner is never told a category; the reading ("Show how the system reads my plan", and the same for the decision in Step B) picks its wording from it,
and the unlocked mentor sees it with the reasons. Whatever the category, the reading ends in concrete changes and what the plan looks like after them.

| Category | Meaning | Plan rule (brief's data) | What the reading does |
|---|---|---|---|
| 1 · safe | The basics are met; more than one plan can be safe. | A KPI system is funded and every applicable test holds. | States what holds and what to watch (the data-weaker scenario, unspent budget). |
| 2 · fair | A base exists but a fundamental is missing, or a better approach is available. | Not 1 and not 3. | Names each open test, the fact, the rule, and the changes that make it hold. |
| 3 · clearly wrong | Tools or AI are bought without the base. | An engine or the full suite funded with no KPI system, or nothing built. | Says the base is missing and gives the changes that put it first. |

The changes are computed (`lib/r2Panel.ts`, `changesFor`): KPI system Now; A/B routine Now once an engine is funded; the full suite Not now; data clean-up Now with dynamic
pricing After data; the weakest items Not now while the plan is over the budget; with nothing built, the KPI system, the A/B routine and the recommendation engine. Step B: staging
is 1, waiting 2, buying the suite 2 when a base is funded and 3 when it is not.

## Doing nothing, and "wait"

- The task asks the learner to **build an architecture**. A Step A with no item set to Now is **incomplete, not wrong**: it stays on the missing
  list ("you were asked to build the architecture: set at least one item to Now"). This is the user's point (2026-10-03): in real life a CDO asked
  for an architecture who delivers none has not done the job. It is consistent with #38 (a required count where the task defines the shape of
  the answer). What stays free: which items, how many, what is held back, over budget, a black box.
- With nothing funded the panel says so in a sentence: "Nothing is funded, so nothing is measured and the brief's three problems stay."
- **Proposed, to confirm:** the Step B decision "Wait until the success forecast is clear" stays selectable (it is a real temptation and the
  learner should see the consequence), and the panel connects Step B to Step A with one plain hint when they disagree (B says wait while A
  builds); the learner explains the contradiction in their reason. The mentor key records why the plan rejects waiting (the brief asks for a
  decision despite an unclear forecast; no study makes a forecast clear without a test; the standard communication continues).
- Building the base now and holding the data-dependent items "After data is ready" is the legitimate form of "wait for the data": it is the
  staged decision, and the diagram shows it.

## Mapping to the plan

| Plan item | Answered by |
|---|---|
| 1 Target vision | The target-vision box in Step A |
| 2 Selection of technologies | The three tiers per item in Step A |
| 3 KPI system for management | The Measurable bar, plus the "what you will watch" sentence in Step B |
| 4 Continuous optimisation (A/B) | The A/B routine item in Step A, plus "when you would stop" in Step B |
| 5 Prioritised implementation architecture | Step A and the diagram it draws |
| Additional requirement (decide despite unclear forecast) | Step B and the data switch |
| Goals (manageable system, technology tied to strategy, data-driven decision) | The panel itself is the dashboard of the system the learner builds |

## What changes behind the screen

- **B5 is rewritten** (Core card) as **how an architecture is built**, because the user wants learners to learn that, as in real life. Today B5
  lists rules (measure first, stage the no-regret items, stay in budget, no black box, owner and trigger tests) and has one worked example (Spree
  Systems, three items over six months), but no building flow and no "what holds up". New: a flow of steps (the base first: data and the KPI
  system; then measurement; then clean the data an engine needs; then add what moves a named KPI on data that is ready; hold back the rest) and a
  few tests the learner applies to their own architecture, each shown as a fact by the diagram: (1) measurement comes first, (2) each item moves a
  KPI that is named, (3) the data is ready when the item starts, (4) it fits the budget, (5) if phases or months are added: it is in use within the
  plan. Questions, not scores. It keeps a worked example on another company with a small version of the same diagram, the 80% rule and why a
  black box cannot be steered (#11, #24, #36). The old B5 methods (halfway, month, cost of waiting) leave the Core path.
- **Data:** each Core architecture item gets its data readiness and the KPI it moves, printed in the item card and in "the numbers today".
  Today those figures live in the technology list of Block 3.2 (Optional), and Core must not read Optional (#40). They are Case assumptions and a
  `verify:calc` check must keep them equal to Block 3.2's.
- **Removed from the Core fields:** per-item owner, start month and trigger; the pickup point; the three assumptions; the four-part tripwire; the
  board's challenge. (Their kits, `lib/r2Numbers.ts` and the Day 8 Route 2 uses of #41–#43 leave the Core path; Optional blocks keep what they have.)
- **Store `r2` changes shape:** bump the persist version, `migrate`, deep `merge`, test with an old-shape blob (#9).
- Also touched: `lib/missing.ts`, `lib/progress.ts`, `lib/exportDoc.ts`, `data/mentorKey.ts`, `lib/answerKey.ts`, `lib/mentorGuide.ts`, glossary,
  EN and DE text, the page map, `verify:calc` (about 297 checks, mostly Route 2), README (coverage table, #40 dependency checklist, deviation note).
- The Word documents (#31) of Day 8 are already stale and get more so; rebuild only when asked.

## Mentor tools

Answer key and worked answer for Step A and B: the reference set, the three bars it produces in both scenarios, why each rejected item is rejected,
and a note that a different, well-reasoned set is acceptable (#38). The mentor fill enters a complete Step A and B.

## What does not change

Route 1 (no Core block of Route 1 reads Route 2). Days 1–7 and 9–16. Materi B's other cards. Blocks 3.1–3.4 (folded). The memo (full width at the
bottom, Hide / Show, #39). The Export (never locked, #3). Over budget or against the grain still exports with a reason (#38).

## Coverage check before it ships

1. From a clean `localStorage`, open Route 2 and fill **only Step A and B**: the missing list empties, the export downloads, nothing mentions an
   Optional block (#40).
2. For each item and both data scenarios, recompute the three bars by hand from the printed figures and compare (the formulas above).
3. Turn the A/B routine off, then on a black box item, then the 15-point switch: each box note and each bar sentence matches the picture.
4. Over budget, with a reason: exports and states the figure as a fact.
5. 1280 px and 390 px: the diagram and bars do not overflow and the choices stay reachable; EN and DE.
6. Old-shape blob loads without error. Mentor fill gives an empty missing list. `npm run typecheck`, `verify:calc`, `build` (dev server stopped).

## Open interpretations and decisions to confirm before building

1. **Time (the main open decision).** The built Route 2 has a start month per item, printed weeks to be in use, and rules (measurement starts no
   later than the first other item; month = start + weeks / 4, rounded up; nothing later than month 6). The redesign has only the three tiers and no
   months. The user wants real-life order and timing back without a heavy timeline. Options: (a) keep the three tiers only; (b) add three phases
   (Phase 1 = months 1-2, Phase 2 = 3-4, Phase 3 = 5-6, plus Not now) shown as a small label on each box, with the "in use within the plan" test and
   links that break when a dependency comes later than the item; (c) a start month per item (rejected as a picture, possible as an input only).
   Recommended: (b), if it keeps the inputs at one click per item.
2. Data readiness per item: reco 92, trigger 95, A/B routine 99, pricing 40 are taken from Block 3.2's technology list; the foundation, KPI
   literacy and data clean-up are treated as needing no data; the AI suite is a black box with no KPI it reports. The "15 points weaker" step is a
   Case assumption. The data clean-up lifts dynamic pricing to ready (an interpretation of the item's own description).
3. Measurement means the KPI system **and** the A/B routine both Now (in a tier-only design there is no order, so "both Now" stands for "in place").
4. Step B options reuse the three existing decisions (commit, stage, wait); the contradiction hint between Step B and Step A, and keeping "wait"
   selectable, are proposals awaiting confirmation (see "Doing nothing, and wait").
5. Layer placement of each item in the diagram, and whether the people box stays beside the A/B routine.
6. The panel is at the top of the frame, not sticky; at 390 px it stacks, so the diagram and bars may scroll out of view while choosing. Check
   when building; sticky would need an explicit exception. The diagram is taller than the earlier tower, so this matters more.
