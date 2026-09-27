# Retention Lab · Day 8

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 4, Day 2 of 2.**
*AI, automation and systematic success measurement in customer retention.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32.

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
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 the target vision of an AI-based control system, B2 choosing technologies: KPI first, B3 a KPI system for management: four tests, B4 continuous optimisation: roll out, keep testing, stop, B5 a technology decision under uncertainty, and the architecture). **Task 2, Control System Memo**, assembling beside the questions: 3.1 three principles, 3.2 select now / data first / not now for eight technologies, 3.3 three KPIs rated on four tests and the greatest lever, 3.4 roll out / keep testing / stop and who acts for six test results, 3.5 the prioritised implementation architecture, 3.6 the technology decision, three assumptions, the tripwire and the board's challenge. | `2-{name}-day8-l3-control-system-memo.html` |

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
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (123 checks)
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
