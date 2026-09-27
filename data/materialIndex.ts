import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number };

/** Day 8: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes; Materi B (Route 2, Level 3) five cards, 60 minutes. */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("AI in customer retention: value or technology without strategy", "KI in der Kundenbindung: Mehrwert oder Technologie ohne Strategie"), minutes: 7 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Recommendation systems and individualised communication", "Recommendation Systems und individualisierte Kommunikation"), minutes: 9 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Automation in sales: chatbots, dynamic pricing, adaptive systems", "Automatisierung im Vertrieb: Chatbots, Dynamic Pricing, adaptive Systeme"), minutes: 9 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Reading a pilot: conversion rate, uplift and extra revenue", "Einen Pilot lesen: Conversion Rate, Uplift und zusätzlicher Umsatz"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("KPIs that steer: outcome, driver, guardrail and vanity metrics", "KPIs, die steuern: Outcome, Treiber, Guardrail und Vanity Metrics"), minutes: 8 },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("A/B testing: a fair test and what it cannot tell you", "A/B-Testing: ein fairer Test und was er nicht sagen kann"), minutes: 9 },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("Prioritising measures: effect, measurability, scalability", "Maßnahmen priorisieren: Wirkung, Messbarkeit, Skalierbarkeit"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("An AI-based control system: the target vision", "Ein KI-gestütztes Steuerungssystem: das Zielbild"), minutes: 12 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Choosing technologies: the KPI first, then the tool", "Technologien wählen: zuerst der KPI, dann das Werkzeug"), minutes: 12 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A KPI system for management: four tests", "Ein KPI-System für das Management: vier Tests"), minutes: 12 },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("Continuous optimisation: roll out, keep testing or stop", "Laufende Optimierung: ausrollen, weiter testen oder stoppen"), minutes: 12 },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("A technology decision under uncertainty, and the architecture", "Eine Technologieentscheidung unter Unsicherheit, und die Architektur"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · personalise, automate, measure", "Level 1 + 2 · personalisieren, automatisieren, messen"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("AI and Measurement · one case", "AI and Measurement · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · AI-based control system", "Level 3 · KI-gestütztes Steuerungssystem"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Control System Memo · CDO", "Control System Memo · CDO"), minutes: TASK2_MINUTES },
  ],
});
