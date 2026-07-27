# Centered Content, Complete Menu, and Full-Image Presentation

**Project:** Damon J. Young Jr. / DTV Productions V3  
**Repository:** `D:\Damon\V3`  
**Status:** Approved design; implementation pending written-spec approval

## Objective

Refine the existing responsive site so its editorial layouts feel centered
inside a calmer page frame, the burger menu provides a complete and usable
site map, and primary photographs are displayed in full rather than cropped.

The update must preserve the cinematic DTV identity, left-aligned typography,
the full-screen homepage hero, viewport-sized homepage chapters, authentic
approved media, and the static GitHub Pages architecture.

## Confirmed Problems

### Content appears pushed toward viewport edges

The current `84rem` content ceiling, `4vw` gutters, and several root-level grid
sections allow split layouts to occupy nearly the full viewport. Some section
components apply the `.section` class to the grid root itself, so limiting
individual children does not consistently constrain the whole composition.

### Burger menu is constrained and incomplete

The mobile navigation is rendered inside the sticky header. The header's
backdrop filtering can establish a containing block for the fixed navigation,
which causes the overlay to behave like it is constrained by the header in
short landscape viewports. The navigation data also omits several useful
direct destinations.

### Primary photographs are cropped

The shared `.frame img` rule applies `object-fit: cover`, and later component
rules repeat the same behavior. This fills frames but removes parts of
portraits, event photographs, portfolio work, and supporting-page media.

## Design

### 1. Centered editorial frame

- Set the primary content ceiling to approximately `72rem`.
- Increase responsive page gutters to approximately `6vw`, capped near
  `6rem`.
- Compute section inline padding from the larger of the responsive gutter or
  the space required to center the `72rem` frame.
- Keep headings, paragraphs, buttons, metadata, and captions left-aligned.
- Apply the same frame logic to root-grid sections, the site header, the site
  footer, supporting-page heroes, and homepage content.
- Introduce an inner header container so the sticky header background remains
  full width while the logo, navigation, booking action, and menu trigger
  align to the centered frame.
- Move the homepage hero copy inward using the same frame start.
- Move the hero portrait inward at tablet and desktop widths so the copy and
  portrait read as one centered composition.

The homepage hero remains full screen. Eligible homepage chapters continue to
fit below the fixed header and mobile booking bar. Short and landscape
viewports may grow naturally when their content cannot fit without clipping.

### 2. Complete responsive navigation overlay

- Render the mobile navigation as a sibling of the sticky header rather than
  as a fixed descendant of the filtered header.
- Position it fixed below the header and above all page content.
- Give it the full remaining viewport height with internal vertical scrolling.
- Use a two-column site-map layout at tablet and short-landscape widths.
- Use a single-column layout on narrow portrait mobile widths.
- Keep the body scroll locked while the menu is open.
- Close the menu on:
  - route or hash navigation;
  - Escape;
  - activation of any destination.
- Move focus into the menu after opening, return focus to the trigger after
  closing, and preserve a visible focus state.
- Ensure the menu contains direct access to:
  - Home
  - About
  - Speaking
  - Speaking Topics
  - Schools & Colleges
  - Athletes & Teams
  - Creatives & Entrepreneurs
  - Organizations & Brands
  - Workshops
  - Coaching
  - Media
  - DTV Story
  - FAQ
  - Book Damon

The menu may group audience destinations visually, but every destination must
remain a normal keyboard-accessible link.

### 3. Full-image media presentation

- Use `object-fit: contain` and centered positioning for primary editorial
  images in:
  - the homepage story selector;
  - audience imagery;
  - the homepage category gallery and previews;
  - workshops and coaching imagery;
  - supporting-page heroes;
  - DTV story compositions;
  - contact sheets, galleries, and portfolio frames.
- Add a neutral dark cinematic matte behind contained images so unused frame
  space looks intentional.
- Preserve `object-fit: cover` only for decorative textures and true
  background treatments.
- Preserve `object-fit: contain` for transparent Damon cutouts.
- Do not stretch source images or change their intrinsic proportions.
- Keep the existing viewport-height limits; showing the full image must not
  reintroduce oversized homepage chapters.

## Responsive Behavior

### Desktop, approximately `1440×1000`

- Header and page content align to the same centered frame.
- Editorial split layouts remain side by side.
- Homepage sections remain no taller than the usable viewport where eligible.
- Primary images are fully visible inside their frames.

### Tablet and short landscape, including `1073×427`

- The menu fills the viewport below the header.
- Menu destinations appear in two compact columns and remain scrollable.
- Page content does not show through as if the overlay has ended early.
- Content is inset from both viewport edges.
- Sections may grow vertically rather than clip content.

### Mobile portrait, `390×844`

- The menu uses one scrollable column.
- Homepage dot navigation remains clear of text.
- Homepage chapters continue to fit the usable viewport when eligible.
- Supporting-page heroes remain at or below the existing `710px` target.
- Contained images remain legible and do not create horizontal overflow.

## Accessibility

- The trigger must accurately expose `aria-expanded` and
  `aria-controls`.
- The navigation retains its `Mobile` accessible name.
- Escape closes the overlay.
- Opening the menu moves focus to the first destination.
- Closing it returns focus to the trigger when the close was not caused by
  route navigation.
- All destinations are reachable by keyboard.
- No internal scroll trap prevents reaching the final booking link.
- Reduced-motion behavior remains unchanged.

## Testing Strategy

Follow strict red-green-refactor cycles.

### Component tests

- The header renders the complete mobile destination set.
- Opening the menu moves focus to its first link.
- Escape closes the menu and returns focus to the trigger.
- Route changes close the menu.

### Style contract tests

- The content ceiling is narrower than the previous `84rem`.
- Centered-frame padding is applied to sections, header content, and footer.
- Primary framed media uses `contain`.
- Decorative backgrounds remain eligible for `cover`.

### Browser regression tests

- At `1073×427`, opening the burger menu produces a full-height overlay,
  displays all required destinations, and allows the final booking link to be
  reached.
- At `390×844`, the menu is operable, scrollable, and free of horizontal
  overflow.
- At `1440×1000`, representative page content is centered within the agreed
  frame.
- Homepage primary images report `object-fit: contain` and remain within their
  frames.
- Existing homepage viewport-height, route, accessibility, inquiry, reduced
  motion, and broken-image checks remain green.

## Acceptance Criteria

- Content is visibly inset and centered across all routes while text remains
  left-aligned.
- The burger menu fills the remaining viewport and exposes every required
  destination.
- The screenshot-sized short-landscape viewport no longer reveals page
  content as though the menu ended early.
- Primary images display their full source composition without stretching.
- Decorative imagery retains intentional cropping only where explicitly
  allowed.
- No tested viewport has horizontal overflow, clipped controls, broken images,
  framework overlays, or relevant console errors.
- `npm run check`, the full Playwright suite, and `git diff --check` pass.
- After approval and implementation, changes are committed to `main`, pushed,
  deployed through GitHub Pages, and verified on the live desktop and mobile
  routes.

## Non-Goals

- Rewriting the approved copy or content governance.
- Replacing approved media.
- Center-aligning body text or headings.
- Removing the cinematic split-layout language.
- Changing the static inquiry handoff.
- Adding a backend, CMS, or new dependency.
