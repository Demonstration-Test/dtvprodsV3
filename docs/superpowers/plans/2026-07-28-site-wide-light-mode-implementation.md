# Site-Wide Light Mode — Implementation Plan

Date: 2026-07-28
Design source: `docs/superpowers/specs/2026-07-28-site-wide-light-mode-design.md`
Repository: `https://github.com/Demonstration-Test/dtvprodsV3.git`
Production: `https://demonstration-test.github.io/dtvprodsV3/`

## Execution rules

- Preserve the deployed dark theme exactly as the default experience.
- Implement one app-root theme owner; do not create independent component
  theme state.
- Write and run a failing test before each production behavior change.
- Accept only `dark` and `light`; do not add system-theme detection.
- Keep photographs in their natural colors and retain `object-fit: contain`.
- Preserve the centered `72rem` frame, full-screen hero, compact chapters,
  responsive menu, static routes, and `/dtvprodsV3/` base.
- Add no dependency, backend, user account, or settings route.
- Use the in-app Browser first. If its previously recorded local runtime error
  recurs, record it and use the existing Playwright fallback.
- Publish only after unit, build, route, accessibility, responsive, visual,
  deployment, and live checks pass.

## Task 1 — Lock the theme utility contract

### Create first

- `src/lib/theme/__tests__/theme.test.ts`

### Test

- Missing, invalid, and blocked storage resolve to `dark`.
- Exact saved `dark` and `light` values restore correctly.
- Applying dark sets:
  - `data-theme="dark"`;
  - root `color-scheme: dark`;
  - `theme-color` to `#080808`.
- Applying light sets:
  - `data-theme="light"`;
  - root `color-scheme: light`;
  - `theme-color` to `#f4f0e8`.
- Persistence stores only valid theme names.
- Storage read/write failures do not throw.

### RED

Run:

```powershell
npx vitest run src/lib/theme/__tests__/theme.test.ts
```

Confirm the missing theme module is the expected failure.

## Task 2 — Implement the isolated theme utility

### Create

- `src/lib/theme/theme.ts`

### Implementation

- Export `ThemeName`, `THEME_STORAGE_KEY`, exact theme metadata colors,
  saved-value validation, safe read/write helpers, and one document-application
  function.
- Keep DOM mutation and storage error handling inside this module.
- Do not read system theme preferences.

### GREEN

Rerun the focused utility test until it passes.

## Task 3 — Lock pre-render initialization and static-route coverage

### Modify first

- `src/app/__tests__/indexFallback.test.ts`
- `scripts/__tests__/generateStaticRoutes.test.ts`

### Test

- `index.html` contains the theme metadata and initializer before the
  application module.
- The initializer:
  - reads `dtv-theme` safely;
  - accepts only saved `light`;
  - defaults to dark;
  - applies exact root attribute, `color-scheme`, and metadata values.
- Generated `/about/`, `/media/`, `/faq/`, and `/book-damon/` route documents
  retain that ordering and initializer.
- The 404 document safely applies the same stored-theme contract.

### RED

Run:

```powershell
npx vitest run src/app/__tests__/indexFallback.test.ts scripts/__tests__/generateStaticRoutes.test.ts
```

Confirm failures identify the missing initializer and light-aware 404.

## Task 4 — Implement flash-free startup on every route

### Modify

- `index.html`
- `scripts/generateStaticRoutes.ts`

### Implementation

- Add the minimal synchronous head initializer before stylesheet/application
  execution.
- Keep exact dark/light metadata colors in sync with the theme utility.
- Preserve the initializer when cloning the built template into static route
  documents.
- Make the standalone 404 theme-aware without depending on React.

### GREEN

Rerun the index/static-route tests and build once to inspect emitted route
documents.

## Task 5 — Lock provider and navbar-toggle behavior

### Create first

- `src/lib/theme/__tests__/ThemeProvider.test.tsx`

### Modify first

- `src/components/layout/__tests__/SiteHeader.test.tsx`

### Test

- One root provider initializes from the pre-rendered document theme.
- The consumer hook fails clearly outside its provider.
- Dark mode renders `Switch to light mode` with `aria-pressed="false"`.
- Activating the button:
  - applies and persists light;
  - changes the label to `Switch to dark mode`;
  - changes `aria-pressed` to `true`;
  - retains focus.
- A second activation restores and persists dark.
- A storage-write failure still changes the current session.
- Toggling while the responsive menu is open keeps it open.
- Existing menu focus, inert, route, and Escape behavior remains green.

### RED

Run:

```powershell
npx vitest run src/lib/theme/__tests__/ThemeProvider.test.tsx src/components/layout/__tests__/SiteHeader.test.tsx
```

Confirm failures identify the missing provider and navbar control.

## Task 6 — Implement the provider and navbar control

### Create

- `src/lib/theme/ThemeProvider.tsx`

### Modify

- `src/App.tsx`
- `src/components/layout/SiteHeader.tsx`
- `src/components/ui/Icons.tsx`
- `src/styles/sections.css`

### Implementation

