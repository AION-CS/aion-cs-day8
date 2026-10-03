import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so a Core block never reads an Optional one (#40): `data` is the share of the data the item needs that is ready today, the
 * same figure the technology list of the “Go deeper” part prints for the four items it also names (a check in `npm run verify:calc` keeps them equal).
 * Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After data is ready", "Wenn die Daten bereit sind"), not: t("Not now", "Jetzt nicht") });

/** The "weaker data" scenario: every readiness figure is this many points lower. */
export const WEAK_POINTS = 15;
/** An engine starts on data that is at least this ready (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "engine" | "measure" | "people" | "base" | "clean";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the KPI system, the A/B routine, KPI literacy, the data clean-up). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of the data it needs that is ready today (percent), or null when it needs no data to start. */
  data: number | null;
  /** The data clean-up prepares the data this item needs: it is ready when the clean-up is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("KPI system and data foundation", "KPI-System und Datenbasis"), moves: t("no KPI by itself: every KPI is defined and read from it", "keinen KPI selbst: Jeder KPI wird darüber definiert und gelesen"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  reco: { layer: "engine" as Layer, short: t("Recommendation engine", "Recommendation Engine"), moves: t("the conversion rate of offers", "die Conversion Rate der Angebote"), named: true, enabler: false, measured: true, data: 92, cleaned: false, blackBox: false },
  trigger: { layer: "engine" as Layer, short: t("Triggered e-mails", "Trigger-E-Mails"), moves: t("weekly active customers (engagement)", "wöchentlich aktive Kunden (Engagement)"), named: true, enabler: false, measured: true, data: 95, cleaned: false, blackBox: false },
  abtest: { layer: "measure" as Layer, short: t("A/B routine and dashboard", "A/B-Routine und Dashboard"), moves: t("no KPI by itself: it compares any measure with a control group", "keinen KPI selbst: Es vergleicht jede Maßnahme mit einer Kontrollgruppe"), named: false, enabler: true, measured: true, data: 99, cleaned: false, blackBox: false },
  training: { layer: "people" as Layer, short: t("KPI literacy", "KPI-Kompetenz"), moves: t("no KPI by itself: people read the numbers correctly", "keinen KPI selbst: Menschen lesen die Zahlen richtig"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  quality: { layer: "clean" as Layer, short: t("Data clean-up", "Datenbereinigung"), moves: t("no KPI by itself: it prepares the price and knowledge data", "keinen KPI selbst: Es bereitet die Preis- und Wissensdaten vor"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("Full AI suite", "Komplette KI-Suite"), moves: t("no KPI it reports: its models and results are not shown", "keinen KPI, den es berichtet: Seine Modelle und Ergebnisse werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  pricing: { layer: "engine" as Layer, short: t("Dynamic pricing", "Dynamic Pricing"), moves: t("revenue per order", "den Umsatz pro Bestellung"), named: true, enabler: false, measured: true, data: 40, cleaned: true, blackBox: false },
});

export const ENGINE_IDS: ArchId[] = ["reco", "trigger", "pricing"];
/** The item the "After data is ready" tier waits for, and the two that make everything else measurable. */
export const CLEAN_ID: ArchId = "quality";
export const KPI_SYSTEM_ID: ArchId = "foundation";
export const AB_ID: ArchId = "abtest";

/** The model plan (CLAUDE.md #47): the six items that fit the budget, all started now; dynamic pricing and the AI suite stay out. */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", reco: "now", trigger: "now", abtest: "now", training: "now", quality: "now", suite: "not", pricing: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
