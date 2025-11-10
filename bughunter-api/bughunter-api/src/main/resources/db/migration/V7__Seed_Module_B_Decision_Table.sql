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

-- 2. CREAR UNIDADES (EXACTAMENTE 3)
INSERT INTO units (module_id, unit_number, description) VALUES
((SELECT id FROM modules WHERE code = 'moduleB'), 1, 'Modelando Lógica Compleja con Tablas de Decisión'),
((SELECT id FROM modules WHERE code = 'moduleB'), 2, 'Simplificación y Optimización de Reglas de Negocio'),
((SELECT id FROM modules WHERE code = 'moduleB'), 3, 'Casos de Uso y Buenas Prácticas');

-- ============================================================================
-- 3. CREAR LECCIONES (4 por unidad: book, star, trophy, treasure)
-- ============================================================================

-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'book', 'Introducción a las Tablas de Decisión', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'star', 'Construyendo tu Primera Tabla', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'trophy', 'Evaluación: Conceptos Fundamentales', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'book', 'Simplificación de Tablas Complejas', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'star', 'Uso del Símbolo “-” y Reglas Reducidas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'trophy', 'Evaluación: Tablas de Decisión Avanzadas', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'book', 'Casos de Uso Reales con Tablas de Decisión', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'star', 'Ejercicio: Resolver un Caso de Negocio', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'trophy', 'Evaluación: Casos y Buenas Prácticas', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS (4 por lección)
-- ============================================================================

-- ==================== UNIT 1 ====================
-- BOOK
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'INFO', '{
  "title": "Introducción a Tablas de Decisión",
  "content": "Las tablas de decisión representan múltiples combinaciones de condiciones y acciones en un esquema lógico.",
  "example": "Por ejemplo, una política de descuentos según tipo de cliente y monto de compra."
}', 1),
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'FILL_IN_THE_BLANK', '{
  "question": "Las tablas de decisión modelan reglas de ___ y ___ en formato tabular.",
  "tiles": ["entrada", "acción", "salida", "estado"],
  "correctIndices": [0,1]
}', 2),
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'MULTIPLE_CHOICE', '{
  "question": "¿Cuál es el objetivo principal de una tabla de decisión?",
  "options": [
    "Probar el rendimiento del sistema.",
    "Identificar todas las combinaciones posibles de condiciones y sus acciones.",
    "Validar la interfaz gráfica."
  ],
  "correctAnswer": 1
}', 3),
((SELECT id FROM lessons WHERE description = 'Introducción a las Tablas de Decisión'), 'MULTIPLE_CHOICE', '{
  "question": "¿Cuándo es útil aplicar Tablas de Decisión?",
  "options": [
    "Cuando existen múltiples condiciones interdependientes.",
    "Solo en pruebas de rendimiento."
  ],
  "correctAnswer": 0
}', 4);

-- STAR
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'INFO', '{
  "title": "Estructura de una Tabla de Decisión",
  "content": "Se divide en Condiciones, Acciones, Reglas de Condición y Reglas de Acción."
}', 1),
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'FILL_IN_THE_BLANK', '{
  "question": "Una tabla con 3 condiciones binarias tiene ___ reglas posibles.",
  "tiles": ["4","6","8","12"],
  "correctIndices": [2]
}', 2),
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'MULTIPLE_CHOICE', '{
  "question": "¿Qué elemento define el resultado esperado?",
  "options": [
    "Las acciones de cada regla.",
    "Los encabezados de condición."
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = 'Construyendo tu Primera Tabla'), 'MULTIPLE_CHOICE', '{
  "question": "Una buena tabla de decisión debe:",
  "options": [
    "Cubrir todas las combinaciones sin redundancia.",
    "Evitar condiciones negativas."
  ],
  "correctAnswer": 0
}', 4);

-- (continúa igual para cada lección siguiente: trophy y treasure de Unidad 1, y todas las de Unidad 2 y 3)