- Wrap the application once with `ThemeProvider`.
- Expose a read-only current theme plus a toggle action through one consumer
  hook.
- Add production-quality sun and moon SVG icons.
- Place the native button beside Book Damon and before the responsive menu
  trigger.
- Keep its target at least `44px`.
- Keep theme logic separate from menu state/focus logic.
- Adjust desktop, short-landscape, and mobile header grids without changing
  the centered frame.

### GREEN

Rerun the focused provider/header tests, then the complete component suite.

## Task 7 — Lock the complete light visual contract

### Create first

- `src/styles/__tests__/lightTheme.test.ts`

### Test

- All required semantic theme tokens exist.
- Dark defaults retain current deployed values.
- `[data-theme="light"]` defines the complete pale surface and graphite text
  token set.
- Light rules cover header, menu, hero, dark/light sections, cards, tabs,
  forms, validation, media mattes, footer, mobile booking, chapter navigation,
  and focus cursor.
- Root `color-scheme` follows the active theme.
- Photography receives no inversion, hue rotation, brightness/color wash, or
  opacity fade.
- Existing centered layout, chapter-height, and full-image style tests remain
  green.

### RED

Run:

```powershell
npx vitest run src/styles/__tests__/lightTheme.test.ts src/styles/__tests__/balancedScale.test.ts
```

Confirm failures identify missing semantic tokens and light overrides.

## Task 8 — Implement semantic tokens and complete light styling

### Modify

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/sections.css`

### Implementation

- Add semantic dark defaults and exact light overrides.
- Migrate theme-dependent base surfaces to semantic roles without altering the
  dark appearance.
- Provide targeted light treatments for all surface families listed in the
  specification.
- Rework hero/aperture gradients into pale neutral equivalents.
- Use a light neutral media matte while keeping photography untouched.
- Style native fields, selects, date controls, autofill, scrollbars, focus,
  selected, disabled, hover, active, and error states.
- Meet WCAG 2.2 AA:
  - `4.5:1` normal text;
  - `3:1` large text and meaningful non-text states.

### GREEN

Rerun style tests and the full unit suite.

## Task 9 — Add browser theme regressions

### Modify first

- `e2e/site.spec.ts`

### Add coverage

- Default dark mode with empty storage.
- Light toggle, exact label/state, focus retention, and stored value.
- Reload persistence without a dark first-paint mutation.
- Return to dark and persistence.
- Direct saved-light loads/reloads of `/about/`, `/media/`, `/faq/`, and
  `/book-damon/`.
- Blocked-storage fallback to dark on the next direct load.
- Toggling while the responsive menu is open preserves open state and scroll.
- Exact navbar fit and menu operation at:
  - `1440×1000`;
  - `1073×427`;
  - `390×844`.
- Computed light surfaces across hero, Story, Gallery, Inquiry, footer,
  supporting hero, Media contact sheet, and mobile booking.
- Native control `color-scheme`, field/select/date/autofill styling, and
  representative contrast.
- Photography remains naturally colored and contained.
- Axe, no horizontal overflow, no clipping, no broken images, no relevant
  console errors, and no failed requests.

### RED/GREEN

Run the focused new browser cases against the current implementation, observe
the missing-toggle failure, then rerun after implementation.

## Task 10 — Complete visual QA

### Browser flow

`First dark visit → navbar switches complete site to light → responsive menu
opens and remains open through a theme change → reload restores light →
supporting routes first-paint light → navbar restores dark.`

Attempt the in-app Browser first, then use the approved Playwright fallback
only if the recorded runtime failure recurs.

Capture screenshots outside the repository at:

- homepage hero dark and light, `1440×1000`;
- light open menu, `1073×427`;
- light open menu, `390×844`;
- light Story, Gallery, Inquiry, supporting hero, Media contact sheet, and
  footer.

Use `view_image` on dark and light renders in the final comparison. Record a
fidelity ledger covering:

- unchanged layout and copy;
- complete light surfaces;
- hero texture and portrait;
- navbar control fit;
- menu persistence;
- photography color and containment;
- fields and validation;
- contrast/focus;
- mobile booking and footer.

## Task 11 — Validate, commit, publish, and verify live

### Local checks

```powershell
npm run check
npm run test:e2e
git diff --check
```

### Commit and publish

- Review the diff for unrelated user changes.
- Commit the implementation and tests.
- Push `main`.
- Monitor `.github/workflows/deploy-pages.yml` through successful build and
  deploy jobs.

### Live verification

At `https://demonstration-test.github.io/dtvprodsV3/` verify:

- dark default;
- complete light toggle and persistence;
- exact root `data-theme`, `color-scheme`, and metadata values;
- saved-light direct load/reload on `/about/`, `/media/`, `/faq/`, and
  `/book-damon/`;
- desktop, short-landscape, and mobile header/menu behavior;
- natural contained photography;
- base-aware CSS, JavaScript, font, and media requests;
- no broken requests, application errors, framework overlays, clipping, or
  horizontal overflow.

Leave the local repository clean and synchronized with `origin/main`.
