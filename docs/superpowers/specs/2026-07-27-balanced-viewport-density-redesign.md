# Damon V3 Balanced Viewport Density Redesign

Date: 2026-07-27  
Status: Approved design, revised after independent written-spec review  
Target: Damon V3 homepage and all supporting routes

## 1. Objective

Recalibrate Damon V3 from an oversized cinematic presentation into a balanced editorial website while preserving its photography-led identity. The redesigned site must:

- Reduce display typography, major media, and section spacing by approximately 25–35% at the tested viewports. Body text, form controls, and minimum touch targets are exempt from proportional reduction so readability and accessibility do not regress.
- Keep the homepage hero full-screen.
- Present each major homepage chapter within the visible viewport instead of creating sections taller than the viewport.
- Retain natural, smooth navigation without forced scroll snapping.
- Reduce redundant homepage sections and overall scroll distance.
- Add quick side navigation with desktop labels and compact mobile dots.
- Apply the smaller scale consistently to every supporting page.
- Preserve accessible text, controls, focus behavior, reduced-motion support, and honest inquiry behavior.

The design must continue to use Damon’s approved photography and DTV visual language. It must not imply that portfolio photography documents speaking engagements.

## 2. Approved Direction

Use responsive viewport chapters rather than strict scroll snapping or a purely continuous compact page.

Every homepage chapter targets the visible space below the sticky header. On phones, the available height also accounts for the sticky booking bar. Content-heavy sections use selectors, tabs, or steps so their primary state remains within the available viewport.

Natural scrolling remains in control:

- Capable desktop devices retain the existing coordinated smooth-scroll system.
- Mobile, reduced-motion, save-data, and lower-powered devices use native scrolling.
- Section-navigation links request smooth movement only when the active motion profile permits it.
- There is no mandatory wheel, touch, or keyboard scroll snapping.

Accessibility takes precedence over strict containment. At extreme browser zoom, enlarged system text, or unusually short viewports, sections may grow rather than clip content or create an internal scroll trap.

## 3. Homepage Information Architecture

The homepage changes from fourteen major sections to nine viewport chapters.

### 3.1 Hero

- Remains the first full-screen chapter.
- Occupies the visible viewport below the header.
- Retains the authentic Damon cutout, aperture treatment, viewfinder corners, primary booking action, story link, DTV Productions link, and desktop motion control.
- Uses the new balanced typography and portrait scale.

### 3.2 DTV Story

Consolidates the existing Introduction, Authentic Visual Story, and Origin Story sections into one interactive chapter.

The chapter contains:

- One main image.
- A concise heading and contextual paragraph.
- Five named selectors with the following locked content and media:

| Selector | Heading | Supporting copy | Metadata | Media | Alt text |
| --- | --- | --- | --- | --- | --- |
| Behind the Lens | The work behind the vision. | Damon built DTV through photography, creative direction, and the discipline to keep moving before the full road was visible. | `BEHIND THE LENS / 002` | `MD-002` | Damon J. Young Jr. composing a photograph outdoors with a professional camera. |
| Building the Craft | Preparation becomes the practice. | Working behind the camera turned ideas into a repeatable craft built through planning, direction, and attention to the person in front of the lens. | `CRAFT IN MOTION / 003` | `MD-003` | Damon photographing an athlete during an outdoor creative session. |
| DTV Begins | DTV Productions begins. | In 2020, the creative work became DTV Productions: a place to build photography, direction, and entrepreneurial discipline into a focused practice. | `ORIGIN / 2020` | `MD-015` | Dramatic studio portrait lit against a deep red stage. |
| The Name Evolves | DamonTV becomes a wider idea. | The name evolved as the work expanded beyond individual projects toward a larger story about movement, possibility, and intentional growth. | `EVOLUTION / DAMONTV` | `MD-019` | Montage of colorful sports media-day portraits. |
| Destined to Venture | The idea becomes the mission. | What began behind the lens became a wider commitment to movement, discipline, entrepreneurship, and possibility. | `MISSION / DTV` | `MD-020` | Damon J. Young Jr. wearing a purple DTV shirt and black DTV cap. |

- A short statement and camera-style metadata associated with each selection.
- A primary “Read the DTV Story” action to `/dtv-story` and a smaller “Meet Damon” action to `/about`.
- A disclosure explaining that the imagery represents DTV visual-storytelling work and does not document a speaking engagement.

