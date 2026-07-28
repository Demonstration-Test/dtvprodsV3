# Site-Wide Light Mode

**Project:** Damon J. Young Jr. / DTV Productions V3
**Repository:** `D:\Damon\V3`
**Status:** Approved design; implementation pending written-spec approval

## Objective

Add a compact navbar control that changes the entire DTV Productions V3
website between its current dark presentation and a complete light
presentation.

Dark mode remains the default for a visitor with no saved preference. An
explicit light-mode selection is remembered for later visits. The feature must
preserve the current centered layout, full-screen homepage hero, compact
viewport chapters, complete responsive menu, authentic photography, and
GitHub Pages architecture.

## Theme State Contract

- The document root exposes exactly one of:
  - `data-theme="dark"`
  - `data-theme="light"`
- The local-storage key is `dtv-theme`.
- The only valid saved values are `dark` and `light`.
- Missing, unavailable, malformed, or unexpected storage values resolve to
  `dark`.
- The operating-system color preference does not affect the initial theme.
- Selecting a theme updates:
  - the document `data-theme` value;
  - the navbar control state and accessible name;
  - the `theme-color` metadata;
  - the saved `dtv-theme` value when storage is available.
- If storage read or write throws, the control continues working for the
  current page session without displaying an error.
- Theme changes do not navigate, move the page, or reset the current menu,
  form, tab, gallery, FAQ, or chapter state.

## Pre-Render Initialization

Add a small inline initialization script in `index.html`, before the
application bundle and before the first painted application state.

The script:

1. reads `dtv-theme` inside a `try/catch`;
2. accepts only the exact value `light`;
3. otherwise selects `dark`;
4. sets `document.documentElement.dataset.theme`;
5. updates the existing `theme-color` metadata to the matching page color.

This prevents a dark flash when a returning visitor has selected light mode.
It does not use system theme detection and does not require a new dependency.

## Navbar Control

- Add one compact theme button to the sticky navbar beside the Book Damon
  action.
- At responsive widths, place it between Book Damon and the burger-menu
  trigger.
- Keep the button in the sticky header while the responsive navigation is
  open, so it remains available without duplicating it inside the overlay.
- Use the existing icon language or a production-quality inline SVG:
  - sun communicates switching to light;
  - moon communicates switching to dark.
- The icon is decorative; the accessible name communicates the action.
- Accessible names are exact:
  - dark mode: `Switch to light mode`
  - light mode: `Switch to dark mode`
- Expose the current state with `aria-pressed`:
  - `false` in dark mode;
  - `true` in light mode.
- The button has a minimum `44px` interactive target, a visible focus state,
  and contrast-compliant hover/active states in both themes.
- Adding the button must not:
  - compress or hide the brand;
  - wrap the Book Damon label;
  - overlap the burger-menu trigger;
  - create horizontal overflow at `390×844` or `1073×427`.

## Theme Architecture

Keep the existing raw DTV palette tokens as brand constants. Introduce
semantic theme tokens for surfaces that change by mode rather than redefining
`--lens-black` or `--film-white`.

Required semantic roles include:

- page background;
- primary and alternate section backgrounds;
- elevated surface;
- primary text;
- muted text;
- dark and light border lines;
- header background;
- navigation-overlay background;
- media matte;
- field/control background;
- footer background;
- texture and overlay strength.

Dark-mode semantic values reproduce the current deployed presentation.
Light-mode semantic values use:

- warm film-white or soft neutral page and section backgrounds;
- near-black graphite text;
- muted steel-gray supporting text;
- light-gray media mattes;
- translucent dark-gray borders;
- a warm neutral footer and navigation overlay.

Blue, purple, amber, and red brand/semantic accents retain their current
meaning. Any accent whose contrast becomes insufficient receives a darker
light-mode variant without changing its brand role.

## Complete Light Presentation

When `data-theme="light"` is active, no major site region may remain a solid
black or near-black field.

The light treatment covers:

- `html`, `body`, selection, scrollbar, and skip link;
- sticky header, desktop navigation, audience dropdown, Book Damon action,
  theme control, and burger trigger;
- full responsive navigation overlay and its grouped destinations;
- homepage hero, lens texture, copy, metadata, viewfinder marks, portrait
  composition, and motion control;
- all `.section--dark` and `.section--light` homepage chapters;
- supporting-page heroes and route sections;
- story, audience, gallery, takeaway, program, planning, FAQ, inquiry, legal,
  thank-you, and not-found surfaces;
- cards, tabs, disclosures, borders, fields, validation states, review
  panels, and action links;
- site footer and sticky mobile booking action;
- homepage chapter navigation and custom focus cursor.

Alternating sections may use different pale neutral values to preserve
editorial rhythm, but all remain visibly part of the light presentation.

## Hero and Cinematic Treatments

- Preserve the full-screen homepage hero and its current layout.
- Preserve all existing copy and actions.
- Replace the black hero field with a warm light background.
- Replace dark gradients with pale neutral gradients that maintain text and
  portrait separation.
- Keep aperture/lens textures visible at restrained opacity rather than
  removing the cinematic motif.
- Render hero text, metadata, and viewfinder marks in graphite or a
  contrast-compliant muted tone.
- Keep the Damon portrait and all photography in their original colors.
- Do not apply CSS inversion, hue rotation, brightness washing, or opacity
  changes to photographs.
- Preserve transparent cutout containment and current responsive bounds.

## Photography and Media

