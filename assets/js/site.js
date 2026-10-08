const CONTACT = {
  email: "josejbohorquezd@gmail.com",
  phone: "+57 317 877 3186",
  location: "Bogotá, Colombia",
  cv: "https://dev-and-test.space/mas/cv/cv_bd_06_full.html",
  github: "https://github.com/Jose-Bohorquez",
  linkedin: "https://www.linkedin.com/in/jose-bohorquez-full-stack-software-developer/",
  whatsapp: "https://wa.link/yd3057"
};

const NAV = [
  { id: "home", label: "Inicio", href: "/" },
  { id: "projects", label: "Proyectos", href: "/pages/projects.html" },
  { id: "about", label: "Sobre mí", href: "/pages/about.html" },
  { id: "contact", label: "Contacto", href: "/pages/contact.html" }
];

const ICONS = {
  sun: '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Tema ---------- */
function readStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    toggle.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }
}

function initThemeToggle() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(readStoredTheme() || (prefersDark ? "dark" : "light"));

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      /* Sin almacenamiento: el cambio dura solo esta visita. */
    }
    setTheme(next);
  });
}

/* ---------- Layout ---------- */
function renderHeader(active) {
  const host = document.querySelector("[data-site-header]");
  if (!host) return;

  const links = NAV.map((item) => `
    <li><a class="nav-link" href="${item.href}"${item.id === active ? ' aria-current="page"' : ""}>${item.label}</a></li>
  `).join("");

  host.outerHTML = `
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="/" aria-label="José Bohórquez, inicio">
          <span class="brand-mark" aria-hidden="true">JB</span>
          <span class="brand-name">José Bohórquez</span>
        </a>
        <nav class="nav" aria-label="Navegación principal">
          <ul class="nav-links" id="menu-principal">${links}</ul>
          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Cambiar a tema oscuro">
            ${ICONS.sun}${ICONS.moon}
          </button>
          <button class="icon-btn menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">
            <span class="bars" aria-hidden="true"><span class="bar"></span><span class="bar"></span><span class="bar"></span></span>
          </button>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  const host = document.querySelector("[data-site-footer]");
  if (!host) return;

  const year = new Date().getFullYear();
  host.outerHTML = `
    <footer class="site-footer">
      <div class="container footer-wrap">
        <p class="footer-copy">© ${year} José Julio Bohórquez Delgado. Code2355.</p>
        <ul class="footer-links">
          <li><a href="${CONTACT.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="${CONTACT.github}" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="${CONTACT.cv}" target="_blank" rel="noopener">CV online</a></li>
          <li><a href="/pages/contact.html">Contacto</a></li>
        </ul>
      </div>
    </footer>
  `;
}

function initMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.getElementById("menu-principal");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

/* ---------- Contacto ---------- */
function initContactBindings() {
  document.querySelectorAll("[data-contact-email]").forEach((anchor) => {
    anchor.href = `mailto:${CONTACT.email}`;
    anchor.textContent = CONTACT.email;
  });

  document.querySelectorAll("[data-contact-phone]").forEach((anchor) => {
    anchor.href = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
    anchor.textContent = CONTACT.phone;
  });

  document.querySelectorAll("[data-contact-location]").forEach((node) => {
    node.textContent = CONTACT.location;
  });

  const links = {
    "[data-contact-github]": CONTACT.github,
    "[data-contact-linkedin]": CONTACT.linkedin,
    "[data-contact-whatsapp]": CONTACT.whatsapp,
    "[data-cv-link]": CONTACT.cv
  };
  Object.entries(links).forEach(([selector, href]) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.href = href;
    });
  });
}

function initCopyEmail() {
  const btn = document.querySelector("[data-copy-email]");
  const status = document.querySelector("[data-copy-status]");
  if (!btn) return;

  let timer;
  const report = (message) => {
    if (status) status.textContent = message;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (status) status.textContent = "";
    }, 2500);
  };

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      report("Correo copiado al portapapeles.");
    } catch (error) {
      report(`No se pudo copiar. Escribe a ${CONTACT.email}`);
    }
  });
}

/* ---------- Contador ---------- */
function initCountdown() {
  const root = document.querySelector("[data-countdown]");
  if (!root) return;

  const refs = {
    days: root.querySelector("[data-days]"),
    hours: root.querySelector("[data-hours]"),
    minutes: root.querySelector("[data-minutes]"),
    seconds: root.querySelector("[data-seconds]")
  };

  const tick = () => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = Math.max(0, end - now);

    refs.days.textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
    refs.hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    refs.minutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    refs.seconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  };

  tick();
  setInterval(tick, 1000);
}

/* ---------- Flujo animado del hero ---------- */
function initFlow() {
  const flow = document.querySelector("[data-flow]");
  if (!flow) return;

  const list = flow.querySelector(".flow-steps");
  const steps = Array.from(flow.querySelectorAll(".flow-step"));
  const replay = flow.querySelector("[data-flow-replay]");
  steps.forEach((step) => {
    step.querySelector(".flow-dot").innerHTML = ICONS.check;
  });

  let timers = [];
  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };

  const setProgress = (index) => {
    const value = steps.length > 1 ? Math.min(1, index / (steps.length - 1)) : 1;
    list.style.setProperty("--progress", String(value));
  };

  const showFinal = () => {
    steps.forEach((step) => (step.dataset.state = "done"));
    setProgress(steps.length - 1);
    flow.dataset.complete = "true";
  };

  const play = () => {
    clearTimers();
    flow.dataset.complete = "false";
    steps.forEach((step) => (step.dataset.state = "idle"));
    setProgress(0);

    if (prefersReducedMotion()) {
      showFinal();
      return;
    }

    const STEP_MS = 1100;
    steps.forEach((step, index) => {
      timers.push(setTimeout(() => {
        if (index > 0) steps[index - 1].dataset.state = "done";
        step.dataset.state = "active";
        setProgress(index);
      }, 500 + index * STEP_MS));
    });
    timers.push(setTimeout(showFinal, 500 + steps.length * STEP_MS));
  };

  if (replay) replay.addEventListener("click", play);
  play();
}

function bootstrapPage(activePage) {
  renderHeader(activePage);
  renderFooter();
  initThemeToggle();
  initMenu();
  initContactBindings();
  initCopyEmail();
  initCountdown();
  initFlow();
}

window.Site = {
  CONTACT,
  ICONS,
  bootstrapPage
};
