-- ============================================================================
-- Migration: V8__Seed_Module_C_Statement_Testing.sql
-- Description: Inserta el contenido del Módulo C (Pruebas de Sentencia)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO C
INSERT INTO modules (code, name, description, ui_config) VALUES
    ('moduleC', 'Pruebas de Sentencia',
     'Técnica de caja blanca para cobertura de código.',
     '{"backgroundColor": "bg-purple-500", "icon": "📄", "color": "purple"}');

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
    (3, 1, 'Introducción a Cobertura de Sentencia');

-- 3. CREAR LECCIONES (IDs 12, 13, 14)
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               (6, 'book', '¿Qué es la Cobertura de Sentencia?', 1),
                                                               (6, 'star', 'Calculando Cobertura', 2),
                                                               (6, 'star', 'Desafío de Código', 3);

-- 4. CREAR PROBLEMAS
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              (12, 'INFO', '{"title": "Pruebas de Sentencia", "content": "Es una técnica de prueba de CAJA BLANCA que mide el porcentaje de líneas de código...", "image": "/assets/white-box.png"}', 1),
                                                              (13, 'SELECT_1_OF_3', '{"question": "Un programa tiene 100 líneas ejecutables. Un set de pruebas ejecuta 75. ¿Cuál es la cobertura de sentencia?", "options": [{"id": "a", "text": "75%"}, {"id": "b", "text": "100%"}, {"id": "c", "text": "No se puede saber"}], "correctAnswer": "a", "explanation": "(75 / 100) * 100 = 75%."}', 1),
                                                              (13, 'FILL_IN_THE_BLANK', '{"question": "Lograr 100% de cobertura de sentencia ___ (garantiza/no garantiza) que el software esté libre de bugs.", "blanks": ["respuesta"], "correctAnswers": ["no garantiza"], "hint": "Puedes ejecutar todas las líneas, pero ¿qué pasa si la lógica es incorrecta?"}', 2),
                                                              (14, 'CODE_CHALLENGE', '{"title": "Desafío de Cobertura", "code": "public int calcular(int x, int y) {\n  int r = x;  // S1\n  if (x > 5) {  // S2\n    r = x + y;  // S3\n  }\n  return r;   // S4\n}", "question": "¿Qué caso de prueba (x, y) logra 100% de cobertura de sentencia?", "options": [{"id": "a", "text": "x = 4, y = 10"}, {"id": "b", "text": "x = 6, y = 10"}, {"id": "c", "text": "x = 5, y = 10"}], "correctAnswer": "b", "explanation": "El caso (6, 10) hace que ''x > 5'' sea verdadero, ejecutando la línea S3. Los otros casos se saltan la S3."}', 1),
                                                              (14, 'SELECT_1_OF_3', '{"question": "Usando el mismo código, ¿qué caso de prueba logra la MENOR cobertura de sentencia?", "options": [{"id": "a", "text": "x = 10, y = 2"}, {"id": "b", "text": "x = 2, y = 2"}], "correctAnswer": "b", "explanation": "El caso (2, 2) ejecuta S1, S2 y S4 (3 de 4 sentencias). El caso (10, 2) ejecuta las 4 sentencias."}', 2);