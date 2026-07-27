# Damon V3 Balanced Viewport Density Redesign

Date: 2026-07-27  
Status: Approved design, pending written-spec review  
Target: Damon V3 homepage and all supporting routes

## 1. Objective

Recalibrate Damon V3 from an oversized cinematic presentation into a balanced editorial website while preserving its photography-led identity. The redesigned site must:

- Reduce typography, image, control, header, and spacing scale by roughly 30%.
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
- Five named selectors:
  1. Behind the Lens
  2. Building the Craft
  3. DTV Begins
  4. The Name Evolves
  5. Destined to Venture
- A short statement and camera-style metadata associated with each selection.
- A “Meet Damon” or “Read the DTV Story” route action.
- A disclosure explaining that the imagery represents DTV visual-storytelling work and does not document a speaking engagement.

The generic labels “Frame 01” and “Frame 02” are removed. The selector must support pointer, keyboard, and screen-reader use. Selection changes update the image and descriptive text with a short fade.

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

Each category provides:

- One featured image.
- Three selectable preview images.
- A concise category label.
- Code-native controls with meaningful accessible names.

Desktop uses a featured image plus compact thumbnail rail. Mobile uses a main image with a horizontal thumbnail strip. All media must come from the approved local DTV asset set.

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

Booking Process shows the existing steps in a compact layout and retains the “Start an inquiry” action.

Organizer FAQ shows the most useful preview questions in the existing accessible accordion. The full FAQ remains available at `/faq`.

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

Target values:

- Header height: approximately `5rem` desktop and `4.5rem` mobile.
- Sticky mobile booking bar: approximately `4rem`.
- Content maximum width: approximately `82rem`, down from `96rem`.
- Page gutter: approximately `1.1rem` mobile through `4rem` large desktop.
- Standard section spacing: approximately `2.5rem` through `5rem`, down from `5rem` through `10rem`.

### 5.2 Typography

Target ranges:

- Hero display: approximately `4.75rem`–`7.5rem` desktop and `3.6rem`–`5rem` mobile.
- Page display: approximately `3.5rem`–`6.5rem`.
- Section display: approximately `2.75rem`–`4.75rem`.
- Statement display: approximately `3rem`–`5.5rem`.
- Body: approximately `0.95rem`–`1.08rem`.
- Large body: approximately `1rem`–`1.2rem`.
- Labels and metadata remain readable at approximately `0.65rem`–`0.75rem`.

Typography must preserve the existing Bebas Neue, Cormorant Garamond, Manrope, and Space Mono roles.

### 5.3 Media

- Hero portrait remains dominant without crowding copy.
- Main chapter imagery uses bounded aspect ratios and maximum heights based on the available viewport.
- Supporting-page media uses smaller maximum widths and heights.
- Thumbnail imagery uses consistent aspect ratios and visible selected states.
- Media never grows beyond the chapter in typical supported viewports.

### 5.4 Viewport chapter contract

Define a shared available-height token:

- Desktop: viewport height minus sticky header.
- Mobile: viewport height minus sticky header and sticky booking bar.

At typical viewport sizes, homepage chapters use the available height and avoid exceeding it.

Responsive safeguards:

- Use `svh` units to avoid mobile browser chrome instability.
- Use `clamp()` and height-aware media queries for short screens.
- Reflow multi-column content into compact states instead of stacking every item vertically.
- Permit natural height only when strict containment would clip enlarged text, validation errors, or essential controls.
- Avoid internal section scrollbars.

## 6. Homepage Side Navigation

Add a fixed, route-local homepage chapter navigation on the right.

Desktop:

- Dot plus short label.
- Active chapter indicator.
- Compact progress line or state.

Mobile:

- Dots only.
- Active dot is visually distinct.
- Controls stay outside primary text and action hit areas.

Behavior:

- Links target stable chapter IDs.
- Active state is driven by an `IntersectionObserver`.
- Click, keyboard activation, route focus, and browser history behavior remain predictable.
- Navigation exposes an accessible label and current-page state.
- Reduced-motion mode uses immediate navigation.
- The navigation is hidden when printing.

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

## 7. Supporting Pages

Apply the balanced global system to all routes:

- Smaller page headings and body copy.
- Smaller header, buttons, cards, images, and section padding.
- Full visible-viewport opening hero.
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
- If JavaScript is unavailable, the first meaningful state remains visible and all route links remain usable.

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
- Reduced motion.

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
4. Verify the live homepage, direct routes, media assets, mobile navigation, interactive selectors, and inquiry flow.

