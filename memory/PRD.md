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
