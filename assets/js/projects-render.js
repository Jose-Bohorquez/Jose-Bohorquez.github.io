function projectCard(project) {
  const tags = (project.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join("");
  const demo = project.demo
    ? `<a class="btn" href="${project.demo}" target="_blank" rel="noopener">Ver sitio</a>`
    : "";

  return `
    <article class="card">
      <img class="card-image" src="${project.image}" alt="${project.title}">
      <div class="card-body">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-text">${project.description}</p>
        <div class="tags">
          <span class="tag">${project.status}</span>
          ${tags}
        </div>
        <div class="links">
          <a class="btn" href="${project.github}" target="_blank" rel="noopener">GitHub</a>
          ${demo}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(selector, limit) {
  const host = document.querySelector(selector);
  if (!host || !window.PROJECTS) return;

  const items = typeof limit === "number" ? window.PROJECTS.slice(0, limit) : window.PROJECTS;
  host.innerHTML = items.map(projectCard).join("");
}

window.ProjectsUI = { renderProjects };
