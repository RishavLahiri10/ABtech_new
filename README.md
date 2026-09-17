# AB Tech Learning Educational Service — NIOS institute website

Five React pages: Home, About, Admissions, Courses and Contact. Plain JSX, CSS and JavaScript; no UI framework.

## Run
Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Production: `npm run build`; inspect with `npm run preview`. Deploy the `dist` folder with an SPA fallback to `index.html` for direct routes such as `/about`.

## Files
- `index.html`: document and metadata
- `src/main.jsx`: React entry point
- `src/App.jsx`: routes, shared header and mobile navigation
- `src/components.jsx`: brand, page banner, contact strip and footer
- `src/content.js`: editable institute details, highlights and sample subjects
- `src/pages/`: Home.jsx, About.jsx, Admissions.jsx, Courses.jsx, Contact.jsx
- `src/styles.css`: mobile-first styling, navy/gold/white/green palette
- `public/`: local WebP placeholders and downloadable sample inquiry form

## Replace before launch
Search for `PLACEHOLDER`, bracketed content and “To be confirmed”. Replace the contacts, history, fee schedule, policies, subject offerings, admission streams and dates. Only publish verified accreditation and consented authentic testimonials. Local images are intentional placeholders; replace with licensed photos and matching alt text. Update the map iframe with the verified address embed.

The inquiry form uses browser validation but does not transmit or store data. Connect `submit` in Contact.jsx to your backend; add server validation, spam protection and an accurate privacy/consent notice. Do not show delivery success until the server confirms it. The TXT download is a sample inquiry form, not an official NIOS application.

## Accessibility and performance
Semantic landmarks, visible focus, skip link, route focus, native form labels, mobile menu state, Escape close, reduced motion and reserved image dimensions are included. Main text/background combinations meet AA contrast. Local images and system fonts avoid external requests. Check again after replacing content.

## Content references
Structure reference: https://denovoinstitute.org/nios-about-us/
NIOS overview: https://www.nios.ac.in/
Eligibility guidance: https://sdmis.nios.ac.in/home/faqs
All site copy is freshly written. Subject lists are illustrative, not an exhaustive prospectus. Recheck official requirements for the selected admission cycle.

## Code budget
A package lock is included for reproducible installation.
