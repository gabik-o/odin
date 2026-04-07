# Odin — Pure Visuals

Portfolio website for Odinakachi Odibo. Built with Vite + React, extracted from Framer.

**Live site:** https://chatty-research-612495.framer.app

---

## Stack

- **Framework:** Vite + React 18
- **Routing:** React Router v6
- **Animation:** Framer Motion v11
- **Fonts:** JetBrains Mono (Fontsource CDN), Poppins + Playfair Display (Google Fonts)
- **Styling:** Plain CSS with CSS custom properties (no CSS framework)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
odin/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.jsx    # Fixed top nav, mobile menu
│   │   │   └── Footer.jsx        # Site footer
│   │   ├── ui/
│   │   │   ├── Button.jsx        # Pill button (default / outline / ghost)
│   │   │   └── HeadingTitle.jsx  # Animated section heading
│   │   └── ProjectCard.jsx       # Hover image swap card
│   ├── data/
│   │   └── works.js              # All 8 CMS Works items + helper fns
│   ├── pages/
│   │   ├── Home.jsx              # Hero, Featured Works, About, Services, CTA
│   │   ├── Projects.jsx          # Filterable works grid
│   │   ├── ProjectDetail.jsx     # Dynamic /projects/:slug
│   │   ├── About.jsx             # About page
│   │   ├── Contact.jsx           # Contact form
│   │   └── NotFound.jsx          # 404
│   ├── styles/
│   │   └── globals.css           # Design system: CSS vars, typography, reset
│   ├── App.jsx                   # Router + page transitions
│   └── main.jsx                  # React entry point
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Design System

All design tokens live in `src/styles/globals.css` as CSS custom properties, mirroring the Framer project:

| Token | Value |
|---|---|
| `--font-mono` | JetBrains Mono |
| `--font-serif` | Playfair Display |
| `--font-sans` | Poppins |
| `--color-black` | `rgb(0,0,0)` |
| `--color-white` | `rgb(255,255,255)` |
| `--zinc-*` | Full zinc scale (50–950) |

---

## CMS Data

All 8 portfolio works are in `src/data/works.js`. Images are served from Framer's CDN (`framerusercontent.com`).

> **Note:** If you delete the Framer project, CDN links will break. Download images locally and update paths if you want a fully self-contained repo.

Helper functions:
- `getWorkBySlug(slug)` — find one work by URL slug
- `getFeaturedWorks()` — returns works with content (used on homepage)

---

## Deploying

### Vercel (recommended)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# drag `dist/` folder to Netlify dashboard
```

Add a `_redirects` file to `public/` for SPA routing on Netlify:
```
/*    /index.html   200
```

For Vercel this is handled automatically.

---

## Contact Form

The contact form in `src/pages/Contact.jsx` simulates submission. To wire it up:

- **Formspree:** Replace `handleSubmit` with a `fetch` POST to `https://formspree.io/f/<your-id>`
- **Resend / EmailJS / Netlify Forms:** Swap in their respective SDKs

---

## Notes

- Framer component export requires a paid [unframer.co](https://unframer.co) subscription. The components in this repo are hand-reconstructed from the Framer layer XML.
- JetBrains Mono is loaded via the Fontsource CDN in `index.html`. For production, consider self-hosting via `@fontsource/jetbrains-mono`.
