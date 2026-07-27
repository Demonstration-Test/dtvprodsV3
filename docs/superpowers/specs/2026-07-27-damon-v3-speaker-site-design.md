# Damon J. Young Jr. Speaker Website V3 — Design Specification

Date: 2026-07-27  
Status: Approved in conversation; pending written-spec review  
Repository: `Demonstration-Test/dtvprodsV3`  
Public demo target: GitHub Pages

## 1. Product intent

Build a speaker-first personal-brand website for Damon J. Young Jr. that positions him as a motivational speaker, creative entrepreneur, visual storyteller, educator, and founder of DTV Productions.

The central narrative is:

> From behind the lens to the front of the room.

The site should generate qualified inquiries for speaking, school and college engagements, athletic-team sessions, creative entrepreneurship workshops, organizational engagements, panels, podcasts, media appearances, and photography or business coaching.

DTV Productions and Damon's visual work support the speaker story as evidence of craft, discipline, entrepreneurship, and communication. The result must not read like a photography portfolio with speaking added as an afterthought.

## 2. Approved decisions

The user approved the following:

- Reuse media from `dtvprods.com`.
- Use appropriate images from the three supplied Google Drive folders.
- Treat the brief's draft positioning, four audience pathways, manifesto, and calls to action as approved public demo copy.
- Exclude unverified statistics, testimonials, keynote claims, outcome guarantees, awards, press mentions, and client relationships.
- Use the following as customizable speaking themes rather than claims of fixed keynote packages:
  - Destined to Venture
  - Start Before You Feel Ready
  - From Vision to Execution
  - Discipline Behind the Dream
  - Turning a Skill Into a Business
  - Identity Beyond the Uniform
  - What the Lens Taught Me About Leadership
- Use a static GitHub Pages booking workflow that validates locally and opens a prefilled email to `Bookings@dtvprods.com`.
- Use an honest motion piece made from authentic photography, typography, and abstract camera imagery in place of a speaker reel. It must not imply that any image depicts a speaking event.
- Use the Cinematic Editorial Hybrid approach.

## 3. Success criteria

The demo succeeds when it:

- Makes Damon's speaking identity and “Destined to Venture” positioning clear in the first viewport.
- Keeps “Book Damon” visually available throughout the experience.
- Uses authentic Damon and DTV media without fabricating events, clients, audiences, or proof.
- Feels cinematic, editorial, energetic, and premium without sacrificing readability.
- Works as a deliberately recomposed mobile experience.
- Provides a complete reduced-motion reading path.
- Loads every approved route directly on GitHub Pages.
- Produces a real, locally validated email inquiry workflow with no fake success state.
- Contains no console errors, broken links, missing route metadata, or inaccessible motion traps.

## 4. Non-goals and boundaries

This GitHub Pages demo will not include:

- Server-side form validation
- Transactional email
- Rate limiting
- Spam-protection verification
- Inquiry persistence
- Supabase
- Advertising trackers
- Unverified testimonials
- Unverified client or organization logos
- Fabricated speaking footage
- Generated likenesses of Damon, clients, students, athletes, or audiences
- Public pricing that may be stale

The project may expose clear integration seams for a future production form backend and analytics provider, but the demo will not pretend those services are active.

## 5. Source-of-truth policy

Content priority:

1. User-approved decisions recorded in this specification
2. Approved files from the supplied Drive folders
3. Verified current content from `dtvprods.com`
4. Newly written copy limited to the approved positioning and themes

Appendix A is the versioned implementation source for approved public copy, form fields, FAQ answers, calls to action, and external links. Components must import that content from typed project data derived from Appendix A; they must not fetch mutable website copy at runtime.

The live DTV site currently supports the following facts for the demo:

- Damon J. Young Jr. founded DTV Productions LLC.
- DTV Productions began in 2020.
- Damon is associated with photography, video, YouTube, entrepreneurship, multimedia creation, coaching, and public speaking.
- DTV evolved from “DamonTV” to “Destined to Venture.”
- The business is based in North Jersey.
- Contact phone: `862-846-8626`
- Contact email: `Bookings@dtvprods.com`

Claims such as business revenue, audience results, organization relationships, speaking scale, or fixed program outcomes remain excluded unless separately confirmed.

## 6. Media policy and preliminary inventory

### Authorized source folders

