/* Portfolio metrics: the ONE source for every number on the site.
   The repo is public. Only add a metric after Justin has cleared it. */
window.PORTFOLIO_METRICS = [
  /* Knowledge Cards (Bing, 2021-2022). Team results; Justin contributed design. */
  { id: "kc-revenue", caseStudy: "knowledge-cards", kind: "metric", rank: 1, home: true,
    value: "$2.2M", label: "annual revenue from a shopping integration in Knowledge Cards" },
  { id: "kc-dau-growth", caseStudy: "knowledge-cards", kind: "metric", rank: 2, home: true,
    value: "5x", label: "year-over-year growth in Knowledge Card daily users (1M+ added)" },
  { id: "kc-languages", caseStudy: "knowledge-cards", kind: "metric", rank: 3, home: true,
    value: "100+", label: "languages: Knowledge Cards shipped on desktop and mobile" },
  { id: "kc-refresh-dau", caseStudy: "knowledge-cards", kind: "metric", rank: 4, home: true,
    value: "40%+", label: "lift in feature-card daily users after a UX refresh" },
  { id: "kc-click-share", caseStudy: "knowledge-cards", kind: "metric", rank: 5, home: true,
    value: "+31%", label: "Knowledge Card click share" },
  { id: "kc-features-quarter", caseStudy: "knowledge-cards", kind: "metric", rank: 6, home: true,
    value: "31", label: "Knowledge Card features shipped in a single quarter" },
  { id: "kc-design-system", caseStudy: "knowledge-cards", kind: "proof", rank: 20,
    text: "Rebuilt the Knowledge Card design system so other Bing teams could reuse its components without breaking the experience." },

  /* MSN ecosystem (2022-2026, including Microsoft Start, now MSN) */
  { id: "msn-event-reach", caseStudy: "msn", kind: "metric", rank: 7, home: false,
    value: "500K–700K", label: "impressions per top event card, with about 100K daily users (English markets)" },
  { id: "msn-event-icons", caseStudy: "msn", kind: "metric", rank: 8, home: false,
    value: "+7–10%", label: "header clicks from event icons, plus 2–4% more navigation clicks" },
  { id: "msn-sole-owner", caseStudy: "msn", kind: "metric", rank: 9, home: true,
    value: "4 → 1", label: "the core design team went from four people to one, and I owned MSN's design system" },
  { id: "msn-deliverables", caseStudy: "msn", kind: "metric", rank: 10, home: true,
    value: "89", label: "design system deliverables shipped in two six-month cycles" },
  { id: "msn-approvals", caseStudy: "msn", kind: "metric", rank: 11, home: false,
    value: "~20", label: "feature designs reviewed and approved in my first six months as design approver" },
  { id: "msn-ui-kit", caseStudy: "msn", kind: "proof", rank: 21,
    text: "Built MSN's UI kit on my own and scaled it to the whole MSN design team." },
  { id: "msn-rebrand", caseStudy: "msn", kind: "proof", rank: 22,
    text: "Design system behind MSN's biggest rebrand in about 30 years, live on msn.com and the Edge new tab page." },
  { id: "msn-frameworks", caseStudy: "msn", kind: "proof", rank: 23,
    text: "Led two core layout frameworks through three manager changes while keeping the live product running." },
  { id: "msn-flex-grid", caseStudy: "msn", kind: "proof", rank: 24,
    text: "Moved article pages from a fixed grid to a responsive flex grid, with components built for every width." },

  /* MAI Horizontals: slot reserved. Metrics come in a later handoff. */

  /* Site-wide (About page) */
  { id: "site-mentoring", caseStudy: "site", kind: "metric", rank: 13, home: false,
    value: "3", label: "designers mentored through Microsoft's mentorship program" },
  { id: "site-trained-lead", caseStudy: "site", kind: "proof", rank: 25,
    text: "Trained a designer who went on to lead Knowledge Card design." }
];

/* Returns metrics sorted by rank. opts: { caseStudy, kind, homeOnly, limit } */
window.getPortfolioMetrics = function (opts) {
  opts = opts || {};
  var list = window.PORTFOLIO_METRICS.filter(function (m) {
    if (opts.caseStudy && m.caseStudy !== opts.caseStudy) return false;
    if (opts.kind && m.kind !== opts.kind) return false;
    if (opts.homeOnly && !(m.kind === "metric" && m.home)) return false;
    return true;
  }).sort(function (a, b) { return a.rank - b.rank; });
  return opts.limit ? list.slice(0, opts.limit) : list;
};
