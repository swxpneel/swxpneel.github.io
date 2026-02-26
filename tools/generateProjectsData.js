#!/usr/bin/env node
'use strict';

/**
 * tools/generateProjectsData.js
 *
 * Scans assets/projects/thumbnails/ and assets/projects/downloads/ and
 * writes assets/js/projects-data.js (the single source of truth for cards).
 *
 * Naming convention (slug must match between thumbnail and download):
 *   Thumbnail : assets/projects/thumbnails/<slug>.{jpg,png,webp}
 *   Download  : assets/projects/downloads/<slug>.{xlsx,pdf,zip}
 *
 * Slug → title/category mappings live in TITLE_MAP / CATEGORY_MAP below.
 * Add a new entry there when you add a new project.
 *
 * Usage:
 *   npm run projects:generate
 */

const fs   = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────

const ROOT          = path.join(__dirname, '..');
const THUMBNAILS    = path.join(ROOT, 'assets', 'projects', 'thumbnails');
const DOWNLOADS     = path.join(ROOT, 'assets', 'projects', 'downloads');
const OUTPUT        = path.join(ROOT, 'assets', 'js', 'projects-data.js');

// Map slug → human-readable title.  Add new entries here.
const TITLE_MAP = {
  'inventory-optimization-model':       'Inventory Optimization Model',
  'commercial-trend-modelling':         'Commercial Trend Modelling',
  'marketing-performance-dashboard':    'Marketing Performance Dashboard',
  'financial-reporting-dashboard':      'Financial Reporting Dashboard',
  'business-case-presentation-toolkit': 'Business Case & Presentation Toolkit',
  'resource-scheduling-tool':           'Resource Scheduling Tool',
  'high-park-location-launch':          'High Park Location Launch',
};

// Map slug → category (lowercase, must match filter buttons).  Add new entries here.
const CATEGORY_MAP = {
  'inventory-optimization-model':       'analytics',
  'commercial-trend-modelling':         'analytics',
  'marketing-performance-dashboard':    'analytics',
  'financial-reporting-dashboard':      'analytics',
  'business-case-presentation-toolkit': 'business',
  'resource-scheduling-tool':           'operations',
  'high-park-location-launch':          'business',
};

// Map slug → optional description.
const DESCRIPTION_MAP = {
  'inventory-optimization-model':       'Dynamic inventory optimization model built for La Diperie.',
  'commercial-trend-modelling':         'Trend analysis and commercial forecasting model.',
  'marketing-performance-dashboard':    'KPI dashboard tracking marketing channel performance.',
  'financial-reporting-dashboard':      'Financial reporting dashboard with P&L breakdown.',
  'business-case-presentation-toolkit': 'Structured templates for business case development and executive presentations.',
  'resource-scheduling-tool':           'Workforce and resource scheduling optimizer for operational efficiency.',
  'high-park-location-launch':          'Full launch plan for the High Park franchise location.',
};

