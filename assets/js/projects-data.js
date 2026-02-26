'use strict';

// ─── Central project data (single source of truth) ───────────────────────────
//
// To add a new project:
//   1. Drop the thumbnail  → assets/projects/thumbnails/<slug>.{jpg,png,webp}
//   2. Drop the download   → assets/projects/downloads/<slug>.{xlsx,pdf,zip}
//   3. Append an entry below (or run: npm run projects:generate)
//
// Fields:
//   id          - unique slug (matches file names)
//   title       - displayed on card
//   category    - lowercase: "analytics" | "operations" | "business"
//   thumbnail   - path to card image (relative to index.html)
//   download    - path to downloadable file, or "" if not yet available
//   description - optional short description
// ─────────────────────────────────────────────────────────────────────────────

var PROJECTS = [
  {
    id:          'inventory-optimization-model',
    title:       'Inventory Optimization Model',
    category:    'analytics',
    thumbnail:   './assets/images/project-1.jpg',
    download:    './assets/projects/downloads/inventory-optimization-model.xlsx',
    description: 'Dynamic inventory optimization model built for La Diperie.'
  },
  {
    id:          'commercial-trend-modelling',
    title:       'Commercial Trend Modelling',
    category:    'analytics',
    thumbnail:   './assets/images/project-2.png',
    download:    '',
    description: 'Trend analysis and commercial forecasting model.'
  },
  {
    id:          'marketing-performance-dashboard',
    title:       'Marketing Performance Dashboard',
    category:    'analytics',
    thumbnail:   './assets/images/project-3.jpg',
    download:    './assets/projects/downloads/marketing-performance-dashboard.xlsx',
    description: 'KPI dashboard tracking marketing channel performance.'
  },
  {
    id:          'business-case-presentation-toolkit',
    title:       'Business Case & Presentation Toolkit',
    category:    'business',
    thumbnail:   './assets/images/project-4.png',
    download:    '',
    description: 'Structured templates for business case development and executive presentations.'
  },
  {
    id:          'resource-scheduling-tool',
    title:       'Resource Scheduling Tool',
    category:    'operations',
    thumbnail:   './assets/images/project-5.png',
    download:    './assets/projects/downloads/resource-scheduling-tool.xlsx',
    description: 'Workforce and resource scheduling optimizer for operational efficiency.'
  },
  {
    id:          'high-park-location-launch',
    title:       'High Park Location Launch',
    category:    'business',
    thumbnail:   './assets/images/project-6.png',
    download:    '',
    description: 'Full launch plan for the High Park franchise location.'
  }
];


// ─── Render project cards into #project-list ─────────────────────────────────
(function () {
  var list = document.getElementById('project-list');
  if (!list) { return; }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  PROJECTS.forEach(function (project) {
    var li = document.createElement('li');
    li.className = 'project-item active';
    li.setAttribute('data-filter-item', '');
    li.setAttribute('data-category', project.category);

    var href       = project.download || '#';
    var downloadAttr = project.download ? ' download' : '';
    var ariaLabel  = project.download
      ? 'Download ' + escapeHtml(project.title)
      : escapeHtml(project.title);
    var iconName   = project.download ? 'download-outline' : 'eye-outline';

    li.innerHTML =
      '<a href="' + escapeHtml(href) + '"' + downloadAttr +
        ' aria-label="' + ariaLabel + '">' +
        '<figure class="project-img">' +
          '<div class="project-item-icon-box">' +
            '<ion-icon name="' + iconName + '"></ion-icon>' +
          '</div>' +
          '<img src="' + escapeHtml(project.thumbnail) + '"' +
            ' alt="' + escapeHtml(project.title) + '"' +
            ' loading="lazy">' +
        '</figure>' +
        '<h3 class="project-title">' + escapeHtml(project.title) + '</h3>' +
        '<p class="project-category">' + escapeHtml(capitalize(project.category)) + '</p>' +
      '</a>';

    list.appendChild(li);
  });
}());
