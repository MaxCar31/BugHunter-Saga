-- ============================================================================
-- Migration: V6__Seed_Module_A_EP_BVA.sql
-- Description: Inserta el contenido del Módulo A (Equivalencia y Valores Límite)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO A
INSERT INTO modules (code, name, description, ui_config) VALUES
    ('mod-a', 'Particion de Equivalencia y Valores Limite',
     'Aprende a dividir el dominio y probar los bordes donde ocurren los errores.',
     '{"backgroundColor": "bg-blue-500", "icon": "🎯", "color": "blue"}');

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
                                                            (1, 1, 'Introducción a la Equivalencia'),
                                                            (1, 2, 'Particiones Válidas e Inválidas'),
                                                            (1, 3, 'Fundamentos de Valores Límite'),
                                                            (1, 4, 'Límites Robustos');

-- 3. CREAR LECCIONES
-- Lecciones EP (Unidades 1, 2)
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               (1, 'book', '¿Qué es la Equivalencia de Particiones?', 1),
                                                               (1, 'star', 'Identifica Clases de Equivalencia', 2),
                                                               (1, 'trophy', 'Revisión de Unidad 1', 3),
                                                               (2, 'book', 'Particiones Válidas vs Inválidas', 1),
                                                               (2, 'star', 'Ejercicio: Validación de Email', 2);
-- Lecciones BVA (Unidades 3, 4)
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               (3, 'book', 'Introducción a Valores Límite', 1),
                                                               (3, 'star', 'Identifica los Límites', 2),
                                                               (4, 'treasure', 'Cofre de Bonus: Límites Robustos', 1);

-- 4. CREAR PROBLEMAS
-- Problemas de Equivalencia (Lecciones 1, 2, 5)
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              (1, 'INFO', '{"title": "Bienvenido a Equivalencia de Particiones", "content": "La Equivalencia de Particiones es una técnica de caja negra...", "image": "/assets/ep-intro.png"}', 1),
                                                              (1, 'INFO', '{"title": "¿Por qué es importante?", "content": "En lugar de probar TODOS los valores posibles (imposible)...", "example": "Para un campo que acepta edades 0-120..."}', 2),
                                                              (2, 'SELECT_1_OF_3', '{"question": "Un sistema acepta códigos promocionales de 5-10 caracteres. ¿Cuántas clases de equivalencia hay?", "options": [{"id": "a", "text": "2 clases..."}, {"id": "b", "text": "3 clases: menor a 5, 5-10, mayor a 10"}, {"id": "c", "text": "6 clases..."}], "correctAnswer": "b", "explanation": "Correcto! Tenemos 3 clases: < 5 chars (inválida), 5-10 chars (válida), > 10 chars (inválida)"}', 1),
                                                              (2, 'SELECT_1_OF_3', '{"question": "¿Cuál NO es un beneficio de la Equivalencia de Particiones?", "options": [{"id": "a", "text": "Reduce el número de casos de prueba"}, {"id": "b", "text": "Garantiza encontrar todos los bugs"}, {"id": "c", "text": "Cubre rangos completos de valores"}], "correctAnswer": "b", "explanation": "Correcto! La EP reduce casos de prueba y cubre rangos, pero NO garantiza encontrar todos los bugs."}', 2),
                                                              (5, 'FILL_IN_THE_BLANK', '{"question": "Para validar un email, identifica las clases de equivalencia. Un email tiene formato: ___@___.___", "blanks": ["usuario", "dominio", "extension"], "correctAnswers": ["texto", "dominio", "com"], "hint": "Piensa en las partes que componen un email válido"}', 1);

-- Problemas de Valores Límite (Lecciones 6, 7, 8)
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              (6, 'INFO', '{"title": "¿Qué son los Valores Límite?", "content": "Los errores suelen ocurrir en los BORDES de las clases de equivalencia...", "image": "/assets/bva-intro.png"}', 1),
                                                              (6, 'INFO', '{"title": "Ejemplo Práctico", "content": "Para un campo de edad válido entre 18-65 años, prueba: 17, 18, 19, 64, 65, 66", "tip": "Regla de oro: min-1, min, min+1, max-1, max, max+1"}', 2),
                                                              (7, 'SELECT_1_OF_3', '{"question": "Un campo acepta enteros válidos de 10 a 50. ¿Cuál set de pruebas usa BVA de 3 puntos?", "options": [{"id": "a", "text": "10, 30, 50"}, {"id": "b", "text": "9, 10, 11, 49, 50, 51"}, {"id": "c", "text": "9, 51"}], "correctAnswer": "b", "explanation": "BVA de 3 puntos prueba min-1, min, min+1, max-1, max, y max+1."}', 1),
                                                              (7, 'FILL_IN_THE_BLANK', '{"question": "BVA se enfoca en los ___ de las particiones de equivalencia, donde es más probable encontrar errores.", "blanks": ["respuesta"], "correctAnswers": ["bordes"], "hint": "También se les llama ''límites'' o ''fronteras''."}', 2),
                                                              (8, 'INFO', '{"title": "¿Qué es BVA Robusto?", "content": "El BVA ''robusto'' es una expansión del BVA normal... considera valores ''muy'' inválidos.", "example": "Para el rango [10, 50], un BVA robusto podría incluir 9, 10, 11... y también -100 y 1000."}', 1),
                                                              (8, 'MATCH_PAIRS', '{"title": "Empareja el Valor con el Término BVA", "prompt": "Para un descuento válido en compras de $25 a $100:", "pairs": [{"id": "p1", "prompt": "Valor: $24"}, {"id": "p2", "prompt": "Valor: $25"}, {"id": "p3", "prompt": "Valor: $99"}, {"id": "p4", "prompt": "Valor: $101"}], "answers": [{"id": "a1", "text": "Límite Mínimo (min)"}, {"id": "a2", "text": "Justo Debajo del Mínimo (min-1)"}, {"id": "a3", "text": "Justo Encima del Máximo (max+1)"}, {"id": "a4", "text": "Justo Debajo del Máximo (max-1)"}], "correctMapping": {"p1": "a2", "p2": "a1", "p3": "a4", "p4": "a3"}}', 2),
                                                              (8, 'SELECT_1_OF_3', '{"question": "Un campo de texto debe tener una longitud de 5 a 10 caracteres. ¿Cuál NO es un valor límite a probar?", "options": [{"id": "a", "text": "Una cadena de 4 caracteres"}, {"id": "b", "text": "Una cadena de 11 caracteres"}, {"id": "c", "text": "Una cadena de 7 caracteres"}], "correctAnswer": "c", "explanation": "7 caracteres es un valor ''en medio'' de la partición válida. No es un límite."}', 3);