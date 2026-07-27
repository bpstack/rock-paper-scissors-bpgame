# Despliegue

Cómo se publica este proyecto. **Léelo entero antes de subir nada**: hay dos versiones del juego
vivas en internet y se despliegan de formas distintas.

---

## Dónde vive cada cosa

| URL                                                   | Qué sirve                                   | Cómo se despliega                       |
| ----------------------------------------------------- | ------------------------------------------- | --------------------------------------- |
| **https://example.stackbp.es/**                       | **La app Next actual** (export estático)    | Subida manual por FTP a Hostinger       |
| https://bpstack.github.io/rock-paper-scissors-bpgame/ | El juego **vanilla antiguo** (`index.html`) | GitHub Pages, automático en cada `push` |

⚠️ **GitHub Pages está configurado sobre `main`, ruta `/`**, así que republica la raíz del repo en
cada push — y en la raíz sigue estando el `index.html` de la versión clásica en HTML plano, con sus
`styles/` e `images/`. **No sirve la app Next**, porque `out/` está en el `.gitignore` y nunca llega
al repositorio. Si algún día se apaga Pages o se apunta al build de Next, actualiza esta tabla.

---

## Publicar la app Next (example.stackbp.es)

### 1. Generar el export estático

```bash
npm install
npm run build      # next build --webpack
```

El proyecto usa **npm** (`package-lock.json`), no pnpm.

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

## Pendiente

- **Fijar la versión de Node y del gestor de paquetes.** Hoy no hay `.nvmrc`, ni `engines`, ni
  `packageManager` en el `package.json`: el build depende de la versión de Node que tenga suelta la
  máquina desde la que se publique.
- **Decidir qué pasa con GitHub Pages**, que hoy publica la versión antigua sin que nadie lo pida.