The generic labels “Frame 01” and “Frame 02” are removed. The selector must support pointer, keyboard, and screen-reader use. Selection changes update the image and descriptive text with a short fade.

Copy retained from the old homepage is limited to the approved Introduction paragraph, the 2020/DamonTV/Destined to Venture timeline facts, and the final “What began behind the lens…” sentence shown in the matrix. The old Motion Story boilerplate and generic frame labels are removed. The deleted Principle / 01 statement and its definition must not be reintroduced in this chapter.

The user’s approval of this consolidated five-state Story chapter on 2026-07-27 records a homepage-placement amendment for `MD-015`, `MD-019`, and `MD-020` in this chapter. Rights and disclosure status continue to inherit the approved media manifest.

### 3.3 Audience Pathways

- Retains the existing four audience pathways.
- Uses one main image and four compact selectors.
- The selected pathway updates the image, title, copy, and action.
- The desktop layout prioritizes the image while keeping all selectors visible.
- The mobile layout uses a compact selector row or grid that does not force the chapter beyond the available height.
- The existing imagery disclosure remains.

### 3.4 Homepage Media Gallery

Replaces the two-image Curated Visual Work section with the homepage’s primary gallery preview.

Categories:

1. Events
2. Sports / Media Day
3. Graduation
4. Creative Editorial
5. Portrait / Fashion

Category media is locked to the available approved inventory:

| Category | Approved homepage media |
| --- | --- |
| Events | `MD-018` |
| Sports / Media Day | `MD-005`, `MD-012`, `MD-019` |
| Graduation | `MD-004`, `MD-013`, `MD-014` |
| Creative Editorial | `MD-010`, `MD-011`, `MD-015` |
| Portrait / Fashion | `MD-009`, `MD-016`, `MD-017` |

Each category provides one featured image and, when the category contains more than one approved asset, selectable previews for the remaining images. The Events category intentionally presents one feature image with no duplicate thumbnails. Controls use meaningful accessible names.

Desktop uses a featured image plus compact thumbnail rail. Mobile uses a main image with a horizontal thumbnail strip. All media must come from the approved local DTV asset set.

The user’s approval of this category-rich homepage gallery on 2026-07-27 records a homepage-placement amendment for `MD-012`, `MD-013`, `MD-014`, and `MD-018`. No new files outside `MD-001` through `MD-022` are authorized.

Primary action: “View the full media gallery,” linking to `/media`.  
Secondary action: a smaller external DTV Productions link may remain.

The portfolio disclosure remains visible but compact.

### 3.5 Intended Impact

- Retains the approved intended-takeaway content.
- Uses a compact two-column or balanced grid on desktop.
- Uses concise stacked rows or a small selector on mobile as necessary to remain viewport-contained.
- Does not add outcome guarantees.

### 3.6 Workshops and Coaching

- Retains the two approved paths and supporting Damon photography.
- Uses smaller media and balanced option panels.
- Keeps the existing note that format, capacity, duration, availability, and pricing are confirmed after review.

### 3.7 Plan the Room

Combines Booking Process and Organizer FAQ into one viewport chapter with two tabs:

- Booking Process
- Organizer FAQ

Booking Process is the initial tab. It shows the existing steps in a compact layout and retains the “Start an inquiry” action.

Organizer FAQ shows these existing preview questions: audiences, topics, workshops, travel, and speaker reel. The audiences item is initially expanded the first time the FAQ tab opens. Accordion state persists when switching between Plan tabs. The full FAQ remains available at `/faq`.

Tabs use `tablist`, `tab`, and `tabpanel` semantics, roving `tabindex`, and Left/Right/Home/End keyboard navigation with automatic activation. Switching tabs focuses the newly selected tab, not the panel.

### 3.8 Inquire

Preserves the same fields, validation rules, static-email preparation, and disclosure, but reorganizes the homepage inquiry into three compact states:

1. Contact: first name, last name, work email, organization.
2. Event: event type, preferred date, short message, consent.
3. Review: existing prepared summary with mailto or copy fallback.

Requirements:

- Validate the current step before advancing.
- Preserve entered information when moving backward.
- Do not submit, transmit, or store inquiry data.
- Do not claim the email was sent or delivered.
- Retain a route action to the full booking form.
- Announce step and validation changes accessibly.

