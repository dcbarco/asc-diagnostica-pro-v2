# 🔍 ASC Pentágono Diagnóstico

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

Herramienta interactiva para diagnosticar y fortalecer estrategias de **Apropiación Social del Conocimiento (ASC)** basada en la Política Pública del Ministerio de Ciencia, Tecnología e Innovación de Colombia.

## 🌟 Descripción

**ASC Pentágono Diagnóstico** es una aplicación web que evalúa proyectos de ciencia, tecnología e innovación según los **5 Principios Fundamentales de la Política Pública de ASC de Colombia**:

- **COPE** - Contexto y Pertinencia
- **PART** - Participación Activa
- **DIIN** - Diálogo de Saberes
- **IMTR** - Impacto y Transformación
- **ARCR** - Reflexión Crítica

La herramienta genera **diagnósticos personalizados** usando **inteligencia artificial** (Google Gemini) y produce **reportes HTML autossuficientes** que incluyen:
- Análisis detallado por principio
- Plan de mejoras con recomendaciones específicas
- Medición de indicadores
- Interpretación de resultados

## Los 5 Principios del Pentágono de la ASC

El diagnóstico se estructura en torno a los siguientes 5 principios, que ahora son los vectores de nuestra herramienta:

1.  **Contexto y Pertinencia (COPE):** Capacidad del proyecto para adaptarse a las realidades locales, necesidades y características culturales del territorio.
2.  **Participación Activa (PART):** Nivel y calidad de la intervención ciudadana en la toma de decisiones, colaboración y gobernanza del proyecto.
3.  **Diálogo e Integración de Saberes (DIIN):** Creación de espacios equitativos para intercambiar y construir conocimiento entre saberes científicos, locales y tradicionales.
4.  **Impacto y Transformación (IMTR):** Capacidad para generar cambios y resultados concretos como producto de la participación y el diálogo colaborativo.
5.  **Aprendizaje y Reflexión Crítica (ARCR):** Procesos de análisis continuo, evaluación y sistematización de experiencias para la mejora constante.

## ✨ Características

*   **Alineación con Política Pública:** El modelo y las preguntas están basados en los principios y líneas estratégicas de Minciencias.
*   **Formulario de 25 Preguntas:** Cuestionario conciso y enfocado en los 5 principios clave de la ASC.
*   **Visualización Pentagonal:** Un gráfico de radar de 5 ejes para una visualización clara del perfil de ASC del proyecto.
*   **Análisis por IA con Gemini:**
    *   Generación de un diagnóstico general del proyecto.
    *   Análisis detallado y recomendaciones prácticas para cada uno de los 5 principios, contextualizadas con la descripción del proyecto.
*   **Interfaz Limpia y Moderna:** Frontend responsivo en un único archivo HTML para facilitar el despliegue.
*   **Arquitectura Segura:** Uso de un backend proxy en Node.js para proteger la clave API de Gemini.

## 💻 Stack Tecnológico

### Frontend
- **HTML5** - Estructura y semántica
- **CSS3 Moderno** - Estilos responsive, flexbox, gradientes, animaciones
- **Vanilla JavaScript ES6+** - Lógica del cliente sin frameworks
- **Chart.js** - Gráficos dinámicos y visualizaciones
- **Fontespecífica CSS-in-JS** - Tipografía web moderna

### Backend (Serverless)
- **Vercel Functions** - Runtime de Node.js
- **Node.js 18+** - Motor JavaScript
- **@google/generative-ai** - SDK oficial de Gemini
- **dotenv** - Gestión segura de variables de entorno

### Servicios Externos
- **Google Gemini API** - Modelo `gemini-2.0-flash-lite`
- **Vercel Platform** - Despliegue, escalado y CDN
- **CDN de jsDelivr** - Librerías externas optimizadas

## 🔒 Consideraciones de Seguridad

