# Retention Lab · Day 8

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 4, Day 2 of 2.**
*AI, automation and systematic success measurement in customer retention.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32 and, since the retrofit of 2026-10-03, #33 to #46 (see “Retrofit” below).

The case company is **AIConnect Solutions GmbH** (the plan's case study): *customer communication impersonal, low conversion rate,
measures not measurable*, €200,000 and six months. Route 2 puts the learner in the Chief Digital Officer's chair with €220,000 and six
months (Case assumption).

This repo was bootstrapped from `day7` (chrome, primitives, store pattern, tokens, the language machinery) and its content was
replaced. Nothing of SmartData remains in the visible content; several data identifiers keep Day 7's names (e.g. `PATTERNS` holds the
four kinds of metric), and each file's header comment says what they hold now.

> **Before you push:** this folder has a fresh local `git init` and no remote. Create the `aion-cs-day8` repository and set the
> remote first (`../CLAUDE.md` #17). Nothing was committed or pushed.

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 AI: value or technology without strategy, A2 recommendation systems and individualised communication, A3 automation in sales: chatbots, dynamic pricing, adaptive systems, A4 reading a pilot: conversion rate, uplift, extra revenue, A5 KPIs that steer: outcome, driver, guardrail, vanity, A6 A/B testing: a fair test and its limits, A7 effect × measurability × scalability). **Task 1, AI and Measurement**: *Part 1 · Personalise and automate with sense:* 1.1 tag nine ideas as recommendation, communication or automation and name one opportunity, 1.2 read the pilot (F1–F3 and a sentence), 1.3 two situations to automate fully, two to keep with a person, three advantages each with its risk, 1.4 coaching reflection. *Part 2 · Make it measurable and choose:* 2.1 tag twelve metrics by kind, 2.2 link to value, meaning and use per kind, uncertainties, your three KPIs, 2.3 design a fair A/B test, 2.4 choose, score and order three measures. | `1-{name}-day8-l1l2-ai-measurement-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 the target vision of an AI-based control system, B2 choosing technologies: KPI first, B3 a KPI system for management: four tests, B4 continuous optimisation: roll out, keep testing, stop, B5 how an architecture is built and a technology decision under uncertainty). **Task 2, Control System Memo**, one frame since 2026-10-03 (`../CLAUDE.md` #47): a live panel (an architecture diagram with links that can break, three range bars Budget, Measurable and Risk, a data switch, four tests), **Step A** (when does each of eight items happen, the target vision, what the plan gives and what you give up) and **Step B** (the technology decision, why, what you will watch and when you would stop); **Go deeper**, folded and Optional: 3.1 three principles, 3.2 select now / data first / not now for eight technologies, 3.3 three KPIs rated on four tests, 3.4 roll out / keep testing / stop for six test results. | `2-{name}-day8-l3-control-system-memo.html` |

Minutes: Materi A 60 + Task 1 65 (6 + 10 + 9 + 5 + 7 + 9 + 8 + 11), Materi B 60 + Task 2 50 (5 + 8 + 10 + 8 + 10 + 9). All in `lib/routes.ts`.

## German version (CLAUDE.md #32)

Same machinery as Days 5–7: `lib/lang.ts`, `lib/i18n.tsx`, `ui.lang` in the persisted store. Common terms stay English in German
sentences (Conversion Rate, Uplift, KPI, Guardrail, Vanity Metric, Recommendation System, Chatbot, Dynamic Pricing, Rollout, Owner,
Tripwire…); explanations are German, formal "Sie". Mentor tools stay English; file names and the deliverable names stay English.

## Stack

Next.js 14 App Router · TypeScript strict · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d8-v1`, version 1, `skipHydration` +
`StoreHydrator`, deep `mergeDefaults`) · static export. No animation, drag-and-drop, PDF or chart library.

```bash
npm install
npm run dev          # http://localhost:3000 (the parent launch config uses port 3008)
npm run typecheck
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (297 checks)
npm run build        # writes the static site to out/  (stop `npm run dev` first)
```

## What is in the data

