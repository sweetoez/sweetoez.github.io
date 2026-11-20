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
Microsoft Fluent is the source for buttons and UI details. Icons follow the ICONS rule below (the delivered files are the source of truth).

ICONS: Icons are exported by hand from the design files. They are the source of truth.
- Fluent icons: /assets/icons/.
- Windows taskbar and tray icons: /assets/images/windows/taskbar/.
- Brand logos: /assets/images/brand/.
Use each file exactly as delivered. Never redraw, swap, simplify or source icons elsewhere. Icons that contain currentColor are placed inline so they follow the theme; multicolor icons use <img>. If an icon is missing, keep the coded fallback, list it, and keep building. Never stop the build for an icon.

Controls are native HTML in plain CSS with Fluent states (rest, hover, pressed, focus-visible ring, disabled). Exact design values win over Fluent defaults.

## KC entity cards (from #055)
- Hero images: /assets/images/kc/hero/desktop/<slug>.<ext> and /assets/images/kc/hero/mobile/<slug>.<ext>.
- All KC hero image layers use transparent backgrounds; do not show the gray module placeholder behind them.
- Figma exports (local only, git-ignored, never commit, never copy into the site): /_kc-source/figma/... ; index = /_kc-source/manifest.md.
- Entity cards assemble existing KC heroes and modules (kc-components.css, boards/kc-*.html). Never rebuild a component that exists.
- Public-safe: never put real people, brands, team names or company names from the Figma exports into the site; use the dummy names each handoff gives.

## KC hero + carousel rules (#059)
- Center the logo row on the image or band bottom edge; the hero body starts at that same edge (mobile Designer 212/196/184, Single Image 150/134, desktop Designer 280/264/240).
- The body box is the only bordered hero element (1px #DDD). The image matches its width, and every card seam is one 1px line.
- Mobile Carousel padding is 16px 0 16px 16px; images bleed to the inner right border.
- Scrolling rows (#060): the scroll viewport spans border to border. The start inset (16px) is padding inside the scroller, plus scroll-padding-left if snapping. No right padding. Content must never clip before the card border on either side.
- Social circles use `/assets/images/kc/brands/<slug>.svg` in the Figma export's order; do not use monograms.
- Every new entity card uses shared classes and does not override these layout rules.
- KC module images: /assets/images/kc/modules/<slug>/<slug>-<platform>-<module>-<NN>.png. The map is /_kc-source/kc-image-map.csv (local). When building or rebuilding any kc-<slug> page, fill image slots from this folder by module and order. Files narrower than 85% of their slot are scroll-edge crops: show them left-aligned at natural size over the gray placeholder. Empty slots stay #D3D3D3.

## Repo + publishing (from #056)
- Branch main, published by GitHub Pages from main / (root).
- Finish every handoff with one commit: git add -A && git commit -m "<area> #NNN <short summary>". Justin uploads it with Sync Changes in VS Code.
- Never commit /_kc-source/. Never run git init or recreate .git.
- Paths are case-sensitive on GitHub Pages: keep file names lowercase-kebab and match them exactly.
- .nojekyll and 404.html stay at the root. Add a CNAME file only when Justin says the custom domain is ready.

## One component, one source
Every card and widget exists once: markup pattern on its component board, styles in msn-components.css. Shells and pages (Windows panel, Edge new tab page, case studies) reuse that exact markup and those classes. They may add only layout (grid placement) and theme overrides scoped to the shell. Never re-create a component's styles inside a shell. If a component needs a new detail, add it to the shared component so every use gets it.
