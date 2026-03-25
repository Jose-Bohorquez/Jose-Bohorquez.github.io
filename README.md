# Jose-Bohorquez.github.io

Portafolio modular para GitHub Pages.

## Estructura

- `/index.html`: home y proyectos destacados.
- `/pages/projects.html`: lista completa de proyectos.
- `/pages/about.html`: perfil profesional.
- `/pages/contact.html`: canales de contacto y acceso al CV.
- `/assets/js/projects-data.js`: fuente unica de datos de proyectos.
- `/assets/js/site.js`: layout compartido (header/footer, tema, contacto).
- `/assets/css/main.css`: estilos globales.
- `/legacy/`: respaldo de las versiones antiguas de una sola pagina.

## Como agregar un proyecto nuevo

1. Abre `/assets/js/projects-data.js`.
2. Agrega un nuevo objeto al arreglo `window.PROJECTS` con:
   - `title`, `status`, `description`, `image`, `tags`, `github`, `demo`.
3. Guarda y publica. El proyecto aparece en `Inicio` y `Proyectos` automaticamente.

## Actualizar foto y CV

- Foto: reemplaza `/assets/fotoWebp/foto.webp`.
- CV: reemplaza `/assets/arch/perfil202506.pdf` (o actualiza la ruta en las paginas).

## Desarrollo local

Abre `index.html` en navegador o levanta un servidor estatico simple.
