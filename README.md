# puntapie-frontend-plus-react

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una aplicación frontend de ejemplo construida con React, Vite y MUI, que demuestra la integración y extensibilidad de la librería `frontend-plus-react`. Esta aplicación sirve como punto de partida y referencia para futuros proyectos que necesiten una base sólida con funcionalidades de tabla, formularios de procedimiento y componentes personalizados.

---

## 🚀 Inicio Rápido

Sigue estos pasos para poner la aplicación en marcha en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/) en tu sistema.

### Instalación

1.  **Clona el repositorio (y nombra tu aplicación final):**
    ```bash
    git clone [https://github.com/codenautas/puntapie-frontend-plus-react.git](https://github.com/codenautas/puntapie-frontend-plus-react.git) nombre-de-tu-app-final
    cd nombre-de-tu-app-final
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### Ejecución

1.  **Configura el backend:** copia `.env.example` a `.env` y ajusta `VITE_BASE`, `VITE_BACKEND_URL` y `PROXY_BACKEND` a tu backend (la base-url, que es la misma en las dos primeras, y el puerto donde corre). La aplicación usa el cliente de `backend-plus` (`puenteBP`), que solo funciona en el mismo origen que el backend: por eso Vite la sirve bajo `<base-url>/react/` y reenvía el resto de `<base-url>` al backend.

2.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación se iniciará en `http://localhost:8080/<base-url>/react/` (por ejemplo `http://localhost:8080/ggs2026/react/`).

3.  **(Opcional) Construye para producción:**
    ```bash
    npm run build
    ```
    Esto generará los archivos de producción en la carpeta `dist/`.

---

## 📋 Estructura del Proyecto

Este proyecto está organizado de la siguiente manera:

```
mi-frontend-plus-app/
├── public/                # Archivos estáticos
├── src/
│   ├── assets/            # Imágenes, iconos, etc.
│   ├── components/        # Componentes reutilizables de la aplicación final
│   │   └── client-sides/  # Componentes client-side personalizados (e.g., renderers de celda)
│   ├── pages/             # Páginas específicas de la aplicación final
│   │   └── results-ok/    # Componentes de resultado de procedimiento personalizados
│   ├── App.tsx            # Componente principal donde se configura `frontend-plus-react`
│   ├── main.tsx           # Punto de entrada de la aplicación
│   └── index.css          # Estilos globales
├── .env                   # Variables de entorno (no incluir en Git)
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
└── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo
```

* **[React](https://react.dev/)**: Biblioteca de JavaScript para construir interfaces de usuario.
* **[Vite](https://vitejs.dev/)**: Herramienta de construcción rápida para proyectos web modernos.
* **[Material-UI (MUI)](https://mui.com/)**: Biblioteca de componentes React para un diseño atractivo y responsivo.
* **[TypeScript](https://www.typescriptlang.org/)**: JavaScript con tipado estático.
* **[React Router DOM](https://reactrouter.com/en/main)**: Enrutamiento declarativo para React.
* **[Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)**: Gestión de estado predecible.
* **[Redux Persist](https://github.com/rt2zz/redux-persist)**: Persistencia del estado de Redux.
* **[Notistack](https://iamhosseindhv.com/notistack)**: Notificaciones fáciles de usar.
* **[React Data Grid](https://reactdatagrid.io/)**: Componente de tabla eficiente y flexible.
* **`frontend-plus-react`**: Modulo desarrollado por codenautas (https://github.com/codenautas/puntapie-frontend-plus-react), integrado como dependencia (https://www.npmjs.com/package/frontend-plus-react).

Esta aplicación demuestra cómo integrar y extender la librería `frontend-plus-react`. Las funcionalidades clave se pasan al componente `AppFromFrontendPlusReact` a través de props en el archivo **`src/App.tsx`**:

* `myRoutes`: Rutas personalizadas que se añaden al enrutamiento principal de la librería.
* `myWScreens`: Componentes de pantalla personalizados (WScreens) que se mapean a URLs específicas (`/wScreens/:screenName`).
* `myClientSides`: Componentes personalizados para renderizar celdas en las tablas de `react-data-grid`.
* `myResultsOk`: Componentes para mostrar resultados de procedimientos específicos (e.g., para operaciones exitosas).

Consulta el archivo `src/App.tsx` para ver un ejemplo detallado de cómo se configuran e inyectan estos componentes.

Dado que esta es una aplicación de ejemplo, las contribuciones directas en forma de Pull Requests no son el objetivo principal. 

Sin embargo, si encuentras errores o tienes sugerencias para mejorarla como plantilla, no dudes en abrir un *Issue* en este repositorio.

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

Para cualquier pregunta o comentario, puedes contactar a Codenautas <codenautas@googlegroups.com>.
