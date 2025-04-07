# ASC Diagnóstica Pro 🚀

Herramienta de Diagnóstico de Apropiación Social del Conocimiento (ASC) Potenciada por IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Opcional: Añadir una licencia -->

## Descripción

**ASC Diagnóstica Pro** es una aplicación web diseñada para ayudar a proyectos, organizaciones e investigadores a **evaluar y diagnosticar los niveles de Apropiación Social del Conocimiento (ASC)** dentro de sus iniciativas. Inspirada en la estructura del **Modelo HIP (Hexágono de la Innovación Pública)**, esta herramienta utiliza un formulario de autodiagnóstico de 36 preguntas y aprovecha la potencia de la **API de Google Gemini** para generar análisis detallados, visualizaciones (gráfico de radar) y recomendaciones personalizadas y accionables.

El objetivo es proporcionar una visión clara de las fortalezas y áreas de mejora de un proyecto en cuanto a su capacidad para conectar con la sociedad, integrar saberes, responder oportunamente, generar aplicaciones prácticas, fomentar la co-creación y utilizar la tecnología de forma accesible, promoviendo así un mayor impacto social.

## Conceptos Clave: Los 6 Vectores de ASC

La herramienta evalúa el proyecto a través de 6 vectores adaptados del Modelo HIP:

1.  **DISO (Diálogo Social):** Apertura a la interacción, participación y diálogo bidireccional con actores sociales.
2.  **INSA (Integración de Saberes):** Diálogo e integración equitativa de conocimientos diversos (científicos, locales, etc.).
3.  **REPO (Respuesta Oportuna):** Capacidad de traducir conocimiento en acciones relevantes de forma ágil y adaptativa.
4.  **APRA (Aplicación Práctica):** Enfoque en resultados tangibles, prototipos y soluciones útiles para la comunidad.
5.  **COPA (Co-creación Participativa):** Fomento de la colaboración profunda, el co-diseño y la construcción de comunidad.
6.  **COAC (Conectividad Accesible):** Uso estratégico de la tecnología para facilitar el acceso, intercambio y participación.

## ✨ Características Principales

*   **Formulario de Autodiagnóstico:** 36 preguntas basadas en los 6 vectores ASC, con escala Likert (1-5).
*   **Contextualización del Proyecto:** Campo de descripción para proporcionar contexto a la IA.
*   **Visualización de Datos:** Gráfico de radar interactivo que muestra las puntuaciones promedio por vector.
*   **Análisis y Recomendaciones por IA:**
    *   Integración con la API de Google Gemini (modelo `gemini-1.5-pro` o similar).
    *   Diagnóstico general del perfil ASC del proyecto.
    *   Análisis detallado y recomendaciones concretas para cada uno de los 6 vectores, personalizadas según la descripción y puntuaciones del proyecto.
*   **Interfaz Moderna:** Diseño limpio y responsivo creado con HTML, CSS moderno y JavaScript vanilla.
*   **Backend Proxy Seguro:** Un servidor Node.js/Express actúa como intermediario para proteger la clave API de Gemini.

## 🛠️ Stack Tecnológico

