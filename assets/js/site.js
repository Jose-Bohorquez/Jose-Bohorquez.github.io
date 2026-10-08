const CONTACT = {
  email: "josejbohorquezd@gmail.com",
  phone: "+57 317 877 3186",
  location: "Bogotá, Colombia",
  cv: "https://jose-bohorquez.online/",
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
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motionEnabled = () => document.documentElement.classList.contains("motion");

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

    // Revelado circular desde el botón cuando el navegador soporta View Transitions.
    if (!document.startViewTransition || prefersReducedMotion()) {
      setTheme(next);
      return;
    }
    const rect = toggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => setTheme(next));
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.22, 0.8, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  });
}

/* ---------- Layout ---------- */
function renderHeader(active) {
  const host = document.querySelector("[data-site-header]");
  if (!host) return;

  const links = NAV.map((item, index) => `
    <li style="--i:${index}"><a class="nav-link" href="${item.href}"${item.id === active ? ' aria-current="page"' : ""}>${item.label}</a></li>
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
          <ul class="nav-links" id="menu-principal">
            ${links}
            <li class="menu-extra" style="--i:${NAV.length}">
              <a class="btn btn-primary" data-cv-link href="#" target="_blank" rel="noopener">Ver CV online</a>
              <a class="btn" data-contact-whatsapp href="#" target="_blank" rel="noopener">WhatsApp</a>
            </li>
          </ul>
          <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Cambiar a tema oscuro">
            ${ICONS.sun}${ICONS.moon}
          </button>
          <button class="icon-btn menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">
            <span class="bars" aria-hidden="true"><span class="bar"></span><span class="bar"></span><span class="bar"></span></span>
          </button>
        </nav>
      </div>
      <span class="scroll-progress" aria-hidden="true"></span>
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
    <button class="to-top" type="button" data-to-top aria-label="Volver arriba">${ICONS.arrowUp}</button>
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
    document.documentElement.classList.toggle("menu-open", open);
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

/* Header: sombra al bajar, barra de progreso, se oculta al bajar en móvil y botón "volver arriba". */
function initScrollUI() {
  const header = document.querySelector(".site-header");
  const bar = header && header.querySelector(".scroll-progress");
  const toTop = document.querySelector("[data-to-top]");
  const mobile = window.matchMedia("(max-width: 760px)");
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    header.classList.toggle("is-scrolled", y > 8);

    const menuOpen = document.documentElement.classList.contains("menu-open");
    const goingDown = y > lastY + 2;
    const goingUp = y < lastY - 2;
    if (!mobile.matches || menuOpen || y < 200 || goingUp) header.classList.remove("is-hidden");
    else if (goingDown) header.classList.add("is-hidden");

    if (toTop) toTop.classList.toggle("is-visible", y > 700);
    lastY = y;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      const skip = document.getElementById("contenido");
      if (skip) skip.focus({ preventScroll: true });
    });
  }
}

/* ---------- Animaciones de entrada ---------- */
function splitHeadline() {
  const heading = document.querySelector("[data-split]");
  if (!heading || !motionEnabled()) return;

  const text = heading.textContent.trim().replace(/\s+/g, " ");
  heading.setAttribute("aria-label", text);
  heading.innerHTML = text.split(" ").map((word, index) => (
    `<span class="word" aria-hidden="true" style="--w:${index}"><span>${word.replace(/[<>&]/g, "")}</span></span>`
  )).join(" ");
}

function initReveal() {
  if (!motionEnabled() || !("IntersectionObserver" in window)) return;

  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      child.setAttribute("data-reveal", "");
      child.style.setProperty("--i", String(Math.min(index, 6)));
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
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

let toastTimer;
function showToast(message, tone = "ok") {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.dataset.tone = tone;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function initCopyEmail() {
  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONTACT.email);
        showToast("Correo copiado al portapapeles.");
        btn.classList.add("is-done");
        setTimeout(() => btn.classList.remove("is-done"), 1600);
      } catch (error) {
        showToast(`No se pudo copiar. Escribe a ${CONTACT.email}`, "error");
      }
    });
  });
}

/* Formulario de contacto: arma el mensaje y lo abre en el correo o en WhatsApp. */
function initComposer() {
  const form = document.querySelector("[data-composer]");
  if (!form) return;

  const fields = {
    name: form.elements.namedItem("nombre"),
    company: form.elements.namedItem("empresa"),
    reason: form.elements.namedItem("motivo"),
    message: form.elements.namedItem("mensaje")
  };
  const counter = form.querySelector("[data-counter]");
  const max = Number(fields.message.getAttribute("maxlength")) || 1000;

  const updateCounter = () => {
    if (counter) counter.textContent = `${fields.message.value.length} / ${max}`;
  };
  fields.message.addEventListener("input", updateCounter);
  updateCounter();

  const setError = (field, message) => {
    const error = form.querySelector(`[data-error-for="${field.name}"]`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message || "";
  };

  [fields.name, fields.message].forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true" && field.value.trim()) setError(field, "");
    });
  });

  const validate = () => {
    let firstInvalid = null;
    if (!fields.name.value.trim()) {
      setError(fields.name, "Escribe tu nombre para saber a quién respondo.");
      firstInvalid = firstInvalid || fields.name;
    } else setError(fields.name, "");
    if (fields.message.value.trim().length < 10) {
      setError(fields.message, "Cuéntame un poco más: al menos 10 caracteres.");
      firstInvalid = firstInvalid || fields.message;
    } else setError(fields.message, "");
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  const compose = () => {
    const company = fields.company.value.trim();
    const lines = [
      `Hola José, soy ${fields.name.value.trim()}${company ? ` de ${company}` : ""}.`,
      "",
      fields.message.value.trim()
    ];
    return { subject: `${fields.reason.value} | ${fields.name.value.trim()}`, body: lines.join("\n") };
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;

    const channel = event.submitter && event.submitter.value === "whatsapp" ? "whatsapp" : "email";
    const { subject, body } = compose();
    if (channel === "whatsapp") {
      const number = CONTACT.phone.replace(/\D/g, "");
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, "_blank", "noopener");
      showToast("Abriendo WhatsApp con tu mensaje.");
    } else {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast("Abriendo tu correo con el mensaje listo.");
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

  const write = (node, value) => {
    const text = String(value).padStart(2, "0");
    if (node.textContent === text) return;
    node.textContent = text;
    if (motionEnabled()) {
      node.classList.remove("tick");
      void node.offsetWidth;
      node.classList.add("tick");
    }
  };

  const tick = () => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = Math.max(0, end - now);

    write(refs.days, Math.floor(diff / 86400000));
    write(refs.hours, Math.floor((diff % 86400000) / 3600000));
    write(refs.minutes, Math.floor((diff % 3600000) / 60000));
    write(refs.seconds, Math.floor((diff % 60000) / 1000));
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
    const body = step.querySelector(".flow-system");
    body.insertAdjacentHTML("afterend", '<span class="flow-typing" aria-hidden="true"><i></i><i></i><i></i></span>');
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

    const STEP_MS = 1300;
    const TYPING_MS = 600;
    steps.forEach((step, index) => {
      const start = 300 + index * STEP_MS;
      timers.push(setTimeout(() => {
        if (index > 0) steps[index - 1].dataset.state = "done";
        step.dataset.state = "typing";
        setProgress(index);
      }, start));
      timers.push(setTimeout(() => {
        step.dataset.state = "active";
      }, start + TYPING_MS));
    });
    timers.push(setTimeout(showFinal, 300 + steps.length * STEP_MS));
  };

  if (replay) replay.addEventListener("click", play);

  // Arranca cuando el panel entra en pantalla (en móvil queda debajo del pliegue).
  if ("IntersectionObserver" in window && !prefersReducedMotion()) {
    steps.forEach((step) => (step.dataset.state = "idle"));
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        setTimeout(play, motionEnabled() ? 700 : 0);
      }
    }, { threshold: 0.4 });
    observer.observe(flow);
  } else {
    play();
  }
}

function bootstrapPage(activePage) {
  renderHeader(activePage);
  renderFooter();
  initThemeToggle();
  initMenu();
  initScrollUI();
  initContactBindings();
  initCopyEmail();
  initComposer();
  initCountdown();
  splitHeadline();
  initReveal();
  initFlow();
}

window.Site = {
  CONTACT,
  ICONS,
  bootstrapPage,
  showToast,
  prefersReducedMotion
};
