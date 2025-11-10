-- ============================================================================
-- Migration: V8__Seed_Module_C_Statement_Testing.sql
-- Description: Inserta el contenido del Módulo C (Pruebas de Sentencia)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO C
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleC', 'Pruebas de Sentencia',
'Técnica de caja blanca enfocada en la medición de cobertura de código mediante ejecución de sentencias, decisiones y caminos.',
'{
  "icon": "📄",
  "color": "purple",
  "backgroundColor": "bg-purple-500",
  "borderColor": "border-purple-700",
  "textColor": "text-white"
}');

-- 2. CREAR UNIDADES (3)
INSERT INTO units (module_id, unit_number, description) VALUES
((SELECT id FROM modules WHERE code = 'moduleC'), 1, 'Introducción y Cobertura de Sentencia'),
((SELECT id FROM modules WHERE code = 'moduleC'), 2, 'Cobertura de Decisión y Condición'),
((SELECT id FROM modules WHERE code = 'moduleC'), 3, 'Cobertura de Camino y Buenas Prácticas');

-- ============================================================================
-- 3. CREAR LECCIONES (4 por unidad: book, star, trophy, treasure)
-- ============================================================================

-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'book', '¿Qué es la Cobertura de Sentencia?', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'star', 'Ejecutando Cobertura de Sentencia', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'trophy', 'Evaluación: Cobertura de Sentencia', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'book', 'Cobertura de Decisión y Condición', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'star', 'Analizando Condiciones Compuestas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'trophy', 'Evaluación: Cobertura de Decisión y Condición', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'book', 'Cobertura de Camino y Complejidad', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'star', 'Ejemplo Práctico: Análisis de Caminos', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'trophy', 'Evaluación: Cobertura Completa de Código', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS (4 por lección)
-- ============================================================================

-- ========== UNIT 1 ==========

-- BOOK
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'INFO', '{
  "title": "Introducción a la Cobertura de Sentencia",
  "content": "La cobertura de sentencia mide el porcentaje de líneas de código ejecutadas al menos una vez. Es una métrica esencial en las pruebas de caja blanca.",
  "example": "Si un programa tiene 100 líneas y 80 se ejecutan, la cobertura es 80%."
}', 1),
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'FILL_IN_THE_BLANK', '{
  "question": "La cobertura de sentencia evalúa qué porcentaje de ___ de código se ejecutan al menos una vez.",
  "tiles": ["decisiones", "líneas", "casos de prueba", "funciones"],
  "correctIndices": [1]
}', 2),
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'MULTIPLE_CHOICE', '{
  "question": "¿Qué busca asegurar la cobertura de sentencia?",
  "options": [
    "Que cada línea de código se ejecute al menos una vez.",
    "Que todas las condiciones sean verdaderas.",
    "Que no existan errores de compilación."
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'MULTIPLE_CHOICE', '{
  "question": "¿Puede un programa con 100% de cobertura de sentencia seguir teniendo errores?",
  "options": [
    "Sí, porque no garantiza que la lógica sea correcta.",
    "No, porque 100% de cobertura significa software perfecto."
  ],
  "correctAnswer": 0
}', 4);

-- STAR
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'INFO', '{
  "title": "Ejecutando Cobertura de Sentencia",
  "content": "Para calcular cobertura: Cobertura = (Sentencias ejecutadas / Sentencias totales) * 100."
}', 1),
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'FILL_IN_THE_BLANK', '{
  "question": "Si un programa tiene 200 líneas y se ejecutan 150, la cobertura de sentencia es ___%.",
  "tiles": ["50", "75", "100", "150"],
  "correctIndices": [1]
}', 2),
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'MULTIPLE_CHOICE', '{
  "question": "¿Qué herramienta suele medirse para obtener cobertura de sentencia?",
  "options": [
    "JUnit",
    "Jacoco o Istanbul",
    "Postman"
  ],
  "correctAnswer": 1
}', 3),
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'MULTIPLE_CHOICE', '{
  "question": "¿Qué representa una cobertura del 60%?",
  "options": [
    "Que el 60% del código fue ejecutado al menos una vez.",
    "Que el sistema tiene 60% menos errores."
  ],
  "correctAnswer": 0
}', 4);

-- (continúa igual para cada lección siguiente de UNIT 1, UNIT 2 y UNIT 3)
