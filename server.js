// server.js
require('dotenv').config(); // Cargar variables de entorno desde .env
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3001; // Puerto para el backend

// --- Configuración de Middleware ---
app.use(cors()); // Habilitar CORS para permitir peticiones del frontend
app.use(express.json()); // Para parsear el cuerpo de las peticiones JSON

// --- Inicialización del Cliente Gemini ---
const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key from .env:", apiKey); // Log API Key
if (!apiKey) {
    console.error("ERROR FATAL: La variable de entorno GEMINI_API_KEY no está definida.");
    // En un escenario real, podrías querer detener el servidor si la clave no existe
    // process.exit(1);
}
// Solo inicializar si la clave existe
let genAI;
let model;
if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    // Especificar el modelo deseado
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" }); // Use user suggested model
    console.log("Gemini model initialized:", model !== undefined); // Log model initialization status
}

// --- Endpoint para el Diagnóstico ---
app.post('/api/diagnose', async (req, res) => {
    console.log("Recibida petición a /api/diagnose"); // Log para debugging

    // Validar que el cliente Gemini esté inicializado
    if (!model) {
         console.error("Intento de llamada a /api/diagnose sin inicializar Gemini (API Key faltante).");
         return res.status(500).json({ error: "Error interno del servidor: Configuración de IA incompleta." });
    }

    // Obtener datos del cuerpo de la petición
    const { projectName, projectDescription, scores } = req.body;

    // Validar datos de entrada básicos
    if (!projectName || !projectDescription || !scores || Object.keys(scores).length !== 6) {
        console.warn("Petición a /api/diagnose con datos incompletos:", req.body);
        return res.status(400).json({ error: "Faltan datos necesarios para el diagnóstico (nombre, descripción, puntuaciones)." });
    }

    // --- Construcción del Prompt para Gemini ---
    const systemPrompt = `Eres un sistema inteligente experto en apropiación social del conocimiento (ASC) y asesoramiento para proyectos de ciencia, tecnología e innovación social con impacto ciudadano. Tu misión es generar diagnósticos claros y recomendaciones accionables basadas en la descripción de un proyecto y los resultados de un formulario de autoevaluación de 36 preguntas agrupadas en 6 vectores (DISO, INSA, REPO, APRA, COPA, COAC), donde cada vector tiene una puntuación promedio de 1 (bajo) a 5 (alto).`;

    const userPrompt = `
Analiza el siguiente proyecto y sus resultados de autoevaluación de ASC:

**Nombre del Proyecto:** ${projectName}
**Descripción del Proyecto:**
${projectDescription}

**Resultados Promedio por Vector (Escala 1-5):**
- Diálogo Social (DISO): ${scores.DISO}
- Integración de Saberes (INSA): ${scores.INSA}
- Respuesta Oportuna (REPO): ${scores.REPO}
- Aplicación Práctica (APRA): ${scores.APRA}
- Co-creación Participativa (COPA): ${scores.COPA}
- Conectividad Accesible (COAC): ${scores.COAC}

**Instrucciones:**
Proporciona un informe estructurado de la siguiente manera:

1.  **Diagnóstico General:** Un párrafo breve resumiendo el perfil general de ASC del proyecto, destacando fortalezas y áreas clave de mejora basadas en el conjunto de puntuaciones.
2.  **Análisis y Recomendaciones por Vector:** Para CADA UNO de los 6 vectores (DISO, INSA, REPO, APRA, COPA, COAC), incluye lo siguiente:
    *   Un título claro usando Markdown (ej. \`### Diálogo Social (DISO) - Puntuación: ${scores.DISO}\`).
    *   **Diagnóstico Específico:** Un párrafo analizando el desempeño en este vector, relacionando la puntuación con la descripción del proyecto si es posible.
    *   **Recomendaciones Accionables:** Una lista (usando '*' o '-') con 2-3 sugerencias CONCRETAS y PRÁCTICAS que el proyecto podría implementar para mejorar o fortalecer este vector específico. Adapta las recomendaciones al posible contexto inferido de la descripción.

Utiliza un lenguaje claro, positivo y orientador. Formatea la respuesta usando Markdown para títulos (###), listas (* o -) y negritas (**texto**) para mejorar la legibilidad. Asegúrate de cubrir los 6 vectores.
`;

    // --- Llamada a la API de Gemini ---
    try {
        console.log("Enviando prompt a Gemini...");
        const result = await model.generateContent([systemPrompt, userPrompt].join("\n\n")); // Unir prompts o enviar como historial si la API lo prefiere
        const response = await result.response;
        const diagnosisText = await response.text();
        console.log("Respuesta recibida de Gemini.");

        // Enviar el texto generado al frontend
        res.json({ diagnosisText: diagnosisText });

    } catch (error) {
        console.error("Error al llamar a la API de Gemini:", error);
        console.error("Gemini API error details:", error); // Log full error details
        // Puedes intentar dar un error más específico basado en 'error.status' o 'error.message' si la librería los proporciona
        res.status(500).json({ error: "No se pudo generar el análisis de IA. Inténtalo de nuevo más tarde." });
    }
});

// --- Iniciar el Servidor ---
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
