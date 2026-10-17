import { defineConfig, type Plugin } from 'vite'
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
export default defineConfig({
  plugins: [react(), sourcemapsDeLibrerias(LIBRERIAS_CON_FUENTES)],
  server: {
    port: 8080
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
})
