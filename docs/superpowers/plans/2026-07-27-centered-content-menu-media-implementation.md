# Centered Content, Complete Menu, and Full-Image Presentation — Implementation Plan

Date: 2026-07-27
Design source: `docs/superpowers/specs/2026-07-27-centered-content-menu-media-design.md`
Repository: `https://github.com/Demonstration-Test/dtvprodsV3.git`
Production: `https://demonstration-test.github.io/dtvprodsV3/`

## Execution rules

- Preserve the approved DTV identity, copy, routes, and authentic media.
- Keep visible text left-aligned inside the narrower centered composition.
- Keep the homepage hero full screen and retain the approved chapter-height
  thresholds and short-height natural-growth fallback.
- Write each behavior or style assertion first and confirm that it fails for
  the expected reason before changing production code.
- Keep the Vite base at `/dtvprodsV3/` and preserve deterministic static route
  generation.
- Do not introduce a new dependency, backend, CMS, image replacement, forced
  scroll snap, or nested chapter scrollbar.
- Use the in-app Browser first for rendered QA. Use the existing Playwright
  suite for automated regression coverage.
- Publish only after component, style, route, build, browser, and live checks
  pass.

## Task 1 — Lock the complete navigation contract

### Modify first

- `src/components/layout/__tests__/SiteHeader.test.tsx`

### Add assertions

- The responsive navigation exposes all fourteen approved labels.
- Every label resolves to the exact approved route.
- Opening moves focus to the first destination.
- Escape closes the navigation and returns focus to the trigger.
- Trigger-toggle closure returns focus to the trigger.
- Route, same-route, and hash activation close the navigation without forcing
  focus back to the trigger.
- Tab and Shift+Tab wrap inside the visible header/navigation boundary.
- The trigger retains accurate `aria-expanded` and `aria-controls` state.

### RED

Run:

```powershell
npx vitest run src/components/layout/__tests__/SiteHeader.test.tsx
```

Confirm failures identify the incomplete destination set and missing keyboard
behavior rather than a test setup error.

## Task 2 — Separate the overlay and implement safe menu state

### Modify

- `src/content/navigation.ts`
- `src/components/layout/SiteHeader.tsx`
- `src/app/AppShell.tsx`

### Implementation

- Add the missing direct destinations without changing the desktop audience
  grouping.
- Return the sticky header and responsive navigation as siblings.
- Add an inner `.site-header__inner` container for frame alignment.
- Store the menu trigger and first menu destination in refs.
- On open:
  - preserve body inline positioning and overflow styles;
  - preserve the current scroll position;
  - lock the document without shifting the page;
  - move focus to the first destination;
  - mark `main`, footer, and the sticky booking action inert.
- On every close path:
  - restore the exact prior body styles and scroll position;
  - restore each background element's prior inert state.
- Implement Escape and boundary focus wrapping.
- Restore trigger focus only for Escape, trigger-toggle, and cancellation
  paths.
- Close on pathname, hash, or destination activation.

### GREEN

Rerun the focused header test until it passes, then run:

```powershell
npx vitest run src/components/layout/__tests__/SiteHeader.test.tsx src/app/__tests__/RouteEffects.test.tsx
```

## Task 3 — Lock the centered-frame and full-image style contracts

### Modify first

- `src/styles/__tests__/balancedScale.test.ts`

### Add assertions

- `--content-max` is exactly `72rem`.
- Desktop `--page-gutter` is exactly
  `clamp(1.25rem, 6vw, 6rem)`.
- Shared centered inline padding uses the larger of the page gutter or
  half the viewport remainder outside `72rem`.
- The centered padding contract is applied to:
  - sections;
  - the header inner container;
  - the footer;
  - homepage hero copy/composition.
- Primary `.frame` media uses `object-fit: contain` with centered positioning
  and a neutral dark matte.
- Explicit decorative background selectors may retain `cover`.
- Story, audience, gallery feature/preview, workshop/coaching, page hero, DTV
  story, contact-sheet, and portfolio media do not override primary images
  back to `cover`.
- Existing chapter-height and supporting-hero bounds remain present.

### RED

Run:

```powershell
npx vitest run src/styles/__tests__/balancedScale.test.ts
```

Confirm failures report the current `84rem`, `4vw`, and `cover` contracts.

## Task 4 — Implement the centered layout system

