# CLAUDE.md — AI Assistant Guide for ANIS-PORTFOLIO

This file provides context for AI assistants (Claude Code, etc.) working in this repository.

---

## Project Overview

A **static personal portfolio site** for Anis Bouchema — a business analyst and operations strategist. Single HTML file, no build step required for the site itself. Pure vanilla HTML5 + CSS3 + JavaScript.

**Live URL:** Deployed via GitHub Pages from the `master` branch.

---

## Repository Structure

```
ANIS-PORTFOLIO/
├── index.html                          # Single-page app — all content lives here
├── assets/
│   ├── css/
│   │   └── style.css                  # Monolithic stylesheet (1,883 lines)
│   ├── js/
│   │   ├── script.js                  # DOM interactivity (navigation, filters, form)
│   │   └── projects-data.js           # Project data + card renderer (single source of truth)
│   ├── images/                        # Avatars, icons, logos, project thumbnails
│   └── projects/
│       ├── downloads/                 # Downloadable project files (.xlsx, .pdf, .zip)
│       └── thumbnails/                # Project card images (populated as projects are added)
├── tools/
│   └── generateProjectsData.js        # Node.js CLI: auto-generates projects-data.js from filesystem
├── package.json                       # Defines `npm run projects:generate` only — no runtime deps
└── README.md                          # User-facing docs and project management instructions
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic: `article`, `section`, `aside`, `figure`) |
| Styling | Vanilla CSS3 — custom properties, flexbox, media queries. No preprocessor. |
| Scripting | Vanilla JavaScript (`'use strict'`, ES6 features, no framework, no bundler) |
| Icons | Ionicons 5.5.2 via CDN |
| Fonts | Google Fonts — Poppins |
| Maps | Google Maps Embed (iframe in Contact section) |
| Tooling | Node.js (optional — only for `npm run projects:generate`) |
| Deployment | Static hosting — GitHub Pages (from `master` branch) |

**No framework, no bundler, no transpiler.** Scripts run as-is in the browser.

---

## How the Site Works

### Single-Page Navigation

`index.html` contains four `<article>` sections, each with a `data-page` attribute:
- `about` — bio, services, leadership roles
- `resume` — education, experience, skills
- `portfolio` — filterable project cards
- `contact` — map, contact form

Navigation links in the navbar match the `data-page` values. `script.js` switches visibility by toggling the `.active` class on the matching article.

### Portfolio Cards (Data-Driven)

Project cards are **not hardcoded in `index.html`**. They are injected at runtime by `assets/js/projects-data.js`.

**`index.html`** contains only an empty list:
```html
<ul class="project-list" id="project-list">
  <!-- Project cards are injected by assets/js/projects-data.js -->
</ul>
```

**`assets/js/projects-data.js`** defines the `PROJECTS` array and an IIFE that renders cards into `#project-list`.

**Script load order** (bottom of `<body>`):
1. `assets/js/projects-data.js` — renders cards first
2. `assets/js/script.js` — then queries `[data-filter-item]` for filtering

### Portfolio Filtering

Cards are filtered by `data-category` attribute. Filter buttons (desktop) and a dropdown (mobile) call `filterFunc(selectedValue)` in `script.js`, which shows/hides cards using the `.active` class.

---

## Adding a New Project

### Rule: Only add projects that have a download file ready.

Projects without a download file should not appear on the site.

### Manual Method

1. **Drop the thumbnail** → `assets/images/project-N.jpg` (or `assets/projects/thumbnails/<slug>.{jpg,png,webp}`)
2. **Drop the download file** → `assets/projects/downloads/<slug>.{xlsx,pdf,zip}`
3. **Edit `assets/js/projects-data.js`** — append an entry to the `PROJECTS` array:

```js
{
  id:          'your-project-slug',        // kebab-case, matches file names
  title:       'Your Project Title',
  category:    'analytics',               // 'analytics' | 'operations' | 'business'
  thumbnail:   './assets/images/project-N.jpg',
  download:    './assets/projects/downloads/your-project-slug.xlsx',
  description: 'Short description of the project.'
}
```

### Automated Method (preferred for multiple projects)

