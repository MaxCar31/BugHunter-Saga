-- ============================================================================
-- Migration: V5__Seed_Module_B_Decision_Tables.sql
-- Description: Inserta el contenido del Módulo B (Tablas de Decisión)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO B
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleB', 'Tablas de Decisión',
 'Técnica de caja negra para reglas de negocio complejas.',
 '{"backgroundColor": "bg-green-500", "icon": "🔲", "color": "green"}');

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
(2, 1, 'Modelando Lógica Compleja');

-- 3. CREAR LECCIONES
INSERT INTO lessons (unit_id, type, description, position) VALUES
(5, 'book', 'Introducción a Tablas de Decisión', 1),
(5, 'star', 'Crea tu Primera Tabla', 2),
(5, 'fast-forward', 'Desafío Rápido: Reglas Complejas', 3);

-- 4. CREAR PROBLEMAS
INSERT INTO problems (lesson_id, type, content, position) VALUES
-- --- Lección 1 ---
(9, 'INFO',
'{
  "type": "INFO",
  "moduleTitle": "Tablas de Decisión",
  "introduction": "Las tablas de decisión modelan lógica compleja con múltiples condiciones y acciones, facilitando la identificación de combinaciones posibles.",
  "objectives": ["Comprender la estructura teórica de una tabla de decisión", "Identificar cómo se representan condiciones y acciones"]
}', 1),

-- --- Lección 2 ---
(10, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "Si tienes 3 condiciones de entrada (ej. V/F, V/F, V/F), ¿cuántas reglas (columnas) necesitas?",
  "answers": [
    {"name": "3 reglas"},
    {"name": "6 reglas"},
    {"name": "8 reglas (2^3)"}
  ],
  "correctAnswer": 2
}', 1),

(10, 'FILL_IN_THE_BLANK',
'{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una tabla de decisión se divide en 4 cuadrantes: Condiciones, Acciones, Reglas de Condición y Reglas de ___.",
  "answerTiles": ["Respuesta", "Acción", "Resultado"],
  "correctAnswerIndices": [1]
}', 2),

-- --- Lección 3 ---
(11, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "Empareja la Regla con la Acción correcta en el sistema de aerolíneas. ¿Qué acción corresponde a la Regla 1 (VIP = SI, Vuelo Lleno = SI)?",
  "answers": [
    {"name": "Dar Upgrade a 1ra Clase"},
    {"name": "Ofrecer 10% descuento"},
    {"name": "Poner en lista de espera"},
    {"name": "No hacer nada"}
  ],
  "correctAnswer": 0
}', 1),

(11, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el principal beneficio de las Tablas de Decisión?",
  "answers": [
    {"name": "Probar el rendimiento del sistema."},
    {"name": "Garantizar que no se omita ninguna combinación de reglas de negocio."},
    {"name": "Probar cada línea de código."}
  ],
  "correctAnswer": 1
}', 2),

(11, 'INFO',
'{
  "type": "INFO",
  "moduleTitle": "Simplificación de Reglas",
  "introduction": "A veces, el valor de una condición no importa (se marca con ‘-’), permitiendo reducir la cantidad de reglas sin perder cobertura lógica.",
  "objectives": ["Explicar cómo simplificar tablas de decisión usando condiciones irrelevantes", "Reconocer el símbolo ‘-’ en tablas de decisión"]
}', 3);
-- ============================================================================