### Modify

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/sections.css`
- `src/components/layout/SiteFooter.tsx` only if an inner wrapper is needed
  to preserve the existing footer grid.

### Implementation

- Change the content ceiling and desktop page gutter to the approved exact
  values.
- Define one reusable centered-inline-padding formula.
- Apply it to root-grid sections rather than relying only on `.section > *`.
- Keep section backgrounds full bleed while constraining their compositions.
- Align header, footer, supporting-page heroes, and homepage sections to the
  same `72rem` frame.
- Move hero copy and portrait inward without changing hero height or copy.
- Preserve the existing mobile gutter unless the compact home rail would
  overlap it.
- Keep the desktop and mobile chapter-height media queries unchanged except
  where selector alignment is required.

### GREEN

Rerun the style test. Then run the homepage and route component tests to catch
layout-class regressions:

```powershell
npx vitest run src/styles/__tests__/balancedScale.test.ts src/pages/__tests__/homePage.test.tsx src/app/__tests__/siteRoutes.test.tsx
```

## Task 5 — Implement full-image media presentation

### Modify

- `src/styles/base.css`
- `src/styles/sections.css`

### Implementation

- Make primary frame images use `contain`, centered positioning, and the
  approved dark matte.
- Remove or override `cover` declarations for:
  - `.home-story__image`;
  - `.audiences__focus-image`;
  - `.portfolio__feature-image`;
  - `.portfolio__preview-image`;
  - `.page-hero__media img`;
  - `.dtv-story__image`;
  - `.contact-sheet img`;
  - workshop/coaching and portfolio frames.
- Preserve `contain` for transparent Damon cutouts.
- Retain `cover` only for named decorative texture/background treatments.
- Preserve each frame's current bounds so showing the full source does not
  enlarge homepage chapters.

### Tests

Run the focused style test and existing Story, Gallery, Audience, and route
tests:

```powershell
npx vitest run src/styles/__tests__/balancedScale.test.ts src/components/story/__tests__/HomeStoryChapter.test.tsx src/components/portfolio/__tests__/EditorialPortfolio.test.tsx src/components/__tests__/compactHomeChapters.test.tsx src/app/__tests__/siteRoutes.test.tsx
```

## Task 6 — Add responsive browser regressions

### Modify first

- `e2e/site.spec.ts`

### Add checks

- `1073×427`:
  - responsive menu begins below the header and reaches the dynamic viewport
    bottom;
  - page content is obscured;
  - two columns render;
  - the final Book Damon link is reachable;
  - no horizontal overflow exists.
- `390×844`:
  - one menu column renders;
  - internal menu scrolling reaches the last destination;
  - focus, Escape, inert background, and body restoration work;
  - the compact home navigation remains clear.
- `1440×1000`:
  - representative section, hero, header, and footer compositions do not
    exceed `72rem`;
  - left and right composition spacing differs by no more than `2px`.
- Homepage Story, Audience, Gallery, and Programs images:
  - computed `object-fit` is `contain`;
  - rendered image bounds remain inside frame bounds;
  - intrinsic aspect ratios are not stretched.
- Supporting About hero, DTV Story, Media contact sheet, and portfolio/gallery
  images satisfy the same image checks.
- Direct load and reload of `/about/`, `/media/`, `/faq/`, and
  `/book-damon/` remain successful.
- No relevant console errors, broken media responses, framework overlays, or
  horizontal overflow occur.

### RED

Run the focused new tests against the current implementation and confirm they
fail on overlay geometry, centered width, or image fitting before relying on
the production changes.

## Task 7 — Complete local functional and visual QA

### Automated checks

Run:

```powershell
npm run check
npm run test:e2e
git diff --check
```

### Browser flow

The flow under test is:

`Homepage loads → responsive menu opens and exposes every destination → menu
keyboard behavior and close paths work → Story, Audience, and Gallery controls
change full-image media → supporting routes retain centered content and
full-image presentation.`

Use the in-app Browser first at:

- `1440×1000`
- `1073×427`
- `390×844`

Verify page identity, meaningful content, no framework overlay, console
health, screenshot evidence, and the target interaction flow.

### Visual comparison

- Inspect the user's supplied screenshot as the broken short-landscape
  reference.
- Capture current local desktop, short-landscape open-menu, mobile open-menu,
  homepage Story/Audience/Gallery, and representative supporting-route
  screenshots outside the repository.
- Use `view_image` on the supplied screenshot and latest corresponding render.
- Record a concise fidelity ledger covering:
  - centered frame;
  - text alignment;
  - hero preservation;
  - menu overlay geometry;
  - complete destination set;
  - keyboard/focus behavior;
  - full-image Story, Audience, and Gallery frames;
  - supporting-page media;
  - chapter-height preservation.

## Task 8 — Commit, publish, and verify GitHub Pages

### Commit

- Review the diff for unrelated user changes.
- Commit the implementation and tests with a concise message.

### Publish

- Push `main`.
- Monitor `.github/workflows/deploy-pages.yml` until both build and deployment
  complete successfully.

### Live verification

Verify:

- `https://demonstration-test.github.io/dtvprodsV3/`
- `/about/`
- `/media/`
- `/faq/`
- `/book-damon/`
- homepage open-menu behavior at desktop-short-landscape and mobile sizes;
- direct route load and reload;
- base-aware CSS, JavaScript, font, and representative
  `/dtvprodsV3/media/` requests;
- centered `72rem` composition;
- full-image homepage and supporting-route media;
- no relevant console errors, broken requests, framework overlays, or
  horizontal overflow.

Leave the local repository clean and synchronized with `origin/main`.