- `Website Assets` — Drive folder `1C0nQ5g29oh7m-7aCdi4PNMRb2XnZR9ZR`
  - `Photos` — curated graduation, creative, portrait, and athletic images
  - `Logos` — white and black DTV Studio marks
  - `BTS Videos` — no usable files found during the initial audit
- `Client Files` — Drive folder `1-bql6NMuDlvNx-w4x3ZjZDumiTlZRBEE`
- `Client Files` — Drive folder `1JekY4yfSvKO0ugWN_Yd51mYqtT0smPZ-`
- Current public DTV site media — `https://www.dtvprods.com/`

The curated `Website Assets` library is the primary Drive source. Broader client archives are secondary and must not be treated as evidence of a client relationship. Images from those archives should be used only when compositionally necessary and when the user's authorization clearly covers public demo display.

### Observed usable media

- Authentic Damon portrait photographing with a camera
- DTV signature/camera mark
- DTV Studio black and white logo variants
- Athletic portrait
- Creative studio portraits
- Graduation portraits
- Editorial portraits
- Event photograph
- Media-day montage

### Media gate

Before interface implementation begins:

1. Produce a draft individual media manifest with stable media IDs.
2. Record source, proposed use, route, section, authenticity, rights and approval status, crop, focal point, alt text, and optimization needs.
3. Obtain user approval of the draft manifest and proposed uses.
4. Create responsive derivatives and abstract generated assets only for approved entries.
5. Update the manifest with derivative IDs, optimization details, and generated-asset provenance.
6. Obtain user approval of the finished asset set and final manifest.
7. Begin interface implementation.

Generated assets may include abstract lens interiors, light, grain, dust, reflections, focus marks, viewfinder lines, and social graphics. They may not include human likenesses or fabricated documentary scenes.

## 7. Creative direction

### Core concept

The visitor begins inside a dark camera viewfinder. Fine focus marks and abstract aperture rings search for clarity while Damon's authentic camera portrait gradually resolves. “DESTINED” appears first; “TO VENTURE” follows as the viewfinder expands into the page.

The opening must be short, non-blocking, and immediately replaced with static clarity for reduced-motion users.

### Palette

- Lens Black — primary cinematic background
- Film White — warm reading surface
- Graphite — secondary dark surface
- Steel — borders, metadata, and neutral detail
- Focus Blue — restrained electric accent
- Warm Amber — limited human accent drawn from the photography
- Flash White — brief highlight, never a persistent flashing effect

### Typography

- High-contrast editorial serif for reflective statements
- Bold condensed sans-serif for “DESTINED TO VENTURE”
- Clean humanist or grotesk sans-serif for body copy and controls
- Monospaced face for timecodes, frame numbers, and viewfinder metadata

Fonts should be locally bundled when licensing permits and loaded with deliberate fallbacks.

### Layout language

- Editorial asymmetry
- Full-bleed and off-center imagery
- Contact sheets and negative-strip motifs
- Thin frame lines
- Oversized statement typography
- Warm-white reading sections between dark cinematic sequences
- Image numbering and timecodes
- Controlled overlaps
- Generous negative space
- Deliberate mobile crops

The DTV mark appears as a restrained signature and may transition into a viewfinder frame. It should never compete with Damon's name or the booking action.

## 8. Site architecture

### Primary routes

| Route | Purpose |
| --- | --- |
| `/` | Complete speaker-first narrative and conversion journey |
| `/about` | Verified Damon biography and multidisciplinary role |
| `/speaking` | Engagement formats, audiences, and inquiry path |
| `/speaking-topics` | Seven approved customizable themes |
| `/schools-colleges` | School and college pathway |
| `/athletes-teams` | Athletic team pathway |
| `/creatives-entrepreneurs` | Creative and entrepreneur pathway |
| `/organizations` | Organization and brand pathway |
| `/workshops` | Educational and workshop offerings without stale pricing |
| `/media` | Curated DTV work and honest motion story |
| `/dtv-story` | DamonTV to Destined to Venture origin narrative |
| `/coaching` | Coaching overview and link to current booking flow |
| `/faq` | Visible organizer questions and approved answers |
| `/book-damon` | Full locally validated inquiry builder |
| `/privacy` | Demo privacy and mailto disclosure |
| `/thank-you` | Honest reminder that an inquiry is not sent until the email is sent |

### Navigation

- Home
- About
- Speaking
- Audiences
- Workshops
- Media
- DTV Story
- Book Damon