const IMAGE_EXTS    = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const DOWNLOAD_EXTS = new Set(['.xlsx', '.pdf', '.zip', '.csv', '.pptx', '.docx']);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugToTitle(slug) {
  if (TITLE_MAP[slug]) { return TITLE_MAP[slug]; }
  // Fallback: convert slug to Title Case
  return slug.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

function slugToCategory(slug) {
  return CATEGORY_MAP[slug] || 'analytics';
}

function slugToDescription(slug) {
  return DESCRIPTION_MAP[slug] || '';
}

function listSlugs(dir, validExts) {
  if (!fs.existsSync(dir)) { return []; }
  return fs.readdirSync(dir)
    .filter(function (f) { return validExts.has(path.extname(f).toLowerCase()); })
    .map(function (f) { return path.basename(f, path.extname(f)); });
}

function findFile(dir, slug, validExts) {
  if (!fs.existsSync(dir)) { return null; }
  var files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    var ext = path.extname(files[i]).toLowerCase();
    if (validExts.has(ext) && path.basename(files[i], ext) === slug) {
      return files[i];
    }
  }
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

var thumbnailSlugs = listSlugs(THUMBNAILS, IMAGE_EXTS);

if (thumbnailSlugs.length === 0) {
  console.error('No thumbnails found in ' + THUMBNAILS);
  console.error('Drop <slug>.{jpg,png,webp} files there first, then re-run.');
  process.exit(1);
}

var projects = thumbnailSlugs.map(function (slug) {
  var thumbFile    = findFile(THUMBNAILS, slug, IMAGE_EXTS);
  var downloadFile = findFile(DOWNLOADS,  slug, DOWNLOAD_EXTS);

  return {
    id:          slug,
    title:       slugToTitle(slug),
    category:    slugToCategory(slug),
    thumbnail:   './assets/projects/thumbnails/' + thumbFile,
    download:    downloadFile ? './assets/projects/downloads/' + downloadFile : '',
    description: slugToDescription(slug)
  };
});

// ─── Generate output file ─────────────────────────────────────────────────────

function jsString(str) {
  return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

var lines = [
  "'use strict';",
  '',
  '// ─── AUTO-GENERATED by tools/generateProjectsData.js ─────────────────────────',
  '// Do not edit manually. Run: npm run projects:generate',
  '//',
  '// To add a project:',
  '//   1. assets/projects/thumbnails/<slug>.{jpg,png,webp}',
  '//   2. assets/projects/downloads/<slug>.{xlsx,pdf,zip}   (optional)',
  '//   3. Add slug to TITLE_MAP / CATEGORY_MAP in tools/generateProjectsData.js',
  '//   4. npm run projects:generate',
  '// ─────────────────────────────────────────────────────────────────────────────',
  '',
  'var PROJECTS = ['
];

projects.forEach(function (p, i) {
  var comma = i < projects.length - 1 ? ',' : '';
  lines.push('  {');
  lines.push('    id:          ' + jsString(p.id) + ',');
  lines.push('    title:       ' + jsString(p.title) + ',');
  lines.push('    category:    ' + jsString(p.category) + ',');
  lines.push('    thumbnail:   ' + jsString(p.thumbnail) + ',');
  lines.push('    download:    ' + jsString(p.download) + ',');
  lines.push('    description: ' + jsString(p.description));
  lines.push('  }' + comma);
});

lines.push('];');
lines.push('');

// Append the renderer (read from the static template at the bottom of this file)
var rendererStart = '// ─── Render project cards into #project-list ─────────────────────────────────';
var rendererCode = [
  rendererStart,
  '(function () {',
  "  var list = document.getElementById('project-list');",
  '  if (!list) { return; }',
  '',
  '  function escapeHtml(str) {',
  '    return String(str)',
  "      .replace(/&/g, '&amp;')",
  "      .replace(/</g, '&lt;')",
  "      .replace(/>/g, '&gt;')",
  "      .replace(/\"/g, '&quot;');",
  '  }',
  '',
  '  function capitalize(str) {',
  '    return str.charAt(0).toUpperCase() + str.slice(1);',
  '  }',
  '',
  '  PROJECTS.forEach(function (project) {',
  "    var li = document.createElement('li');",
  "    li.className = 'project-item active';",
  "    li.setAttribute('data-filter-item', '');",
  "    li.setAttribute('data-category', project.category);",
  '',
  "    var href         = project.download || '#';",
  "    var downloadAttr = project.download ? ' download' : '';",
  '    var ariaLabel    = project.download',
  "      ? 'Download ' + escapeHtml(project.title)",
  '      : escapeHtml(project.title);',
  "    var iconName     = project.download ? 'download-outline' : 'eye-outline';",
  '',
  '    li.innerHTML =',
  '      \'<a href="\' + escapeHtml(href) + \'"\' + downloadAttr +',
  '        \' aria-label="\' + ariaLabel + \'">\'  +',
  '        \'<figure class="project-img">\' +',
  '          \'<div class="project-item-icon-box">\' +',
  '            \'<ion-icon name="\' + iconName + \'"></ion-icon>\' +',
  '          \'</div>\' +',
  '          \'<img src="\' + escapeHtml(project.thumbnail) + \'"\' +',
  '            \' alt="\' + escapeHtml(project.title) + \'"\' +',
  "            ' loading=\"lazy\">' +",
  '        \'</figure>\' +',
  '        \'<h3 class="project-title">\' + escapeHtml(project.title) + \'</h3>\' +',
  "        '<p class=\"project-category\">' + escapeHtml(capitalize(project.category)) + '</p>' +",
  '      \'</a>\';',
  '',
  '    list.appendChild(li);',
  '  });',
  '}());'
];

lines = lines.concat(rendererCode);

fs.writeFileSync(OUTPUT, lines.join('\n') + '\n', 'utf8');
console.log('Written ' + projects.length + ' project(s) to ' + OUTPUT);
projects.forEach(function (p) {
  var dl = p.download ? '  download: ' + p.download : '  download: (none)';
  console.log('  [' + p.category + '] ' + p.title);
  console.log(dl);
});
