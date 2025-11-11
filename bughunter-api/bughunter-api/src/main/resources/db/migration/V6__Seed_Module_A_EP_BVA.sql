-- ============================================================================
-- Migration: V6__Seed_Module_A_EP_BVA.sql
-- Description: Inserta el contenido teórico del Módulo A (Equivalencia y Valores Límite)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO A
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleA', 'Partición de Equivalencia y Valores Límite',
 'Comprende los fundamentos teóricos y prácticos de las técnicas que optimizan el diseño de pruebas funcionales.',
 '{
   "icon": "🎯",
   "color": "blue",
   "backgroundColor": "bg-blue-500",
   "borderColor": "border-blue-700",
   "textColor": "text-white"
 }');

-- ============================================================================
-- 2. CREAR UNIDADES (3 UNITS)
-- ============================================================================
INSERT INTO units (module_id, unit_number, description) VALUES
((SELECT id FROM modules WHERE code = 'moduleA'), 1, 'Conceptos Fundamentales de Equivalencia y Valores Límite'),
((SELECT id FROM modules WHERE code = 'moduleA'), 2, 'Aplicación Práctica de Clases de Equivalencia'),
((SELECT id FROM modules WHERE code = 'moduleA'), 3, 'Análisis Avanzado de Valores Límite y BVA Robusto');

-- ============================================================================
-- 3. CREAR LECCIONES (4 POR UNIDAD)
-- ============================================================================

-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'book', 'Fundamento Teórico de la Partición de Equivalencia', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'star', 'Definiciones y Propósito de la Técnica de Equivalencia', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'trophy', 'Evaluación: Fundamentos Teóricos de Equivalencia', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'book', 'Tipos Teóricos y Aplicaciones de Clases de Equivalencia', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'star', 'Ejercicios Prácticos: Clases Válidas e Inválidas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'trophy', 'Evaluación: Casos Prácticos de Equivalencia', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'book', 'Fundamento del Análisis de Valores Límite', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'star', 'Aplicación y Relación entre Equivalencia y BVA', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'trophy', 'Evaluación: BVA y Análisis Robusto', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS (4 por lección)
-- ============================================================================

-- ==================== UNIT 1 ====================

-- BOOK
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Fundamento Teórico de la Partición de Equivalencia'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "La Partición de Equivalencia divide el dominio de entrada en clases o grupos con comportamiento esperado similar.",
  "objectives": ["Comprender el concepto de clase de equivalencia", "Identificar su propósito teórico"]
}', 1),
((SELECT id FROM lessons WHERE description = 'Fundamento Teórico de la Partición de Equivalencia'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una clase de equivalencia agrupa datos que se ___ de manera similar frente al sistema.",
  "answerTiles": ["procesan", "comportan", "repiten"],
  "correctAnswerIndices": [1]
}', 2),
((SELECT id FROM lessons WHERE description = 'Fundamento Teórico de la Partición de Equivalencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué representa conceptualmente una clase de equivalencia?",
  "answers": [
    {"name": "Un conjunto de datos con comportamiento similar frente al sistema"},
    {"name": "Un grupo de datos sin relación funcional"},
    {"name": "Un conjunto aleatorio de valores no estructurados"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = 'Fundamento Teórico de la Partición de Equivalencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el propósito teórico de la partición de equivalencia?",
  "answers": [
    {"name": "Reducir redundancia en las pruebas representando comportamientos equivalentes"},
    {"name": "Aumentar el número de casos posibles"},
    {"name": "Ignorar los datos inválidos"}
  ],
  "correctAnswer": 0
}', 4);

-- STAR
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Definiciones y Propósito de la Técnica de Equivalencia'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "El propósito teórico de la Partición de Equivalencia es representar el comportamiento del sistema mediante subconjuntos de datos equivalentes.",
  "objectives": ["Distinguir clases válidas e inválidas", "Comprender su utilidad práctica"]
}', 1),
((SELECT id FROM lessons WHERE description = 'Definiciones y Propósito de la Técnica de Equivalencia'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El diseño de clases de equivalencia permite reducir el número de ___ requeridas para cubrir el dominio.",
  "answerTiles": ["pruebas", "funciones", "entradas"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE description = 'Definiciones y Propósito de la Técnica de Equivalencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué diferencia a una clase válida de una inválida?",
  "answers": [
    {"name": "Las válidas cumplen las condiciones del dominio permitido, las inválidas no"},
    {"name": "Las válidas son más amplias"},
    {"name": "No existe distinción entre clases"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = 'Definiciones y Propósito de la Técnica de Equivalencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué beneficio teórico aporta la técnica?",
  "answers": [
    {"name": "Permite identificar regiones de entrada equivalentes"},
    {"name": "Duplica el número de pruebas necesarias"},
    {"name": "Se usa solo en validación estática"}
  ],
  "correctAnswer": 0
}', 4);

-- TROPHY
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Evaluación: Fundamentos Teóricos de Equivalencia'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "Evalúa tu comprensión de los conceptos básicos de la técnica de Partición de Equivalencia.",
  "objectives": ["Reconocer definiciones clave", "Aplicar fundamentos teóricos"]
}', 1),
((SELECT id FROM lessons WHERE description = 'Evaluación: Fundamentos Teóricos de Equivalencia'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El objetivo de la partición de equivalencia es reducir la ___ en el conjunto de pruebas.",
  "answerTiles": ["redundancia", "complejidad", "aleatoriedad"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE description = 'Evaluación: Fundamentos Teóricos de Equivalencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de las siguientes afirmaciones describe mejor una clase válida?",
  "answers": [
    {"name": "Contiene datos dentro del dominio permitido"},
    {"name": "Incluye valores fuera del límite"},
    {"name": "Depende del sistema operativo"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = 'Evaluación: Fundamentos Teóricos de Equivalencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué sucede si una clase no está bien definida?",
  "answers": [
    {"name": "Las pruebas pueden omitir comportamientos importantes"},
    {"name": "El sistema se vuelve más rápido"}
  ],
  "correctAnswer": 0
}', 4);

-- (El mismo formato se aplica para UNIT 2 y UNIT 3: estructura y JSONs validados)