The Audiences item is an accessible dropdown on desktop and an expandable group on mobile. Book Damon remains visually dominant. On mobile, a sticky booking action appears after the visitor leaves the hero.

## 9. Homepage narrative

1. Navigation
2. Cinematic hero
3. Quiet brand manifesto
4. Damon introduction
5. Still-image motion story
6. Audience viewfinder sequence
7. Approved speaking themes
8. Destined to Venture origin story
9. Curated visual storytelling portfolio
10. Intended audience takeaways and organizer goals
11. Workshops and coaching
12. Three-step booking process
13. FAQ preview
14. Short inquiry builder
15. Cinematic final call to action
16. Footer

The page alternates dense image-led sequences with calm reading sections. It must not become a stack of interchangeable cards.

## 10. Component and content boundaries

### Content modules

- Site identity
- Navigation
- Contact information
- Hero
- Manifesto
- Damon biography
- Speaking themes
- Audience pathways
- Workshops
- Coaching
- Portfolio projects
- Motion-story frames
- Intended takeaways
- FAQs
- Booking fields and options
- SEO metadata
- Social links

Copy and media metadata must not be scattered through animation components.

### UI modules

- `SiteHeader`
- `AudienceMenu`
- `MobileMenu`
- `HeroLens`
- `ViewfinderFrame`
- `ManifestoSection`
- `DamonProfile`
- `MotionStory`
- `AudienceSequence`
- `SpeakingThemeRail`
- `DtvTimeline`
- `EditorialPortfolio`
- `IntendedTakeaways`
- `WorkshopFeature`
- `BookingProcess`
- `InquiryForm`
- `FaqList`
- `FinalCta`
- `SiteFooter`
- `CustomCursor`
- `MotionPreferenceProvider`
- `AnalyticsEventBridge`

Each animation owns only its own element transforms. GSAP and Framer Motion must not animate the same transform properties on the same element.

## 11. Motion system

### Large sequences

GSAP and ScrollTrigger own:

- Hero focus timeline
- Aperture opening
- Manifesto text reveals
- Motion-story expansion
- Audience viewfinder transitions
- DTV timeline progression
- Contact-sheet movement
- Portfolio parallax
- Section progress

### Component interactions

Framer Motion owns:

- Menu transitions
- Button feedback
- Card entrance and exit states
- Route transitions
- Small focus and hover states

### WebGL

Three.js renders a generic camera-inspired environment:

- Nested metallic rings
- Aperture-inspired blades
- Glass planes
- Light rays
- Controlled reflections
- Restrained dust particles
- Pointer-reactive key light

The scene must not resemble a specific camera product. It pauses offscreen and when the tab is hidden, caps device pixel ratio, lowers particle count on weaker devices, and yields to a static fallback when needed.

### Scrolling and cursor

Lenis provides smooth desktop scrolling while preserving native anchors, history, and keyboard behavior. The custom cursor appears only on fine-pointer desktops and may show:

- FOCUS
- WATCH
- VIEW
- EXPLORE
- BOOK

It is disabled for touch, keyboard navigation, small screens, reduced motion, and accessibility modes.

## 12. Responsive and reduced-motion behavior

Mobile is recomposed, not merely stacked:

- Desktop pinned sequences become standard editorial sections or accessible step controls.
- Hero image crops and headline breaks change at narrow widths.
- Audience content becomes a readable sequence that supports touch and keyboard.
- Custom cursor, heavy parallax, continuous lens motion, and dense particles are disabled.
- Booking CTA becomes sticky after the hero.
- Forms use full-width, touch-friendly controls.

Reduced-motion mode:

- Shows all content immediately in normal document order.
- Removes scroll pinning, continuous lens motion, cursor-follow effects, large parallax, and animated masking.
- Retains clear state changes and complete information.
- Uses no autoplay movement without a pause mechanism.

## 13. Booking workflow

### Homepage inquiry

Collect:

- First name
- Last name
- Work email
- Organization
- Event type
- Preferred date
- Short message
- Consent

### Full booking inquiry

Collect the exact organizer fields listed in Appendix A, including audience, format, dates, location, size, objectives, challenges, optional budget, travel expectations, referral source, and additional information.

### Data flow

