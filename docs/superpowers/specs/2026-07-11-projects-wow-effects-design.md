# Projects animation fix + section wow effects — Design

Date: 2026-07-11 · Approved by user.

## Scope

Four component changes plus two quick wins. No new dependencies (GSAP already installed).

### 1. ProjectsSection — fix stacked deck

- Restore `flex flex-col md:flex-row gap-6 md:gap-10` on inner card container (was commented out → image/content stacked at broken widths).
- Delete per-card entrance `fromTo` tween — it fought `position: sticky` pinning and conflicted with the scrub tween over `opacity`.
- Keep the scrub tween (scale 0.92 + dim to 0.5) as the only card animation; add `transformOrigin: "center top"` and a 2px blur on recede for depth.
- Replace duplicate Unsplash image on project 3.

### 2. Testimonials — spotlight rotation

- Replace static 3-card grid with one large featured serif quote, crossfading every 6s (GSAP), avatar row below as nav (click to jump; auto-rotation pauses on hover).
- Marquee rejected: 3 testimonials repeat visibly every few seconds. Revisit when 6+ exist.

### 3. WhyWorkWithMe — spotlight cards

- Mouse-follow radial orange glow overlay per card (CSS vars set on `mousemove`, radial-gradient overlay fades in on hover). Icon micro-scale on hover.

### 4. AboutMe — animated stat counters

- Stats (8+, 50+, $10M+, 99.9%) count up on scroll into view via GSAP textContent tween with snap. Prefix/suffix preserved.

### Quick wins

- `Cta.tsx`: dead `href="#"` on "Book a Free Consultation" → mailto (same address as other CTAs).
- `layout.tsx`: title includes name ("Emmanuel Holonou"); add OpenGraph + Twitter card metadata. `metadataBase` deferred until production domain confirmed.

## Out of scope (backlog from audit)

Real project content + case-study pages, font-weight pruning (18 → ~4), `next/image` migration, domain email, sitemap/robots/JSON-LD, testimonial verification links, consistent stats copy.

## Verification

`npm run lint` + `npm run build` pass; manual scroll-through of all four sections.
