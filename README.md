# 🐞 BugHunter Saga: Plataforma Gamificada de Software Testing

> **Proyecto de Integración Curricular (Tesis)**
> **Facultad de Ingeniería de Sistemas - EPN**
> Una plataforma educativa diseñada para enseñar técnicas de Pruebas de Software (Caja Negra y Caja Blanca) mediante estrategias de gamificación, alineada con el estándar **ISTQB Nivel Básico v4.0**.

---

## 📖 Descripción del Sistema

**BugHunter Saga** transforma el aprendizaje teórico de la Ingeniería de Software en una aventura interactiva. La plataforma aplica el marco metodológico **GOAL (Gamification focused On Application Lifecycle Management)** para incrementar la motivación, retención y práctica de los estudiantes.

A través de un sistema unificado, los estudiantes progresan resolviendo desafíos prácticos que simulan escenarios reales de la industria del software.

### 🌟 Módulos de Aprendizaje Incluidos

El sistema integra tres módulos principales que cubren diferentes competencias del Syllabus ISTQB:

* **📘 Módulo A: Técnicas de Caja Negra I**
* *Temas:* Partición de Equivalencia (EP) y Análisis de Valores Límite (BVA).
* *Objetivo:* Aprender a seleccionar inputs efectivos y probar rangos de datos.


* **📗 Módulo B: Técnicas de Caja Negra II**
* *Temas:* Tablas de Decisión.
* *Objetivo:* Validar lógica de negocio compleja y combinaciones de reglas.


* **📙 Módulo C: Técnicas de Caja Blanca**
* *Temas:* Pruebas de Sentencia y Cobertura de Código.
* *Objetivo:* Analizar la estructura interna del código y asegurar la ejecución de líneas críticas.



---

## 🎮 Mecánicas de Gamificación (Globales)

El sistema transversaliza la experiencia de juego para unificar el progreso entre los módulos:

* **🏆 Sistema de Ligas:** Competencia semanal entre usuarios (Bronce, Plata, Oro, Diamante) basada en XP acumulada.
* **🔥 Rachas de Aprendizaje:** Incentivos por constancia diaria (Streak).
* **💎 Economía Virtual:** Gana "Lingots" al completar lecciones perfectas y canjéalos en la tienda por items cosméticos o "congeladores de racha".
* **🎖️ Insignias (Badges):** Logros desbloqueables por hitos específicos (ej. "Bug Hunter", "Code Master", "Night Owl").
* **📊 Perfil de Jugador:** Estadísticas detalladas de precisión, tiempo de estudio y progreso por módulo.

---

## 🛠️ Arquitectura Técnica

El proyecto sigue una arquitectura moderna, modular y contenerizada:

* **Backend:** Java 17 + Spring Boot (Security, JPA, Web).
* **Frontend:** Next.js (React), TypeScript, Tailwind CSS.
* **Base de Datos:** PostgreSQL con versionado de esquemas mediante Flyway.
* **Despliegue:** Docker Compose para orquestación de servicios.

---

## 🐳 Instalación y Despliegue

Todo el sistema está configurado para levantarse con un solo comando gracias a Docker.

### Prerrequisitos

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo.
* Git.

### Pasos para ejecutar

1. **Clonar el repositorio:**
```bash
git clone https://github.com/organizacion/bughunter-saga.git
cd bughunter-saga

```


2. **Levantar el entorno:**
Ejecuta el siguiente comando en la raíz del proyecto (donde está el archivo `docker-compose.yml`):
```bash
docker-compose up --build -d

```


*Esto descargará las imágenes necesarias, construirá el backend y frontend, e iniciará la base de datos.*
3. **Acceder a la plataforma:**
* 💻 **Aplicación Web:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* 🔌 **API Docs (Swagger):** [http://localhost:8080/swagger-ui.html](https://www.google.com/search?q=http://localhost:8080/swagger-ui.html)



### Credenciales por defecto (Desarrollo)

* **Base de datos:** Usuario `postgres` / Contraseña (ver `docker-compose.yml`)
* **Usuarios de prueba:** El sistema incluye seeds con usuarios base (ej. `admin@bughunter.com` / `password123`).

---

## 📂 Estructura del Proyecto

```text
bughunter-saga/
├── api/                  # Código fuente del Backend (Spring Boot)
│   ├── src/main/java     # Lógica de negocio, Servicios, Controladores
│   └── src/main/resources
│       └── db/migration  # Scripts SQL (V1..V12) para estructura y datos iniciales
├── src/                  # Código fuente del Frontend (Next.js)
│   ├── components/       # Componentes React reutilizables (Mapas, UI)
│   ├── pages/            # Rutas de la aplicación
│   └── styles/           # Estilos globales y Tailwind
├── docker-compose.yml    # Orquestación de contenedores
└── README.md             # Documentación general

```

---

## 🧪 Validación y Metodología

Este proyecto valida la aplicación de gamificación en la educación superior mediante:

1. **Pre-Test:** Evaluación inicial de conocimientos.
2. **Intervención:** Uso de la plataforma BugHunter Saga.
3. **Post-Test:** Medición de la mejora en el aprendizaje.
4. **Encuestas de Motivación:** Basadas en el modelo *IMMS (Instructional Materials Motivation Survey)*.

---

## 👥 Equipo de Desarrollo

Este sistema fue desarrollado como parte del Trabajo de Integración Curricular en la **Escuela Politécnica Nacional**:

* **Desarrolladores:**
* Max Mateo Carrión Chida
* Esteban David Bajaña Caguana
* Alexander Francisco Tibanta Miranda
* Lenin Darío Rodríguez Benavides


* **Dirección:**
* MSc. Evelyn Marcela Mosquera Espinosa



---

© 2024 - 2025 BugHunter Saga Team. Todos los derechos reservados.
