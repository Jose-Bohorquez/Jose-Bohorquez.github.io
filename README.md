# Jose-Bohorquez.github.io

Portafolio personal publicado con GitHub Pages en <https://jose-bohorquez.github.io/>.
Sitio estático: HTML, CSS y JavaScript sin frameworks ni proceso de compilación.

## Estructura

- `/index.html`: inicio, flujo animado de ejemplo y proyectos destacados.
- `/pages/projects.html`: todos los proyectos, con filtros por tipo.
- `/pages/about.html`: perfil, stack técnico y formación.
- `/pages/contact.html`: canales de contacto.
- `/404.html`: página para enlaces rotos (GitHub Pages la usa automáticamente).
- `/assets/js/projects-data.js`: fuente única de datos de proyectos.
- `/assets/js/projects-render.js`: tarjetas de proyecto y filtros.
- `/assets/js/site.js`: header y footer compartidos, tema claro/oscuro, menú móvil, datos de contacto, contador y animación del flujo.
- `/assets/css/main.css`: estilos globales (paleta en las variables de `:root`).
- `/assets/og.png`: imagen que se ve al compartir el enlace en redes (1200 x 630).
- `/robots.txt` y `/sitemap.xml`: indexación en buscadores.

## Agregar un proyecto

1. Agrega la captura en `/assets/imgWebp/` (formato WebP, idealmente 1366 x 768 o 1440 x 900).
2. Agrega un objeto a `window.PROJECTS` en `/assets/js/projects-data.js` con:
   `title`, `status`, `category`, `featured`, `description`, `image`, `width`, `height`, `tags`, `github`, `demo`.
3. Deja `github` o `demo` en `""` si el repositorio es privado o el sitio no está en línea; la tarjeta solo muestra los enlaces que existen.
4. `featured: true` lo muestra en el inicio (máximo 5, en el orden de la lista; el primero sale en grande).
5. Una `category` nueva crea su propio botón de filtro.

## Datos de contacto y CV

Se editan en un solo lugar: `CONTACT` al inicio de `/assets/js/site.js`.

## Desarrollo local

Las rutas son absolutas (`/assets/...`), así que abrir `index.html` con doble clic no funciona: hay que servir la carpeta.

```bash
python -m http.server 8000
# o
npx serve .
```

Luego abre <http://localhost:8000>.
