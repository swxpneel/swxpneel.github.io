# vCard - Personal portfolio

![GitHub repo size](https://img.shields.io/github/repo-size/codewithsadee/vcard-personal-portfolio)
![GitHub stars](https://img.shields.io/github/stars/codewithsadee/vcard-personal-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/codewithsadee/vcard-personal-portfolio?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/codewithsadee_?style=social)](https://twitter.com/intent/follow?screen_name=codewithsadee_)
[![YouTube Video Views](https://img.shields.io/youtube/views/SoxmIlgf2zM?style=social)](https://youtu.be/SoxmIlgf2zM)

vCard is a fully responsive personal portfolio website, responsive for all devices, built using HTML, CSS, and JavaScript.

## Demo

![vCard Desktop Demo](./website-demo-image/desktop.png "Desktop Demo")
![vCard Mobile Demo](./website-demo-image/mobile.png "Mobile Demo")

## Prerequisites

Before you begin, ensure you have met the following requirements:

* [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.

## Installing vCard

To install **vCard**, follow these steps:

Linux and macOS:

```bash
sudo git clone https://github.com/codewithsadee/vcard-personal-portfolio.git
```

Windows:

```bash
git clone https://github.com/codewithsadee/vcard-personal-portfolio.git
```

## Contact

If you want to contact me you can reach me at [Twitter](https://www.x.com/codewithsadee_).

## Managing Portfolio Projects

Project cards are driven by a single data file:

```
assets/js/projects-data.js   ← edit this file to add/change projects
```

### Adding a new project (manual)

1. **Drop a thumbnail** into `assets/projects/thumbnails/`:
   ```
   assets/projects/thumbnails/<slug>.jpg   (or .png / .webp)
   ```

2. **Drop the download file** into `assets/projects/downloads/`:
   ```
   assets/projects/downloads/<slug>.xlsx   (or .pdf / .zip)
   ```
   Skip this step if no file is ready yet — the card will still display.

3. **Append an entry** in `assets/js/projects-data.js`:
   ```js
   {
     id:          'my-new-project',
     title:       'My New Project',
     category:    'analytics',          // analytics | operations | business
     thumbnail:   './assets/projects/thumbnails/my-new-project.jpg',
     download:    './assets/projects/downloads/my-new-project.xlsx',
     description: 'Short description shown on hover.'
   }
   ```

4. Reload `index.html` — no build step required.

### Slug naming convention

Use lowercase kebab-case that matches across both folders:
- `inventory-optimization-model.jpg`  →  `inventory-optimization-model.xlsx`

### Auto-generating the data file (optional)

If you store thumbnails in `assets/projects/thumbnails/` you can have the
script scan both folders and regenerate `projects-data.js` automatically.

**Requirements:** Node.js ≥ 14

```bash
# Install (one-time, no dependencies needed)
# Just have Node.js available, then:

npm run projects:generate
```

Before running, add your slug's title and category to the maps inside
`tools/generateProjectsData.js` (`TITLE_MAP` / `CATEGORY_MAP`).

### Current project structure

| Slug | Category | Download |
|------|----------|---------|
| `inventory-optimization-model` | analytics | ✅ xlsx |
| `commercial-trend-modelling` | analytics | — |
| `marketing-performance-dashboard` | analytics | ✅ xlsx |
| `business-case-presentation-toolkit` | business | — |
| `resource-scheduling-tool` | operations | ✅ xlsx |
| `high-park-location-launch` | business | — |

## License

MIT
