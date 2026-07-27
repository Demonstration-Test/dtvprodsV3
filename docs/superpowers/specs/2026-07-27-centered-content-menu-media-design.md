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

- Set `--content-max` to exactly `72rem`.
- Set `--page-gutter` to
  `clamp(1.25rem, 6vw, 6rem)` above the mobile breakpoint.
- Keep the existing mobile gutter token unless testing shows it conflicts with
  the menu rail-clearance contract.
- Compute section inline padding from the larger of the responsive gutter or
  `calc((100vw - 72rem) / 2)`.
- Keep headings, paragraphs, buttons, metadata, and captions left-aligned.
- Apply the same frame logic to root-grid sections, the site header, the site
  footer, supporting-page heroes, and homepage content.
- Introduce an inner header container so the sticky header background remains
  full width while the logo, navigation, booking action, and menu trigger
  align to the centered frame.
- Move the homepage hero copy inward using the same frame start.
- Move the hero portrait inward at tablet and desktop widths so the copy and
  portrait read as one centered composition.

At `1440px` wide, the left and right edges of each centered section
composition must be symmetrical within `2px`. The composition must not exceed
`72rem`.

The homepage hero remains full screen. The chapter IDs `story`, `audiences`,
`gallery`, `impact`, `programs`, `plan`, `inquire`, and `book` are eligible for
the viewport-fit contract in their default, non-error state. Eligibility is
based on usable chapter height after fixed interface elements are subtracted:

- desktop usable height is `100svh - 5rem`; when that result is `>=620px`,
  each chapter must be no taller than the usable height plus a `2px`
  rendering tolerance;
- mobile usable height is
  `100svh - 4.5rem - var(--mobile-booking-height)`;
  `--mobile-booking-height` remains exactly
  `calc(4rem + env(safe-area-inset-bottom, 0px))`;
  when the usable result is `>=560px`, each chapter must be no taller than
  the usable height plus `2px`;
- the `home` hero uses the same available-height formula for its breakpoint
  and remains full screen;
- expanded FAQ answers, inquiry validation errors, browser zoom, and
  user-generated wrapping may grow naturally rather than clip;
- any viewport whose computed usable chapter height is below its threshold,
  including the `1073×427` short-landscape case, uses natural document growth
  with no internal section scrollbars.

### 2. Complete responsive navigation overlay

- Render the mobile navigation as a sibling of the sticky header rather than
  as a fixed descendant of the filtered header.
- Position it fixed below the header and above all page content.
- Give it the full remaining dynamic viewport height with internal vertical
  scrolling.
- Use a two-column site-map layout at tablet and short-landscape widths.
- Use a single-column layout on narrow portrait mobile widths.
- Keep the body scroll locked while the menu is open.
- Close the menu on:
  - route or hash navigation;
  - Escape;
  - activation of any destination.
- Move focus into the menu after opening and preserve a visible focus state.
- Escape, trigger-toggle, or cancellation closes return focus to the trigger.
  Route or hash activation follows the destination's normal route or anchor
  focus behavior rather than forcing focus back to the trigger.
- Make the obscured `main`, footer, and sticky mobile booking action inert
  while the overlay is open, then restore their previous inert state on every
  close path.
- Keep keyboard focus inside the visible header controls and navigation
  overlay while open; Tab and Shift+Tab must wrap within that boundary.
- Preserve the page's pre-open scroll position. Restore the body's prior
  overflow/position styles and scroll position after closing.
- Use a header z-index above the overlay and an overlay z-index above the
  sticky booking bar. The overlay starts at `var(--header-height)`, ends at the
  dynamic viewport bottom, and includes safe-area-aware inline and bottom
  padding.
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

Required label-to-route mapping:

| Label | Route |
| --- | --- |
| Home | `/` |
| About | `/about` |
| Speaking | `/speaking` |
| Speaking Topics | `/speaking-topics` |
| Schools & Colleges | `/schools-colleges` |
| Athletes & Teams | `/athletes-teams` |
| Creatives & Entrepreneurs | `/creatives-entrepreneurs` |
| Organizations & Brands | `/organizations` |
| Workshops | `/workshops` |
| Coaching | `/coaching` |
| Media | `/media` |
| DTV Story | `/dtv-story` |
| FAQ | `/faq` |
| Book Damon | `/book-damon` |

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
- Tab and Shift+Tab remain inside the visible menu/header focus boundary.
- `main`, the footer, and the sticky booking link are inert while open.
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
- Same-route and hash destinations close the menu.
- Body locking preserves and restores the pre-open scroll position and styles.
- Background content becomes inert and is restored on close.
- Tab and Shift+Tab wrap within the visible menu/header focus boundary.
- Every required label resolves to the exact route in the mapping table.

### Style contract tests

- `--content-max` is exactly `72rem`.
- `--page-gutter` is exactly `clamp(1.25rem, 6vw, 6rem)` above the mobile
  breakpoint.
- Centered-frame padding is applied to sections, header content, footer, and
  homepage hero copy.
- Primary framed media uses `contain`.
- Decorative backgrounds remain eligible for `cover`.

### Browser regression tests

- At `1073×427`, opening the burger menu produces a full-height overlay,
  displays all required destinations, and allows the final booking link to be
  reached.
- At `390×844`, the menu is operable, scrollable, and free of horizontal
  overflow.
- At `1440×1000`, representative page content is centered within the agreed
  `72rem` frame with symmetric edge spacing within `2px`.
- Homepage primary images report `object-fit: contain` and remain within their
  frames.
- Representative supporting-page hero, DTV story, contact-sheet, gallery, and
  portfolio images report `object-fit: contain`, retain their intrinsic aspect
  ratio, and remain inside their frame without overflow.
- Visual screenshots cover the homepage story, audience, gallery, a
  supporting-page hero, the DTV story, and a contact-sheet or portfolio route.
- Menu checks cover background inertness, body scroll locking, same-route/hash
  closure, focus restoration, focus wrapping, and the exact destination
  targets.
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
- The Vite base remains `/dtvprodsV3/`; static route generation continues to
  produce direct-loadable route documents and base-aware media URLs.
- `npm run check`, the full Playwright suite, and `git diff --check` pass.
- After approval and implementation, changes are committed to `main`, pushed,
  deployed through GitHub Pages, and verified on the live desktop and mobile
  routes.
- The live URL is
  `https://demonstration-test.github.io/dtvprodsV3/`.
- Live verification includes direct load and browser reload of `/about/`,
  `/media/`, `/faq/`, and `/book-damon/`, plus successful requests for
  representative `/dtvprodsV3/media/` assets.

## Non-Goals

- Rewriting the approved copy or content governance.
- Replacing approved media.
- Center-aligning body text or headings.
- Removing the cinematic split-layout language.
- Changing the static inquiry handoff.
- Adding a backend, CMS, or new dependency.