State and focus rules:

- Contact is the initial step.
- “Continue” validates only the current step. If invalid, expose an `aria-live` error summary and focus the first invalid field.
- After a successful advance or backward move, focus the new step heading.
- “Back” never clears valid field values.
- Preparing the review focuses the Review heading.
- Returning from Review to edit any field clears the prepared review state. A new review is generated only after the edited data passes validation again.
- Browser refresh resets the unsubmitted homepage form because the design does not persist personal information.
- The full booking route remains independent of homepage step state.

### 3.9 Final CTA

- Retains the approved Damon portrait, heading, booking action, and contact action.
- Fits within the available viewport.
- Leads into the normal document footer.
- The footer remains naturally sized and is not treated as a viewport chapter.

## 4. Removed Homepage Content

Remove these sections entirely:

- Principle / 01:
  - “You do not have to see the entire road to take the next step.”
  - Its supporting Destined to Venture paragraph.
- The standalone Speaking Themes rail and its seven-theme list.

Remove these standalone components from the homepage after consolidating their content:

- Damon Profile
- Motion Story
- DTV Timeline

The corresponding supporting routes and approved content remain available elsewhere on the site.

## 5. Balanced Design System

### 5.1 Global dimensions

The current CSS values are the baseline. These locked targets replace them:

| Token or surface | Current baseline | Redesigned target | Measurement rule |
| --- | --- | --- | --- |
| Desktop header | `6.5rem` | `5rem` | 23% reduction |
| Mobile header | `5.75rem` | `4.5rem` | 22% reduction |
| Content maximum | `96rem` | `84rem` | Bounded width adjustment; exempt from the 25–35% target |
| Page gutter | `1.25rem`–`5.25rem` | `1.1rem`–`4rem` | Responsive edge spacing |
| Section spacing | `5rem`–`10rem` | `3.5rem`–`6.5rem` | 30–35% reduction at range endpoints |
| Mobile sticky booking bar | `4.65rem` plus safe area | `4rem` plus safe area | Preserve a minimum 44px primary action height |

At `1440 × 1000` and `390 × 844`, computed display typography, primary media bounds, and section whitespace should be 25–35% smaller than the current deployed baseline screenshots. A difference outside that band requires an intentional responsive or accessibility reason recorded in the fidelity ledger.

### 5.2 Typography

Locked ranges:

| Type role | Current baseline | Redesigned target |
| --- | --- | --- |
| Hero display | `6.5rem`–`11.5rem`; mobile `5.3rem`–`8.3rem` | `4.75rem`–`7.75rem`; mobile `3.6rem`–`5.4rem` |
| Page display | `5rem`–`10rem` | `3.5rem`–`6.75rem` |
| Section display | `3.6rem`–`7rem` | `2.75rem`–`4.75rem` |
| Statement display | `4rem`–`8.5rem` | `3rem`–`5.75rem` |
| Body | `0.94rem`–`1.08rem` | `0.95rem`–`1.08rem`; readability exemption |
| Large body | `1.08rem`–`1.45rem` | `1rem`–`1.2rem` |
| Labels and metadata | `0.68rem`–`0.75rem` | `0.68rem`–`0.75rem`; readability exemption |

Typography must preserve the existing Bebas Neue, Cormorant Garamond, Manrope, and Space Mono roles.

Buttons, inputs, selects, textareas, checkboxes, and touch targets must not be scaled below accessible minimums. Desktop pointer targets remain at least 32px high where WCAG permits; primary actions and all mobile interactive targets remain at least 44px high, except the space-constrained mobile chapter-rail targets described in Section 6, which use the WCAG 2.5.8 24px minimum plus separation.

### 5.3 Media

- Hero portrait remains dominant without crowding copy. Replace the current desktop `min(62vw, 59rem)` bound with approximately `min(48vw, 44rem)`. Replace the current mobile `115vw`/`80%` media box and `1.3` scale with an approximately `88vw`/`68%` box and no more than `1.12` scale, subject to face-safe cropping.
- Main chapter imagery uses bounded aspect ratios and a maximum height of `min(58vh, 36rem)` on standard desktop viewports.
- Supporting-page hero media reduces from the current 46rem maximum to approximately 34rem.
- Thumbnail imagery uses consistent aspect ratios and visible selected states.
- Media never grows beyond the chapter in typical supported viewports.

