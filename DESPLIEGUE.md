# Despliegue

Cómo se publica este proyecto. **Léelo entero antes de subir nada**: el despliegue es manual y no
hay ninguna automatización que lo cubra.

---

## Dónde vive cada cosa

| URL                             | Qué sirve                                | Cómo se despliega                 |
| ------------------------------- | ---------------------------------------- | --------------------------------- |
| **https://example.stackbp.es/** | **La app Next actual** (export estático) | Subida manual por FTP a Hostinger |

**Es el único despliegue.** GitHub Pages estuvo activo sobre `main` ruta `/` y republicaba en cada
push el `index.html` de la versión clásica en HTML plano — no la app Next, porque `out/` está en el
`.gitignore` y nunca llega al repositorio. **Se apagó el 2026-07-27**; si vuelve a hacer falta,
apúntalo al build de Next con una Action, no a la raíz del repo.

---

## Publicar la app Next (example.stackbp.es)

### 1. Generar el export estático

```bash
npm ci             # reproduce package-lock.json exacto, sin reescribirlo
npm run build      # next build --webpack
```

El proyecto usa **npm** (`package-lock.json`), no pnpm. La versión la fija el repo, no la máquina:
`.nvmrc` (Node 24), `engines.node: "24.x"` y `packageManager: "npm@11.13.0"`.

Usa `npm ci` y no `npm install` para publicar: reproduce el lockfile tal cual y falla si hay drift,
en vez de resolver versiones nuevas en silencio.

`next.config.js` fija `output: 'export'`, así que el build **no arranca ningún servidor**: escribe
un sitio estático completo en **`out/`** (~50 archivos). Con `trailingSlash: true`, cada ruta se
genera como carpeta con su `index.html` dentro — eso es lo que hace que funcione en un hosting
estático sin reglas de reescritura.

`images.unoptimized: true` es obligatorio aquí: no hay servidor que optimice imágenes en tiempo real.

### 2. Subir por FTP a Hostinger

Se sube **el contenido de `out/`** (no la carpeta en sí) a la raíz pública del dominio en Hostinger.

- **Reemplaza siempre el contenido anterior.** Los assets de Next llevan hash en el nombre; si
  quedan restos de un build viejo, se acumulan archivos huérfanos que nadie sirve.
- Sube también `sw.js` y los iconos: son parte del PWA.

> **Credenciales:** las de FTP viven en el panel de Hostinger y en tu gestor de contraseñas.
> **Nunca** en este repositorio, ni en un `.env`, ni en un script commiteado. El repo es **público**.

### 3. Verificar después de subir

1. Abre https://example.stackbp.es/ en una ventana privada (evita la caché del service worker).
2. Comprueba que se ve la versión nueva: marcador **Victorias / Derrotas / Empates**, botones
   **Reiniciar Puntuación** y **▶ Auto Play**, y el panel **🏆 Logros**.
3. En una pestaña normal, el service worker puede seguir sirviendo la versión anterior hasta que se
   actualice. El componente `UpdateNotification` avisa al usuario cuando hay una versión nueva; si
   quieres forzarlo tú, recarga con `Ctrl+Shift+R` o borra el SW desde DevTools → Application.

---

## Qué NO hace falta

- No hay CI: ningún workflow de GitHub Actions despliega este proyecto.
- No hay Vercel ni Netlify. No busques `vercel.json` ni `netlify.toml` — no existen y no se usan.
- `npm start` (`next start`) **no aplica**: con `output: 'export'` no hay servidor Node en producción.

---

## Línea base (medida el 2026-07-27, Node 24.16.0 / npm 11.13.0)

| Comprobación    | Resultado                                                        |
| --------------- | ---------------------------------------------------------------- |
| `npm ci`        | ✅ reproduce el lockfile sin modificarlo                         |
| `npm run build` | ✅ verde — 2 rutas estáticas, export completo en `out/`          |
| `npm audit`     | ⚠️ 10 vulnerabilidades (8 altas), heredadas de `libvips`/`sharp` |

Las de `npm audit` son **preexistentes** y vienen de `sharp` (que Next arrastra para imágenes).
No las arregles dentro de otra tarea: `npm audit fix --force` propone cambios rompedores.

## Pendiente

- **Revisar las vulnerabilidades de `sharp`/`libvips`** en una sesión propia y decidir si tocan
  actualización o si no aplican a un export estático que no procesa imágenes en servidor.
