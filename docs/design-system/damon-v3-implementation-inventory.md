# Damon V3 Implementation Inventory

Date: 2026-07-27  
Status: Approved implementation source  
Concepts: `docs/design-concepts/01-desktop-hero.png` through `10-mobile-inquiry.png`

## Visual thesis

The site is a cinematic editorial hybrid: authentic DTV photography, oversized condensed statements, quiet serif reflection, restrained camera metadata, square-edged interactive controls, and alternating Lens Black and Film White bands. It must never imply that portfolio subjects attended a speaking engagement.

## Color lock

| Token | Value | Role |
| --- | --- | --- |
| Lens Black | `#080808` | Primary dark background |
| Film White | `#f4f0e8` | Warm reading surface |
| Graphite | `#171717` | Secondary dark surface and panels |
| Steel | `#8c9299` | Borders, metadata, muted text |
| Focus Blue | `#2d6bff` | Primary action, focus, active state |
| DTV Purple | `#7b2cbf` | Restrained brand accent sampled from authentic media |
| Warm Amber | `#c88a3d` | Rare human accent sampled from photography |
| Error | `#c62828` | Validation |

No unapproved gradients or image tints. Edge fades may blend transparent media into Lens Black. Generated textures remain decorative and low opacity.

## Typography

- Display: `Bebas Neue`, condensed sans fallback.
- Editorial: `Cormorant Garamond`, Georgia fallback.
- Body/UI: `Manrope`, system sans fallback.
- Metadata: `Space Mono`, monospace fallback.
- H1: uppercase, condensed, `clamp(4rem, 10vw, 9.5rem)`, line-height `0.82`.
- H2: uppercase, condensed, `clamp(3rem, 7vw, 7rem)`, line-height `0.88`.
- Body large: `clamp(1.125rem, 1.7vw, 1.5rem)`, line-height `1.55`.
- Controls: uppercase display or metadata face by role; never browser-default typography.

## Spacing and containers

- Maximum reading width: `76rem`.
- Wide media width: `92rem`.
- Desktop gutter: `clamp(1.5rem, 4vw, 5rem)`.
- Section padding: `clamp(5rem, 11vw, 10rem)`.
- Mobile gutter: `1.25rem`.
- Geometry: square corners by default; `0.125rem` maximum softening.
- Borders: one-pixel Steel at low opacity; selected borders use Focus Blue.

## First viewport and allowed copy

Navigation: Home, About, Speaking, Audiences, Workshops, Media, DTV Story, Book Damon.

Hero label: `MOTIVATIONAL SPEAKER • ENTREPRENEUR • VISUAL STORYTELLER`

H1: `DESTINED TO VENTURE.`

Supporting copy: `Damon J. Young Jr. helps students, athletes, creatives, and organizations turn vision into disciplined action.`

Actions: `BOOK DAMON TO SPEAK`, `WATCH HIS STORY`, `EXPLORE DTV PRODUCTIONS`.

No other visible above-the-fold claims, badges, proof, statistics, or alternate names are allowed.

## Section sequence

1. Navigation and cinematic hero
2. Manifesto
3. Damon introduction
4. Still-image motion story
5. Audience viewfinder
6. Speaking theme index
7. DTV origin story
8. Curated visual work
9. Intended takeaways
10. Workshops and coaching
11. Three-step booking process
12. FAQ preview
13. Short inquiry builder
14. Final CTA
15. Footer

## Media treatment

- Hero: `MD-020`, transparent cutout, no tint, soft Lens Black edge fade only.
- Motion story: authentic stills `MD-002`, `MD-003`, and `MD-015`; `MD-021` background and `MD-022` low-opacity overlay.
- Audience frames: `MD-004`, `MD-005`, `MD-010`, and `MD-009`; each carries the non-speaking-proof disclosure.
- Themes: editorial crops from `MD-011`, `MD-016`, and `MD-017`.
- DTV story: `MD-002`, `MD-003`, `MD-018`, and `MD-019`.
- Final CTA: `MD-020`, transparent cutout, no tint.
- Decorative textures use empty alt attributes. Authentic media uses manifest alt text.

## Component families

- `PrimaryButton`: square Focus Blue surface, condensed uppercase label, arrow icon.
- `TextLink`: uppercase metadata/display label with rule and arrow icon.
- `Frame`: square media edge, crop marks, optional index and camera metadata.
- `EditorialIndex`: numbered open list separated by rules, no card background.
- `AudienceFrame`: expanded/compact variants with keyboard and pointer selection.
- `Accordion`: square rows, plus/minus SVG, visible focus state.
- `Field`: persistent label, square border, blue focus, red inline error.
- `StickyBookCta`: mobile-only, safe-area aware, never overlaps form completion controls.

## Icon inventory

- Arrow right: custom 24px SVG, two-pixel square-ended stroke.
- Chevron: custom 20px SVG.
- Plus/minus: custom 20px SVG.
- Menu: three two-pixel horizontal strokes plus the visible word `MENU`.
- Viewfinder corners: CSS borders or compact SVG with square ends.
- Information icon: circular outline only where the form disclosure requires it.

## Motion

- One global Lenis owner on capable desktop only.
- Scroll reveals use opacity and short vertical movement; no content begins inaccessible.
- Motion story may crossfade and translate authentic stills.
- Audience selection changes focus frame without autoplay.
- Reduced motion, Save-Data, mobile, low memory/CPU, or WebGL failure selects static rendering.
- Any continuous decorative motion exposes a pause control.

## Responsive rules

- Mobile hero is recomposed, not scaled down: headline first, portrait anchored lower-right, actions remain unobscured.
- Desktop audience viewfinder becomes one expanded vertical frame plus three compact rows.
- All forms become exactly one field per row below `48rem`.
- Sticky booking bar includes safe-area padding and reserves document space.
- Minimum touch target is 44px; primary mobile controls target 48px.

## Accessibility and behavior

- Skip link, semantic landmarks, valid heading order, route title/focus management, visible focus, live route announcement.
- No interaction depends on hover or color alone.
- Form workflow validates locally and clearly states that the static site cannot send or store information.
- The thank-you route appears only after the visitor confirms they sent the prepared email.