- `ladder.ts`: nine ideas (3 recommendation, 3 communication, 3 automation) with tests, pair tests, clue, reason and rejected kinds.
- `forecast.ts`: the pilot. Conversion rate = orders ÷ e-mails × 100; uplift = variant rate ÷ standard rate; extra revenue = e-mails a
  year × (variant − standard rate, as a share) × order value. 96 ÷ 2,000 = **F1 4.8%**; 4.8 ÷ 3 = **F2 1.6**; 24,000 × 0.018 × €900 =
  **F3 €388,800**. Worked example of A4 (Mosel Software): 3%, 2%, 1.5, €60,000. Also the eight contact situations of 1.3 (automate
  fully: password reset, status question; keep a person: key account cancelling, data-loss complaint; traps: the routine licence price
  and the night-time question, both "assist").
- `patterns.ts`: four kinds of metric with tests and pair tests; twelve metrics (3 each; moved with value: outcome 3, driver 2, guardrail
  1, vanity 0); the link rule; meaning and use per kind; seven uncertainties (four real); the A/B test card (four parts, one fair option
  each, plus hypothesis and decision rule).
- `measures.ts`: nine measures with cost, weeks and how their success is measured. Measurability follows from it (control group 3,
  before/after 2, none 1). Recommendation engine (27), KPI dashboard and testing routine (18), triggered e-mails (18): €125,000.
- `route2.ts`: six principles, eight technologies (rule: KPI named? data ≥ 80% ready?), eight KPI candidates with printed facts and
  limits, six test results (rule: uplift ≥ 10% and ≥ 100 conversions → roll out; uplift ≥ 3% → keep testing; else stop), eight
  architecture items (model €195,000 of €220,000; the AI suite is a black box), owners, triggers, three decisions, KPIs and the challenge.

## Mentor bar

The first element on every page. Enter `muchson123` once and every model answer of Routes 1 and 2 fills in (plus a participant name if
empty and every calculator part), so each export downloads straight away. The same unlock shows the answer keys (1.1, 1.3 picks, 2.1,
2.2 rows and uncertainties, 2.3 test card, 2.4 measures and order, 3.1–3.6) and a worked answer for every other question (F1–F3 as
step tables with pitfalls, every free text with what to look for). Client-side convenience gate, not security; a reload locks it.

## Notes on deviations from the brief and the shared rules

1. **Two routes (CLAUDE.md #30).** The plan's Level 1 Task 1 (personalisation opportunities, where automation fits, advantages for
   customers, risks), Level 1 Task 2 (three KPIs, how success is measured, a simple A/B test, uncertainties) and the Level 2 case study
   (AIConnect: AI personalisation potential, three automation approaches, a KPI system, an A/B testing concept, prioritised measures)
   run on one company. Mapping: opportunities 1.1; automation 1.3; advantages and risks 1.3c; measuring success 1.2; three KPIs 2.2;
   A/B scenario and concept 2.3; uncertainties 2.2; KPI system 2.1–2.2; automation approaches and prioritisation 2.4. The coaching focus
   is Block 1.4. The Level 3 transfer project's five items are 3.1 to 3.5; the additional requirement (a technology decision despite an
   unclear success forecast) is 3.6.
2. **The evaluation "Effect × Measurability × Scalability"** from the plan is the score of Block 2.4. Measurability is derived from the
   printed way each measure is measured, so it can be checked; effect and scalability are judged.
3. **Task 1 is 65 minutes** (the A/B test card is its own block, because both the Level 1 Task 2 and the case study ask for it).
4. **Every figure beyond the brief is a Case assumption**: the ideas, the pilot, the situations, the metrics, the costs, the Route 2
   budget (€220,000), the uplifts, the KPI baselines and the board's challenge. The brief gives €200,000 and six months.