1. Drop thumbnail into `assets/projects/thumbnails/<slug>.{jpg,png,webp}`
2. Drop download into `assets/projects/downloads/<slug>.{xlsx,pdf,zip,csv,pptx,docx}`
3. Update the maps in `tools/generateProjectsData.js`:
   - `TITLE_MAP` — slug → human-readable title
   - `CATEGORY_MAP` — slug → category
   - `DESCRIPTION_MAP` — slug → description
4. Run: `npm run projects:generate`
5. The script regenerates `assets/js/projects-data.js` automatically.

### Removing a Project

Remove the entry from the `PROJECTS` array in `assets/js/projects-data.js`. Do **not** remove the download file from `assets/projects/downloads/` unless explicitly instructed — it may still be linked externally.

### Current Active Projects (as of March 2026)

| Slug | Title | Category | Download |
|------|-------|----------|---------|
| `inventory-optimization-model` | Inventory Optimization Model | analytics | `.xlsx` ✅ |
| `marketing-performance-dashboard` | Marketing Performance Dashboard | analytics | `.xlsx` ✅ |
| `resource-scheduling-tool` | Resource Scheduling Tool | operations | `.xlsx` ✅ |

---

## Styling Conventions

- **Indentation:** 2 spaces throughout (HTML, CSS, JS)
- **CSS custom properties** for colors, shadows, font sizes — defined at `:root`. Always use variables, not raw values.
- **Class naming:** kebab-case (`.project-item`, `.filter-btn`, `.sidebar-info`)
- **Data attributes** drive DOM selection: `[data-sidebar]`, `[data-filter-btn]`, `[data-page]`, `[data-filter-item]`
- **State:** `.active` class toggles visibility and selection throughout. Do not introduce a second state pattern.
- **HTML section comments:** Major sections are marked with `<!-- #SECTION-NAME -->` headers and `<!-- /<section> -->` closers.
- **CSS section headers:** Unicode box-drawing characters (`╔══...`) delimit sections. Follow this pattern when adding new CSS sections.
- **No inline styles** — all styling via `style.css` classes.

---

## JavaScript Conventions

- `'use strict'` at the top of every JS file.
- Prefer `const`/`let` over `var` in new code (existing renderer uses `var` for IE compat — leave as-is).
- DOM queries use `data-*` attribute selectors, not IDs or class names, for interactivity hooks.
- IIFEs (Immediately Invoked Function Expressions) are used in `projects-data.js` to avoid polluting global scope — maintain this pattern for any new renderer code.
- The `PROJECTS` array is the only global introduced by `projects-data.js` — keep it minimal.
- No external JS libraries beyond Ionicons (CDN, icon rendering only).

---

## Git Workflow

- **Default branch:** `master` — this is what GitHub Pages deploys.
- **Feature branches:** `claude/<description>-<sessionId>` (e.g., `claude/portfolio-cards-downloads-9Vccq`).
- **Push restriction:** Only `claude/` prefixed branches can be pushed in automated sessions (HTTP 403 on `master`). Changes go live when a PR is merged into `master` via GitHub.
- Commit messages should be concise and descriptive (e.g., `feat: data-driven portfolio cards with click-to-download`).

---

## Common Tasks

### Update personal info (name, bio, contact details, skills, experience)
Edit `index.html` directly. Sections are clearly marked with HTML comments.

### Update profile photo
Replace `assets/images/my-avatar.png`. The sidebar and about section both reference this file.

### Add/remove portfolio filter categories
Edit the `<ul class="filter-list">` and `<ul class="select-list">` in `index.html` (Portfolio section). Keep category values lowercase to match `data-category` on cards.

### Change site colors or typography
Edit CSS custom properties in the `:root` block at the top of `assets/css/style.css`.

### Test locally
Open `index.html` directly in a browser — no server required. All paths are relative. JS and CSS load from relative paths.

---

## What NOT to Do

- Do **not** hardcode project cards in `index.html`. All cards must come from `assets/js/projects-data.js`.
- Do **not** add projects without a corresponding download file in `assets/projects/downloads/`.
- Do **not** introduce a JS framework, bundler, or npm runtime dependency — the site is intentionally dependency-free.
- Do **not** add inline styles to `index.html` — use `style.css` classes.
- Do **not** push directly to `master` in automated sessions — create a feature branch and PR instead.
- Do **not** remove download files from `assets/projects/downloads/` without explicit instruction.
