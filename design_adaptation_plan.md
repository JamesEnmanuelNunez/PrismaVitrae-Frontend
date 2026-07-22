# Plan de Adaptación de Diseño: Luminous Precision a React/Vite

Basándome en los archivos HTML provistos y el documento `DESIGN.md` del directorio `stitch_prismavitae_ai_recruitment_workspace`, este plan detalla cómo adaptaremos el sistema de diseño **"Luminous Precision"** al plan de implementación de React (Vite) para PrismaVitae.

---

## 1. Integración del Sistema de Diseño (TailwindCSS)

El diseño utiliza un tema fuertemente personalizado y estructurado. Adaptaremos la configuración inyectada en los HTMLs a un archivo `tailwind.config.ts` estructurado en nuestro proyecto de React.

### 1.1 Configuración de Tema (Theme Extensions)
Migraremos todas las variables (colores, tipografía, espaciado, bordes) para mantener la estética clínica y de alta precisión:
- **Colores:** Se preservará el uso del fondo `background: "#faf8ff"`, el azul primario `primary: "#006591"` y `primary-container: "#0ea5e9"`, y los grises pizarra.
- **Tipografía:** Importaremos **Inter** desde Google Fonts y configuraremos las clases semánticas dictadas por el diseño (`display-lg`, `headline-lg`, `body-md`, `label-md`, etc.).
- **Espaciado y Bordes:** Se mantendrán las constantes `margin-desktop: 40px`, `gutter: 24px` y el `borderRadius` de `8px` (`0.5rem`) como base, respetando la regla "ROUND_EIGHT".

## 2. Adaptación de Componentes a React (Componentización)

Descompondremos los HTMLs estáticos en componentes funcionales de React, siguiendo el plan de modularidad:

### 2.1 Componentes de Layout Global (`src/components/layout/`)
- **`SideNavBar.tsx`:** 
  - Adaptado de la etiqueta `<nav>` lateral.
  - Implementará `react-router-dom` (`NavLink` o `Link`) en lugar de etiquetas `<a>` estáticas, para navegar sin recargar entre "Document Upload" y "Data Table".
  - Manejará dinámicamente los estilos de "estado activo" (borde derecho azul y fondo sutil).

### 2.2 Feature: Scanner (Escáner de CVs) - `src/features/scanner/`
Basado en `carga_de_documentos_prismavitae/code.html`:
- **`HeaderContextual.tsx`:** El título superior ("Ingest Documents" / "Upload CVs...").
- **`DropzoneUpload.tsx`:**
  - Sustituirá el contenedor estático de subida por el hook de `react-dropzone`.
  - Aplicará los efectos de hover dictados por el HTML (`hover:border-primary hover:bg-surface-container-low transition-all`).
  - Integrará la animación personalizada definida en el CSS del head: `@keyframes subtle-pulse`.

### 2.3 Feature: Gestión de Tablas - `src/features/management/`
Basado en `tabla_de_datos_prismavitae/code.html`:
- **`DataTableView.tsx`:** El contenedor principal de la vista.
- **`ActionHeader.tsx`:** Contendrá los botones "Exportar a Excel" (adaptado del botón "Exportar a PDF" actual).
- **`EditableTable.tsx` (Grid de Datos):**
  - Se adaptarán las celdas editables (`.editable-cell`) para manejar el estado local en React.
  - El "focus-within" y el icono de edición invisible (que aparece en hover) se mantendrán usando clases de Tailwind (`group`, `group-hover:opacity-100`, `focus-within:ring`).
  - Se dividirá en múltiples componentes o se utilizará una librería headless (como `@tanstack/react-table`) pero inyectando estrictamente el markup HTML de Luminous Precision para las filas y celdas.

## 3. Manejo de Iconografía
- Los archivos HTML utilizan `Material Symbols Outlined`. Para React, mantendremos este enfoque importando la fuente de Google y creando un micro-componente `<Icon name="cloud_upload" />` para asegurar un clonado exacto 1:1 del diseño aprobado.

## 4. Siguientes Pasos
1. Iniciar el proyecto Vite en el directorio frontend.
2. Configurar el `tailwind.config.ts` y las fuentes base globales (Inter y Material Symbols).
3. Crear la estructura de carpetas (`components`, `features`, `layout`).
4. Montar el **SideNavBar** como envoltorio principal de la aplicación.
