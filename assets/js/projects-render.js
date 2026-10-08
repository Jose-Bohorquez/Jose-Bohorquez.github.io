function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function statusClass(status) {
  const value = (status || "").toLowerCase();
  if (value.includes("desarrollo")) return "status status-dev";
  if (value.includes("producci")) return "status status-live";
  return "status";
}

function projectCard(project, { eager = false } = {}) {
  const tags = (project.tags || []).map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`).join("");

  const links = [];
  if (project.demo) {
    links.push(`<a class="btn btn-sm btn-primary" href="${escapeHtml(project.demo)}" target="_blank" rel="noopener">Ver sitio<span class="visually-hidden"> de ${escapeHtml(project.title)}</span></a>`);
  }
  if (project.github) {
    links.push(`<a class="btn btn-sm" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">Ver código<span class="visually-hidden"> de ${escapeHtml(project.title)}</span></a>`);
  }
  const footer = links.length
    ? `<div class="card-links">${links.join("")}</div>`
    : `<p class="card-note">Código privado y sin demo pública.</p>`;

  return `
    <article class="card" data-category="${escapeHtml(project.category)}">
      <div class="card-media">
        <img src="${escapeHtml(project.image)}" alt="Captura de ${escapeHtml(project.title)}"
          width="${project.width || 1366}" height="${project.height || 768}"
          loading="${eager ? "eager" : "lazy"}" decoding="async">
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <span class="${statusClass(project.status)}">${escapeHtml(project.status)}</span>
        </div>
        <p class="card-text">${escapeHtml(project.description)}</p>
        <ul class="tags" aria-label="Tecnologías">${tags}</ul>
        ${footer}
      </div>
    </article>
  `;
}

function renderProjects(selector, { featuredOnly = false, limit } = {}) {
  const host = document.querySelector(selector);
  if (!host || !window.PROJECTS) return [];

  let items = featuredOnly ? window.PROJECTS.filter((project) => project.featured) : window.PROJECTS;
  if (typeof limit === "number") items = items.slice(0, limit);

  host.innerHTML = items.map((project) => projectCard(project)).join("");
  return items;
}

/* Filtros por categoría: los botones se generan a partir de los datos. */
function initFilters(filtersSelector, gridSelector) {
  const bar = document.querySelector(filtersSelector);
  const grid = document.querySelector(gridSelector);
  if (!bar || !grid || !window.PROJECTS) return;

  const categories = [...new Set(window.PROJECTS.map((project) => project.category).filter(Boolean))];
  const options = ["Todos", ...categories];

  bar.innerHTML = `
    ${options.map((option, index) => `
      <button class="filter-btn" type="button" data-filter="${escapeHtml(option)}" aria-pressed="${index === 0}">${escapeHtml(option)}</button>
    `).join("")}
    <span class="filter-count" data-filter-count aria-live="polite"></span>
  `;

  const count = bar.querySelector("[data-filter-count]");
  const apply = (filter) => {
    const items = filter === "Todos"
      ? window.PROJECTS
      : window.PROJECTS.filter((project) => project.category === filter);

    grid.innerHTML = items.map((project) => projectCard(project)).join("");
    grid.querySelectorAll(".card").forEach((card, index) => {
      card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
      card.classList.add("is-entering");
    });
    count.textContent = `${items.length} ${items.length === 1 ? "proyecto" : "proyectos"}`;
    bar.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
    });
  };

  bar.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-filter]");
    if (btn && btn.getAttribute("aria-pressed") !== "true") apply(btn.dataset.filter);
  });

  count.textContent = `${window.PROJECTS.length} proyectos`;
}

window.ProjectsUI = { renderProjects, initFilters };