### Variables Sensibles
- ✅ API Keys manejadas solo en servidor
- ✅ Variables de entorno en archivos `.env`
- ✅ `.gitignore` configurado para archivos sensibles
- ✅ Headers CORS restrictivos configurados
- ✅ Content Security Policy activo

### Protección de Datos
- ✅ No almacena datos de usuarios
- ✅ Transmite solo información necesaria
- ✅ Usa HTTPS/TLS obligatorio
- ✅ Requests autenticados con API Keys

## 📊 Funcionalidades

- ✅ **Diagnóstico IA Completo** - Análisis profundo con contexto
- ✅ **25 Preguntas Estructuradas** - Baseadas en línea de Minciencias
- ✅ **Visualización Pentagonal** - Gráfico de radar interactivo
- ✅ **Reportes HTML Autossuficientes** - Sin depender de conexión
- ✅ **Colores por Principio** - Identificación visual inmediata
- ✅ **Responsive Design** - Funciona en móvil y desktop
- ✅ **Offline Capable** - Reportes pueden abrirse sin internet
- ✅ **Impresión Optimizada** - Reportes listos para imprimir

## 🤝 Contribuciones y Desarrollo

### Bienvenido a contribuir
1. Fork el proyecto
2. Crea una rama nueva (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Mejoras Planificadas
- 🔄 **Accesibilidad:** Soporte completo para lectores de pantalla
- 🔄 **Internacionalización:** Soporte para múltiples idiomas
- 🔄 **Manifest PWA:** Aplicación web progresiva
- 🔄 **Tests Automatizados:** Cobertura de código completa

## 🚀 Inicio Rápido

### Requisitos Previos

- ✅ Node.js 18+ (versión LTS)
- ✅ Cuenta de Google (para API de Gemini)
- ✅ Git (opcional, para control de versiones)

### 🔑 1. Obtener API Key de Google Gemini

**IMPORTANTE:** Necesitas una clave API gratuita de Google Gemini para que funcione la aplicación.

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta Google
3. Crear una nueva API Key
4. Copia la clave (formato: `AIza...`)

### 💻 2. Instalación Local

```bash
# Clona el repositorio (reemplaza con tu URL de GitHub)
git clone https://github.com/your-username/asc-pentagono-diagnostico.git
cd asc-pentagono-diagnostico

# Instala dependencias
npm install

# Configura variables de entorno
cp .env.example .env
# Edita .env y agrega tu GEMINI_API_KEY real
```

### 🔧 3. Configuración de Variables de Entorno

Crea un archivo `.env` con el siguiente contenido:

```bash
# API Key de Google Generative AI (Gemini)
GEMINI_API_KEY=tu_clave_api_real_de_gemini_aqui

# Configuración de desarrollo
NODE_ENV=development
PORT=3001
```

### ▶️ 4. Ejecutar en Desarrollo Local

```bash
# Para desarrollo local
npm run dev

# O para producción local
npm start
```

Abre `http://localhost:3001` en tu navegador para usar la aplicación.

## 🌐 Despliegue en Vercel

### Opción A: Despliegue Automático (Recomendado)

1. **Importa desde GitHub**:
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Haz clic "New Project"
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `asc-pentagono-diagnostico`

2. **Configura Variables de Entorno**:
   - Ve a Settings → Environment Variables
   - Agrega: `GEMINI_API_KEY` = tu_clave_API_de_Gemini
   - Asegúrate que sea "Production" environment

3. **Deploy**:
   - Haz clic "Deploy"
   - Espera a que termine el despliegue
   - ¡Tu aplicación estará lista en una URL como `https://asc-diagnostico.vercel.app`

### Opción B: Usando CLI de Vercel

```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Configura variables de entorno en producción
vercel env add GEMINI_API_KEY
```

## 📁 Estructura del Proyecto

```
asc-diagnostica-pro/
├── 📄 index.html                 # Aplicación principal (frontend + gráficos)
├── 📄 api/diagnose.js            # API serverless (Vercel Function)
├── 📄 vercel.json               # Configuración de Vercel
├── 📄 package.json              # Dependencias y scripts
├── 📄 .env                      # Variables de entorno (desarrollo)
├── 📄 .env.example              # Template de variables
├── 📄 .gitignore               # Archivos ignorados por Git
└── 📄 README.md                 # Esta documentación
```

## 🔧 Scripts Disponibles

### Despliegue
```bash
npm run deploy        # Desplegar a producción en Vercel
npm run preview       # Crear preview deployment
npm run build         # No requiere build (static site)
```

### Desarrollo
```bash
npm run dev           # Desarrollo con Vercel (hot reload)
npm start             # ejecutar servidor local

### Verificación
npm test              # Ejecutar tests (placeholder)
```

## 🎯 Uso de la Aplicación

1. **Accede a la aplicación**
2. **Completa el formulario**:
   - Nombre del proyecto/organización
   - Descripción detallada del proyecto
   - Responde las 25 preguntas (5 por principio ASC)
3. **Genera el diagnóstico**
4. **Revisa el análisis IA**
5. **Descarga el reporte HTML**

## ⚙️ Variables de Entorno Requeridas

### Producción (Vercel)
- `GEMINI_API_KEY`: Tu clave API de Google Gemini

### Desarrollo Local
- `GEMINI_API_KEY`: Tu clave API de Google Gemini
- `NODE_ENV`: `development`
- `PORT`: `3001` (opcional)

## 📋 Licencia y Distribución

Este proyecto está bajo la **Licencia MIT**. Esto significa que:

- ✅ **Uso Comercial:** Puede usarse en productos comerciales
- ✅ **Modificación:** Puede modificarse libremente
- ✅ **Distribución:** Puede distribuirse libremente
- ✅ **Uso Privado:** Puede usarse en proyectos privados
- ⚠️ **Atribución:** Mantenga el reconocimiento original

Cita recomendada:
```
ASC Pentágono Diagnóstico - Centro de Ciencia Francisco José de Caldas
Licencia MIT - 2024
https://github.com/tu-usuario/asc-pentagono-diagnostico
```

## 📞 Soporte y Contacto

### ¿Necesitas Ayuda?

- 🐛 **Reportar problemas:** [Issues en GitHub](https://github.com/tu-usuario/asc-pentagono-diagnostico/issues)
- 💡 **Sugerencias:** Crea un Issue con la etiqueta `enhancement`
- 📧 **Consultas técnicas:** Debes registrarte y subir tu proyecto a GitHub primero

### Centro de Ciencia Francisco José de Caldas

- 📍 **Ubicación:** Bogotá, Colombia
- 🌐 **Sitio web:** [ccfjc.gov.co](https://ccfjc.gov.co) (sitio ejemplo)
- 🧪 **Makespace:** Innovación y tecnología aplicada
- 🎯 **Enfoque:** Ciencia ciudadana y apropiación social del conocimiento

## 🙏 Agradecimientos Especiales

### Ministerio de Ciencia, Tecnología e Innovación de Colombia
Por la **Política Pública de Apropiación Social del Conocimiento** que inspira y guía esta herramienta.

### Comunidad asciigrant
- 🤝 Diseño accesible y participación ciudadana
- 🎨 Experiencia de usuario centrada en ciudadanos
- 💡 Innovación en políticas públicas

### Desarrollado en el Makespace
**Centro de Ciencia Francisco José de Caldas**
*Talleres de innovación tecnológica* | *Proyectos de ciencia abierta* | *Desarrollo comunitario*

### Tecnologías y Servicios
- 🚀 **Vercel:** Despliegue, escalado y CDN
- 🤖 **Google Gemini:** Inteligencia artificial avanzada
- 🎨 **Chart.js:** Visualización de datos profesional
- 🛡️ **Seguridad:** Mejores prácticas de protección de datos
