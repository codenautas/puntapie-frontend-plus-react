import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

/** Librerías propias cuyo código fuente queremos ver en F12 (traen su .map con sourcesContent) */
const LIBRERIAS_CON_FUENTES = ['frontend-plus-react']

/**
 * Rollup no lee el `//# sourceMappingURL=` de las dependencias: sin esto, en el build
 * se ve dist/index.js de la librería en lugar de sus .ts/.tsx originales.
 * En desarrollo no hace falta: Vite sirve la librería enlazada tal cual y el navegador lee su .map.
 */
function sourcemapsDeLibrerias(librerias: string[]): Plugin {
  const esDeLibreria = (id: string) => {
    const ruta = id.replace(/\\/g, '/')
    return /\.(m?js|cjs)$/.test(ruta) && librerias.some(lib => ruta.includes(`/${lib}/dist/`))
  }
  return {
    name: 'sourcemaps-de-librerias',
    apply: 'build',
    enforce: 'pre',
    load(id) {
      if (!esDeLibreria(id)) return null
      const code = readFileSync(id, 'utf8')
      const referencia = /\/\/# sourceMappingURL=([^\s]+)\s*$/.exec(code)
      if (!referencia || referencia[1].startsWith('data:')) return null
      const archivoMap = resolve(dirname(id), referencia[1])
      if (!existsSync(archivoMap)) return null
      return { code, map: JSON.parse(readFileSync(archivoMap, 'utf8')) }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Si VITE_BACKEND_URL es una ruta (por ejemplo /dmencu) en lugar de una URL completa, el servidor de desarrollo
  // la reenvía a PROXY_BACKEND (por ejemplo http://localhost:3050): el navegador habla con un solo origen y
  // no hace falta configurar CORS (server.allowedHosts) en el backend ni compartir cookies entre puertos.
  const rutaBackend = env.VITE_BACKEND_URL?.startsWith('/') ? env.VITE_BACKEND_URL : null
  // Para probar la aplicación como la sirve el backend (por ejemplo VITE_BASE=/ggs2026/react/ con VITE_BACKEND_URL=/ggs2026):
  // mismo origen que la API, y el cliente de backend-plus (puenteBP) comparte la sesión.
  const base = env.VITE_BASE || '/'
  return {
    base,
    plugins: [react(), sourcemapsDeLibrerias(LIBRERIAS_CON_FUENTES)],
    server: {
      port: 8080,
      proxy: rutaBackend && env.PROXY_BACKEND
        ? {
            [rutaBackend]: {
              target: env.PROXY_BACKEND,
              changeOrigin: true,
              // la propia aplicación (VITE_BASE, dentro de la ruta del backend) no se reenvía: la sirve Vite
              bypass: (req) => base !== '/' && req.url?.startsWith(base) ? req.url : undefined,
            },
          }
        : undefined,
    },
    resolve: {
      // frontend-plus-react está enlazado (npm link) y tiene su propio node_modules:
      // sin dedupe podría haber dos copias de React y los hooks fallan ("Invalid hook call").
      // Solo van los paquetes que esta app tiene instalados; MUI se toma del node_modules de la librería.
      dedupe: ['react', 'react-dom', 'react-router-dom'],
    },
    build: {
      // los .map se generan junto al bundle: en F12 se ven los fuentes de la app y de frontend-plus-react
      sourcemap: true,
    },
  }
})
