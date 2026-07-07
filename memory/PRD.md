# Coach Lady Wassa - Site Web Haute Conversion

## Problem Statement
Build a high-conversion website for Coach Lady Wassa, neuroscience coach in Ouagadougou, Burkina Faso. Target: 5,000 EUR/month revenue in 6 months.

## Architecture
- **Backend**: FastAPI + MongoDB (leads, webinar registrations, contact, newsletter)
- **Frontend**: React single-page scrollable site with 13 sections
- **Styling**: Tailwind CSS + Shadcn UI + Framer Motion animations
- **Brand Colors**: Navy #0B3A5A, Gold #D4AF37, Off-white #FAF9F6

## User Personas
1. Dirigeants/Entrepreneurs (35-55 ans, 500-1500€ formations)
2. Femmes actives professionnelles (28-45 ans, 200-500€ formations)
3. Etudiants/Jeunes professionnels (18-30 ans, 50-200€ formations)

## Core Requirements
- Single-page landing with smooth scroll navigation
- All CTAs redirect to WhatsApp (no payment integration)
- Interactive quiz (8 questions, 4 profile types)
- Forms: leads, webinar registration, contact, newsletter
- Blog with category filtering
- FAQ accordion
- Mobile responsive

## What's Been Implemented (Dec 2025)
- [x] Navbar with smooth scroll + mobile hamburger
- [x] Hero section with CTAs
- [x] Problem agitation section (3 cards)
- [x] About section with video + credentials + 3 pillars
- [x] Testimonials with WhatsApp screenshots + written reviews + stats
- [x] Formations catalog (4 tiers: 97€, 297€, 697€, 1997€)
- [x] Interactive quiz (8 questions, 4 profiles, lead capture)
- [x] Webinar registration form
- [x] Book promotion with 3 formats
- [x] Media/Press section with marquee
- [x] Blog with category filter (6 articles)
- [x] FAQ accordion (4 themes)
- [x] Contact multi-channel (WhatsApp, email form, booking)
- [x] Footer with newsletter
- [x] WhatsApp floating button
- [x] Backend API (5 endpoints)

## What's Been Implemented (Apr 2026)
### Admin & Auth
- [x] Admin dashboard: manual member creation (email + password + formation access + book access)
- [x] Admin can delete members, reset passwords, toggle book access
- [x] Admin login auto-redirects to /admin (based on role)

### UI / Content overhaul (Jul 2026)
- [x] Hero redesigned with dark navy background + gold headline "Cabinet Mindset Coaching / Life & Corporate Coach", 2 columns (photo + presentation list)
- [x] Navbar adapts colors (transparent+white on hero, glass+dark on scroll)
- [x] Problem section rewritten with full new copy + WASA-WASA™ method (4 steps)
- [x] AboutSection "Mon parcours avec la peur" long-form story
- [x] Mission de-duplicated (only in About now)
- [x] Testimonials: 4 book audios + 1 Voix de Reine audio (categorized), 12 WhatsApp screenshots, 6 written reviews, dedicace legend fixed
- [x] Videos section: Loom videos "Voix de Reine" preserved
- [x] Media & Presse: added 2 new .mov event/interview videos
- [x] BookSection redesigned as flagship product: gold "Best-Seller" badge, huge banner, glow effects, promo LIVRE20, 3 format cards with WhatsApp CTA
- [x] Section order optimized: Hero → Problem → About → Services → Formations → Book → Testimonials → Videos → Quiz → Webinar → Media → Blog → FAQ → Contact

### Secure Online Book Reader (Jul 2026)
- [x] Backend: PDF (148 pages, "L'art de faire face à ses peurs") pre-rendered at 2x DPI as JPEGs (12 MB total, stored in /app/backend/private_files/pages/)
- [x] Backend: PyMuPDF + Pillow — server-side diagonal watermark (user email) applied dynamically at request time
- [x] Backend endpoints: GET /api/member/book/info, GET /api/member/book/page/{n}.jpg (auth + book_access required, 401/403 enforced)
- [x] Backend endpoint: PUT /api/admin/members/{id}/book-access (toggle)
- [x] User model: added `book_access` boolean (default False)
- [x] Frontend: /membre/livre page (BookReaderPage.js) with:
  - Prev/Next chevron buttons, page slider + numeric input, keyboard arrows
  - Format 12×20 cm (aspect ratio 3/5, exact book dimensions)
  - Anti-scraping: user-select:none, oncontextmenu prevented, ondragstart prevented, onCopy/Cut prevented, keyboard shortcuts blocked (Ctrl+S/P/C/U/A + F12 + PrintScreen)
  - Anti-print: CSS @media print hides content + beforeprint listener
  - Client-side + server-side watermark overlay (double protection)
  - Blob URL (not file URL) — no direct link exposed
- [x] Member dashboard: "Mon livre" gold tile visible ONLY if book_access enabled, links to /membre/livre
- [x] Admin dashboard: create form checkbox + per-member toggle button for book access

### SEO / Marketing
- [x] Typos fixed: "À propos" + "Témoignages" everywhere
- [x] OVH .htaccess with proper React Router rewrite + HTTPS + www redirect + cache/gzip
- [x] SEO: react-helmet-async with dynamic per-page meta (title, description, OG, Twitter)
- [x] SEO: JSON-LD structured data (Person, ProfessionalService, Article)
- [x] SEO: sitemap.xml + robots.txt
- [x] Custom Open Graph image 1200×630 generated with Gemini Nano Banana
- [x] Exit-intent popup (desktop mouse-leave + mobile 45s timer) capturing leads via /api/leads
- [x] PHP OVH email endpoints (leads, contact, webinar) with admin notification + auto-reply to visitor
- [x] Facebook + TikTok social icons in footer

### Blog
- [x] Static blog articles (blogArticles.js) — works without backend on OVH deployment

## Backlog
### P0 (Before Launch)
- Replace placeholder WhatsApp number with real number
- Add real testimonial videos
- Add real media logos and article links

### P1 (Week 1-2)
- Email sequence automation (Brevo/SendGrid integration)
- WhatsApp Business API integration (Twilio)
- Analytics integration (Google Analytics 4)

### P2 (Month 1-2)
- Payment integration (Stripe + Flutterwave for Mobile Money)
- CRM integration (HubSpot)
- Blog CMS for article management
- A/B testing for landing page headlines

### Next Tasks
- Add SEO meta tags and Open Graph
- Implement membership subscription model
- Add admin dashboard for lead management
