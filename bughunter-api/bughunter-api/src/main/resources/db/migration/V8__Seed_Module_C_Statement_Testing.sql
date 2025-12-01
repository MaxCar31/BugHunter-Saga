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

-- ============================================================================
-- 2. CREAR UNIDADES (3)
-- ============================================================================
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
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'dumbbell', 'Ejecutando Cobertura de Sentencia', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'trophy', 'Evaluación: Cobertura de Sentencia', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'book', 'Cobertura de Decisión y Condición', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'dumbbell', 'Analizando Condiciones Compuestas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'trophy', 'Evaluación: Cobertura de Decisión y Condición', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'book', 'Cobertura de Camino y Complejidad', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'dumbbell', 'Ejemplo Práctico: Análisis de Caminos', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'trophy', 'Evaluación: Cobertura Completa de Código', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS (4 por lección)
-- ============================================================================

-- ========== UNIT 1 ==========
-- BOOK
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C",
  "introduction": "La cobertura de sentencia mide el porcentaje de líneas de código ejecutadas al menos una vez.",
  "objectives": ["Comprender el concepto de cobertura de sentencia", "Calcular cobertura básica mediante ejemplos"]
}', 1),
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "La cobertura de sentencia evalúa qué porcentaje de ___ de código se ejecutan al menos una vez.",
  "answerTiles": ["decisiones", "líneas", "casos de prueba", "funciones"],
  "correctAnswerIndices": [1]
}', 2),
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué busca asegurar la cobertura de sentencia?",
  "answers": [
    {"name": "Que cada línea de código se ejecute al menos una vez."},
    {"name": "Que todas las condiciones sean verdaderas."},
    {"name": "Que no existan errores de compilación."}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE description = '¿Qué es la Cobertura de Sentencia?'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Puede un programa con 100% de cobertura de sentencia seguir teniendo errores?",
  "answers": [
    {"name": "Sí, porque no garantiza que la lógica sea correcta."},
    {"name": "No, porque 100% de cobertura significa software perfecto."}
  ],
  "correctAnswer": 0
}', 4);

-- STAR
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C",
  "introduction": "Aprende a calcular cobertura de sentencia mediante ejemplos y herramientas prácticas.",
  "objectives": ["Aplicar la fórmula de cobertura de sentencia", "Interpretar resultados de ejecución"]
}', 1),
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Si un programa tiene 200 líneas y se ejecutan 150, la cobertura de sentencia es ___%.",
  "answerTiles": ["50", "75", "100", "150"],
  "correctAnswerIndices": [1]
}', 2),
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué herramienta se utiliza para medir la cobertura de sentencia?",
  "answers": [
    {"name": "JUnit"},
    {"name": "JaCoCo o Istanbul"},
    {"name": "Postman"}
  ],
  "correctAnswer": 1
}', 3),
((SELECT id FROM lessons WHERE description = 'Ejecutando Cobertura de Sentencia'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué representa una cobertura del 60%?",
  "answers": [
    {"name": "Que el 60% del código fue ejecutado al menos una vez."},
    {"name": "Que el sistema tiene 60% menos errores."}
  ],
  "correctAnswer": 0
}', 4);

-- (continúa igual estructura para trophy y treasure de cada unidad, siguiendo mismo JSON unificado)