1. React Hook Form captures the input.
2. Zod validates and returns inline messages plus an accessible error summary.
3. The confirmation view presents a readable inquiry summary for review before any external action.
4. When the encoded `mailto:` URI is no longer than 1,800 characters, the visitor may choose **Open email draft**. The browser only attempts to hand the URI to a configured mail application; the site never claims that an application opened or that a message was sent.
5. When the URI would exceed 1,800 characters, or when the visitor reports that nothing opened, the site presents **Copy inquiry summary** and a plain email link to `Bookings@dtvprods.com`. The copy action has a manual-selection fallback when Clipboard API access fails.
6. The page always displays the exact disclosure and consent language from Appendix A.
7. `/thank-you` appears only after the visitor explicitly selects **I sent my email**. Its content repeats that this static website cannot verify delivery and provides the phone number and email address for follow-up.

No fake network request, success toast, automatic redirect, or completion analytics event will be emitted because the site attempted to open a mail client. `inquiry_mailto_attempted`, `inquiry_summary_copied`, and `inquiry_user_marked_sent` are distinct events.

## 14. Analytics interface

No external analytics script is loaded. A first-party event bridge emits documented events for:

- Booking CTA
- Phone and email links
- Motion-story start and completion
- Audience selection
- Speaking-theme view
- Workshop and coaching links
- DTV Productions link
- Inquiry start
- Inquiry validation error
- Mail-draft creation
- Inquiry-summary copy
- User-marked-sent confirmation
- Social links

The interface is ready for a future privacy-approved analytics provider without changing the UI components.

## 15. Accessibility

Target WCAG 2.2 AA:

- Semantic landmarks
- Logical heading hierarchy
- Skip link
- Route changes update the document title, move focus to the route's main heading, and announce the new page through a polite live region.
- Accessible dropdown and mobile navigation
- Visible focus indicators
- The native cursor remains visible whenever the custom cursor is disabled, unavailable, or loses synchronization.
- Touch targets of at least 44 by 44 CSS pixels
- Sticky booking controls reserve safe-area and content spacing so they never cover fields, links, or the footer.
- Meaningful alt text
- No important text embedded only in images
- Keyboard-operable carousels or step controls
- Accessible form labels
- Inline errors and an error summary
- Status announcements where state changes
- No autoplay sound
- Pause controls for moving content
- Transcript-style text for the motion story
- No information conveyed only through animation
- One global motion-preference state controls GSAP, Framer Motion, Lenis, Three.js, cursor effects, autoplay behavior, and CSS animation. Individual components may not override a user's reduced-motion preference.

## 16. SEO and route metadata

Every route receives:

- Unique title and description
- Canonical URL
- Open Graph metadata
- Social image
- Heading hierarchy
- Internal links
- Breadcrumbs on supporting pages
- Descriptive media filenames and alt text

The production origin is:

`https://demonstration-test.github.io/dtvprodsV3/`

Canonical URLs, Open Graph URLs, social images, structured-data URLs, `sitemap.xml`, and `robots.txt` use that exact origin plus the canonical trailing-slash route. Development builds use a separate local origin and must never emit localhost into production artifacts.

Static output includes:

- `sitemap.xml`
- `robots.txt`
- Favicons and app icons
- Route-specific HTML entry files

Structured data is limited to visible, verified content:

- Person
- Organization
- ProfessionalService or Service where appropriate
- FAQPage only when the same FAQ is visible
- BreadcrumbList

## 17. Performance

- Preload only the hero image and critical fonts.
- Use responsive AVIF/WebP derivatives with fixed dimensions.
- Lazy-load below-the-fold images and motion-story assets.
- Route-split supporting pages.
- Pause animation calculations when hidden or offscreen.
- Keep critical JavaScript before lazy animation bundles at or below 190 KB gzip.
- Keep total homepage JavaScript at or below 500 KB gzip.
- Keep each supporting route's incremental JavaScript at or below 120 KB gzip.
- Keep the initial mobile hero image at or below 350 KB and the desktop hero image at or below 700 KB.
- Target LCP at or below 2.5 seconds, CLS at or below 0.1, and INP at or below 200 milliseconds at the 75th percentile.
- Cap WebGL device pixel ratio at 1.5 by default and 2 only on high-capability desktops.
- Use low-power and small-screen fallbacks.
- Avoid layout shifts.
- Keep third-party scripts at zero for the demo.
- Avoid shipping uncompressed source images.

Use the static lens/viewfinder fallback when any of these are true:

