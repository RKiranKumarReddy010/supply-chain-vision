## Axis Analytics — Dark Premium Landing Page with Scroll-Driven 3D Supply Chain

A high-end, monochrome single-page site for an analytics & consultancy company. The centerpiece is a 3D supply chain scene where a truck travels from a warehouse, along a curved route, to a retail store as the user scrolls — each stage revealing the next content section.

---

### Page Sections (top → bottom)

1. **Sticky Navigation** — Logo "AXIS // ANALYTICS", links (Services, Solutions, Insights, Contact), subtle "Book a consult" CTA.
2. **Hero + 3D Stage (sticky canvas, scroll-driven)**
   - Left: rotating headline tied to scroll progress
     - 0% — "Supply Chain Intelligence, Engineered."
     - 33% — "Map every node. Measure every move."
     - 66% — "From warehouse to shelf — optimized."
     - 100% — "Decisions, delivered."
   - Right/full-bleed: dark 3D scene
   - Scroll progress bar + stage labels: `01 Warehouse · 02 Transit · 03 Retail`
3. **Stats strip** — 4 KPIs (e.g., "32% avg. logistics cost reduction", "120+ engagements", "18 industries", "4 continents") with thin dividers.
4. **Services** — 3-card grid: Supply Chain Analytics, Network Optimization, Demand Forecasting. Hover lifts card with hairline border glow.
5. **Process** — 4-step horizontal timeline: Diagnose → Model → Optimize → Operate.
6. **Case Studies** — 2 featured cards with monochrome imagery placeholders + outcome metric.
7. **Testimonial** — single oversized quote, client + logo line.
8. **CTA band** — "Ready to optimize your network?" + email capture + button.
9. **Footer** — minimal, columns for company, services, legal, socials.

---

### 3D Scene Design (Dark Premium)

- **Palette:** background `#0A0A0A`, models in white/greys (`#F5F5F5`, `#9A9A9A`, `#3A3A3A`), accent rim light pure white. No color anywhere in the site beyond white/black/grey.
- **Models (low-poly, built in code with primitives — no external assets needed):**
  - Warehouse: extruded box with sloped roof, loading-bay door slits, small antenna.
  - Route: smooth Catmull-Rom curve rendered as a dotted/dashed white tube on a subtle grid floor.
  - Truck: cab + cargo box (two boxes), 4 wheels, oriented along curve tangent.
  - Store: smaller building with awning and a window strip.
  - Floor: large dark plane with faint white grid, fading to black at edges (radial mask).
- **Lighting:** key directional light + soft ambient + a single rim light to give edges a subtle white glow. Slight fog for depth.
- **Animation (scroll-driven):**
  - Truck position interpolates along the curve based on page scroll progress.
  - Camera orbits gently (small yaw shift + dolly) across the scroll range.
  - Warehouse "pulses" (faint emissive) when truck departs; store pulses when truck arrives.
  - Route reveals progressively (dashes animate in) as truck advances.
- **Fallback:** if WebGL fails, show a static monochrome SVG of the same scene so the page never breaks.

---

### Visual System

- **Typography:** Display — `Space Grotesk` (tight, modern). Body — `Inter`. Mono accents — `JBM` for labels like `01 / WAREHOUSE`.
- **Color tokens (HSL in `index.css`):** background near-black, foreground near-white, muted greys, single hairline border token. Light theme intentionally not supported on this page.
- **Motion:** fade-in + slight rise on section entry (IntersectionObserver), hairline underline hover on links, 200ms eases everywhere.
- **Layout:** generous whitespace, max-width 1280, 12-col grid feel, thin 1px dividers between sections.

---

### Technical Details

- Add deps: `three@0.160.0`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0` (R3F v8 for React 18 compatibility).
- New components:
  - `src/components/three/SupplyChainScene.tsx` — Canvas + scene composition, exposes scroll progress via prop.
  - `src/components/three/Warehouse.tsx`, `Truck.tsx`, `Store.tsx`, `Route.tsx`, `GridFloor.tsx` — primitive-based models.
  - `src/components/Hero.tsx` — sticky 3-viewport-tall section that hosts the Canvas and overlays text.
  - `src/components/Nav.tsx`, `Stats.tsx`, `Services.tsx`, `Process.tsx`, `CaseStudies.tsx`, `Testimonial.tsx`, `CTA.tsx`, `Footer.tsx`.
  - `src/hooks/useScrollProgress.ts` — returns 0–1 progress for a target ref.
- Update `src/pages/Index.tsx` to compose the new sections; remove placeholder.
- Update `src/index.css` design tokens for the dark monochrome palette and load Google Fonts via `<link>` in `index.html`.
- Tailwind config: extend with `fade-in`, `rise-in` keyframes (already partly present) and font-family tokens.
- Performance: cap DPR at `[1, 1.75]`, `frameloop="demand"` invalidated on scroll, suspense fallback = static gradient.

---

### Out of scope (can add later)
- Backend/forms wiring (CTA email capture will be UI-only for now).
- Multi-page routing — everything lives on `/`.
- CMS or real case study content.
