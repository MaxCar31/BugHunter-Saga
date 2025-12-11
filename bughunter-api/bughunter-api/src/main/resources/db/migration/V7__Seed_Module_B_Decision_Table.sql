-- ============================================================================
-- Migration: V7__Seed_Module_B_Decision_Tables.sql
-- Description: Inserta el contenido del Módulo B (Tablas de Decisión)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO B
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleB', 'Tablas de Decisión',
'Técnica de caja negra que permite modelar reglas de negocio complejas mediante condiciones y acciones lógicas combinadas.',
'{
  "icon": "🔲",
  "color": "green",
  "backgroundColor": "bg-green-500",
  "borderColor": "border-green-700",
  "textColor": "text-white"
}');

-- ============================================================================
-- 2. CREAR UNIDADES (3 unidades)
-- ============================================================================
INSERT INTO units (module_id, unit_number, description) VALUES
((SELECT id FROM modules WHERE code = 'moduleB'), 1, 'Modelando Lógica Compleja con Tablas de Decisión'),
((SELECT id FROM modules WHERE code = 'moduleB'), 2, 'Simplificación y Optimización de Reglas de Negocio'),
((SELECT id FROM modules WHERE code = 'moduleB'), 3, 'Casos de Uso y Buenas Prácticas');

-- ============================================================================
-- 3. CREAR LECCIONES (4 por unidad)
-- ============================================================================
-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'book', 'Introducción a las Tablas de Decisión', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'dumbbell', 'Construyendo tu Primera Tabla', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'trophy', 'Evaluación: Conceptos Fundamentales', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'book', 'Simplificación de Tablas Complejas', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'dumbbell', 'Uso del Símbolo “-” y Reglas Reducidas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'trophy', 'Evaluación: Tablas de Decisión Avanzadas', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'book', 'Casos de Uso Reales con Tablas de Decisión', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'dumbbell', 'Ejercicio: Resolver un Caso de Negocio', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'trophy', 'Evaluación: Casos y Buenas Prácticas', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS (4 por lección) en el formato JSON unificado
-- ============================================================================

-- ==================== UNIT 1 ====================
-- BOOK
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo B",
  "introduction": "Las tablas de decisión representan múltiples combinaciones de condiciones y acciones en un esquema lógico.",
  "objectives": ["Comprender el propósito de las tablas de decisión", "Identificar su estructura básica"]
}', 1),
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Las tablas de decisión modelan reglas de ___ y ___ en formato tabular.",
  "answerTiles": ["entrada", "acción", "salida", "estado"],
  "correctAnswerIndices": [0, 1]
}', 2),
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el objetivo principal de una tabla de decisión?",
  "answers": [
    {"name": "Probar el rendimiento del sistema."},
    {"name": "Identificar combinaciones de condiciones y sus acciones."},
    {"name": "Validar la interfaz gráfica."}
  ],
  "correctAnswer": 1
}', 3),
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuándo es útil aplicar Tablas de Decisión?",
  "answers": [
    {"name": "Cuando existen múltiples condiciones interdependientes."},
    {"name": "Solo en pruebas de rendimiento."}
  ],
  "correctAnswer": 0
}', 4);

-- STAR
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo B",
  "introduction": "Aprende cómo se estructura una tabla de decisión con condiciones, acciones y reglas.",
  "objectives": ["Diferenciar entre condiciones y acciones", "Entender la notación binaria en tablas"]
}', 1),
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una tabla con 3 condiciones binarias tiene ___ reglas posibles.",
  "answerTiles": ["4", "6", "8", "12"],
  "correctAnswerIndices": [2]
}', 2),
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué elemento define el resultado esperado?",
  "answers": [
    {"name": "Las acciones de cada regla."},
    {"name": "Los encabezados de condición."}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Una buena tabla de decisión debe:",
  "answers": [
    {"name": "Cubrir todas las combinaciones sin redundancia."},
    {"name": "Evitar condiciones negativas."}
  ],
  "correctAnswer": 0
}', 4);

-- (continúa igual estructura para trophy y treasure en cada unidad)