5. **German by the user's standing request (#32)**; English stays the default.
6. **Not built as a Friday capstone (#29)**: the request did not name Day 8 as a Friday.
7. **The plausible-range band in A6** is a standard normal approximation, shown only to make the effect of sample size visible; no task
   asks for it.
8. **Sources to re-check before teaching:** citations are given by their usual details; page ranges and editions differ between
   printings. The pilot and uplift figures are illustrations, not research findings.

## Coverage: where each task block is taught

| Block | Taught in | Help while answering |
|---|---|---|
| 1.1 Recommendation, communication, automation | A2, A3 (tests, pair tests, worked sort) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 1.2 Read the pilot | A4 (the four steps on Mosel) | Show where the numbers are · Show the formula + calculator · per-part clues |
| 1.3 Where automation fits, advantages | A3 (routine × stakes × volume rule; advantages and risks) | Check (picks as a count, advantages floor) + clue |
| 1.4 Coaching reflection | A1, A3, A6 | Worked answers for the mentor |
| 2.1 Tag the metrics | A5 (four kinds, pair tests, KPI tree) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 2.2 Link, meaning, use; KPIs | A5, A6 (link rule, uses, uncertainties) | Your tally · Check per row with clues · Check my choices |
| 2.3 A fair A/B test | A6 (test card, sample size) | Check per part with clue · hypothesis and rule floors |
| 2.4 Measures, scores, order | A7 (matching problems, measurability rule, budget) | Show the test questions · budget bar · problem coverage · Check · order check |
| 3.1 Principles | B1 | Check (KPI system and test-before-scale) + clue |
| 3.2 Technologies | B2 (KPI first, 80% rule) | Show the test questions · Check (count) + clue |
| 3.3 KPI system | B3 (four tests, limits from printed facts) | Show the test questions · Check (limits, early count) |
| 3.4 Roll out, keep testing, stop | B4 (uplift and conversions rule, owners) | Show the test questions · Check (count) + clue |
| 3.5 Architecture | B5 (measurement first, budget, no black box; owner and trigger tests) | Show the owner test · budget bar · plan sentences · Check (three rules) |
| 3.6 Decision | B5 (decision rules, tripwire, premortem) | Baselines printed · Check (wait, activity metric, threshold) |

## Retrofit of 2026-10-03 (the user's request: bring Days 8 to 12 up to the current rules, Route 1 first, decide without asking)

Applied from `../CLAUDE.md`: #33 to #46. Route 1 was done first, Route 2 second. Nothing was committed or pushed.

**Core and Optional (#35, #40, #44).** Route 1 has **four Core blocks** (1.1, 1.3, 2.1, 2.4; 40 min of the 64) and four Optional blocks, folded and never removed
(1.2, 1.4, 2.2, 2.3). Route 2 has **two Core blocks** (3.5, 3.6; 19 min of the 50) and
four Optional blocks (3.1, 3.2, 3.3, 3.4). Optional cards: A4, A6, B1, B2, B3, B4; every other card is Core because a Core block cites it. The ring, the page map
and both missing lists count Core only; an unanswered Optional block is marked as such in the exported file.

**What changed in Route 1.** Block 1.2 is read-only (the two close rates are printed, nothing is calculated, #44) and Optional; the three KPIs moved into Block 2.1;
Block 2.4 names a category for every measure, asks for a reason for each judged score, and shows the budget as a hint (#45, #38). Every measure and every
contact situation prints a scene and who does what (#46). Every interactive picture opens with “The point” and a three-step story (#36); long text sits behind
“＋ Show …” (#37); every free-text field has a clue kit and an example answer (#42, #23); two live rust notices (#34); the page map shows Core / Optional (#28).

**What changed in Route 2.** The task has no side column: the live memo sits full width below Block 3.6 with “Hide the memo” (#39). Blocks 3.1 to 3.4 are folded Optional.
Block 3.5 prints, on every item card, a scene, the one figure the item is meant to move (today and aim), what it needs first and what it must win or keep to pay back.
**Numbers are shown, not calculated (#44):** the trigger kit, the pickup kit, the assumption kit and the tripwire hint give every number with the reason it is that number
and a button to each printed input. Three plain methods produce them (Materi B5, with a worked example on another company): *halfway* between today and the aim,
*month* = start month + weeks in use ÷ 4 rounded up, *cost of waiting* = item cost ÷ the value of one unit, rounded up. They live in `lib/r2Numbers.ts` and are read from
`data/route2Extra.ts`, so the kits, the model answers and the mentor's worked answers cannot drift apart. “The numbers today” is printed once in the case brief so Core never
reads an Optional table. Going over the budget is a hint with a stated reason, never a missing item (#38).

**Shared mechanics.** `cs-d8-v1` persists at version 2 with a migration and a deep merge (#9); `npm run verify:calc` runs 297 checks (figures and rules, the mentor fill and a
Core-only fill in both languages, the shown numbers, #40 scans of the Core blocks, old-shape blob).

### Notes on deviations (retrofit)

R1. **No video was embedded (#33).** None was searched and verified in this pass; a card without a video is not a defect (#33). The video slot stays empty (`data/videos.ts`).
R2. **No calculators (#44).** The plan names no calculation beyond the printed rates, the budget and the score formula, so the former F1–F3 calculators and “Show the formula” helps
    of Block 1.2 were removed; wherever older text above mentions them, it is superseded.
R3. **Route 1 has at most four Core blocks and Route 2 two** (user decision, #35); everything else is folded, not removed.
R4. **Model answers use only printed numbers.** The mentor's KPI answer uses aims such as “up” or “stay under a limit”; the model triggers, the pickup point and the assumptions are generated by
    the methods above from the item cards and “the numbers today”, so each number can be found on the screen.
R5. **The Word documents (#31) were not rebuilt** in this pass and are out of date for Day 8: Core / Optional marks, “The point”, the shown numbers and the new case-brief table are missing. Rebuild them from the reviewed Markdown in `../materi-task-docx/_source/` when wanted.
R6. **German and English** are written by hand next to each other for every new text (#32); the glossary got “cost of waiting” and “halfway between today and the aim”.
R7. **Plan mapping (#44).** The plan's numbered task items and the Level 3 requirements are mapped in note 1 above; Core is drawn from them: Route 1's Core blocks answer the Task 1 items (the first tagging and the situations or opportunities) and the case study's KPI and measures items; Route 2's Core blocks are the implementation requirement (3.5) and the additional decision requirement (3.6).

## Route 2 redesign of 2026-10-03 (`../CLAUDE.md` #47, design note `ROUTE2-REDESIGN.md`)

Built after a chat discussion with the user, the same day. The old Core blocks (3.5 and 3.6) asked for 15 to 20 fields, which learners did not finish.

- **One task, one frame.** Panel on top, Step A (block 3.5, Core), Step B (block 3.6, Core), then **Go deeper** (3.1 to 3.4, Optional, folded, unchanged), the memo (full width, Hide / Show) and the export. About five written fields plus at least one item set to Now.
- **The panel** (`components/task2/Panel.tsx`) draws the learner's choices at once: an architecture diagram (layers with a direction of flow and links that turn dashed amber with a reason in words when they break), three range bars (Measurable and Risk are ranges across the two data scenarios, “as the brief says” and “15 points weaker”), and four tests (*measurement comes first*, *every funded item has a purpose*, *data is ready when an engine starts*, *it fits the budget and the six months*). Everything is computed in `lib/r2Panel.ts` from `data/route2Panel.ts`, so the picture, the export, the model answer and the mentor's worked answer cannot drift.
- **Time is derived**: Now starts in month 1; After data is ready starts in the month the data clean-up is in use (the clean-up must be Now); in use = start + weeks ÷ 4, rounded up (the rule the old Route 2 and Materi B5 teach). No month is asked for.
- **Three internal categories** (safe, fair, clearly wrong) choose the wording of “Show how the system reads my plan” (Step A) and “Show how the system reads my decision” (Step B); each ends in concrete changes and what the plan looks like after them. The learner never sees the category; the unlocked mentor sees it with the reasons (`components/task2/MentorCategory.tsx`). Doing nothing is a named missing item, never a “wrong” answer.
- **B5 was rewritten** as how an architecture is built (five building steps, the four tests, the time rule, how to read the three bars, the decision rules, what to watch, what a plan gives and costs) with a worked example on Spree Systems drawn as a small panel.
- **Persist version 3**: a funded item becomes Now; the per-item start month, owner and trigger, the left-out text, the pickup point, the three assumptions, the tripwire and the board's challenge are dropped (`migratePersisted` in `store/useStore.ts`, tested with an old-shape blob). The numbers kits and `lib/r2Numbers.ts` of the previous retrofit were removed.
- **Checks**: `npm run verify:calc` (313 checks) recomputes the panel's figures by hand (195,000; Measurable 79% and 49%; Risk 0% and 31%), the tests, the categories, the suggested changes, the Core-only fill, an over-budget plan that still exports and the old-shape migration.

### Notes on deviations (Route 2 redesign)

R8. **This route waives #16's “check on request is the only place the app may mark anything” and #4's “a question, not an answer”** (user decision, #47): the panel marks positions live, and the reading tells the learner what to change instead of asking a question. It never blocks, never uses good/bad/wrong wording, red/green, ticks or crosses, and a different choice with a reason still exports (#38).
R9. **The plan's numbered items are answered in the frame**: 1 target vision (the vision field), 2 technologies and 5 prioritised architecture (the tiers in Step A and the diagram), 3 KPI system (the Measurable bar and the watch sentence), 4 continuous optimisation (the A/B routine item and “when you would stop”), and the additional requirement (Step B and the data switch). No calculation is asked for (#44); the panel computes and says what it means.
R10. **Case assumptions added**: each item's data readiness (reco 92, triggered e-mails 95, A/B routine 99, dynamic pricing 40, equal to the “Go deeper” technology list), the 15-point weaker scenario, and that the data clean-up prepares dynamic pricing's data.
R11. **The Word documents (#31) of Day 8 are stale** and the Route 2 ones are now out of date in structure too; rebuild them from `../materi-task-docx/_source/` when wanted.
R12. **Not done in this pass**: no video (#33); nothing committed or pushed; a 390 px pass was not completed in the preview (the emulation reported inconsistent widths), so check the diagram at phone width before teaching.

### Dependency checklist (#40)

✓ = reads only Core blocks, Core cards and the case brief. An Optional item may read a Core answer; nothing reads an Optional item back.

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| **Route 1** | | | |
| 1.1 Recommendation, communication or automation? | **Core** | the brief, the block's own printed items, cards A2, A3 | ✓ |
| 1.2 Read the pilot: two rates side by side | Optional | the brief, the block's own printed items, cards A4 | self-contained |
| 1.3 Where automation fits, and what customers gain | **Core** | the brief, the block's own printed items, cards A3 | ✓ |
| 1.4 Coaching reflection: from Level 1 to Level 2 | Optional | the brief, the block's own printed items, cards A1, A3, A6 | self-contained |
| 2.1 Tag AIConnect's twelve metrics by kind, and name your three KPIs | **Core** | the brief, the block's own printed items, cards A5 | ✓ |
| 2.2 What each kind of metric is worth, and the uncertainties in measuring | Optional | the brief, the block's own printed items, cards A5, A6 | self-contained |
| 2.3 Design a fair A/B test | Optional | the brief, the block's own printed items, cards A6 | self-contained |
| 2.4 Choose three measures, score them, put them in order | **Core** | the brief, the block's own printed items, cards A7, A1 | ✓ |
| **Route 2** | | | |
| Case brief and “Where Route 1 left off” | — | Route 1 Core Block 2.4 (measures chosen), “the numbers today” | ✓ |
| 3.1 The target vision of an AI-based retention system | Optional | its own printed items, cards B1 | self-contained |
| 3.2 Selection of relevant technologies | Optional | its own printed items, cards B2 | self-contained |
| 3.3 A KPI system for management | Optional | its own printed items, cards B3 | self-contained |
| 3.4 Continuous optimisation: roll out, keep testing or stop | Optional | its own printed items, cards B4 | self-contained |
| Panel (diagram, three bars, four tests) | — | Step A choices, “the numbers today”, cards B5 | ✓ |
| Step A · Build the system (block 3.5) | **Core** | printed item cards, “the numbers today”, cards B5 | ✓ |
| Step B · Decide (block 3.6) | **Core** | own plan quoted from Step A, “the numbers today”, cards B5 | ✓ |
| **Cards** | | | |
| A1, A2, A3, A5, A7, B5 | Core | each other and the case | ✓ |
| A4, A6, B1, B2, B3, B4 | Optional | — | no Core block cites them |
