/*
 * Fuente única de proyectos.
 * - featured: true  -> aparece en la home (en el orden de esta lista, máximo 5;
 *   el primero se muestra en grande).
 * - github / demo: dejar "" si el repositorio es privado o el sitio ya no está en línea;
 *   la tarjeta muestra entonces solo los enlaces que existen.
 * - category: agrupa los filtros de la página de proyectos.
 */
window.PROJECTS = [
  {
    title: "TacosCapital",
    status: "En desarrollo",
    category: "Sitio web",
    featured: true,
    description: "Landing y presencia digital para un negocio gastronómico: menú, ubicación y contacto directo.",
    image: "/assets/imgWebp/tacoscapital.webp",
    width: 1440,
    height: 900,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Jose-Bohorquez/tacosCapital",
    demo: "https://www.tacoscapital.online"
  },
  {
    title: "Landing Page Yo-Soy",
    status: "Activo",
    category: "Sitio web",
    featured: true,
    description: "Landing informativa para captación de usuarios y redirección a los servicios de la marca.",
    image: "/assets/imgWebp/yoSoyLand.webp",
    width: 1366,
    height: 768,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Jose-Bohorquez/landing-Page-YoSoy",
    demo: "https://yo-soy.co/"
  },
  {
    title: "Generador de turnos",
    status: "En desarrollo",
    category: "Aplicación web",
    featured: true,
    description: "Generación automática de horarios rotativos para equipos operativos de NOC y soporte.",
    image: "/assets/imgWebp/generadorHorarios.webp",
    width: 1420,
    height: 900,
    tags: ["HTML", "Tailwind", "JavaScript"],
    github: "https://github.com/Jose-Bohorquez/GeneradorDeHorarios",
    demo: ""
  },
  {
    title: "Login multitenant",
    status: "Activo",
    category: "Aplicación web",
    featured: true,
    description: "Autenticación multiempresa: cada organización con sus usuarios y datos aislados.",
    image: "/assets/imgWebp/multitenant.webp",
    width: 1440,
    height: 900,
    tags: ["PHP", "MySQL", "JavaScript"],
    github: "https://github.com/Jose-Bohorquez/login_multitenant",
    demo: ""
  },
  {
    title: "Punto Tech Soluciones",
    status: "En desarrollo",
    category: "Sitio web",
    featured: true,
    description: "Sitio empresarial para servicios tecnológicos y soporte técnico.",
    image: "/assets/imgWebp/puntoTechSoluciones.webp",
    width: 1366,
    height: 768,
    tags: ["HTML", "Tailwind", "JavaScript"],
    github: "https://github.com/Jose-Bohorquez/punto_tech_soluciones",
    demo: ""
  },
  {
    title: "Asistencia App (POC UT)",
    status: "En desarrollo",
    category: "Aplicación web",
    featured: false,
    description: "Prueba de concepto de control de acceso y asistencia para entornos académicos.",
    image: "/assets/imgWebp/asistenciaApp.webp",
    width: 1440,
    height: 900,
    tags: ["PHP", "JavaScript", "Tailwind"],
    github: "https://github.com/Jose-Bohorquez/login_multitenant",
    demo: ""
  },
  {
    title: "Portafolio personal",
    status: "En producción",
    category: "Sitio web",
    featured: false,
    description: "Este sitio: marca personal y vitrina de proyectos, sin frameworks ni proceso de compilación.",
    image: "/assets/imgWebp/porta.webp",
    width: 1366,
    height: 768,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Jose-Bohorquez/Jose-Bohorquez.github.io",
    demo: ""
  },
  {
    title: "AuthenticApp",
    status: "Activo",
    category: "Aplicación web",
    featured: false,
    description: "Sistema de acceso para la autenticación de productos farmacéuticos.",
    image: "/assets/imgWebp/appAuth.webp",
    width: 1366,
    height: 768,
    tags: ["PHP", "MySQL", "Bootstrap"],
    github: "",
    demo: ""
  },
  {
    title: "Is Yours US",
    status: "Activo",
    category: "WordPress",
    featured: false,
    description: "Web corporativa para una marca comercial internacional, con foco en SEO.",
    image: "/assets/imgWebp/isyours.webp",
    width: 1366,
    height: 768,
    tags: ["WordPress", "Elementor", "SEO"],
    github: "",
    demo: ""
  },
  {
    title: "Servitech",
    status: "Activo",
    category: "Sitio web",
    featured: false,
    description: "Sitio para servicios técnicos y gestión de operaciones.",
    image: "/assets/imgWebp/servitech.webp",
    width: 1366,
    height: 768,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: ""
  },
  {
    title: "Campeche",
    status: "Activo",
    category: "Sitio web",
    featured: false,
    description: "Sitio orientado a contenido comercial y de marca.",
    image: "/assets/imgWebp/campeche.webp",
    width: 1366,
    height: 768,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: ""
  },
  {
    title: "KIT DEV",
    status: "Activo",
    category: "Herramienta",
    featured: false,
    description: "Kit web de utilidades de apoyo para el día a día de desarrollo.",
    image: "/assets/imgWebp/kit-dev.webp",
    width: 1366,
    height: 768,
    tags: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: ""
  }
];
