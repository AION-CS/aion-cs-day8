import { FORECAST, PILOT } from "@/data/forecast";
import type { FigureId } from "@/data/forecast";
import { BUDGET, EVIDENCE_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_ARCH, MODEL_GREATEST, MODEL_TRIGGER, OWNERS, OWNER_ACCEPT, PRINCIPLES, R2_BUDGET } from "@/data/route2";
import type { ArchId, PrincipleId } from "@/data/route2";
import { euro } from "@/lib/lang";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const n3 = (v: number) => (Math.round(v * 1000) / 1000).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · A personalisation opportunity of your own",
    answer: L1().extraInsight ?? "",
    why: "An opportunity names a group of customers, what AIConnect's data shows about them, and what could be tailored to them. It must rest on data AIConnect has (orders, logins, opened e-mails).",
    lookFor: ["A group of customers, not “all customers”.", "What the data shows about them.", "What would be personalised: the product, the message, the timing or the channel (“so …”)."],
    pitfalls: ["A technology with no customer group (“use AI for e-mails”): ask for whom, and on what data.", "A discount for everyone: that is the opposite of personalisation."],
  };
}

export function figureGuide(id: FigureId): MentorGuide {
  const v = PILOT.variant;
  const c = PILOT.control;
  if (id === "F1")
    return {
      title: "1.2 · F1 Conversion rate, personalised offer",
      answer: n(FORECAST.f1),
      steps: [
        { label: "Orders ÷ e-mails delivered", calc: `${v.orders} ÷ ${v.sent}`, result: n(v.orders / v.sent) },
        { label: "× 100", calc: `${n(v.orders / v.sent)} × 100`, result: `${n(FORECAST.f1)}%` },
      ],
      why: "Both numbers come from the personalised offer's rows: of 2,000 e-mails, 96 led to an order.",
      pitfalls: [`Share left as a fraction (0.048 instead of 4.8): ${n(v.orders / v.sent)}.`, `Standard offer's rows used: ${n(FORECAST.controlRate)}.`, `Both groups' orders over both groups' e-mails: ${n(((v.orders + c.orders) / (v.sent + c.sent)) * 100)}.`],
    };
  if (id === "F2")
    return {
      title: "1.2 · F2 Uplift",
      answer: n(FORECAST.f2),
      steps: [
        { label: "Conversion rate of the standard offer", calc: `${c.orders} ÷ ${c.sent} × 100`, result: `${n(FORECAST.controlRate)}%` },
        { label: "Uplift = F1 ÷ that rate", calc: `${n(FORECAST.f1)} ÷ ${n(FORECAST.controlRate)}`, result: n(FORECAST.f2) },
      ],
      why: "The personalised offer converted 1.6 times as often as the standard one, which is an uplift of 60%.",
      pitfalls: [`Subtracted instead of divided (4.8 − 3): ${n(FORECAST.f1 - FORECAST.controlRate)}.`, `Divided the orders (96 ÷ 60): ${n(v.orders / c.orders)}, which happens to match only because the groups are the same size.`, `Written as a percentage uplift (60) in a field that asks for “times”.`],
    };
  const diff = (FORECAST.f1 - FORECAST.controlRate) / 100;
  return {
    title: "1.2 · F3 Extra revenue a year",
    answer: n(FORECAST.f3),
    steps: [
      { label: "Difference between the two rates, as a share of one", calc: `(${n(FORECAST.f1)} − ${n(FORECAST.controlRate)}) ÷ 100`, result: n3(diff) },
      { label: "Extra orders a year", calc: `${n(PILOT.yearly)} × ${n3(diff)}`, result: n(PILOT.yearly * diff) },
      { label: "× average order value", calc: `${n(PILOT.yearly * diff)} × ${n(PILOT.order)}`, result: euro(FORECAST.f3) },
    ],
    why: "Only the orders the personalised offer adds on top of the standard offer are extra: 432 more orders a year at €900 each.",
    pitfalls: [`All orders at the personalised rate counted as extra (24,000 × 0.048 × 900): ${n(PILOT.yearly * 0.048 * PILOT.order)}.`, `Difference not turned into a share (24,000 × 1.8 × 900): ${n(PILOT.yearly * 1.8 * PILOT.order)}.`, `Only one pilot group's 2,000 e-mails used: ${n(2000 * diff * PILOT.order)}.`],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What the pilot means",
    answer: L1().meaning ?? "",
    lookFor: ["At least one of the learner's own figures (4.8%, 1.6 times, €388,800, or 3%).", "A next step: a larger second test, then rollout.", "Said as an estimate: 60 and 96 orders are still a small base."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“We will earn €388,800”: it is a forecast from a small pilot, not a promise."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Advantage ${i + 1}`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three advantages from three different technologies, each with the risk it brings. The app checks only that each names a technology, is long enough and names a risk.",
    lookFor: ["An advantage the customer feels (time saved, a better-fitting offer, a message at the right moment).", "The kind of technology it comes from.", "A risk: wrong or pushy suggestions, feeling watched, being stuck with a machine."],
    pitfalls: ["An advantage for AIConnect only (“more sales”): ask what the customer gains.", "No risk named: the task asks for both sides."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · When AI adds value" : k === "causation" ? "1.4 · Automation or customer experience" : "1.4 · Reading the pilot like a data-driven decision-maker",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["An idea from 1.1 that answers a measurable problem.", "An example of technology without strategy (a tool bought first, no KPI)."]
        : k === "causation"
          ? ["A concrete situation from 1.3 (usually the key account or the data-loss complaint).", "What the customer would feel and what it costs AIConnect."]
          : ["Checks the fairness of the comparison (same weeks, random split).", "Does not over-read a small pilot.", "A next step before rollout: a larger test with a guardrail."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.2 · Your three KPIs",
    answer: L1().misread ?? "",
    lookFor: ["At least one outcome KPI (conversion rate, customer value or retention rate).", "At least one driver KPI (engagement, clicks on recommendations, second module).", "For each: where the number comes from and a target; a guardrail as the third is a strong answer."],
    pitfalls: ["E-mails sent, followers or dashboards as a KPI: vanity metrics, they count AIConnect's activity.", "Three outcomes and no driver: the team has nothing it can move this month."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (unsubscribes, complaints)."],
    pitfalls: ["“The new e-mail will be better”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${m.model.effect} × ${e} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Measurability from how success is measured (A7)", calc: `measured by ${EVIDENCE_LABEL[m.evidence]} → control group 3 · before and after 2 · none 1`, result: String(e) },
      { label: "Score = Effect × Measurability × Scalability", calc: `${m.model.effect} × ${e} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}.`,
    pitfalls:
      id === "suite"
        ? ["Measurability 3 “because the vendor reports results”: the vendor's own report is not a KPI against a control group: 1."]
        : id === "chatbot"
          ? ["Answering “impersonal communication”: a chatbot answers faster, it does not make the message personal."]
          : id === "roles"
            ? ["Measurability 3: an open rate compared with last year has no control group: 2."]
            : undefined,
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the extra revenue from 1.2).", "The cost against €200,000.", "What was left out, said as a decision."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name}`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for AIConnect's teams or customers.", "Which problem of the brief it answers (data not used, measures not measurable, automation potential unused)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask which KPI it serves, or who could explain and cap it."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (link to value and early together).", "The problem of the brief it answers."],
    pitfalls: ["E-mails sent as greatest “because it is weekly and complete”: it is not linked to value."],
  };
}

export function triggerGuide(id: ArchId): MentorGuide {
  const model = MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER];
  return {
    title: `3.5 · ${ARCH_BY_ID[id].name}`,
    answer: model ?? "A metric, a number, a date and an action for this item.",
    why: `Owner that defends: ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}.`,
    lookFor: ["A metric about the item's effect.", "A number and a month.", "An action the owner can take alone."],
  };
}

export function postponedGuide(): MentorGuide {
  const cost = MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  return {
    title: "3.5 · What is left out, and the pickup point",
    answer: `${R2().postponed} · ${R2().pickup}`,
    steps: [
      { label: "Model funded items", calc: MODEL_ARCH.map((id) => n(ARCH_BY_ID[id].cost)).join(" + "), result: euro(cost) },
      { label: "Left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: "With the AI suite added", calc: `${n(cost)} + ${n(ARCH_BY_ID.suite.cost)}`, result: euro(cost + ARCH_BY_ID.suite.cost) },
    ],
    lookFor: ["The item named, with its cost.", "Why this one (budget, a black box, data not ready).", "A pickup point with a number and a date."],
  };
}

export function assumptionGuide(i: number): MentorGuide {
  return {
    title: `3.6 · Assumption ${i + 1}`,
    answer: (R2().assumptions ?? [])[i] ?? "",
    lookFor: ["What is assumed about the data, the customers or the teams.", "The sign that would show it is wrong, with a number or a date."],
  };
}

export function challengeGuide(): MentorGuide {
  return {
    title: "3.6 · The board's challenge",
    answer: R2().challenge ?? "",
    why: "3.0% to 3.4% is a measured uplift of about 13%, below the pilot but real, and the engine is still learning; the unsubscribe rise is a guardrail breach with a named cause. Fix the one thing that broke; do not swap a measured tool for an unmeasurable one, and do not throw away the only measured gain.",
    lookFor: ["What is checked first (the uplift against the control group, on enough orders; which trigger drove the unsubscribes).", "What is kept (the engine, the tripwire date).", "One change: pause or fix the trigger behind the unsubscribes."],
    pitfalls: ["Buying the suite: it cannot be measured, which is the problem the case started with.", "Stopping: the pilot and the first months both show a gain."],
  };
}
