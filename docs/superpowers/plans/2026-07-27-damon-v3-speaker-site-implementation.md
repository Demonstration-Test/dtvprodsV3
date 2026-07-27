# Damon J. Young Jr. Speaker Website V3 — Implementation Plan

Date: 2026-07-27  
Design source: `docs/superpowers/specs/2026-07-27-damon-v3-speaker-site-design.md`  
Repository: `https://github.com/Demonstration-Test/dtvprodsV3.git`  
Production origin: `https://demonstration-test.github.io/dtvprodsV3/`

## Execution rules

- Do not begin interface implementation until the user approves the draft media manifest, finished asset set, and complete visual concepts.
- Use authentic Damon and DTV media only.
- Do not introduce unverified testimonials, client claims, speaking statistics, fixed keynote packages, or guaranteed outcomes.
- Write failing tests before implementation for route generation, content integrity, forms, analytics, and reusable interaction logic.
- Keep content, media metadata, and route SEO outside animation components.
- Use the built-in browser for visual verification first.
- Compare approved concept images and final browser screenshots with `view_image` before handoff.
- Do not push or deploy until all local checks and visual reviews pass.

## Task 1 — Establish the project foundation

### Create

- `package.json`
- `package-lock.json`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `eslint.config.js`
- `.gitignore`
- `src/main.tsx`
- `src/vite-env.d.ts`
- `src/app/App.tsx`
- `src/app/router.tsx`
- `src/app/providers.tsx`
- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/utilities.css`
- `src/test/setup.ts`
- `vitest.config.ts`
- `playwright.config.ts`

### Dependencies

Install compatible pinned versions of:

- React and React DOM
- Vite and TypeScript
- Tailwind CSS and its Vite integration
- React Router
- GSAP
- Three.js
- Lenis
- Framer Motion
- React Hook Form
- Zod and the Hook Form Zod resolver
- Vitest
- Testing Library
- Playwright
- Axe Playwright integration
- ESLint

### Scripts

Define:

- `dev`
- `build`
- `postbuild`
- `preview`
- `typecheck`
- `lint`
- `test`
- `test:watch`
- `test:e2e`
- `test:e2e:live`
- `check`

`check` runs lint, type checking, unit tests, production build, route assertions, and static link checks.

### Verify

Run:

```powershell
npm install
npm run typecheck
npm run test
npm run build
```

### Commit

```text
chore: scaffold Damon V3 application
```

## Task 2 — Version the approved content model

### Create

- `src/content/siteContent.ts`
- `src/content/routes.ts`
- `src/content/navigation.ts`
- `src/content/speakingThemes.ts`
- `src/content/audiences.ts`
- `src/content/faqs.ts`
- `src/content/forms.ts`
- `src/content/seo.ts`
- `src/content/externalLinks.ts`
- `src/content/contentTypes.ts`
- `src/content/__tests__/contentIntegrity.test.ts`

### Test first

Write failing assertions that:

- All 16 routes exist and have unique titles, descriptions, and canonical paths.
- Every route has a single H1 source.
- All audience and speaking-theme identifiers are unique.
- All approved FAQ answers are visible-content ready.
- No banned proof fields, fake testimonials, audience statistics, awards, or client-logo claims exist.
- Contact email and phone match the specification.
- External coaching and DTV URLs match Appendix A.
- Select-field values exactly match Appendix A.

### Implement

Transcribe Appendix A into typed content modules. Export stable IDs for analytics, navigation, media placement, and tests.

### Verify

```powershell
npm run test -- src/content/__tests__/contentIntegrity.test.ts
npm run typecheck
```

### Commit

```text
feat: add approved speaker content model
```

## Task 3 — Produce and approve the draft media manifest

### Create

- `docs/media/damon-v3-media-manifest.md`
- `docs/media/damon-v3-media-manifest.json`

### Inventory

Record every proposed public asset with:

- Stable media ID
- Filename
- Asset type
- Source URL or Drive ID
- Authentic, edited, or generated status
- Rights and user-approval status
- Intended route and section
- Desktop and mobile use
- Aspect ratio
- Focal point
- Alt-text recommendation
- Optimization state
- Required derivatives
- Notes

Prioritize:

- Damon camera portrait from `dtvprods.com`
- Current DTV camera/signature mark
- White and black DTV Studio logos from Drive
- Curated athletic, creative, graduation, portrait, event, and media-day images

Exclude:

- Private or ambiguous client material
- Media whose public-display purpose is unclear
- Any image presented as speaking proof
- Empty BTS/video placeholders

### Gate

Present the draft manifest to the user. Do not create derivatives, generated supplementary assets, or interface code until the proposed media IDs and placements are approved.

### Commit

```text
docs: add draft Damon V3 media manifest
```

## Task 4 — Create and approve complete visual concepts

### Required skill sequence

1. Read and use the `imagegen` skill.
2. Read the frontend-builder website-concept reference.
3. Generate coordinated, standalone, readable concept images for:
   - Navigation and hero
   - Manifesto and Damon introduction
   - Motion-story expansion
   - Audience viewfinder
   - Speaking themes and intended takeaways
   - DTV origin story
   - Portfolio sequence
   - Workshops, booking process, and FAQ
   - Inquiry form and final CTA
   - Purposefully recomposed mobile hero/navigation
   - Purposefully recomposed mobile audience/form flow

### Concept requirements

- Use authentic Damon/DTV media as references where the tool supports it.
- Keep text and controls code-native in the eventual implementation.
- Use one coherent design system.
- Avoid invented hero badges, fake proof, generic card grids, and fabricated speaking imagery.
- Keep major section text readable enough to implement exactly.

### Gate

Present the coordinated concepts to the user. Iterate until approved. The accepted concepts become the visual implementation specification.

## Task 5 — Prepare approved media and supplementary assets

### User confirmation

Before any credit-consuming Higgsfield generation, confirm the intended asset list and cost-bearing action with the user.

### Create

- `public/media/damon/`
- `public/media/portfolio/`
- `public/media/logos/`
- `public/media/textures/`
- `public/media/social/`
- `public/media/fallbacks/`

### Authentic media work

- Download only approved Drive and DTV source assets.
- Preserve untouched source references outside public delivery folders.
- Create desktop, tablet, and mobile crops.
- Produce responsive AVIF and WebP variants.
- Preserve natural skin texture.
- Record pixel dimensions and focal points.

### Supplementary media

Use Higgsfield for approved supplementary visual assets:

- Abstract lens interior
- Film grain and dust
- Light leak
- Metallic reflection
- Cobalt light streak
- Empty viewfinder/focus overlays
- Open Graph compositions

Do not generate human likenesses, stages, audiences, client work, or documentary footage.

### Update

Update:

- `docs/media/damon-v3-media-manifest.md`
- `docs/media/damon-v3-media-manifest.json`

Add derivative IDs, dimensions, file sizes, generated provenance, alt text, and final placement.

### Gate

Present the finished asset set and final manifest to the user. Interface implementation begins only after approval.

### Commit

```text
assets: add approved responsive media set
```

## Task 6 — Build routing, static generation, and the application shell

### Test first

Create:

- `src/app/__tests__/router.test.tsx`
- `scripts/__tests__/generateStaticRoutes.test.ts`
- `scripts/__tests__/verifyStaticLinks.test.ts`

Failing assertions:

- React Router uses basename `/dtvprodsV3`.
- Every approved path renders the correct route.
- Every route updates the title and moves focus to its main heading.
- The postbuild output contains `<route>/index.html`.
- Each static entry contains unique route metadata.
- Canonical, Open Graph, asset, and structured-data URLs include the production origin and repository base.
- `404.html` is a real not-found page.

### Create

- `scripts/generateStaticRoutes.ts`
- `scripts/verifyStaticLinks.ts`
- `src/app/RouteAnnouncer.tsx`
- `src/app/Seo.tsx`
- `src/layouts/SiteLayout.tsx`
- `src/components/navigation/SiteHeader.tsx`
- `src/components/navigation/AudienceMenu.tsx`
- `src/components/navigation/MobileMenu.tsx`
- `src/components/navigation/StickyBookCta.tsx`
- `src/components/footer/SiteFooter.tsx`

### Implement

- Browser-history routing with repository basename.
- Canonical trailing-slash paths.
- Route-level lazy loading.
- Skip link, route announcer, main-heading focus, and scroll restoration.
- Accessible desktop and mobile navigation.
- Safe-area-aware sticky booking control.
- Postbuild route entries with injected route-specific metadata.

### Verify

```powershell
npm run test -- src/app/__tests__/router.test.tsx scripts/__tests__
npm run build
npm run check
```

### Commit

```text
feat: add static Pages routing and site shell
```

## Task 7 — Build the global motion and analytics infrastructure

### Test first

Create:

- `src/lib/motion/__tests__/motionPreferences.test.ts`
- `src/lib/analytics/__tests__/eventBridge.test.ts`

Failing assertions:

- Reduced motion disables Lenis, WebGL, cursor effects, pinned timelines, and autoplay movement.
- Save-Data, viewport, device-memory, hardware-concurrency, and WebGL-failure criteria select the static hero fallback.
- Analytics events use approved stable names and contain no personal form data.
- `inquiry_mailto_attempted`, `inquiry_summary_copied`, and `inquiry_user_marked_sent` remain distinct.

### Create

- `src/lib/motion/MotionPreferenceProvider.tsx`
- `src/lib/motion/useMotionProfile.ts`
- `src/lib/motion/useGsapContext.ts`
- `src/lib/motion/lenisController.ts`
- `src/lib/motion/performanceProfile.ts`
- `src/lib/analytics/eventBridge.ts`
- `src/components/cursor/CustomCursor.tsx`
- `src/components/progress/SectionProgress.tsx`

### Implement

- One global motion profile.
- Lenis and ScrollTrigger synchronization.
- Visibility/offscreen pausing.
- Native cursor fallback.
- First-party analytics event bridge.

### Verify

```powershell
npm run test -- src/lib
npm run typecheck
```

### Commit

```text
feat: add accessible motion and analytics systems
```

## Task 8 — Implement the cinematic hero

### Test first

Create:

- `src/components/hero/__tests__/Hero.test.tsx`
- `src/components/hero/__tests__/heroCapability.test.ts`

Failing assertions:

- Hero has the approved H1 and actions.
- Book action is keyboard reachable.
- Static fallback contains the complete message.
- WebGL is lazy and absent for reduced-motion/low-power profiles.
- Pause control is exposed whenever continuous decorative motion runs.

### Create

- `src/components/hero/Hero.tsx`
- `src/components/hero/HeroLens.tsx`
- `src/components/hero/HeroFallback.tsx`
- `src/components/hero/ViewfinderFrame.tsx`
- `src/components/hero/heroScene.ts`
- `src/components/hero/hero.css`

### Implement

- Generic Three.js lens rings, aperture blades, glass, and restrained particles.
- Authentic Damon portrait reveal.
- Focus-bracket and viewfinder-line choreography.
- Pointer-reactive light on capable desktops.
- Static mobile and reduced-motion composition.
- Asset and DPR budgets from the specification.

### Verify

```powershell
npm run test -- src/components/hero
npm run build
```

### Commit

```text
feat: build cinematic Damon hero
```

## Task 9 — Implement the homepage narrative

### Test first

Create section smoke tests confirming:

- Approved copy appears.
- Heading order is valid.
- Links resolve.
- Optional media omission does not render placeholders.
- Reduced motion exposes content without pinning.

### Create

- `src/pages/HomePage.tsx`
- `src/components/manifesto/ManifestoSection.tsx`
- `src/components/profile/DamonProfile.tsx`
- `src/components/story/MotionStory.tsx`
- `src/components/audiences/AudienceSequence.tsx`
- `src/components/speaking/SpeakingThemeRail.tsx`
- `src/components/story/DtvTimeline.tsx`
- `src/components/portfolio/EditorialPortfolio.tsx`
- `src/components/outcomes/IntendedTakeaways.tsx`
- `src/components/workshops/WorkshopFeature.tsx`
- `src/components/booking/BookingProcess.tsx`
- `src/components/faq/FaqPreview.tsx`
- `src/components/cta/FinalCta.tsx`

### Implement

- Approved desktop timelines.
- Purposeful mobile recompositions.
- Honest still-image motion story and transcript.
- Accessible audience steps.
- Keyboard-safe theme interactions.
- Editorial portfolio using approved media only.
- Intended-takeaway disclaimers.

### Verify

```powershell
npm run test -- src/pages src/components
npm run typecheck
npm run build
```

### Commit

```text
feat: build speaker-first homepage narrative
```

## Task 10 — Implement supporting routes

### Create

- `src/pages/AboutPage.tsx`
- `src/pages/SpeakingPage.tsx`
- `src/pages/SpeakingTopicsPage.tsx`
- `src/pages/AudiencePage.tsx`
- `src/pages/WorkshopsPage.tsx`
- `src/pages/MediaPage.tsx`
- `src/pages/DtvStoryPage.tsx`
- `src/pages/CoachingPage.tsx`
- `src/pages/FaqPage.tsx`
- `src/pages/BookDamonPage.tsx`
- `src/pages/PrivacyPage.tsx`
- `src/pages/ThankYouPage.tsx`
- `src/pages/NotFoundPage.tsx`
- `src/components/breadcrumbs/Breadcrumbs.tsx`

### Test first

Write route tests for:

- Unique H1 and route metadata.
- Correct audience content.
- Visible FAQ content matching FAQ structured data.
- Coaching link points to the approved current DTV URL.
- No public stale price is present.
- Thank-you page repeats the static-delivery limitation.

### Implement

Reuse the design system without duplicating homepage sections verbatim. Each route gets a purposeful opening composition, concise route-specific story, internal links, and booking action.

### Verify

```powershell
npm run test -- src/pages
npm run build
```

### Commit

```text
feat: add speaker audience and support routes
```

## Task 11 — Implement the honest inquiry workflow

### Test first

Create:

- `src/components/forms/__tests__/inquirySchemas.test.ts`
- `src/components/forms/__tests__/InquiryForm.test.tsx`
- `src/lib/mailto/__tests__/mailtoBuilder.test.ts`

Failing assertions:

- All Appendix A constraints and select values are enforced.
- Error summary receives focus on invalid submission.
- Valid short inquiries create a URI of at most 1,800 characters.
- Long inquiries use the copy-summary path.
- No form value is sent to analytics.
- Opening a mailto draft does not emit completion.
- `/thank-you` is offered only after explicit user confirmation.
- Clipboard failure exposes manual-selection instructions.

### Create

- `src/components/forms/HomeInquiryForm.tsx`
- `src/components/forms/FullInquiryForm.tsx`
- `src/components/forms/ErrorSummary.tsx`
- `src/components/forms/InquiryReview.tsx`
- `src/components/forms/CopyFallback.tsx`
- `src/components/forms/inquirySchemas.ts`
- `src/lib/mailto/mailtoBuilder.ts`
- `src/lib/mailto/inquiryFormatter.ts`

### Implement

- React Hook Form plus Zod.
- Review-before-action flow.
- Attempted mailto handoff.
- Copyable and manually selectable fallback.
- Exact privacy/consent language.
- No fake success.

### Verify

```powershell
npm run test -- src/components/forms src/lib/mailto
npm run typecheck
```

### Commit

```text
feat: add honest static inquiry builder
```

## Task 12 — Complete SEO, social assets, and production metadata

### Create

- `public/robots.txt`
- `public/sitemap.xml`
- `public/site.webmanifest`
- `public/icons/`
- Route-specific Open Graph assets under `public/media/social/`
- `src/components/seo/StructuredData.tsx`

### Test first

Assert:

- No production metadata contains localhost.
- All canonical and Open Graph URLs use the exact production origin.
- FAQ structured data matches visible FAQ text.
- Sitemap contains all canonical trailing-slash routes.
- Social images exist and use base-aware URLs.

### Verify

```powershell
npm run build
npm run check
```

### Commit

```text
feat: add production SEO and social metadata
```

## Task 13 — Add full rendered QA

### Create

- `e2e/routes.spec.ts`
- `e2e/navigation.spec.ts`
- `e2e/home-motion.spec.ts`
- `e2e/reduced-motion.spec.ts`
- `e2e/forms.spec.ts`
- `e2e/accessibility.spec.ts`
- `e2e/visual.spec.ts`
- `e2e/live-pages.spec.ts`

### Automated scenarios

- Every direct route and reload
- Desktop and mobile navigation
- Keyboard-only navigation
- Audience dropdown and mobile accordion
- Sticky CTA overlap at narrow heights
- Hero WebGL and static fallback
- Reduced-motion reading order
- Form validation, URI limit, clipboard fallback, and user-marked-sent flow
- Missing optional media
- Console error and warning capture
- Axe landmarks and common WCAG violations
- Chromium, Firefox, and WebKit layouts

### Browser visual review

Use the built-in browser first at:

- 1440×1000
- 1280×800
- 1024×768
- 768×1024
- 430×932
- 390×844
- 320×568

Capture:

- Hero
- Manifesto/profile transition
- Motion story
- Audience sequence
- Portfolio
- Booking form
- Mobile navigation and sticky CTA

Compare every accepted concept with the latest screenshot using `view_image`. Fix typography, spacing, crop, hierarchy, motion, interaction, and responsive mismatches until agency-signoff quality.

### Performance review

Verify:

- JavaScript bundle budgets
- Hero-media budgets
- LCP/CLS/INP targets where measurable
- No animation work when hidden
- WebGL DPR and fallback criteria
- No uncompressed delivery images

### Verify

```powershell
npm run check
npm run test:e2e
```

### Commit

```text
test: verify responsive speaker experience
```

## Task 14 — Configure GitHub Pages publication

### Create

- `.github/workflows/deploy-pages.yml`

### Workflow

- Checkout
- Set up Node
- `npm ci`
- `npm run check`
- `npm run build`
- Configure Pages
- Upload `dist`
- Deploy Pages artifact

Use the current official GitHub Pages action versions at implementation time.

### Local preflight

```powershell
git status --short --branch
npm ci
npm run check
npm run test:e2e
git diff --check
```

Confirm:

- Worktree contains only intended files.
- No secrets or source-only media are committed.
- All production routes use `/dtvprodsV3/`.
- The final commit matches the locally verified build.

### Publish

```powershell
git push origin main
```

Enable or verify GitHub Pages with GitHub Actions as the source. Wait for the workflow and Pages deployment to finish.

### Live verification

Verify the production URL:

`https://demonstration-test.github.io/dtvprodsV3/`

Test:

- Root load
- Direct supporting-route loads and reloads
- Base-path assets
- Desktop and mobile layouts
- Reduced motion
- Inquiry builder
- Canonical and Open Graph metadata
- `robots.txt`
- `sitemap.xml`
- No console errors
- Deployment commit SHA matches the verified local commit

### Final handoff

Provide:

- Live demo URL
- Repository URL
- Final commit SHA
- Test summary
- Known production-only limitations of the mailto inquiry workflow

