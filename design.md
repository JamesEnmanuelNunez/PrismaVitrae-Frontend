# PrismaVitae — Frontend Design & Implementation Plan

Este documento consolida el plan de implementación de la interfaz de usuario, la arquitectura, y el diseño de **PrismaVitae**, abarcando tanto el escaneo de currículums como el módulo de gestión de tablas.

## 1. Stack Tecnológico

- **Framework:** React (usando Vite).
- **Lenguaje:** TypeScript.
- **Componentes UI & Estilos:** TailwindCSS (adaptado al sistema "Luminous Precision").
- **Conexión al Backend:** Axios o Fetch API apuntando a la API de FastAPI.
- **Enrutamiento:** React Router.

## 2. Sistema de Diseño: "Luminous Precision"

El diseño utiliza un tema fuertemente personalizado y estructurado, implementado a través de `tailwind.config.ts`.

### 2.1 Configuración de Tema (Theme Extensions)
- **Colores:** Se utiliza el fondo `background: "#faf8ff"`, el azul primario `primary: "#006591"`, contenedor `primary-container: "#0ea5e9"`, y grises pizarra.
- **Tipografía:** Se emplea **Inter** desde Google Fonts con clases semánticas (`display-lg`, `headline-lg`, `body-md`, `label-md`, etc.).
- **Espaciado y Bordes:** Se aplican las constantes `margin-desktop: 40px`, `gutter: 24px` y un `borderRadius` de `8px` (`0.5rem`) como base.
- **Iconografía:** Se utiliza `Material Symbols Outlined`.

## 3. Arquitectura de Pantallas y Componentes (Rutas)

### 3.1 Módulo: Escáner de CVs (`src/features/scanner/`)
1. **Pantalla de Carga (Upload):**
   - Interfaz para arrastrar/soltar un archivo PDF o tomar una foto (`DropzoneUpload.tsx`).
   - Botón de "Escanear CV" que envía un `POST /api/escanear`.
   - Indicador de carga (spinner) y animaciones sutiles (`@keyframes subtle-pulse`).
2. **Pantalla de Revisión:**
   - Muestra un formulario pre-llenado con los datos extraídos (Nombre, Teléfono, Habilidades, etc.).
   - Permite al usuario editar los campos si hay errores y guardar el candidato.
3. **Pantalla de Lista de Candidatos:**
   - Tabla con todos los candidatos procesados consumiendo `GET /api/candidatos/`.
   - Botón de "Exportar a Excel".

### 3.2 Módulo: Gestión de Tablas (`src/features/management/`)
Vista contenedora con **Pestañas (Tabs)** para alternar entre hojas de Excel (`DataTableView.tsx`).

1. **Propuestas:**
   - Tabla que consume `GET /api/propuestas/`.
   - Botón "Agregar Nuevo" con formulario modal. Campo `cargo_solicitado` pre-llenado con "TECNICO FACILITADOR ACOMPAÑANTE".
2. **Plantilla de Reajuste:**
   - Tabla que consume `GET /api/reajustes/`.
   - Formulario de edición con **Campos Calculados Automáticos**: Al escribir `salario_actual` y `salario_solicitado`, se calcula automáticamente la `diferencia_salarial` y el `porcentaje_incremento`.
3. **No Proceden:**
   - Tabla y formulario con campos estándar correspondientes al modelo (`GET /api/no_proceden/`).

### 3.3 Componentes de Layout Global (`src/components/layout/`)
- **`SideNavBar.tsx`:** Navegación lateral utilizando `react-router-dom`, manteniendo estados activos visuales (borde derecho azul y fondo sutil).

## 4. Integración con el Backend (FastAPI)

- **Desarrollo:** El frontend se ejecuta en `http://localhost:5173`. El backend debe tener configurado CORS para aceptar este origen.
- **Producción:** Se compila con `npm run build` y los archivos generados en `dist/` se sirven a través del backend FastAPI:
  ```python
  app.frontend("/", directory="frontend/dist")
  ```