### 5.4 Viewport chapter contract

Define shared height tokens:

- `--header-height: 5rem` desktop and `4.5rem` mobile.
- `--mobile-book-height: calc(4rem + env(safe-area-inset-bottom, 0px))`.
- Desktop `--chapter-height: calc(100svh - var(--header-height))`.
- Mobile `--chapter-height: calc(100svh - var(--header-height) - var(--mobile-book-height))`.

The default or collapsed state of every homepage chapter must fit `--chapter-height` when the available chapter height is at least 620px on desktop or 560px on mobile. This covers the required `1280 × 720`, `390 × 844`, and `360 × 740` test viewports after subtracting the relevant chrome.

Responsive safeguards:

- Use `svh` units to avoid mobile browser chrome instability.
- Use `clamp()` and height-aware media queries for short screens.
- Reflow multi-column content into compact states instead of stacking every item vertically.
- “Fits” applies to the default Story selection, selected audience, default gallery category, initial Plan tab, and each inquiry step before errors are shown.
- Permit natural document growth for expanded FAQ answers, validation errors, browser zoom, enlarged system text, translated text expansion, or an available chapter height below the supported minimum.
- Avoid internal section scrollbars.

## 6. Homepage Side Navigation

Add a fixed, route-local homepage chapter navigation on the right.

Desktop:

- Dot plus short label.
- Active chapter indicator.
- Compact progress line or state.
- Use the labeled layout from `min-width: 1024px` when the viewport is at least 650px tall.

Mobile:

- Dots only.
- Active dot is visually distinct.
- Controls stay outside primary text and action hit areas.
- Each dot link has at least a 24px target with at least 8px separation and a meaningful accessible name.
- At raw viewport heights below 680px or in landscape orientation, collapse the rail to three controls: previous chapter, current chapter, and next chapter.

Behavior:

- Links target stable chapter IDs.
- Active state is driven by an `IntersectionObserver`; choose the chapter with the largest intersection ratio, breaking ties by the chapter whose center is closest to the viewport center.
- Click, keyboard activation, route focus, and browser history behavior remain predictable.
- Navigation uses `<nav aria-label="Homepage sections">`. Each destination is an anchor with an accessible chapter name, and the active destination uses `aria-current="location"`.
- Activating a destination pushes its hash with `history.pushState`, scrolls to the chapter, and leaves focus on the navigation control. Initial hashes and browser `popstate`/back/forward navigation scroll to the matching chapter without shifting focus unexpectedly.
- Reduced-motion mode uses immediate navigation.
- The navigation is hidden when printing.
- Place the rail inside `max(env(safe-area-inset-right, 0px), 0.75rem)` and keep it clear of the sticky booking bar and header.

Approved labels:

- Home
- Story
- Audiences
- Gallery
- Impact
- Programs
- Plan
- Inquire
- Book

Stable IDs are `home`, `story`, `audiences`, `gallery`, `impact`, `programs`, `plan`, `inquire`, and `book`.

## 7. Supporting Pages

Apply the balanced global system to all routes:

- Smaller page headings and body copy.
- Smaller header, buttons, cards, images, and section padding.
- Full-screen treatment is exclusive to the homepage hero.
- Supporting-page opening heroes use `min-height: clamp(28rem, 68svh, 42rem)` on desktop and natural content height with a minimum of 28rem on mobile.
- Compact subsequent sections that do not use oversized minimum heights.
- Preserve existing route content, disclosures, navigation, forms, metadata, and media rights.

Supporting routes remain:

- `/about`
- `/speaking`
- `/speaking-topics`
- `/schools-colleges`
- `/athletes-teams`
- `/creatives-entrepreneurs`
- `/organizations`
- `/workshops`
- `/media`
- `/dtv-story`
- `/coaching`
- `/faq`
- `/book-damon`
- `/privacy`
- `/thank-you`

## 8. Motion and Scroll Behavior

- Keep one Lenis owner on capable desktop devices.
- Keep the existing reduced-motion, save-data, mobile, and low-resource fallbacks.
- Shorten reveal distances and durations to match the smaller layouts.
- Story and gallery selections use short opacity/position transitions.
- Side navigation requests the shared scroll coordinator when available and native scrolling otherwise.
- Anchor targets account for the sticky header through `scroll-margin-top`.
- Do not introduce mandatory scroll snapping, wheel hijacking, or nested scroll areas.

