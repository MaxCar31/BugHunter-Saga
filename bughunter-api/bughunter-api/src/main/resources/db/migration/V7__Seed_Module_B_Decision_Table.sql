-- ============================================================================
-- Migration: V7__Seed_Module_B_Decision_Tables.sql
-- Description: Inserta el contenido teórico y práctico del Módulo B (Tablas de Decisión)
--              con selectores BLINDADOS por módulo y contenido JSON completo.
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO B
INSERT INTO modules (code, name, description, ui_config) VALUES
    ('moduleB', 'Tablas de Decisión',
     'Domina la técnica para validar reglas de negocio complejas y combinaciones lógicas de condiciones.',
     '{
       "icon": "🔲",
       "color": "green",
       "backgroundColor": "bg-green-500",
       "borderColor": "border-green-700",
       "textColor": "text-white"
     }');

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
                                                            ((SELECT id FROM modules WHERE code = 'moduleB'), 1, 'Fundamentos: Estructura y Lógica'),
                                                            ((SELECT id FROM modules WHERE code = 'moduleB'), 2, 'Optimización: Simplificación'),
                                                            ((SELECT id FROM modules WHERE code = 'moduleB'), 3, 'Aplicación Profesional');

-- 3. CREAR LECCIONES
-- Usamos subconsultas enlazadas al moduleB para asegurar la integridad.

-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'book', 'Anatomía de una Tabla de Decisión', 1),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'dumbbell', 'Identificando Condiciones y Acciones', 2),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'trophy', 'Cálculo de Reglas y Combinaciones', 3),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'book', 'Técnicas de Simplificación de Tablas', 1),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'dumbbell', 'Uso del Comodín "-" (Don''t Care)', 2),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'trophy', 'Evaluación: Reduciendo la Complejidad', 3),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'book', 'De Requisitos a Tablas: Casos Reales', 1),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'dumbbell', 'Práctica: Lógica de Negocio Compleja', 2),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'trophy', 'Evaluación Final de Tablas de Decisión', 3),
                                                               ((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleB') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS (SOLUCIÓN DEFINITIVA: JOIN + CONTENIDO COMPLETO)
-- ============================================================================

-- === UNIT 1: FUNDAMENTOS ===

-- BOOK: Anatomía
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Anatomía de una Tabla de Decisión' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "¿Qué es una Tabla de Decisión?",
                                                                "introduction": "Es una técnica de prueba de caja negra utilizada para modelar lógica de negocio compleja. Permite representar combinaciones de entradas (Condiciones) y sus respuestas esperadas (Acciones) en un formato tabular ordenado.",
                                                                "objectives": ["Definir qué es una Tabla de Decisión", "Entender su utilidad en lógica compleja"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Anatomía de una Tabla de Decisión' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
                                                                "type": "FILL_IN_THE_BLANK",
                                                                "question": "Una tabla de decisión relaciona una combinación de ____ con sus respectivas ____.",
                                                                "answerTiles": ["condiciones", "acciones", "errores", "bugs"],
                                                                "correctAnswerIndices": [0, 1]
                                                              }', 2),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Anatomía de una Tabla de Decisión' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "Estructura: Condiciones y Acciones",
                                                                "introduction": "La tabla se divide en cuatro cuadrantes. La parte superior lista las CONDICIONES (entradas). La parte inferior lista las ACCIONES (salidas). Las columnas verticales se llaman REGLAS, y cada una representa un caso de prueba único.",
                                                                "objectives": ["Identificar los cuatro cuadrantes", "Comprender el concepto de Regla"]
                                                              }', 3),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Anatomía de una Tabla de Decisión' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "¿Qué representa una columna vertical en una tabla de decisión?",
                                                                "answers": [{"name": "Una Regla de Negocio (Caso de Prueba)"}, {"name": "Una única condición aislada"}, {"name": "El resultado final del test"}],
                                                                "correctAnswer": 0
                                                              }', 4);

