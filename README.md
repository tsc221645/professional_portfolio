# Portfolio fullstack

Portfolio personal con Vue 3 en el frontend y una API Node.js nativa en el backend.

El código editable vive en `src/`. La carpeta `dist/` y `dist/assets/` son salidas generadas automáticamente por Vite al crear una versión de producción y están ignoradas por Git.

## Ejecutar

```bash
npm start
```

Abre `http://localhost:3000`.

## GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` construye el proyecto Vue y lo publica automáticamente en GitHub Pages cada vez que haces push a `main`.

En GitHub, activa Pages desde `Settings > Pages > Source: GitHub Actions`.

GitHub Pages despliega el frontend estático. El backend Node.js del formulario necesita un servicio separado para funcionar en producción.

Endpoints:

- `GET /api/projects` — proyectos del portfolio.
- `POST /api/contact` — valida y recibe `{ name, email, message }`.

Reemplaza `tu nombre`, el correo y los enlaces sociales en `dist/index.html`.
