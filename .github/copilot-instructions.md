# Justin Suitos portfolio: [justinsuitos.com](http://justinsuitos.com/)
Owner is a systems designer, not an engineer. Explain any manual step as short numbered steps.
## Relay protocol
I receive work in blocks titled "=== HANDOFF W→P #NNN ===" from Justin's planning workspace. Follow them exactly.
Handoffs no longer need a report back. When done, reply with one short line saying what changed.
Use the same number as the handoff. For requests without a handoff, use "#ad-hoc".
## Rules
- Plain HTML/CSS/vanilla JS. No frameworks, npm, CDNs or build step. GitHub Pages, main branch root. Relative paths.
- Site is light; UI and text neutral only. Color only in images/art and prototypes. Use tokens in css/site.css; never hard-code values that have a token.
- Fonts are self-hosted in /fonts: Fraunces for titles, Segoe UI → Selawik → system for body. No other fonts.
- WCAG 2.2 AA always: landmarks, one h1, 4.5:1 text contrast, alt text, visible focus, keyboard nav, reduced motion.
- Mostly visuals, minimal text. Never invent copy, features or pages that weren't requested.
- Public-safe only: no internal codenames, internal data or real company logos in prototypes.
- Keep replies short to save usage.

DONE WHEN
All files exist; fonts load; every page and link works in local preview; the 3 prototypes are clickable in Desktop and Mobile frames; no console errors; layouts hold at 375 / 768 / 1440.

## Fluent UI rule
- Icons, buttons and UI details follow Microsoft Fluent ([https://developer.microsoft.com/en-us/fluentui](https://developer.microsoft.com/en-us/fluentui)).
- Icons come only from Fluent UI System Icons ([https://github.com/microsoft/fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons), MIT license). Save each SVG to /assets/icons/, paste it inline, change fill="#212121" to fill="currentColor", and add aria-hidden="true". Put aria-label on the parent button.
- Never hand-draw icons. Never use an icon CDN, icon font, emoji or another icon set. If an icon can't be downloaded, stop and report the missing file names.
- Buttons are native <button> elements in plain CSS. Never install or load any Fluent package (no React, no Web Components, no build step).
- Button states: :active transform scale(0.98); :focus-visible outline 2px solid #272320 with outline-offset 2px; disabled opacity 0.4 with cursor not-allowed.
- Exact values in a handoff (size, shape, radius, padding, color, font) override every Fluent default. Never change a shape.

## KC entity cards (from #055)
- Hero images: /assets/images/kc/hero/desktop/<slug>.<ext> and /assets/images/kc/hero/mobile/<slug>.<ext>.
- Figma exports (local only, git-ignored, never commit, never copy into the site): /_kc-source/figma/... ; index = /_kc-source/manifest.md.
- Entity cards assemble existing KC heroes and modules (kc-components.css, boards/kc-*.html). Never rebuild a component that exists.
- Public-safe: never put real people, brands, team names or company names from the Figma exports into the site; use the dummy names each handoff gives.
