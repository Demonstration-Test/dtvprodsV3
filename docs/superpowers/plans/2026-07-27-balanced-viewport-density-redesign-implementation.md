# Damon V3 Balanced Viewport Density Redesign — Implementation Plan

Date: 2026-07-27
Design source: `docs/superpowers/specs/2026-07-27-balanced-viewport-density-redesign.md`
Repository: `https://github.com/Demonstration-Test/dtvprodsV3.git`
Production: `https://demonstration-test.github.io/dtvprodsV3/`

## Execution rules

- Preserve the approved DTV visual identity and authentic media.
- Write and run a failing test before each behavior change.
- Keep the homepage hero full-screen; make the remaining homepage chapters viewport-contained only at the approved available-height thresholds.
- Allow natural growth for short screens, enlarged text, expanded FAQ answers, and validation errors.
- Do not add forced scroll snapping, nested scroll areas, fabricated speaking proof, new testimonials, new pricing, or new outcome guarantees.
- Use only the placement amendments and media IDs recorded in the approved redesign specification.
- Keep `/dtvprodsV3/` base-path behavior and deterministic static routes intact.
- Use the in-app Browser first. The prior Browser runtime failure may justify the existing Playwright fallback only if it recurs; record the exact result.
- Compare accepted concepts and latest browser screenshots with `view_image` before handoff.
- Push and deploy only after local checks and visual review pass.

## Task 1 — Lock the redesigned homepage contract with failing tests

### Modify

- `src/pages/__tests__/homePage.test.tsx`
- `src/app/__tests__/siteRoutes.test.tsx`

### Add assertions

- Homepage contains exactly the nine approved chapter IDs:
  - `home`
  - `story`
  - `audiences`
  - `gallery`
  - `impact`
  - `programs`
  - `plan`
  - `inquire`
  - `book`
- Principle / 01 content is absent.
- Homepage Speaking Themes content is absent.
- Standalone Introduction, Motion Story, and Origin Story headings are absent.
- Supporting routes and `/speaking-topics` remain registered.

### RED

Run:

```powershell
npx vitest run src/pages/__tests__/homePage.test.tsx src/app/__tests__/siteRoutes.test.tsx
```

Confirm failures identify the current fourteen-section homepage and removed content.

## Task 2 — Create typed Story and Gallery models

### Create

- `src/content/homeStory.ts`
- `src/content/homeGallery.ts`
- `src/content/__tests__/homeEditorialContent.test.ts`

### Story model

Create the five exact records from the approved specification:

- selector
- heading
- copy
- metadata
- media ID
- derivative base path
- widths
- alt text

### Gallery model

Create the five approved category records and exact media-ID lists. Include feature and preview derivatives without duplicating the one-image Events category.

### Tests

- Story selectors are exactly the approved five names and media IDs.
- Gallery categories are exactly the approved five names.
- Every referenced asset derivative exists in `public/media`.
- No gallery category references a media ID outside the approved placement amendment.
- Removed Principle copy does not appear in the new content models.

### RED/GREEN

Run the test before creating the models, observe the missing-module failure, then create the minimal typed records and rerun.

## Task 3 — Implement the balanced global sizing tokens