*   **Frontend:**
    *   HTML5
    *   CSS3 (Estilos modernos embebidos, inspirados en Tailwind)
    *   JavaScript (Vanilla JS)
    *   [Chart.js](https://www.chartjs.org/) (Para el gráfico de radar)
*   **Backend (Proxy API):**
    *   Node.js
    *   Express.js
    *   [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (SDK oficial de Google AI)
    *   [dotenv](https://www.npmjs.com/package/dotenv) (Para manejo seguro de API Keys)
    *   [cors](https://www.npmjs.com/package/cors) (Para habilitar peticiones desde el frontend)
*   **IA:**
    *   Google Gemini API (Modelo `gemini-1.5-pro-preview-0514` o más reciente)

## ⚙️ Cómo Funciona

1.  **Frontend (`index.html`):** El usuario interactúa con la interfaz, rellena el nombre del proyecto, la descripción y responde las 36 preguntas del formulario.
2.  **Envío de Datos:** Al enviar el formulario, el JavaScript del frontend recopila los datos (nombre, descripción, puntuaciones promedio por vector), valida que todo esté completo y envía una petición `POST` al endpoint del backend (`/api/diagnose`).
3.  **Backend Proxy (`server.js`):**
    *   El servidor Express recibe la petición.
    *   Lee de forma segura la clave API de Gemini desde las variables de entorno (`.env`).
    *   Construye un *prompt* detallado para Gemini, incluyendo el *system prompt* (rol de experto en ASC), la descripción del proyecto y las puntuaciones.
    *   Llama a la API de Google Gemini utilizando el SDK `@google/generative-ai`.
    *   Recibe la respuesta generada por la IA (el texto del diagnóstico y recomendaciones).
    *   Envía esta respuesta de vuelta al frontend en formato JSON.
    *   **Importante:** Este paso es crucial para la seguridad, ya que la clave API **nunca** se expone en el código del navegador.
4.  **Visualización del Reporte:** El JavaScript del frontend recibe la respuesta del backend, muestra el gráfico de radar con los puntajes calculados y presenta el texto del diagnóstico y las recomendaciones generadas por la IA en la sección de reporte.

## 🚀 Getting Started (Cómo Empezar)

Sigue estos pasos para configurar y ejecutar el proyecto localmente.

### Prerrequisitos

*   [Node.js](https://nodejs.org/) (versión LTS recomendada) y npm (generalmente viene con Node.js)
*   [Git](https://git-scm.com/) (para clonar el repositorio)
*   Una **Clave API de Google Gemini**. Puedes obtenerla desde [Google AI Studio](https://aistudio.google.com/app/apikey).

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/asc-diagnostica-pro.git # Reemplaza con la URL de tu repo
    cd asc-diagnostica-pro
    ```
2.  **Instala las dependencias del backend:**
    ```bash
    npm install
    ```

### Configuración

1.  **Crea el archivo `.env`:** En la raíz del proyecto (`asc-diagnostica-pro`), crea un archivo llamado `.env`.
2.  **Añade tu Clave API:** Abre el archivo `.env` y añade la siguiente línea, reemplazando `TU_CLAVE_API_DE_GEMINI_AQUI` con tu clave real:
    ```dotenv
    GEMINI_API_KEY=TU_CLAVE_API_DE_GEMINI_AQUI
    ```
3.  **Asegura el `.env`:** Asegúrate de que tu archivo `.gitignore` (si no existe, créalo) incluya la línea `.env` para evitar subir tu clave API a Git.
    ```gitignore
    node_modules
    .env
    ```

### Ejecución de la Aplicación

1.  **Inicia el Servidor Backend:**
    *   Para desarrollo (con recarga automática si tienes `nodemon` instalado globalmente o como devDependency):
        ```bash
        npm run dev
        ```
    *   Para producción o sin `nodemon`:
        ```bash
        npm start
        ```
    El servidor debería iniciarse y mostrar un mensaje como: `Servidor backend escuchando en http://localhost:3001` (o el puerto que hayas configurado).

2.  **Abre el Frontend:** Abre el archivo `index.html` directamente en tu navegador web. Puedes hacer doble clic en él desde tu explorador de archivos o usar extensiones como "Live Server" en VS Code.

3.  **¡Prueba la Herramienta!** Rellena el formulario, añade una descripción detallada de un proyecto (real o ficticio) y haz clic en "Generar Diagnóstico con IA".

## 📸 Screenshots (Opcional)

*(Puedes añadir aquí capturas de pantalla de la interfaz, el formulario y el reporte generado)*

*   *Ejemplo: Pantalla principal*
*   *Ejemplo: Formulario de diagnóstico*
*   *Ejemplo: Reporte con gráfico y análisis*

## 🤝 Contribuciones (Opcional)

Las contribuciones son bienvenidas. Si deseas mejorar la herramienta, por favor, abre un *issue* primero para discutir los cambios o crea un *pull request*.

## 📄 Licencia (Opcional)

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles (si lo creas).

## 🙏 Agradecimientos

*   Inspirado en el **Modelo HIP (Hexágono de la Innovación Pública)** desarrollado para la Cumbre Iberoamericana.
*   Desarrollado en el **Makespace del Centro de Ciencia Francisco José de Caldas**.

---