- Keep `object-fit: contain`, intrinsic proportions, and current frame bounds.
- Change dark media mattes to a light neutral matte in light mode.
- Preserve image captions with a readable light or dark local surface based on
  the image treatment.
- Decorative textures may change opacity or blending mode, but photography
  must not.
- Full-image presentation must remain correct for:
  - homepage Story;
  - Audience imagery;
  - homepage Gallery feature and previews;
  - Programs;
  - supporting-page heroes;
  - Media contact sheets;
  - DTV Story and portfolio compositions.

## Accessibility

- The toggle is a native `button`.
- Its accessible name always describes the action, not only the icon.
- `aria-pressed` accurately represents light-mode activation.
- Keyboard activation works with Space and Enter.
- Focus remains on the button after toggling.
- Theme changes are immediate and require no announcement beyond the changed
  button state/name.
- Both themes preserve visible focus indicators and accessible contrast.
- The responsive navigation focus boundary continues to include the visible
  header controls without trapping users outside the overlay/header region.
- Reduced-motion behavior remains unchanged.

## Responsive Behavior

### Desktop, `1440×1000`

- The theme control sits beside Book Damon without shifting the centered
  navbar composition outside the `72rem` frame.
- The homepage hero and all section compositions remain unchanged in size.
- Light-mode photography and cinematic texture treatments are visually
  balanced.

### Short landscape, `1073×427`

- Book Damon, the theme button, and the menu trigger remain visible and
  separate.
- The open two-column menu remains full height and scrollable.
- Switching theme while the menu is open updates both header and overlay
  without closing the menu or resetting scroll.

### Mobile portrait, `390×844`

- Brand, Book Damon, theme button, and burger trigger fit without horizontal
  overflow.
- The open one-column menu remains usable.
- The sticky mobile booking action remains readable in both themes.
- Homepage chapters and supporting heroes retain their approved viewport
  bounds.

## Component Boundaries

### Theme utility

A focused theme module owns:

- the `ThemeName` type;
- the storage key;
- saved-value validation;
- document and metadata application;
- safe persistence.

It must be usable independently of the navbar component and testable without
rendering the full site.

### Theme state owner

A small provider or hook:

- initializes from the pre-rendered document attribute;
- exposes the current theme and a toggle action;
- keeps React state synchronized with the document;
- avoids duplicating storage and metadata logic.

### Navbar control

The header consumes the theme state and renders the accessible button. Theme
logic does not become part of the existing menu-open/focus-management logic.

## Testing Strategy

Follow strict red-green-refactor cycles.

### Unit tests

- Missing storage value resolves to dark.
- `light` restores light mode.
- `dark` restores dark mode.
- Invalid values resolve to dark.
- Storage read and write failures do not throw.
- Applying a theme updates the root attribute and theme-color metadata.

### Component tests

- Navbar renders the theme control.
- Dark mode exposes `Switch to light mode` and
  `aria-pressed="false"`.
- Activating the control changes the document to light, persists `light`, and
  exposes `Switch to dark mode`.
- A second activation restores and persists dark.
- Focus remains on the control.
- Toggling does not close an open responsive menu.
- Existing menu focus, inert-background, route, and Escape tests remain green.

### Pre-render tests

- The inline initializer appears before the application module.
- Saved light mode is applied before React starts.
- Invalid or unavailable storage produces dark mode without an uncaught
  exception.
- The Vite base remains `/dtvprodsV3/`.

### Style contract tests

- Semantic theme tokens exist for every required surface role.
- Dark defaults retain the current palette.
- Light overrides cover all major surface families.
- Photography is never inverted or filtered.
- Light media matte is applied.
- Existing centered-frame, viewport-height, and contained-image contracts
  remain present.

### Browser regressions

At `1440×1000`, `1073×427`, and `390×844`:

- first load without storage is dark;
- selecting light updates the complete visible viewport;
- reload preserves light without a dark flash;
- selecting dark restores and persists dark;
- the toggle remains visible, focusable, and non-overlapping;
- opening and operating the menu works in both themes;
- toggling while the menu is open preserves its open state and scroll;
- no major region remains an unintended black field in light mode;
- photography retains natural colors and `object-fit: contain`;
- no horizontal overflow, clipped controls, broken images, framework overlays,
  accessibility violations, relevant console errors, or failed requests
  occur.

Visual screenshots cover:

- homepage hero in dark and light;
- short-landscape open menu in light;
- mobile open menu in light;
- homepage Story, Gallery, and Inquiry in light;
- a supporting-page hero, Media contact sheet, and footer in light.

## Acceptance Criteria

- The current dark site remains the default for new visitors.
- A navbar button switches the complete website to light mode.
- Light preference persists across reloads and later visits.
- Returning light-mode visitors do not see a dark first-paint flash.
- The complete homepage, supporting routes, responsive menus, forms, footer,
  and mobile booking action use the light presentation.
- Photography is not color-inverted or cropped.
- The centered frame, full-screen hero, compact section sizing, and responsive
  behavior remain unchanged.
- `npm run check`, the complete Playwright suite, and `git diff --check` pass.
- After implementation approval, the change is committed to `main`, pushed,
  deployed through GitHub Pages, and verified at:
  `https://demonstration-test.github.io/dtvprodsV3/`.

## Non-Goals

- Following the operating-system theme automatically.
- Adding more than two themes.
- Adding a theme settings page.
- Syncing the choice to a user account or backend.
- Replacing approved media, copy, or brand accents.
- Changing the centered layout, page structure, routes, or inquiry handoff.
- Adding a new dependency.