### Modify

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/sections.css`

### Add test

- `src/styles/__tests__/balancedScale.test.ts`

Read the CSS as text and assert the locked token values:

- desktop/mobile header heights
- mobile booking height
- content maximum
- section spacing range
- hero/page/section/statement display ranges
- homepage chapter-height formula
- supporting-page hero bound

### RED/GREEN

Run:

```powershell
npx vitest run src/styles/__tests__/balancedScale.test.ts
```

After the expected failure, implement the token values and responsive formulas. Keep body text and accessible target minimums exempt from proportional shrinking.

## Task 4 — Build the consolidated DTV Story chapter

### Create

- `src/components/story/HomeStoryChapter.tsx`
- `src/components/story/__tests__/HomeStoryChapter.test.tsx`

### Remove from homepage only

- `DamonProfile`
- `MotionStory`
- `DtvTimeline`

Do not delete supporting-route content that still uses related data or media.

### Behavior tests

- Default selection is Behind the Lens.
- All five named controls render.
- Selecting each control updates the heading, copy, metadata, image source, and alt text.
- ArrowLeft, ArrowRight, Home, and End move among controls.
- Selected control exposes `aria-pressed` or equivalent selected semantics.
- Both approved route actions and the disclosure remain visible.

### Implementation

- One main image with short fade transition.
- Compact desktop selector rail and mobile selector row/grid.
- Use approved story models only.
- Add `id="story"` and chapter classes.

## Task 5 — Build the homepage Media Gallery

### Replace

- `src/components/portfolio/EditorialPortfolio.tsx`

### Add

- `src/components/portfolio/__tests__/EditorialPortfolio.test.tsx`

### Behavior tests

- Five exact category controls render.
- Events shows one image and no duplicate preview.
- Multi-image categories show the approved feature plus remaining previews.
- Selecting a category changes the feature image.
- Selecting a preview changes the feature image and selected state.
- The primary route action points to `/media`.
- The optional external DTV action and portfolio disclosure remain honest.

### Implementation

- Add `id="gallery"`.
- Desktop: feature image, category rail, compact thumbnails.
- Mobile: feature image and horizontal thumbnail row without nested scrolling of the chapter itself; the thumbnail row may use horizontal overflow with visible controls and keyboard access.
- Use existing responsive AVIF/WebP derivatives.

## Task 6 — Add the homepage chapter navigation

### Create

- `src/components/navigation/HomeChapterNav.tsx`
- `src/components/navigation/__tests__/HomeChapterNav.test.tsx`
- `src/lib/navigation/homeChapters.ts`
- `src/lib/navigation/__tests__/homeChapters.test.ts`

### Tests

- Nine exact labels and IDs.
- Intersection selection chooses largest ratio and resolves ties by viewport-center distance.
- Active anchor uses `aria-current="location"`.
- Activating a destination pushes the hash.
- Initial hash and popstate target the correct chapter.
- Reduced motion selects immediate scrolling.
- Short-height mode exposes previous/current/next controls only.

### Implementation

- Render only on the homepage.
- Desktop labeled rail at the approved breakpoint.
- Mobile dots; short-height three-control fallback.
- Keep targets clear of safe areas, header, and booking bar.
- Do not move focus after chapter navigation.

## Task 7 — Compact Audience, Impact, Programs, and Final CTA chapters

### Modify

- `src/components/audiences/AudienceSequence.tsx`
- `src/components/outcomes/IntendedTakeaways.tsx`
- `src/components/workshops/WorkshopFeature.tsx`
- `src/components/cta/FinalCta.tsx`
- corresponding CSS in `src/styles/sections.css`

### Tests

- Add stable IDs `audiences`, `impact`, `programs`, and `book`.
- Preserve existing audience selection behavior and disclosure.
- Preserve all six approved takeaways and disclaimer.
- Preserve workshop/coaching routes and pricing-context note.
- Preserve final booking and contact actions.

### Implementation

- Reduce media bounds, heading sizes, card minimum heights, and internal gaps.
- Use compact grids that stay within the approved available height at default text scale.
- Preserve natural growth at short-height and accessibility fallbacks.

## Task 8 — Combine Booking Process and FAQ into Plan the Room

### Create

- `src/components/planning/PlanTheRoom.tsx`
- `src/components/planning/__tests__/PlanTheRoom.test.tsx`

### Remove from homepage composition

- standalone `BookingProcess`
- standalone `FaqPreview`

Keep the reusable content and `/faq` route.

### Tests

- Booking Process is the initial tab.
- Tab semantics and roving focus work.
- ArrowLeft, ArrowRight, Home, and End select the expected tab.
- Booking content and action remain.
- FAQ uses the five exact approved preview IDs.
- Audiences is initially expanded.
- FAQ expanded state persists across tab switches.

### Implementation

- Add `id="plan"`.
- Render compact booking steps and existing accessible FAQ accordion within tab panels.
- Allow the chapter to grow when an FAQ answer is expanded on short screens.

## Task 9 — Convert the homepage inquiry into three steps

### Modify

- `src/components/booking/HomeInquiryForm.tsx`
- `src/components/booking/__tests__/HomeInquiryForm.test.tsx`

### Tests

- Contact is the initial step.
- Continue validates only Contact fields.
- The first invalid field receives focus.
- Valid Contact data advances to Event.
- Back preserves values and focuses the Contact heading.
- Event validation covers event type, date, message, and consent.
- Valid Event data prepares Review and focuses its heading.
- Editing after Review invalidates the prepared review.
- Refresh persistence is not added.
- Mailto/copy behavior and disclosures remain unchanged.

### Implementation

- Add `id="inquire"`.
- Use compact progress text and accessible live state.
- Keep React Hook Form state across steps.
- Keep the full booking-route action.
- Permit natural chapter growth when validation errors appear.

## Task 10 — Recompose the homepage and remove obsolete production code

### Modify

- `src/pages/HomePage.tsx`
- `src/lib/motion/MotionSystem.tsx`
- `src/styles/sections.css`

### Delete if no longer imported anywhere

- `src/components/manifesto/ManifestoSection.tsx`
- `src/components/speaking/SpeakingThemeRail.tsx`
- `src/components/profile/DamonProfile.tsx`
- `src/components/story/MotionStory.tsx`
- `src/components/story/DtvTimeline.tsx`
- standalone homepage-only booking/FAQ components after their content is safely migrated

Before deleting, search all imports and preserve anything used by supporting routes.

### Tests

Run the Task 1 homepage contract and the full unit suite. Confirm no deleted copy or headings remain on the homepage.

## Task 11 — Recalibrate all supporting routes

### Modify

- `src/components/layout/PageHero.tsx`
- `src/pages/SupportingPages.tsx`
- shared cards, lists, forms, and route CSS in `src/styles/sections.css`

### Requirements

- Supporting heroes use the approved bounded compact height, not full-screen treatment.
- Reduce card, image, heading, and section sizes consistently.
- Preserve all content, routes, external links, disclosures, and form behavior.
- Avoid oversized fixed minimum heights.

### Tests

- Existing sixteen-route heading tests remain green.
- Add CSS assertions for the supporting-hero bound.
- Direct route browser checks remain required.

## Task 12 — Add the no-JavaScript fallback

### Modify

- `index.html`
- `scripts/__tests__/generateStaticRoutes.test.ts`

### Test

Assert that the built shell contains a `<noscript>` fallback with:

- site name
- approved positioning statement
- booking email
- phone
- Home, About, Speaking, Media, FAQ, and Book Damon links
- base-path-safe route URLs

### Implementation

Add the minimal accessible fallback without duplicating the interactive homepage.

## Task 13 — Expand browser regression coverage

### Modify

- `playwright.config.ts`
- `e2e/site.spec.ts`

### Add coverage

- Chromium full interaction suite at `1440 × 1000`.
- Chromium viewport checks at `1280 × 720`, `390 × 844`, `360 × 740`, `1280 × 650`, and `844 × 390`.
- Firefox and WebKit smoke projects when installed and available.
- Homepage chapter height assertions only at the approved available-height thresholds.
- Natural-growth assertions at short-height sizes.
- Hash initial-load, click, Back, and Forward behavior.
- Keyboard-only Story, Gallery, Plan, FAQ, side-nav, audience, and inquiry flows.
- 200% zoom/enlarged-text clipping and overlap checks.
- Reduced motion.
- No horizontal overflow, broken images, or relevant console errors.
- Axe accessibility scan.

### Flow under test

`Homepage loads → side navigation selects a chapter → Story and Gallery controls update real media/content → Plan tabs and FAQ respond → inquiry validates and reaches review without claiming delivery.`

## Task 14 — Complete local visual QA

### Browser path

1. Attempt the in-app Browser workflow.
2. If the prior kernel-assets failure recurs, record the exact failure and use the existing Playwright fallback.

### Compare

- Approved desktop and mobile concepts.
- Current deployed oversized baseline screenshots.
- Latest balanced desktop, laptop, mobile, and short-height screenshots.

### Fidelity ledger

Record:

- hero composition
- balanced type scale
- media bounds
- chapter-height behavior
- side navigation
- consolidated Story
- category gallery
- Plan tabs
- stepped inquiry
- supporting-page scale
- intentional accessibility fallbacks

Use `view_image` on an accepted concept and the latest browser screenshot in the final comparison pass.

## Task 15 — Validate, commit, deploy, and verify live

### Local commands

```powershell
npm run check
npm run test:e2e
git diff --check
git status -sb
```

### Commit

Commit the complete redesign intentionally with a concise message.

### Deploy

Push `main` and monitor `.github/workflows/deploy-pages.yml` through successful build and deploy jobs.

### Live verification

Verify:

- `https://demonstration-test.github.io/dtvprodsV3/`
- `/media/`
- `/book-damon/`
- one audience route
- `#story`
- `#gallery`
- `#inquire`
- `#book`
- base-aware CSS, JavaScript, font, and media requests
- desktop and mobile interactions
- clean repository status

