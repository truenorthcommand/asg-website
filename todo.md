# ASG Website TODO

## Setup & Brand
- [x] Upload ASG logo to CDN (transparent PNG)
- [x] Configure brand tokens in index.css (Primary Green #1B5E35, Secondary Green #2E8B57, Deep Navy #1A2332, Warm Grey #F5F5F0, Alert Red #C41E3A)
- [x] Add Inter font via Google Fonts CDN
- [x] Configure security headers in server

## Layout Components
- [x] Sticky Header with ASG logo and Emergency 24/7 CTA (red bg, white text)
- [x] Footer with "Powered By TrueNorth Operations Group" on every page
- [x] Navigation menu with all 9 page links
- [x] Mobile responsive hamburger menu

## Pages
- [x] Home page (hero + features + sectors + CTA)
- [x] Services page (10 trades with descriptions and sub-items)
- [x] Sectors page (letting agents, block managers, hospitality, commercial)
- [x] Emergency 24/7 page (red hero, phone, emergency types, coverage)
- [x] About page (story, stats, mission/vision/values, company info)
- [x] How We Work page (4-step process, commitments, emergency CTA)
- [x] Case Studies page (3 real case studies)
- [x] Resources / FAQ page (4 categories, 13 questions, accordion)
- [x] Contact page with IntakeForm

## Forms & Integration
- [x] IntakeForm component (GDPR consent, WCAG 2.2 AA, error handling)
- [x] tRPC intake procedure (POST to TrueNorthOS)
- [x] TrueNorthOS webhook: POST https://asgtruenorthos.cloud/api/external/intake/job
- [x] Bearer token auth: TrueNorth_Secure_Handshake_2026
- [x] 8-field schema mapping (customerName, contactEmail, contactPhone, address, postcode, description, urgency, emergency_type)
- [x] Owner notification on form submission

## SEO & Metadata
- [x] JSON-LD LocalBusiness schema with real company data
- [x] JSON-LD Organization schema
- [x] Open Graph and Twitter Card metadata
- [x] Geo meta tags (geo.region, geo.placename, geo.position)
- [x] robots.txt
- [x] llms.txt (AI crawler context / GEO)
- [x] Sitemap (all 9 pages)
- [x] Skip-to-main-content link

## Real Company Data
- [x] Phone: 01233 564666
- [x] Email: info@adaptservicesgroup.co.uk
- [x] Address: Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR
- [x] Companies House: 17042975

## Testing
- [x] Vitest for intake tRPC procedure (6 tests)
- [x] Vitest for auth logout (1 test)
- [x] Build verification (no TypeScript errors)

## Pending / Future
- [ ] Privacy Policy page (/privacy)
- [ ] Terms & Conditions page (/terms)
- [x] Favicon upload and configuration
- [ ] Security headers configuration
- [ ] Google Analytics / analytics tagging implementation
- [ ] Form submission end-to-end test against live TrueNorthOS
- [x] GitHub push (AdaptServices-Group/New-Website)

## Visual Updates
- [x] Replace Home hero gradient background with aerial property PNG (with dark overlay)
- [x] Restructure hero: full-width photo section (no overlay) + content section below
- [x] Generate photorealistic 1920x500px aerial hero banner (AI-generated)
- [x] Upload new hero banner to CDN and deploy to Home page

## Legal Pages
- [x] Create Privacy Policy page (/privacy) with UK GDPR compliance
- [x] Create Terms & Conditions page (/terms)
- [x] Link Privacy and Terms pages in Footer
- [x] Update App.tsx routing for Privacy and Terms pages

## Blog Section (AI-First with HITL Admin Dashboard)
- [x] Create blog database schema and tRPC procedures (13 procedures)
- [x] Build admin dashboard UI (Drafts, Scheduled, Live tabs)
- [x] Build edit modal and preview modal
- [x] Create brand voice guidelines document (docs/ASG_BRAND_VOICE.md)
- [x] Create blog listing page and individual article pages with SEO
- [x] Add blog links to header and footer navigation
- [x] Update sitemap.xml with blog routes
- [x] Seed 4 initial blog posts (emergency prevention, reactive vs proactive, compliance, case study)
- [ ] Create AI generation job (scheduled Mon/Wed/Fri 6 PM)
- [ ] Test blog system end-to-end
- [ ] Set up monitoring for AI generation job
