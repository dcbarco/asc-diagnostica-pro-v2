// Serverless Function para Vercel - ASC Pentágono Diagnóstico
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuración CORS para Vercel
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Configuración de Gemini
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR FATAL: La variable de entorno GEMINI_API_KEY no está definida.");
}

let model;
if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
}

module.exports = async (req, res) => {
  // Configurar CORS
  setCORSHeaders(res);

  // Manejar pre-flight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  if (!model) {
    console.error("Intento de llamada sin inicializar Gemini (API Key faltante).");
    return res.status(500).json({ error: "Error interno: Configuración de IA incompleta." });
  }

  const { projectName, projectDescription, scores } = req.body;

  if (!projectName || !projectDescription || !scores || Object.keys(scores).length !== 5) {
    console.warn("Petición con datos incompletos:", req.body);
    return res.status(400).json({ error: "Faltan datos necesarios para el diagnóstico." });
  }

  // Configuración de seguridad CSP para Vercel
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' http://localhost:3001 https: https://cdn.jsdelivr.net; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3001 https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' http://localhost:3001 https:; img-src 'self' data: http://localhost:3001 https:; font-src 'self' http://localhost:3001 https:; connect-src 'self' http://localhost:3001 https: https://cdn.jsdelivr.net;"
  );

  // --- Prompt Mejorado para Gemini (v3.0) ---
  const systemPrompt = `Eres un sistema inteligente experto en la Política Pública de Apropiación Social del Conocimiento (ASC) del Ministerio de Ciencia, Tecnología e Innovación de Colombia. Tu misión es actuar como un asesor especializado para proyectos de ciencia, tecnología e innovación, generando diagnósticos detallados y recomendaciones prácticas basadas en los 5 Principios ASC, sus 19 Líneas Estratégicas y los Productos Esperados de la política pública.

CONOCIMIENTO ESPECIALIZADO REQUERIDO:
- Los 5 Principios ASC: COPE (Contexto y Pertinencia), PART (Participación Activa), DIIN (Diálogo de Saberes), IMTR (Impacto y Transformación), ARCR (Reflexión Crítica)
- Las 19 Líneas Estratégicas: Espacios para hacer participar, Espacios para enseñar a participar, Crear ambientes democráticos, Dialogar saberes diversos, Gestionar la diversidad cognitiva, Creación conjunta de conocimiento, Empowerment, Capacitación, Línea directa, Reflexividad continua, etc.
- Los Productos Esperados: Narrativas participativas, Mapas de stakeholders, Indicadores de impacto, Planes de acción, Registros de experiencia, Informes de evaluación, etc.

Tu análisis debe ser detallado, específico y apoyado en datos concretos de la política pública ASC. Proporciona explicaciones profundas y recomendaciones prácticas que puedan implementarse efectivamente.`;

  const userPrompt = `
ANÁLISIS COMPRENSIVAMENTE el siguiente proyecto basándote exhaustivamente en la Política Pública de Apropiación Social del Conocimiento (ASC) del Ministerio de Ciencia, Tecnología e Innovación de Colombia.

=== INFORMACIÓN DEL PROYECTO ===
**Nombre del Proyecto:** ${projectName}
**Descripción del Proyecto:**
${projectDescription}

=== RESULTADOS DEL DIAGNÓSTICO ASC ===
Puntuaciones obtenidas en cada Principio (Escala 1-5):
- Contexto y Pertinencia (COPE): ${scores.COPE}
- Participación Activa (PART): ${scores.PART}
- Diálogo e Integración de Saberes (DIIN): ${scores.DIIN}
- Impacto y Transformación (IMTR): ${scores.IMTR}
- Aprendizaje y Reflexión Crítica (ARCR): ${scores.ARCR}

=== INSTRUCCIONES OBLIGATORIAS PARA LA RESPUESTA ===

GENERA UN INFORME DETALLADO Y ROBUSTO en formato Markdown que contenga:

## DIAGNÓSTICO GENERAL
[Análisis integral y comprehensivo del perfil general de ASC del proyecto basado en la descripción del proyecto y las puntuaciones de todos los principios. Este debe ser el análisis inicial que proporcione una visión de conjunto sobre la implementación de ASC, identificando el equilibrio general, oportunidades estratégicas de fortalecimiento y una valoración holística del proyecto desde la perspectiva de la política pública ASC]

### Contexto y Pertinencia (COPE) - Puntuación: ${scores.COPE}
#### Diagnóstico Específico
[Análisis detallado del principio, su significado en el contexto del proyecto, evidencia de la puntuación actual, y relación con líneas estratégicas ASC específicas]

#### Recomendaciones Accionables
- [Acción 1 concreta con tiempo, responsables y medibles indicadores]
- [Acción 2 con fundamentación en política ASC y recursos necesarios]
- [Acción 3 estratégica para fortalecimiento sostenible]

### Participación Activa (PART) - Puntuación: ${scores.PART}
#### Diagnóstico Específico
[Análisis específico del principio de participación, identificando barreras actuales y oportunidades de mejora relacionadas con espacios democráticos y liderazgo comunitario]

#### Recomendaciones Accionables
- [Estrategias concretas para potenciar la participación activa]
- [Mecanismos de desarrollo de capacidades y empoderamiento]
- [Instrumentos de gobernanza compartida y democrática]

### Diálogo de Saberes (DIIN) - Puntuación: ${scores.DIIN}
#### Diagnóstico Específico
[Evaluación de la integración de conocimientos diversos, identificando obstáculos para el diálogo respetuoso y oportunidades de enriquecimiento mutuo]

#### Recomendaciones Accionables
- [Metodologías participativas para gestión de la diversidad cognitiva]
- [Estrategias de creación conjunta de conocimiento]
- [Mecanismos de valoración y respeto por saberes tradicionales]

### Impacto y Transformación (IMTR) - Puntuación: ${scores.IMTR}
#### Diagnóstico Específico
[Análisis de la capacidad del proyecto para generar cambios concretos, evaluando sostenibilidad y replicabilidad de los resultados obtenidos]

#### Recomendaciones Accionables
- [Indicadores de impacto medibles y realistas]
- [Planes de acción concretos con cronogramas definidos]
- [Estrategias de escalamiento y transferencia de conocimientos]

### Aprendizaje y Reflexión Crítica (ARCR) - Puntuación: ${scores.ARCR}
#### Diagnóstico Específico
[Evaluación de procesos de monitoreo continuo y sistematización de experiencias, identificando capacidades de aprendizaje organizacional]

#### Recomendaciones Accionables
- [Sistemas de evaluación continua con retroalimentación estructurada]
- [Metodologías de reflexión colectiva y toma de decisiones informada]
- [Herramientas de documentación y aprendizaje institucional]

=== LINEAMIENTOS DE CALIDAD ===
- **DETALLADAS Y ESPECÍFICAS**: Cada recomendación debe incluir tiempos, recursos y actores responsables
- **FUNDAMENTADAS EN ASC**: Referenciar líneas estratégicas y productos esperados específicos
- **IMPLEMENTABLES**: Recomendaciones con pasos concretos de ejecución y medición
- **HOLÍSTICAS**: Considerar interdependencias entre principios para recomendaciones sinérgicas

=== ESTRUCTURA DE RESPUESTA REQUERIDA ===
La respuesta debe seguir EXACTAMENTE esta estructura para garantizar compatibilidad con el sistema de procesamiento:

## DIAGNÓSTICO GENERAL
[Análisis inicial comprehensivo]

### Contexto y Pertinencia (COPE) - Puntuación: X.X
#### Diagnóstico Específico
[Análisis detallado]

#### Recomendaciones Accionables
[Lista numerada de recomendaciones con íconos • o números]

[Repetir estructura para cada principio con el formato exacto]
`;

  try {
    console.log("Enviando prompt v3.0 a Gemini en Vercel...");
    const result = await model.generateContent([systemPrompt, userPrompt].join("\n\n"));
    const response = await result.response;
    const diagnosisText = await response.text();
    console.log("Respuesta recibida de Gemini en Vercel:");
    console.log("================ ANALYSIS RECEIVED ================");
    console.log(diagnosisText.substring(0, 300) + "...");
    console.log("===================================================");

    res.json({ diagnosisText });

  } catch (error) {
    console.error("Error al llamar a la API de Gemini en Vercel:", error);
    res.status(500).json({ error: "No se pudo generar el análisis de IA." });
  }
};