# Jose-Bohorquez.github.io

Portafolio modular para GitHub Pages, orientado a marca profesional senior.

## Estructura

- `/index.html`: home comercial y proyectos destacados.
- `/pages/projects.html`: lista completa de proyectos/casos.
- `/pages/about.html`: perfil profesional senior.
- `/pages/contact.html`: canales de contacto y propuesta de valor.
- `/assets/js/projects-data.js`: fuente unica de datos de proyectos.
- `/assets/js/site.js`: layout compartido (header/footer, tema, contacto, CV online).
- `/assets/css/main.css`: estilos globales.
- `/legacy/`: respaldo de versiones antiguas de una sola pagina.

## Como agregar un proyecto nuevo

1. Abre `/assets/js/projects-data.js`.
2. Agrega un nuevo objeto al arreglo `window.PROJECTS` con:
   - `title`, `status`, `description`, `image`, `tags`, `github`, `demo`.
3. Guarda y publica. El proyecto aparece en `Inicio` y `Proyectos` automaticamente.

## CV online

- URL activa configurada en `assets/js/site.js` dentro de `CONTACT.cv`:
  `https://dev-and-test.space/mas/cv/cv_bd_06_full.html`

## Actualizar foto

- Reemplaza `/assets/fotoWebp/foto.webp`.

## Desarrollo local

Abre `index.html` en navegador o levanta un servidor estatico simple.
