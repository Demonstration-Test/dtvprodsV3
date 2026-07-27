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

1. Produce an individual media manifest with stable media IDs.
2. Record source, use, route, section, authenticity, approval, rights status, crop, focal point, alt text, and optimization needs.
3. Create responsive derivatives and abstract generated assets.
4. Obtain user approval of the final manifest.

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
10. Credible audience outcomes
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
- Outcomes
- Workshops
- Coaching
- Portfolio projects
- Motion-story frames
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
- `OutcomeSection`
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

Collect the approved organizer fields from the brief, including audience, format, dates, location, size, objectives, challenges, optional budget, travel expectations, referral source, and additional information.

### Data flow

1. React Hook Form captures the input.
2. Zod validates and returns inline messages plus an accessible error summary.
3. Valid values are encoded into a readable `mailto:` draft addressed to `Bookings@dtvprods.com`.
4. The visitor's email client opens.
5. The site may navigate to `/thank-you` only with language that says the inquiry is not sent until the visitor sends the email.

No fake network request, success toast, or completion analytics event will be emitted merely because the mail client opened.

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
- Social links

The interface is ready for a future privacy-approved analytics provider without changing the UI components.

## 15. Accessibility

Target WCAG 2.2 AA:

- Semantic landmarks
- Logical heading hierarchy
- Skip link
- Accessible dropdown and mobile navigation
- Visible focus indicators
- Touch targets of at least 44 by 44 CSS pixels
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
- Cap WebGL device pixel ratio.
- Use low-power and small-screen fallbacks.
- Avoid layout shifts.
- Keep third-party scripts at zero for the demo.
- Avoid shipping uncompressed source images.

## 18. GitHub Pages architecture

The application uses React, Vite, TypeScript, Tailwind CSS, React Router, GSAP/ScrollTrigger, Three.js, Lenis, Framer Motion, React Hook Form, and Zod.

The Vite base path is `/dtvprodsV3/`. The production build creates a real static entry for every route so direct links return the application correctly under GitHub Pages. Asset URLs and canonical route metadata use the repository base path where required.

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
- Missing-media fallback
- Inquiry validation and mailto composition
- Console errors and warnings
- Chromium, Firefox, and WebKit layout checks
- Visual comparison between approved concepts and final screenshots

The final handoff is blocked until the accepted design concepts and the latest browser screenshots have been inspected side by side.

## 21. Delivery gates

1. Written design specification approved.
2. Implementation plan approved.
3. Individual media manifest approved.
4. Generated abstract assets and responsive media derivatives approved.
5. Complete design concepts approved.
6. Local implementation verified.
7. Git commit and push complete.
8. GitHub Pages deployment verified at the live URL.