## 9. Accessibility and Error Handling

- Preserve semantic landmarks and heading order.
- Preserve the skip link and route announcement.
- Interactive selectors use buttons, visible focus, selected state, and meaningful names.
- Story/gallery image changes expose appropriate alt text and live context without excessive announcements.
- Tab interfaces follow tab, tablist, and tabpanel semantics or use an equally clear button-group pattern.
- Inquiry steps announce the active step and show field errors next to the affected controls.
- No content is clipped at browser zoom or enlarged text settings.
- Reduced-motion mode presents a complete static experience.
- If JavaScript is unavailable, `index.html` provides a concise `<noscript>` fallback containing the site name, positioning statement, booking email link, phone link, and links to Home, About, Speaking, Media, FAQ, and Book Damon. Interactive galleries and forms are explicitly identified as requiring JavaScript; the fallback does not claim they function.

## 10. Testing and Acceptance Criteria

### Automated tests

- Component test for the nine approved homepage chapters and removed content.
- Component tests for named DTV Story selectors and selection changes.
- Component tests for gallery category and thumbnail selection.
- Component tests for homepage side-navigation labels and active-state behavior.
- Component tests for inquiry step validation, backward navigation, retained data, and review preparation.
- Existing content integrity and form-delivery tests remain passing.
- Static route generation and direct-route verification remain passing.

### Browser tests

Test at minimum:

- Desktop: `1440 × 1000`.
- Laptop: `1280 × 720`.
- Mobile: `390 × 844`.
- Small mobile: `360 × 740`.
- Short desktop: `1280 × 650`.
- Mobile landscape: `844 × 390`.
- Reduced motion.
- Chromium for the full interaction suite.
- Firefox and WebKit for page identity, direct routes, overflow, chapter sizing, and primary interaction smoke tests.

Verify:

- Hero fills the visible viewport.
- Each homepage chapter fits the available viewport at normal text scale.
- No horizontal overflow, clipped controls, or broken images.
- Side navigation moves to the requested chapter and updates active state.
- Story selectors update image and content.
- Gallery category and thumbnail controls update the feature image.
- Plan tabs and FAQ accordion work.
- Inquiry steps validate and retain data.
- All supporting routes use the balanced scale and direct-load successfully.
- No relevant application console errors or accessibility violations.
- Keyboard-only operation works for the Story selectors, audience controls, gallery category and thumbnail controls, Plan tabs, FAQ accordion, homepage side navigation, and inquiry steps.
- Side-navigation hashes work on initial load, click, browser Back, and browser Forward.
- At 200% browser zoom and with enlarged text, content grows naturally without clipping, overlapping the header/booking bar, or creating internal scroll traps.
- Mobile and landscape touch targets do not overlap and meet the target rules in Sections 5 and 6.
- The no-JavaScript fallback exposes the approved contact and route links.
- Expanded FAQ answers and validation errors may grow the chapter naturally, as defined in Section 5.4; the collapsed/default state remains within the chapter-height contract.

### Visual acceptance

- Compare the approved cinematic concepts with the new browser screenshots.
- Preserve the black, film-white, blue, purple, viewfinder, aperture, and editorial photography language.
- Confirm the redesign feels like a normal premium website rather than an oversized presentation.
- Confirm the user can understand and traverse the homepage with materially less scrolling.

## 11. Deployment

After local tests and visual review pass:

1. Commit the implementation intentionally.
2. Push `main` to `Demonstration-Test/dtvprodsV3`.
3. Allow the existing GitHub Pages workflow to build and deploy.
4. Preserve the Vite base path `/dtvprodsV3/`, deterministic static route generation, route-specific metadata, and `404.html`.
5. Verify production at `https://demonstration-test.github.io/dtvprodsV3/`.
6. Direct-load and reload `/media/`, `/book-damon/`, and at least one audience route.
7. Direct-load the homepage hashes `#story`, `#gallery`, `#inquire`, and `#book`; verify that each resolves below the sticky header and that Back/Forward navigation remains correct.
8. Verify representative CSS, JavaScript, font, and `/dtvprodsV3/media/` asset requests use the repository base path and return successfully.
9. Verify the live mobile navigation, Story selector, Gallery selector, Plan tabs, FAQ accordion, and inquiry flow.