- `prefers-reduced-motion: reduce`
- Save-Data is enabled
- Viewport width is below 768 CSS pixels
- `navigator.deviceMemory` is available and reports 4 GB or less
- `navigator.hardwareConcurrency` is available and reports 4 logical processors or fewer
- WebGL context creation fails or the context is lost

If a device API is unavailable, that missing signal alone does not disable WebGL. Runtime long tasks or repeated context loss permanently disable the hero's heavy effects for the current page view.

## 18. GitHub Pages architecture

The application uses React, Vite, TypeScript, Tailwind CSS, React Router, GSAP/ScrollTrigger, Three.js, Lenis, Framer Motion, React Hook Form, and Zod.

The Vite base path is `/dtvprodsV3/`. React Router uses browser history with basename `/dtvprodsV3`. Canonical route URLs end with `/`.

After the Vite build, a deterministic route-generation script writes the built application shell to each approved path as `<route>/index.html`. For each output, it injects that route's unique title, description, canonical URL, Open Graph fields, and structured data from the typed route-content registry. The runtime router resolves the current pathname after stripping the basename. `404.html` is a genuine not-found page with a home link; it is not the primary routing mechanism and does not disguise failed routes.

Direct requests and reloads must return working pages for:

- `https://demonstration-test.github.io/dtvprodsV3/`
- `https://demonstration-test.github.io/dtvprodsV3/about/`
- Every other approved route using the same trailing-slash convention

Asset URLs use `import.meta.env.BASE_URL` or imported module URLs. No leading-root asset path may bypass the repository base path.

A GitHub Actions workflow:

1. Checks out `main`.
2. Installs pinned dependencies.
3. Runs type checking and tests.
4. Builds the static site.
5. Uploads the Pages artifact.
6. Deploys to GitHub Pages.

## 19. Error handling and fallbacks

- WebGL failure → static lens/viewfinder visual
- Missing image → preserved layout and omitted decorative treatment
- Reduced motion → static reading path
- Form validation failure → focused error summary and inline errors
- Mail client unavailable → copyable email address and inquiry text
- Empty optional content → section omitted rather than rendered as a placeholder
- Unsupported hover → fully usable touch/focus interaction

## 20. Verification plan

Automated verification:

- TypeScript
- Production build
- Route-generation assertions
- Direct-load and reload checks for every generated GitHub Pages route
- Unit tests for content, analytics events, and form schemas
- Broken-link and asset-path checks
- Route metadata checks
- Accessibility smoke checks

Rendered verification:

- Built-in browser at desktop and mobile widths
- Keyboard navigation
- Touch-sized controls
- Reduced-motion mode
- WebGL fallback
- Sticky CTA overlap checks at narrow heights and safe-area insets
- Missing-media fallback
- Inquiry validation and mailto composition
- Console errors and warnings
- Chromium, Firefox, and WebKit layout checks
- Visual comparison between approved concepts and final screenshots

The final handoff is blocked until the accepted design concepts and the latest browser screenshots have been inspected side by side.

## 21. Delivery gates

1. Written design specification approved.
2. Implementation plan approved.
3. Draft individual media manifest and proposed uses approved.
4. Responsive derivatives, abstract assets, and final media manifest approved.
5. Complete design concepts approved.
6. Interface implementation begins.
7. Local implementation verified.
8. Git commit and push complete.
9. GitHub Pages deployment verified at the live URL.

## Appendix A — Approved implementation copy and fields

This appendix is the versioned source for the initial demo. Typography may change line breaks, but wording changes require content-data updates and review.

### Hero

Label:

> MOTIVATIONAL SPEAKER • ENTREPRENEUR • VISUAL STORYTELLER

Headline:

> DESTINED<br>
> TO VENTURE.

Supporting copy:

> Damon J. Young Jr. challenges students, athletes, creators, entrepreneurs, and organizations to move beyond hesitation, develop their vision, and take the next meaningful step toward what they are capable of building.

Primary action:

> BOOK DAMON TO SPEAK

Secondary action:

> WATCH HIS STORY

Text action:

> EXPLORE DTV PRODUCTIONS

### Manifesto

Statement:

> YOU DO NOT HAVE TO<br>
> SEE THE ENTIRE ROAD<br>
> TO TAKE THE NEXT STEP.

Definition:

> Destined to Venture is the decision to move before every answer is available—to take intentional risks, develop discipline behind a vision, turn creative ability into opportunity, and grow beyond the identity or environment that once defined you.

