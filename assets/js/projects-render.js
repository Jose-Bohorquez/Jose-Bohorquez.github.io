function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

/* Minúsculas y sin tildes, para que "aplicacion" encuentre "Aplicación". */
function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function statusClass(status) {
  const value = normalize(status);
  if (value.includes("desarrollo")) return "status status-dev";
  if (value.includes("produccion")) return "status status-live";
  return "status";
}

function projectLinks(project) {
  const links = [];
  if (project.demo) {
    links.push(`<a class="btn btn-sm btn-primary" href="${escapeHtml(project.demo)}" target="_blank" rel="noopener">Ver sitio<span class="visually-hidden"> de ${escapeHtml(project.title)}</span></a>`);
  }
  if (project.github) {
    links.push(`<a class="btn btn-sm" href="${escapeHtml(project.github)}" target="_blank" rel="noopener">Ver código<span class="visually-hidden"> de ${escapeHtml(project.title)}</span></a>`);
  }
  return links;
}

function projectCard(project) {
  const id = window.PROJECTS.indexOf(project);
  const tags = (project.tags || []).map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`).join("");
  const links = projectLinks(project);
  const details = `<button class="btn btn-sm btn-ghost-text" type="button" data-open-project="${id}">Detalles<span class="visually-hidden"> de ${escapeHtml(project.title)}</span></button>`;
  const footer = links.length
    ? `<div class="card-links">${links.join("")}${details}</div>`
    : `<div class="card-links"><p class="card-note">Código privado y sin demo pública.</p>${details}</div>`;

  return `
    <article class="card" data-category="${escapeHtml(project.category)}">
      <button class="card-media" type="button" data-open-project="${id}" aria-label="Ver detalles de ${escapeHtml(project.title)}">
        <img src="${escapeHtml(project.image)}" alt=""
          width="${project.width || 1366}" height="${project.height || 768}"
          loading="lazy" decoding="async">
      </button>
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

/* Las imágenes aparecen con un fundido cuando terminan de cargar. */
function watchImages(host) {
  host.querySelectorAll(".card-media img").forEach((img) => {
    const done = () => img.classList.add("is-loaded");
    if (img.complete) done();
    else {
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    }
  });
}

/* Lista visible en cada grilla, para navegar con anterior/siguiente dentro del modal. */
const visibleLists = new WeakMap();

function paint(host, items) {
  host.innerHTML = items.map(projectCard).join("");
  visibleLists.set(host, items.map((project) => window.PROJECTS.indexOf(project)));
  watchImages(host);
}

function renderProjects(selector, { featuredOnly = false, limit } = {}) {
  const host = document.querySelector(selector);
  if (!host || !window.PROJECTS) return [];

  let items = featuredOnly ? window.PROJECTS.filter((project) => project.featured) : window.PROJECTS;
  if (typeof limit === "number") items = items.slice(0, limit);

  paint(host, items);
  initProjectDialog();
  initCardEffects();
  return items;
}

/* ---------- Modal de detalle ---------- */
let dialogState = null;

function initProjectDialog() {
  if (dialogState) return;

  document.body.insertAdjacentHTML("beforeend", `
    <dialog class="project-dialog" aria-labelledby="pd-title">
      <div class="pd-inner">
        <div class="pd-media"><img alt="" width="1366" height="768"></div>
        <div class="pd-body">
          <div class="pd-meta"><span class="status" data-pd-status></span><span class="pd-category" data-pd-category></span></div>
          <h2 id="pd-title" data-pd-title></h2>
          <p class="pd-text" data-pd-text></p>
          <ul class="tags" data-pd-tags aria-label="Tecnologías"></ul>
          <div class="card-links" data-pd-links></div>
          <div class="pd-nav">
            <button class="btn btn-sm" type="button" data-pd-prev>Anterior</button>
            <span class="pd-count" data-pd-count></span>
            <button class="btn btn-sm" type="button" data-pd-next>Siguiente</button>
          </div>
        </div>
        <button class="icon-btn pd-close" type="button" data-pd-close aria-label="Cerrar detalle">${window.Site.ICONS.close}</button>
      </div>
    </dialog>
  `);

  const dialog = document.querySelector(".project-dialog");
  const q = (selector) => dialog.querySelector(selector);
  dialogState = { dialog, list: [], position: 0 };

  const show = (position) => {
    const { list } = dialogState;
    dialogState.position = (position + list.length) % list.length;
    const project = window.PROJECTS[list[dialogState.position]];

    const img = q(".pd-media img");
    img.classList.remove("is-loaded");
    img.src = project.image;
    img.width = project.width || 1366;
    img.height = project.height || 768;
    img.alt = `Captura de ${project.title}`;
    if (img.complete) img.classList.add("is-loaded");
    else img.onload = () => img.classList.add("is-loaded");

    const status = q("[data-pd-status]");
    status.className = statusClass(project.status);
    status.textContent = project.status;
    q("[data-pd-category]").textContent = project.category || "";
    q("[data-pd-title]").textContent = project.title;
    q("[data-pd-text]").textContent = project.description;
    q("[data-pd-tags]").innerHTML = (project.tags || []).map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`).join("");
    const links = projectLinks(project);
    q("[data-pd-links]").innerHTML = links.length ? links.join("") : '<p class="card-note">Código privado y sin demo pública.</p>';
    q("[data-pd-count]").textContent = `${dialogState.position + 1} de ${list.length}`;
    q(".pd-nav").hidden = list.length < 2;

    q(".pd-body").classList.remove("is-swapping");
    void q(".pd-body").offsetWidth;
    q(".pd-body").classList.add("is-swapping");
  };

  const close = () => dialog.close();

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-project]");
    if (!trigger) return;
    const host = trigger.closest(".projects-grid");
    const list = (host && visibleLists.get(host)) || window.PROJECTS.map((_, index) => index);
    const id = Number(trigger.dataset.openProject);
    dialogState.list = list;
    show(Math.max(0, list.indexOf(id)));
    dialog.showModal();
    document.documentElement.classList.add("dialog-open");
  });

  q("[data-pd-close]").addEventListener("click", close);
  q("[data-pd-prev]").addEventListener("click", () => show(dialogState.position - 1));
  q("[data-pd-next]").addEventListener("click", () => show(dialogState.position + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") show(dialogState.position + 1);
    if (event.key === "ArrowLeft") show(dialogState.position - 1);
  });
  dialog.addEventListener("close", () => document.documentElement.classList.remove("dialog-open"));
}

/* ---------- Inclinación y brillo de tarjetas (solo mouse) ---------- */
let effectsReady = false;

function initCardEffects() {
  if (effectsReady) return;
  effectsReady = true;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover || window.Site.prefersReducedMotion()) return;

  document.addEventListener("pointermove", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    card.style.setProperty("--ry", `${((px - 0.5) * 5).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${((0.5 - py) * 5).toFixed(2)}deg`);
  });

  document.addEventListener("pointerout", (event) => {
    const card = event.target.closest(".card");
    if (!card || card.contains(event.relatedTarget)) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}

/* ---------- Filtros + búsqueda (se reflejan en la URL) ---------- */
function initFilters(filtersSelector, gridSelector) {
  const bar = document.querySelector(filtersSelector);
  const grid = document.querySelector(gridSelector);
  if (!bar || !grid || !window.PROJECTS) return;

  const categories = [...new Set(window.PROJECTS.map((project) => project.category).filter(Boolean))];
  const options = ["Todos", ...categories];
  const params = new URLSearchParams(window.location.search);
  const state = {
    filter: options.includes(params.get("tipo")) ? params.get("tipo") : "Todos",
    query: params.get("q") || ""
  };

  bar.innerHTML = `
    <label class="search">
      <span class="visually-hidden">Buscar proyectos</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <input type="search" data-search placeholder="Buscar por nombre o tecnología" autocomplete="off" value="${escapeHtml(state.query)}">
    </label>
    <div class="filter-chips" role="group" aria-label="Filtrar por tipo de proyecto">
      ${options.map((option) => `
        <button class="filter-btn" type="button" data-filter="${escapeHtml(option)}" aria-pressed="${option === state.filter}">${escapeHtml(option)}</button>
      `).join("")}
    </div>
    <span class="filter-count" data-filter-count aria-live="polite"></span>
  `;

  const count = bar.querySelector("[data-filter-count]");
  const input = bar.querySelector("[data-search]");

  const syncUrl = () => {
    const next = new URLSearchParams();
    if (state.filter !== "Todos") next.set("tipo", state.filter);
    if (state.query.trim()) next.set("q", state.query.trim());
    const qs = next.toString();
    history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  };

  const apply = ({ animate = true } = {}) => {
    const needle = normalize(state.query.trim());
    const items = window.PROJECTS.filter((project) => {
      if (state.filter !== "Todos" && project.category !== state.filter) return false;
      if (!needle) return true;
      const haystack = normalize([project.title, project.description, project.category, ...(project.tags || [])].join(" "));
      return needle.split(/\s+/).every((term) => haystack.includes(term));
    });

    if (items.length) {
      paint(grid, items);
      if (animate) {
        grid.querySelectorAll(".card").forEach((card, index) => {
          card.style.animationDelay = `${Math.min(index, 8) * 45}ms`;
          card.classList.add("is-entering");
        });
      }
    } else {
      visibleLists.set(grid, []);
      grid.innerHTML = `
        <div class="empty-state">
          <p><strong>Ningún proyecto coincide${state.query.trim() ? ` con “${escapeHtml(state.query.trim())}”` : ""}${state.filter !== "Todos" ? ` en ${escapeHtml(state.filter)}` : ""}.</strong></p>
          <p>Prueba con otra tecnología, por ejemplo PHP o Tailwind.</p>
          <button class="btn btn-sm" type="button" data-reset-filters>Ver todos los proyectos</button>
        </div>
      `;
    }

    count.textContent = `${items.length} ${items.length === 1 ? "proyecto" : "proyectos"}`;
    bar.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === state.filter));
    });
    syncUrl();
  };

  bar.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-filter]");
    if (!btn || btn.dataset.filter === state.filter) return;
    state.filter = btn.dataset.filter;
    apply();
  });

  let debounce;
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.query = input.value;
      apply();
    }, 140);
  });

  grid.addEventListener("click", (event) => {
    if (!event.target.closest("[data-reset-filters]")) return;
    state.filter = "Todos";
    state.query = "";
    input.value = "";
    apply();
    input.focus();
  });

  apply({ animate: false });
}

window.ProjectsUI = { renderProjects, initFilters };