-- DUMBBELL: Identificando
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Identificando Condiciones y Acciones' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "Entradas vs Salidas",
                                                                "introduction": "Para construir una tabla, primero debes leer los requisitos y separar los \"Si...\" (Condiciones) de los \"Entonces...\" (Acciones). Las condiciones suelen ser preguntas con respuesta Verdadero/Falso.",
                                                                "objectives": ["Distinguir condiciones de acciones", "Analizar requisitos textuales"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Identificando Condiciones y Acciones' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "En el requisito: \"Si el usuario es Premium y tiene saldo, aplicar descuento\". ¿Cuál es la Acción?",
                                                                "answers": [{"name": "Usuario es Premium"}, {"name": "Tiene saldo"}, {"name": "Aplicar descuento"}],
                                                                "correctAnswer": 2
                                                              }', 2),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Identificando Condiciones y Acciones' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
                                                                "type": "FILL_IN_THE_BLANK",
                                                                "question": "Las ____ son los inputs o estados, las ____ son las respuestas del sistema.",
                                                                "answerTiles": ["condiciones", "acciones"],
                                                                "correctAnswerIndices": [0, 1]
                                                              }', 3);

-- TROPHY: Cálculo
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Cálculo de Reglas y Combinaciones' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "La fórmula de la cobertura",
                                                                "introduction": "Si tenemos condiciones binarias (Verdadero/Falso), el número total de reglas posibles se calcula como 2 elevado a la N, donde N es el número de condiciones. Por ejemplo, 3 condiciones generan 2^3 = 8 reglas.",
                                                                "objectives": ["Calcular el número de reglas", "Entender la cobertura exhaustiva"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Cálculo de Reglas y Combinaciones' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "Si un sistema tiene 4 condiciones binarias (Si/No), ¿cuántas reglas tendrá la tabla completa?",
                                                                "answers": [{"name": "4"}, {"name": "8"}, {"name": "16 (2^4)"}],
                                                                "correctAnswer": 2
                                                              }', 2),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Cálculo de Reglas y Combinaciones' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
                                                                "type": "FILL_IN_THE_BLANK",
                                                                "question": "Para asegurar cobertura completa, considerar ____ las combinaciones de las ____.",
                                                                "answerTiles": ["todas", "condiciones"],
                                                                "correctAnswerIndices": [0, 1]
                                                              }', 3);

-- TREASURE: Unidad 1
INSERT INTO problems (lesson_id, type, content, position) VALUES
    ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Cofre del Tesoro: Unidad 1' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
      "type": "MULTIPLE_CHOICE",
      "question": "¿Cuál es la principal ventaja de las Tablas de Decisión?",
      "answers": [
        {"name": "Son más rápidas de escribir."},
        {"name": "Aseguran que no se olviden combinaciones lógicas complejas."},
        {"name": "Prueban la interfaz visualmente."}
      ],
      "correctAnswer": 1
    }', 1);

-- === UNIT 2: OPTIMIZACIÓN ===

-- BOOK: Simplificación
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Técnicas de Simplificación de Tablas' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "¿Por qué simplificar?",
                                                                "introduction": "Las tablas completas pueden ser enormes. A menudo, el valor de una condición no afecta el resultado si otras condiciones ya determinan la acción. Simplificar reduce el número de casos de prueba sin reducir la cobertura lógica del negocio.",
                                                                "objectives": ["Entender la necesidad de simplificar", "Identificar redundancias"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Técnicas de Simplificación de Tablas' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
                                                                "type": "FILL_IN_THE_BLANK",
                                                                "question": "Simplificar permite reducir el número de ____ de prueba sin perder ____ de la lógica.",
                                                                "answerTiles": ["casos", "cobertura", "errores"],
                                                                "correctAnswerIndices": [0, 1]
                                                              }', 2);

-- DUMBBELL: Comodín
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Uso del Comodín "-" (Don''t Care)' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "El símbolo Don''t Care (-)",
                                                                "introduction": "Cuando una acción ocurre independientemente del valor de una condición específica (sea V o F), podemos combinar esas reglas y marcar esa condición con un guion (-). Esto significa \"No importa\".",
                                                                "objectives": ["Usar el símbolo -", "Combinar reglas adyacentes"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Uso del Comodín "-" (Don''t Care)' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "Si para A=V y A=F la acción es la misma, ¿cómo se simplifica?",
                                                                "answers": [{"name": "Se eliminan reglas"}, {"name": "Se combinan en una sola columna con ''-''"}],
                                                                "correctAnswer": 1
                                                              }', 2),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Uso del Comodín "-" (Don''t Care)' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
                                                                "type": "FILL_IN_THE_BLANK",
                                                                "question": "El símbolo ''-'' indica que el valor de esa condición es ____.",
                                                                "answerTiles": ["irrelevante", "crítico"],
                                                                "correctAnswerIndices": [0]
                                                              }', 3);