### Audience pathways

Schools and Colleges:

> Helping students recognize possibility, build confidence, and act on their ideas.

Action:

> BRING DAMON TO YOUR SCHOOL

Athletes and Teams:

> Connecting preparation, discipline, identity, pressure, and performance beyond the game.

Action:

> BOOK DAMON FOR YOUR TEAM

Creatives and Entrepreneurs:

> Helping creators move from talent and ideas into disciplined execution.

Action:

> PLAN A CREATIVE WORKSHOP

Organizations and Brands:

> Encouraging teams to approach change, opportunity, ownership, and innovation with intention.

Action:

> INVITE DAMON TO YOUR ORGANIZATION

### Speaking themes

- Destined to Venture
- Start Before You Feel Ready
- From Vision to Execution
- Discipline Behind the Dream
- Turning a Skill Into a Business
- Identity Beyond the Uniform
- What the Lens Taught Me About Leadership

The shared disclaimer beneath theme listings is:

> These are customizable speaking themes, not fixed keynote packages. Damon reviews each audience, event, and objective before recommending the right message and format.

### Intended takeaways

Heading:

> WHAT IS THE EXPERIENCE DESIGNED TO SPARK?

Introductory copy:

> Every engagement begins with the organizer's goals. Depending on the audience and format, the experience can be designed to encourage:

- Greater confidence in taking a meaningful next step
- A clearer understanding of purposeful risk
- Practical movement from an idea toward a plan
- A stronger connection between discipline and opportunity
- A healthier perspective on failure and uncertainty
- Motivation grounded in real entrepreneurial and creative experience

Closing disclaimer:

> These are intended takeaways, not guaranteed individual or organizational outcomes.

### Booking process

Step 1:

> SHARE YOUR VISION

> Tell Damon about the event, audience, date, location, and desired outcome.

Step 2:

> BUILD THE EXPERIENCE

> Damon or his team reviews the request and identifies the right message, format, and level of customization.

Step 3:

> VENTURE TOGETHER

> If the engagement is a fit, the details are confirmed and Damon prepares the keynote, workshop, panel, or creative experience for the room.

### Final call to action

Headline:

> YOU WERE NOT BUILT<br>
> TO STAY WHERE YOU STARTED.

Supporting copy:

> Bring Damon J. Young Jr. to your school, team, conference, workshop, or organization for a message designed to challenge hesitation, strengthen vision, and inspire meaningful movement.

Primary action:

> BOOK DAMON TO SPEAK

Secondary action:

> CONTACT DTV

### Homepage inquiry fields

- First name — required, 1–80 characters
- Last name — required, 1–80 characters
- Work email — required, valid email, 254 characters maximum
- Organization — required, 1–120 characters
- Event type — required; use the approved event-type options below
- Preferred date — required ISO date; must not be earlier than the current local date
- Short message — required, 20–800 characters
- Consent — required; must equal `true`

### Full inquiry fields

- First name — required, 1–80 characters
- Last name — required, 1–80 characters
- Work email — required, valid email, 254 characters maximum
- Phone — required, 7–20 digits after removing spaces, parentheses, periods, hyphens, and a leading `+`
- Organization — required, 1–120 characters
- Role or title — required, 1–120 characters
- Event type — required; use the approved event-type options below
- Audience type — required; use the approved audience options below
- Preferred date — required ISO date; must not be earlier than the current local date
- Alternate date — optional ISO date; when present, must not be earlier than the current local date and must differ from the preferred date
- Event location — required, 2–160 characters
- Delivery format — required; `In person`, `Virtual`, or `Hybrid`
- Estimated audience size — required; use the approved size options below
- Requested format — required; use the approved format options below
- Desired program length — required; use the approved length options below
- Event objectives — required, 20–1,000 characters
- Primary audience challenges — required, 20–1,000 characters
- Budget range — optional; use the approved budget-context options below
- Travel expectations — optional, 800 characters maximum
- How the organizer heard about Damon — required; use the approved referral options below
- Additional information — optional, 1,200 characters maximum
- Consent — required; must equal `true`

Approved event-type options:

- School or college program
- Athletic team or sports program
- Conference or organizational event
- Creative entrepreneurship workshop
- Panel discussion
- Podcast, interview, or media appearance
- Other

Approved audience options:

- Schools and colleges
- Athletes and teams
- Creatives and entrepreneurs
- Organizations and brands
- Mixed audience
- Other

Approved estimated-audience-size options:

- Under 50
- 50–99
- 100–249
- 250–499
- 500–999
- 1,000+
- Not sure yet

Approved requested-format options:

- Keynote
- Workshop
- Assembly
- Team session
- Panel
- Podcast or interview
- Creative visual-storytelling experience
- Not sure yet

Approved desired-length options:

- 30 minutes
- 45 minutes
- 60 minutes
- 90 minutes
- Half day
- Full day
- Flexible or not sure

Approved optional budget-context options:

- Under $2,500
- $2,500–$4,999
- $5,000–$9,999
- $10,000+
- Not sure or prefer to discuss

These options describe the organizer's available budget and do not publish or imply Damon's fees.

Approved referral options:

- DTV Productions website
- Search engine
- Social media
- Personal referral
- School, team, or organization colleague
- Saw Damon or DTV at an event
- Other

Exact consent:

> I understand this demo prepares an email on my device and does not submit, send, or store my information on this website.

Pre-action disclosure:

> Review your inquiry before continuing. This static website cannot send it for you. “Open email draft” asks your browser to open a mail application; you must send the message from that application.

Long-summary fallback:

> This inquiry is too detailed for a reliable email link. Copy the summary below, email it to Bookings@dtvprods.com, and send it from your email account.

`/thank-you` heading and disclosure:

> FINISH YOUR INQUIRY

> This website cannot verify that your email was sent or delivered. If you sent the prepared message, Damon or his team can review it and follow up. If nothing opened, copy your inquiry and email Bookings@dtvprods.com or call 862-846-8626.

### FAQ

**What audiences does Damon speak to?**

The demo presents four customizable pathways: schools and colleges, athletes and teams, creatives and entrepreneurs, and organizations and brands. Damon reviews the specific audience before recommending a message or format.

**What topics does Damon cover?**

The approved themes include Destined to Venture, purposeful action, vision and execution, discipline, creative entrepreneurship, identity, and leadership through visual storytelling. They are customizable themes rather than fixed packages.

**Does Damon speak at schools and colleges?**

Schools and colleges are an approved inquiry pathway. Share the audience, goals, preferred date, and format so Damon or his team can review the opportunity.

**Does Damon offer athletic-team sessions?**

Athletes and teams are an approved inquiry pathway focused on preparation, discipline, identity, pressure, and performance beyond the game.

**Can an engagement include photography or visual storytelling?**

An organizer may request a photography or visual-storytelling component. Damon or his team confirms whether it is appropriate for the event during engagement planning.

**Does Damon offer workshops?**

Organizers may inquire about creative, photography, entrepreneurship, and content-creation workshops. Current format, capacity, duration, and pricing are confirmed after review.

**Is Damon available outside New Jersey?**

Geographic availability is not assumed. Include the event location and travel expectations in the inquiry so availability and costs can be reviewed.

**Does Damon offer virtual engagements?**

Virtual is an available inquiry option. Damon or his team confirms whether the requested topic and date are a fit for a virtual format.

**How far in advance should an event be booked?**

There is no published minimum booking window. Inquire as early as practical and include alternate dates when possible.

**What information is required for an accurate proposal?**

Provide the event type, audience, dates, location or virtual format, estimated audience size, requested format, desired length, objectives, primary challenges, and any travel or budget context.

**Can Damon customize a presentation?**

Customization begins with the organizer's goals. Damon or his team reviews the request and recommends the message, format, and level of customization.

**Are travel costs included?**

Travel costs are not assumed to be included. Any travel requirements and costs are confirmed in the engagement proposal.

**Is a speaker reel available?**

This demo includes an authentic photography-led visual story rather than a fabricated speaker reel. Request current speaker materials through the inquiry form.

**Is a media kit available?**

Request current media-kit materials through the booking form or by emailing `Bookings@dtvprods.com`.

**Can Damon appear on podcasts and panels?**

Podcast, panel, and media invitations are accepted as inquiry types. Include the topic, format, date, audience, and recording or distribution details.

### External links

- DTV Productions: `https://www.dtvprods.com/`
- Coaching booking: `https://www.dtvprods.com/service-page/1on1-coaching`
- Email: `mailto:Bookings@dtvprods.com`
- Phone: `tel:+18628468626`
