import { bi, t } from "@/lib/lang";

/**
 * Day 8 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 4, Day 2 (AI, automation and systematic success
 * measurement in customer retention). From Day 3 on, a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and Level 2 on one
 * case, Route 2 is Level 3.
 */
export const COURSE = bi({
  title: t("AI, Automation and Systematic Success Measurement in Customer Retention", "KI, Automatisierung und systematische Erfolgsmessung in der Kundenbindung"),
  site: t("Retention Lab · Day 8", "Retention Lab · Tag 8"),
  module: t("Module 4, Day 2 of 2", "Modul 4, Tag 2 von 2"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 8,
  company: "AIConnect Solutions GmbH",
});

export type RouteNo = 1 | 2;

export const BLOCK_MINUTES = { "1.1": 6, "1.2": 5, "1.3": 9, "1.4": 5, "2.1": 11, "2.2": 6, "2.3": 8, "2.4": 14, "3.1": 5, "3.2": 8, "3.3": 10, "3.4": 8, "3.5": 10, "3.6": 9 } as const;
const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]);

export type RouteInfo = { n: RouteNo; href: string; short: string; title: string; level: string; blurb: string; plan: { label: string; minutes: number }[]; built: boolean };

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("AI & measurement", "KI & Messung"),
    title: t("Route 1 · Personalise, automate, measure", "Route 1 · Personalisieren, automatisieren, messen"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t(
      "One case, two levels: AIConnect Solutions talks to every customer the same way, converts few offers and cannot say which of its measures work. You learn how recommendation systems and individualised communication work, where chatbots, dynamic pricing and adaptive systems fit, and how KPIs and A/B tests make a measure measurable. Then you sort nine ideas, read a pilot, decide which contacts to automate, tag twelve metrics, design a fair A/B test and choose three measures inside €200,000 and six months. Material first, then one task that ends in an AI and Measurement File.",
      "Ein Fall, zwei Level: AIConnect Solutions spricht jeden Kunden gleich an, verkauft wenige Angebote und kann nicht sagen, welche seiner Maßnahmen wirken. Sie lernen, wie Recommendation Systems und individualisierte Kommunikation funktionieren, wo Chatbots, Dynamic Pricing und adaptive Systeme passen, und wie KPIs und A/B-Tests eine Maßnahme messbar machen. Dann sortieren Sie neun Ideen, lesen einen Pilot, entscheiden, welche Kontakte automatisiert werden, ordnen zwölf Kennzahlen zu, entwerfen einen fairen A/B-Test und wählen drei Maßnahmen innerhalb von 200.000 € und sechs Monaten. Erst das Material, dann eine Aufgabe, die mit einer AI and Measurement File endet.",
    ),
    plan: [
      { label: t("Materi A · seven cards, Levels 1 and 2", "Materi A · sieben Karten, Level 1 und 2"), minutes: 60 },
      { label: t("Task 1 · AI and Measurement, one task", "Task 1 · AI and Measurement, eine Aufgabe"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Managemententscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
    blurb: t(
      "You are now AIConnect's Chief Digital Officer. There is a lot of data and little use of it, measures cannot be measured, and automation potential lies idle. You set the target vision of an AI-based retention system, choose the technologies worth their cost, build a KPI system for management, write the rules for continuous testing, and make a technology decision although its success cannot be forecast. Material first, then a Control System Memo that assembles itself beside your answers.",
      "Sie sind jetzt Chief Digital Officer von AIConnect. Es gibt viele Daten und wenig Nutzung, Maßnahmen sind nicht messbar, und Automatisierungspotenzial liegt brach. Sie legen das Zielbild eines KI-gestützten Bindungssystems fest, wählen die Technologien, die ihre Kosten wert sind, bauen ein KPI-System für das Management, schreiben die Regeln für laufendes Testen und treffen eine Technologieentscheidung, obwohl sich ihr Erfolg nicht vorhersagen lässt. Erst das Material, dann ein Control System Memo, das sich neben Ihren Antworten selbst zusammensetzt.",
    ),
    plan: [
      { label: t("Materi B · five cards, Level 3", "Materi B · fünf Karten, Level 3"), minutes: 60 },
      { label: t("Task 2 · Control System Memo", "Task 2 · Control System Memo"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