-- TROPHY: Evaluación
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Evaluación: Reduciendo la Complejidad' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "Riesgos de la simplificación",
                                                                "introduction": "Al simplificar, debemos tener cuidado de no ocultar condiciones que podrían ser importantes para casos de borde. Una tabla simplificada es más eficiente, pero debe ser revisada para asegurar integridad.",
                                                                "objectives": ["Simplificar con precaución", "Verificar integridad"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Evaluación: Reduciendo la Complejidad' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "3 condiciones (8 reglas). Simplificamos 4 reglas en 1 usando ''-''. ¿Cuántas quedan en total?",
                                                                "answers": [{"name": "5 (4 originales + 1 nueva)"}, {"name": "8"}, {"name": "1"}],
                                                                "correctAnswer": 0
                                                              }', 2);

-- TREASURE: Unidad 2
INSERT INTO problems (lesson_id, type, content, position) VALUES
    ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Cofre del Tesoro: Unidad 2' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
      "type": "FILL_IN_THE_BLANK",
      "question": "Una tabla ____ contiene menos columnas pero cubre la misma lógica.",
      "answerTiles": ["simplificada", "completa", "errónea"],
      "correctAnswerIndices": [0]
    }', 1);

-- === UNIT 3: APLICACIÓN ===

-- BOOK: Casos Reales
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'De Requisitos a Tablas: Casos Reales' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "Aplicación en Banca y Seguros",
                                                                "introduction": "Las tablas de decisión son estándar en industrias con reglas estrictas. Ejemplo: Un banco aprueba un crédito SI (Ingresos > 1000) Y (Deuda < 500) Y (Historial = Limpio). Si alguna falla, la acción cambia.",
                                                                "objectives": ["Aplicar a escenarios reales", "Traducir reglas de negocio"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'De Requisitos a Tablas: Casos Reales' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "Cajero: Saldo Y Tarjeta Y Pin. ¿Cuántas condiciones hay?",
                                                                "answers": [{"name": "1"}, {"name": "3"}],
                                                                "correctAnswer": 1
                                                              }', 2);

-- DUMBBELL: Lógica Compleja
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Práctica: Lógica de Negocio Compleja' AND m.code = 'moduleB'), 'INFO', '{
                                                                "type": "INFO",
                                                                "moduleTitle": "Reglas Imposibles",
                                                                "introduction": "A veces, matemáticamente existen combinaciones (ej: Edad < 5 y Edad > 18) que son imposibles en la realidad. Estas reglas deben identificarse y descartarse de la tabla de decisión final.",
                                                                "objectives": ["Identificar reglas imposibles", "Limpiar tabla"]
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Práctica: Lógica de Negocio Compleja' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
                                                                "type": "FILL_IN_THE_BLANK",
                                                                "question": "Una combinación de condiciones que no sucede en realidad es una regla ____.",
                                                                "answerTiles": ["imposible", "válida"],
                                                                "correctAnswerIndices": [0]
                                                              }', 2);

-- TROPHY: Evaluación Final
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Evaluación Final de Tablas de Decisión' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "¿Cuándo es mejor crear la tabla?",
                                                                "answers": [{"name": "Durante el diseño (aclarar requisitos)"}, {"name": "Al final del código"}],
                                                                "correctAnswer": 0
                                                              }', 1),
                                                              ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Evaluación Final de Tablas de Decisión' AND m.code = 'moduleB'), 'MULTIPLE_CHOICE', '{
                                                                "type": "MULTIPLE_CHOICE",
                                                                "question": "¿Qué técnica complementa a las tablas para probar valores numéricos?",
                                                                "answers": [{"name": "Valores Límite (BVA)"}, {"name": "Pruebas de Estrés"}],
                                                                "correctAnswer": 0
                                                              }', 2);

-- TREASURE: Unidad 3
INSERT INTO problems (lesson_id, type, content, position) VALUES
    ((SELECT l.id FROM lessons l JOIN units u ON l.unit_id = u.id JOIN modules m ON u.module_id = m.id WHERE l.description = 'Cofre del Tesoro: Unidad 3' AND m.code = 'moduleB'), 'FILL_IN_THE_BLANK', '{
      "type": "FILL_IN_THE_BLANK",
      "question": "Las Tablas de Decisión detectan defectos en la ____ del sistema.",
      "answerTiles": ["lógica", "interfaz"],
      "correctAnswerIndices": [0]
    }', 1);