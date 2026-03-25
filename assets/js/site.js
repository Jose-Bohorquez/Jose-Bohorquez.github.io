const CONTACT = {
  email: "josejbohorquezd@gmail.com",
  phone: "+57 3178773186",
  address: "Calle 5A #71D-25 Techo, Bogota, Colombia",
  cv: "https://dev-and-test.space/mas/cv/cv_bd_06_full.html",
  github: "https://github.com/Jose-Bohorquez",
  linkedin: "https://www.linkedin.com/in/jose-bohorquez-full-stack-software-developer/",
  whatsapp: "https://wa.link/yd3057",
  business: "https://sistema-ayuda-pymes.com/"
};

function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function initThemeToggle() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", next);
    setTheme(next);
  });
}

function renderHeader(active) {
  const host = document.querySelector("[data-site-header]");
  if (!host) return;

  host.innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="/">Jose Bohorquez | Full Stack Senior</a>
        <nav class="nav-links" aria-label="Navegacion principal">
          <a class="nav-link ${active === "home" ? "active" : ""}" href="/">Inicio</a>
          <a class="nav-link ${active === "projects" ? "active" : ""}" href="/pages/projects.html">Proyectos</a>
          <a class="nav-link ${active === "about" ? "active" : ""}" href="/pages/about.html">Sobre mi</a>
          <a class="nav-link ${active === "contact" ? "active" : ""}" href="/pages/contact.html">Contacto</a>
          <button class="icon-btn" data-theme-toggle aria-label="Cambiar tema">◐</button>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  const host = document.querySelector("[data-site-footer]");
  if (!host) return;

  const year = new Date().getFullYear();
  host.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-wrap">
        <div>
          <a class="nav-link" href="/pages/projects.html">Ver casos y proyectos</a>
          <a class="nav-link" href="${CONTACT.cv}" target="_blank" rel="noopener">Ver CV online</a>
        </div>
        <div>© ${year} Code2355 | Jose Bohorquez Delgado</div>
      </div>
    </footer>
  `;
}

function initCopyEmail() {
  const btn = document.querySelector("[data-copy-email]");
  const input = document.querySelector("[data-email-input]");
  if (!btn || !input) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(input.value);
      btn.textContent = "Copiado";
      setTimeout(() => {
        btn.textContent = "Copiar";
      }, 1400);
    } catch (error) {
      btn.textContent = "Error";
      setTimeout(() => {
        btn.textContent = "Copiar";
      }, 1400);
    }
  });
}

function initContactBindings() {
  const emailAnchors = document.querySelectorAll("[data-contact-email]");
  emailAnchors.forEach((anchor) => {
    anchor.href = `mailto:${CONTACT.email}`;
    anchor.textContent = CONTACT.email;
  });

  const emailInput = document.querySelector("[data-email-input]");
  if (emailInput) emailInput.value = CONTACT.email;

  const phone = document.querySelector("[data-contact-phone]");
  if (phone) phone.textContent = CONTACT.phone;

  const address = document.querySelector("[data-contact-address]");
  if (address) address.textContent = CONTACT.address;

  const github = document.querySelector("[data-contact-github]");
  if (github) github.href = CONTACT.github;

  const linkedin = document.querySelector("[data-contact-linkedin]");
  if (linkedin) linkedin.href = CONTACT.linkedin;

  const whatsapp = document.querySelector("[data-contact-whatsapp]");
  if (whatsapp) whatsapp.href = CONTACT.whatsapp;

  const business = document.querySelector("[data-contact-business]");
  if (business) business.href = CONTACT.business;

  const cvLinks = document.querySelectorAll("[data-cv-link]");
  cvLinks.forEach((link) => {
    link.href = CONTACT.cv;
  });
}

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

function bootstrapPage(activePage) {
  renderHeader(activePage);
  renderFooter();
  initThemeToggle();
  initContactBindings();
  initCopyEmail();
  initCountdown();
}

window.Site = {
  CONTACT,
  bootstrapPage
};
