# Integración de Google Sheets para Datos de Aprendices

Esta actualización integra Google Sheets en el Portal SENA para sincronizar automáticamente el progreso y las respuestas de los aprendices en tiempo real, utilizando una cuenta institucional de instructor/coordinador para la gestión.

### User Review & Critical Decisions

- **Confirmado**: La hoja de cálculo se creará automáticamente en la carpeta raíz de Google Drive del instructor autenticado.
- **Confirmado**: La sincronización se realizará en tiempo real, tanto durante la evaluación como al finalizar el registro.
- **Confirmado**: La conexión será autorizada mediante la cuenta de Google del instructor/coordinador.
- **Importante**: Se requerirá un flujo de autenticación "Sign in with Google" para el instructor, enfocado en el manejo de scopes específicos para Google Sheets.

### 1. Overview & Core Concept

- **Qué hace**: Permite que las respuestas de los aprendices (documento, nombre, programa, progreso, calificación) se envíen automáticamente a una nueva hoja de cálculo en el Drive del instructor.
- **Público Objetivo**: Instructores y coordinadores del SENA que gestionan la inducción.
- **Valor Clave**: Automatización del control de inducción y disponibilidad inmediata de datos para reportes.

### 2. User Experience & Visual Design

- **Flujos**:
  - El instructor inicia sesión con Google desde su panel.
  - Al completar el primer registro de un aprendiz, el sistema crea automáticamente la hoja y notifica al instructor.
  - El usuario recibirá indicadores visuales de éxito ("Sincronizado", "Pendiente de sincronizar") durante el uso.
- **Visual**: Uso de la paleta institucional (Verde #39A900) y elementos de `shadcn/ui` para estados de carga y notificaciones.

### 3. Key Product Decisions & Trade-Offs

- **Decisión 1**: Autenticación del instructor mediante Google.
  - *Enfoque*: Google Sign-In con Firebase Auth.
  - *Por qué*: Seguridad garantizada por el ecosistema de Google y cumplimiento con los requisitos de integración.
- **Decisión 2**: API de Google Sheets para manejo de datos.
  - *Enfoque*: Uso de `spreadsheets.create` y `spreadsheets.values.append` vía client-side fetch.
  - *Por qué*: Evita dependencias innecesarias y permite una sincronización ágil sin latencia de servidor.

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────┐      ┌────────────────────────┐
│ App SENA (Frontend) │─────>│ Google Sheets API (gAPI)│
└──────────┬──────────┘      └──────────┬─────────────┘
           │                            │
           v                            v
┌─────────────────────┐      ┌────────────────────────┐
│ Firebase Auth       │<─────┤ Google Drive (Storage) │
└─────────────────────┘      └────────────────────────┘
```

- **Data Model**:
  - La hoja contendrá las siguientes columnas: Fecha, Documento, Nombre, Programa, Ficha, Calificación, Estado.
- **Sincronización**:
  - Se implementará un hook `useSheetsSync` para manejar la cola de datos y los reintentos en caso de errores de red.
