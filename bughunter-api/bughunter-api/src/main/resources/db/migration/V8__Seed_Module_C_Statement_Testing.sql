-- ============================================================================
-- Migration: V8__Seed_Module_C_Statement_Testing.sql
-- Description: Inserta el contenido del Módulo C - Pruebas de Rama (Branch Coverage Testing)
-- Source: index.html - Material de Testing con Clases y Objetivos de Práctica
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO C
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleC', 'Pruebas de Rama',
'Técnica de caja blanca enfocada en cobertura de ramas, clases de equivalencia y decisiones en Java.',
'{
  "icon": "🔀",
  "color": "purple",
  "backgroundColor": "bg-purple-500",
  "borderColor": "border-purple-700",
  "textColor": "text-white"
}');

-- ============================================================================
-- 2. CREAR UNIDADES (3): BÁSICO, INTERMEDIO, AVANZADO
-- ============================================================================
INSERT INTO units (module_id, unit_number, description) VALUES
((SELECT id FROM modules WHERE code = 'moduleC'), 1, 'Nivel Básico: Ramas como Clases de Equivalencia'),
((SELECT id FROM modules WHERE code = 'moduleC'), 2, 'Nivel Intermedio: Múltiples Clases Secuenciales'),
((SELECT id FROM modules WHERE code = 'moduleC'), 3, 'Nivel Avanzado: Clases Anidadas y Complejas');

-- ============================================================================
-- 3. CREAR LECCIONES (4 por unidad: book, dumbbell, dumbbell-práctica, treasure)
-- ============================================================================
-- UNIT 1: BÁSICO
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'book', 'Texto 1 + Preguntas Básicas', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'dumbbell', 'Texto 2 + Preguntas Avanzadas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'dumbbell', 'Práctica de Código - Nivel Básico', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'treasure', 'Quiz de Análisis + Práctica', 4);

-- UNIT 2: INTERMEDIO
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'book', 'Texto 1 + Preguntas Intermedias', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'dumbbell', 'Texto 2 + Preguntas Secuenciales', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'dumbbell', 'Práctica de Código - Nivel Intermedio', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'treasure', 'Quiz de Análisis + Práctica', 4);

-- UNIT 3: AVANZADO
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'book', 'Texto 1 + Preguntas Avanzadas', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'dumbbell', 'Texto 2 + Preguntas Complejas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'dumbbell', 'Práctica de Código - Nivel Avanzado', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'treasure', 'Quiz de Análisis + Práctica Avanzada', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS - UNIDAD 1: NIVEL BÁSICO (7 preguntas)
-- ============================================================================

-- ========== UNIT 1 - BOOK (INFO + 4 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'book'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Básico - Ramas como Clases de Equivalencia",
  "introduction": "Una rama es un camino de ejecución en un programa. Cada decisión (if/else) crea dos ramas. Las Clases de Equivalencia son grupos de entradas que se comportan igual.",
  "objectives": ["Comprender qué es una rama", "Identificar clases válidas e inválidas", "Calcular el número mínimo de pruebas", "Usar valores límite"]
}', 1);

-- PREGUNTA 1 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Observa la función esPositivo(n). ¿Cuál es el número mínimo de casos de prueba necesarios para asegurar el 100% de cobertura de ramas?",
  "answers": [
    {"name": "A. 1"},
    {"name": "B. 2"},
    {"name": "C. 3"},
    {"name": "D. 4"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 2 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Si una función solo tiene una sentencia if sin un else, ¿cuántas ramas existen lógicamente?",
  "answers": [
    {"name": "A. 1"},
    {"name": "B. 2"},
    {"name": "C. Depende del contenido del if"},
    {"name": "D. Depende del código dentro del if"}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 3 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de los siguientes términos describe el objetivo de que cada resultado posible de una decisión haya sido ejecutado por al menos un caso de prueba?",
  "answers": [
    {"name": "A. Cobertura de Tipos"},
    {"name": "B. Cobertura de Condiciones"},
    {"name": "C. Cobertura de Ramas"},
    {"name": "D. Cobertura de Datos"}
  ],
  "correctAnswer": 2
}', 4);

-- PREGUNTA 4 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "La función checkEdad(edad) verifica si la edad es >= 18. Para cubrir la rama Clase Válida, ¿qué valor es el más crítico para probar?",
  "answers": [
    {"name": "A. 19"},
    {"name": "B. 18"},
    {"name": "C. 17"},
    {"name": "D. 1"}
  ],
  "correctAnswer": 1
}', 5);

-- ========== UNIT 1 - DUMBBELL (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Básico - Clases Límite y Cobertura Total",
  "introduction": "Los valores límite son los casos más críticos para probar. Cada rama debe ser ejecutada por al menos una prueba para lograr el 100% de cobertura.",
  "objectives": ["Identificar valores límite", "Aplicar teoría de clases al código real", "Diseñar casos de prueba mínimos", "Validar cobertura de ramas"]
}', 1);

-- PREGUNTA 5 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En la función esPositivo(n), si se ejecuta la prueba esPositivo(0), ¿qué clase de entrada se está cubriendo?",
  "answers": [
    {"name": "A. Una clase que no existe"},
    {"name": "B. Clase Inválida (Falso)"},
    {"name": "C. Clase Válida (Verdadero)"},
    {"name": "D. Una clase no cubierta"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 6 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Para probar la función checkEdad(edad) al 100%, la combinación mínima de entradas debe ser:",
  "answers": [
    {"name": "A. Solo 18"},
    {"name": "B. 18 y 20"},
    {"name": "C. 18 y 17"},
    {"name": "D. Solo 17"}
  ],
  "correctAnswer": 2
}', 3);

-- PREGUNTA 7 - Básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En la función verificarAcceso(esAdmin), que retorna Acceso Total si esAdmin es true. ¿Qué entrada es necesaria y suficiente para cubrir la Clase Inválida?",
  "answers": [
    {"name": "A. verificarAcceso(false)"},
    {"name": "B. verificarAcceso(true)"},
    {"name": "C. verificarAcceso(null)"},
    {"name": "D. verificarAcceso(undefined)"}
  ],
  "correctAnswer": 0
}', 4);

-- ========== UNIT 1 - TREASURE (INFO + 2 bonus) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'treasure'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Básico - Quiz de Análisis de Código",
  "introduction": "Ahora analizaremos código real. Tu objetivo es predecir qué rama se ejecuta con cada entrada.",
  "objectives": ["Analizar flujo de código", "Predecir resultados", "Identificar casos límite", "Comprender falsy/truthy"]
}', 1);

-- PREGUNTA 8 - Quiz Análisis Básico 1
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Para alcanzar la Clase Válida (Positivo), ¿cuál es el valor más eficiente?<br><br><code>function esPositivo(n) { if (n > 0) return \"Positivo\"; else return \"No Positivo\"; }</code>",
  "answers": [
    {"name": "A. esPositivo(100)"},
    {"name": "B. esPositivo(1)"},
    {"name": "C. esPositivo(0)"},
    {"name": "D. esPositivo(-1)"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 9 - Quiz Análisis Básico 2
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Si la entrada es checkEdad(17), ¿qué rama se ejecuta?<br><br><code>function checkEdad(edad) { if (edad >= 18) return \"Mayor\"; else return \"Menor\"; }</code>",
  "answers": [
    {"name": "A. Clase Válida (Mayor de edad)"},
    {"name": "B. Clase Inválida (Menor de edad)"},
    {"name": "C. Ambas ramas"},
    {"name": "D. Ninguna, hay un error"}
  ],
  "correctAnswer": 1
}', 3);

-- ============================================================================
-- 5. CREAR PROBLEMAS - UNIDAD 2: NIVEL INTERMEDIO (7 preguntas)
-- ============================================================================

-- ========== UNIT 2 - BOOK (INFO + 4 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'book'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Intermedio - Múltiples Clases Secuenciales",
  "introduction": "Las estructuras if/else if/else definen múltiples Clases Válidas. Solo una puede ejecutarse. Para el 100% de cobertura, necesitas un caso para cada bloque.",
  "objectives": ["Cubrir cada clase secuencial", "Diseñar pruebas de frontera", "Satisfacer lógica compleja", "Aplicar operadores booleanos"]
}', 1);

-- PREGUNTA 11 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "La función obtenerTrimestre(mes) tiene cuatro posibles resultados (1, 2, 3, o 4). ¿Cuántas clases válidas necesita activar para alcanzar el 100% de cobertura?",
  "answers": [
    {"name": "A. 3"},
    {"name": "B. 4"},
    {"name": "C. 7"},
    {"name": "D. 8"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 12 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En un código con if/else if/else, si una prueba cubre el primer if, ¿el resto se consideran cubiertos?",
  "answers": [
    {"name": "A. Sí, todos se cubren"},
    {"name": "B. No, se necesita una prueba para cada rama"},
    {"name": "C. Solo si hay break"},
    {"name": "D. Depende de si hay un return"}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 13 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "La función procesarEntrada(input) genera 3 posibles salidas. ¿Cuál es el número mínimo de casos de prueba para el 100% de cobertura?",
  "answers": [
    {"name": "A. 1"},
    {"name": "B. 2"},
    {"name": "C. 3"},
    {"name": "D. 4"}
  ],
  "correctAnswer": 2
}', 4);

-- PREGUNTA 14 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es un riesgo principal de no alcanzar el 100% de cobertura de ramas?",
  "answers": [
    {"name": "A. La compilación falla"},
    {"name": "B. Se ejecuta más lentamente"},
    {"name": "C. Una rama no cubierta puede contener bugs"},
    {"name": "D. El código será más lento"}
  ],
  "correctAnswer": 2
}', 5);

-- ========== UNIT 2 - DUMBBELL (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Intermedio - Clases con Operadores Lógicos",
  "introduction": "Los operadores && y || crean expresiones booleanas complejas. Necesitas desglosar las subcondiciones para lograr cobertura total.",
  "objectives": ["Evaluar precedencia de operadores", "Identificar caminos secuenciales", "Anticipar el flujo de ejecución", "Manejar cláusulas de guardia"]
}', 1);

-- PREGUNTA 15 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué entradas son la combinación mínima de valores límite para cubrir (1, 4, 7)?<br><br><code>if (mes >= 1 && mes <= 3) return 1; else if (mes >= 4 && mes <= 6) return 2; else return 4;</code>",
  "answers": [
    {"name": "A. (1, 4, 13)"},
    {"name": "B. (3, 6, 7)"},
    {"name": "C. (1, 4, 10)"},
    {"name": "D. (3, 5, 9)"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 16 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Si se prueba puedeAplicar(2, 25), ¿qué clase se ejecuta?<br><br><code>if (experiencia >= 2 && edad > 25) return true; return false;</code>",
  "answers": [
    {"name": "A. Clase Válida (True)"},
    {"name": "B. Clase Inválida (False)"},
    {"name": "C. Error de parámetro"},
    {"name": "D. Retorna undefined"}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 17 - Intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el propósito de la primera rama en este código?<br><br><code>if (typeof input !== \"string\") return \"Tipo incorrecto\";</code>",
  "answers": [
    {"name": "A. Es la clase válida principal"},
    {"name": "B. Es una clase inválida de tipo (Guard Clause)"},
    {"name": "C. Se ejecuta solo si la cadena está vacía"},
    {"name": "D. Es un bug en la función"}
  ],
  "correctAnswer": 1
}', 4);

-- ========== UNIT 2 - TREASURE (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'treasure'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Intermedio - Quiz de Análisis Intermedio",
  "introduction": "Analiza código con múltiples clases secuenciales y operadores lógicos complejos.",
  "objectives": ["Predecir la clase de salida", "Evaluar lógica AND/OR", "Analizar caminos secuenciales"]
}', 1);

-- PREGUNTA 18 - Quiz Análisis Intermedio 1
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime con mes=5?<br><br><code>function obtenerTrimestre(mes) { if (mes >= 1 && mes <= 3) return 1; else if (mes >= 4 && mes <= 6) return 2; else return 4; }</code>",
  "answers": [
    {"name": "A. 1"},
    {"name": "B. 2"},
    {"name": "C. 4"},
    {"name": "D. Error"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 19 - Quiz Análisis Intermedio 2
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime con x=4, y=2, z=8?<br><br><code>if (x>y && y<z && x<z) System.out.println(\"Correcto\"); else System.out.println(\"Incorrecto\");</code>",
  "answers": [
    {"name": "A. Correcto"},
    {"name": "B. Incorrecto"},
    {"name": "C. Error"},
    {"name": "D. Nada"}
  ],
  "correctAnswer": 0
}', 3);

-- PREGUNTA 20 - Quiz Análisis Intermedio 3
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es un ejemplo de prueba de rama?",
  "answers": [
    {"name": "A. Verificar si un ciclo termina"},
    {"name": "B. Probar cada posible camino de decisiones"},
    {"name": "C. Medir el tiempo del código"},
    {"name": "D. Revisar comentarios"}
  ],
  "correctAnswer": 1
}', 4);

-- ============================================================================
-- 6. CREAR PROBLEMAS - UNIDAD 3: NIVEL AVANZADO (7 preguntas)
-- ============================================================================

-- ========== UNIT 3 - BOOK (INFO + 4 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'book'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Avanzado - Clases Anidadas y Subclases",
  "introduction": "Los if anidados crean subclases que solo se alcanzan si se cumplen las condiciones superiores. La complejidad aumenta exponencialmente. Cada combinación de True/False necesita una prueba.",
  "objectives": ["Cubrir subclases anidadas", "Validar guard clauses", "Controlar flujo de bucles", "Resolver casos de excepción"]
}', 1);

-- PREGUNTA 21 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si a=5, b=5, c=10?<br><br><code>if (a==b || b==c && a<c) System.out.println(\"OK\");</code>",
  "answers": [
    {"name": "A. OK"},
    {"name": "B. NO"},
    {"name": "C. Error"},
    {"name": "D. Nada"}
  ],
  "correctAnswer": 0
}', 2);

-- PREGUNTA 22 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué evalúa primero Java en: a == b || b < c && c > a?",
  "answers": [
    {"name": "A. ||"},
    {"name": "B. &&"},
    {"name": "C. =="},
    {"name": "D. Ninguno"}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 23 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si x=3, y=9?<br><br><code>if (x<5) if (y>10) System.out.println(\"A\"); else System.out.println(\"B\"); else System.out.println(\"C\");</code>",
  "answers": [
    {"name": "A. A"},
    {"name": "B. B"},
    {"name": "C. C"},
    {"name": "D. Nada"}
  ],
  "correctAnswer": 1
}', 4);

-- PREGUNTA 24 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'book'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si x=0?<br><br><code>if (x >= 0) if (x == 0) System.out.println(\"Cero\"); else System.out.println(\"Positivo\"); else System.out.println(\"Negativo\");</code>",
  "answers": [
    {"name": "A. Cero"},
    {"name": "B. Positivo"},
    {"name": "C. Negativo"},
    {"name": "D. Error"}
  ],
  "correctAnswer": 0
}', 5);

-- ========== UNIT 3 - DUMBBELL (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Avanzado - Análisis de Ramas Complejas",
  "introduction": "Resuelve los problemas más desafiantes con negación lógica, equivalencias booleanas y anidamientos profundos.",
  "objectives": ["Analizar negación lógica", "Aplicar equivalencias lógicas", "Resolver casos anidados complejos"]
}', 1);

-- PREGUNTA 25 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál condición verifica que un número esté FUERA del rango [1,100]?",
  "answers": [
    {"name": "A. x>1 && x<100"},
    {"name": "B. x<1 || x>100"},
    {"name": "C. x==50"},
    {"name": "D. !(x<100)"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 26 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si a=4, b=2, c=8?<br><br><code>if (a>b && b<c && a<c) System.out.println(\"Correcto\"); else System.out.println(\"Incorrecto\");</code>",
  "answers": [
    {"name": "A. Correcto"},
    {"name": "B. Incorrecto"},
    {"name": "C. Error"},
    {"name": "D. Nada"}
  ],
  "correctAnswer": 0
}', 3);

-- PREGUNTA 27 - Avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es equivalente a !(x > 5)?",
  "answers": [
    {"name": "A. x >= 5"},
    {"name": "B. x < 5"},
    {"name": "C. x <= 5"},
    {"name": "D. x == 5"}
  ],
  "correctAnswer": 2
}', 4);

-- ========== UNIT 3 - TREASURE (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'treasure'), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Nivel Avanzado - Quiz de Análisis Extremo",
  "introduction": "El desafío final: analiza código con anidamientos profundos, guard clauses y operadores lógicos complejos.",
  "objectives": ["Predecir resultado con lógica compleja", "Evaluar anidamientos profundos", "Aplicar todos los conceptos"]
}', 1);

-- PREGUNTA 28 - Quiz Análisis Avanzado 1
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si x=12?<br><br><code>if (x%3==0 && x%4==0) System.out.println(\"Múltiplo\"); else System.out.println(\"No\");</code>",
  "answers": [
    {"name": "A. No múltiplo"},
    {"name": "B. Múltiplo de ambos"},
    {"name": "C. Error"},
    {"name": "D. Nada"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 29 - Quiz Análisis Avanzado 2
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Si user es { perfil: { activo: false } }, ¿qué retorna?<br><br><code>if (user && user.perfil && user.perfil.activo === true) return \"Activo\"; if (user && user.perfil) return \"Inactivo\"; return \"Inválido\";</code>",
  "answers": [
    {"name": "A. Activo"},
    {"name": "B. Inactivo"},
    {"name": "C. Inválido"},
    {"name": "D. Null"}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 30 - Quiz Análisis Avanzado 3
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND type = 'treasure'), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si a=2, b=4, c=6?<br><br><code>if (a<b) if (b<c) System.out.println(\"Cadena\"); else System.out.println(\"Problema\"); else System.out.println(\"Fuera\");</code>",
  "answers": [
    {"name": "A. Cadena correcta"},
    {"name": "B. Problema"},
    {"name": "C. Fuera"},
    {"name": "D. Nada"}
  ],
  "correctAnswer": 0
}', 4);

-- ============================================================================
-- 7. EJERCICIOS PRÁCTICOS DE CÓDIGO - NIVEL BÁSICO
-- ============================================================================

-- INFO para lección de práctica nivel básico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Práctica de Código - Nivel Básico",
  "introduction": "¡Es hora de poner en práctica lo aprendido! Escribe código de prueba que cubra todas las ramas de las funciones. La consola simulada te mostrará los resultados de tus pruebas.",
  "objectives": ["Escribir llamadas a funciones de prueba", "Cubrir ramas válidas e inválidas", "Usar valores límite para maximizar cobertura"]
}', 1);

-- EJERCICIO BÁSICO 1: esPositivo(n)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para la función esPositivo(n) que cubra el 100% de ramas (Clase Válida e Inválida).",
  "codeTemplate": "// Tu código de prueba aquí\n// Llama a esPositivo(n) con valores que cubran:\n// - Clase Válida: n > 0\n// - Clase Inválida: n <= 0\n___BLANK___",
  "expectedAnswer": "esPositivo(1); esPositivo(0);",
  "hint": "Necesitas dos llamadas: una para probar la rama Verdadero (n > 0) y otra para la rama Falso (n <= 0). Usa valores límite como 1 y 0.",
  "explanation": "Para lograr 100% de cobertura de ramas, debes ejecutar ambos caminos: if (n > 0) y else. El valor 1 satisface n > 0, mientras que 0 no la satisface.",
  "testCases": [
    {
      "input": "esPositivo(1)",
      "expectedOutput": "Positivo",
      "description": "Clase Válida: n > 0"
    },
    {
      "input": "esPositivo(0)",
      "expectedOutput": "No Positivo",
      "description": "Clase Inválida: n ≤ 0"
    }
  ]
}', 2);

-- EJERCICIO BÁSICO 2: verificarAcceso(esAdmin)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para verificarAcceso(esAdmin) cubriendo todas las ramas.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llama a verificarAcceso(esAdmin) con valores que cubran:\n// - Clase Válida: esAdmin = true\n// - Clase Inválida: esAdmin = false\n___BLANK___",
  "expectedAnswer": "verificarAcceso(true); verificarAcceso(false);",
  "hint": "Esta función es booleana. Necesitas una prueba con true (rama if) y otra con false (rama else).",
  "explanation": "Los booleanos tienen dos clases: Verdadero y Falso. Cada una representa una rama diferente del código.",
  "testCases": [
    {
      "input": "verificarAcceso(true)",
      "expectedOutput": "Acceso Total",
      "description": "Clase Válida: esAdmin = true"
    },
    {
      "input": "verificarAcceso(false)",
      "expectedOutput": "Acceso Limitado",
      "description": "Clase Inválida: esAdmin = false"
    }
  ]
}', 3);

-- EJERCICIO BÁSICO 3: checkEdad(edad)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para checkEdad(edad) usando valores límite.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llama a checkEdad(edad) con valores límite que cubran:\n// - Clase Válida: edad >= 18\n// - Clase Inválida: edad < 18\n___BLANK___",
  "expectedAnswer": "checkEdad(18); checkEdad(17);",
  "hint": "Los valores límite son 17 y 18. El 18 es el primero que cumple la condición >= 18, y el 17 es el último que no la cumple.",
  "explanation": "Los valores límite son críticos para encontrar bugs en condiciones de desigualdad. Aquí, 18 es el punto de transición entre las clases.",
  "testCases": [
    {
      "input": "checkEdad(18)",
      "expectedOutput": "Mayor de edad",
      "description": "Valor límite - Primera Clase Válida (edad >= 18)"
    },
    {
      "input": "checkEdad(17)",
      "expectedOutput": "Menor de edad",
      "description": "Valor límite - Última Clase Inválida (edad < 18)"
    }
  ]
}', 4);

-- ============================================================================
-- 8. EJERCICIOS PRÁCTICOS DE CÓDIGO - NIVEL INTERMEDIO
-- ============================================================================

-- INFO para lección de práctica nivel intermedio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Práctica de Código - Nivel Intermedio",
  "introduction": "Ahora trabajarás con funciones más complejas que tienen múltiples ramas secuenciales, operadores AND/OR y guard clauses. ¡Demuestra tu dominio de cobertura de ramas!",
  "objectives": ["Cubrir múltiples ramas if/else if/else", "Manejar operadores lógicos AND/OR", "Probar guard clauses defensivas"]
}', 1);

-- EJERCICIO INTERMEDIO 1: obtenerTrimestre(mes)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para obtenerTrimestre(mes) cubriendo los 4 trimestres.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llama a obtenerTrimestre(mes) con valores que cubran:\n// - Trimestre 1: 1-3\n// - Trimestre 2: 4-6\n// - Trimestre 3: 7-9\n// - Trimestre 4: 10-12 (otros)\n___BLANK___",
  "expectedAnswer": "obtenerTrimestre(3); obtenerTrimestre(6); obtenerTrimestre(9); obtenerTrimestre(12);",
  "hint": "Necesitas 4 llamadas: una por cada rama del if/else if/else if/else. Usa los valores límite finales de cada rango (3, 6, 9, 12).",
  "explanation": "Cada estructura if/else if/else crea clases secuenciales. Para cobertura al 100%, necesitas activar cada bloque con al menos una prueba.",
  "testCases": [
    {
      "input": "obtenerTrimestre(3)",
      "expectedOutput": "1",
      "description": "Trimestre 1 (enero-marzo)"
    },
    {
      "input": "obtenerTrimestre(6)",
      "expectedOutput": "2",
      "description": "Trimestre 2 (abril-junio)"
    },
    {
      "input": "obtenerTrimestre(9)",
      "expectedOutput": "3",
      "description": "Trimestre 3 (julio-septiembre)"
    },
    {
      "input": "obtenerTrimestre(12)",
      "expectedOutput": "4",
      "description": "Trimestre 4 (octubre-diciembre)"
    }
  ]
}', 2);

-- EJERCICIO INTERMEDIO 2: puedeAplicar(experiencia, edad, titulo)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para puedeAplicar() con operadores lógicos AND/OR.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a puedeAplicar(exp, edad, titulo) que cubran:\n// - Clase Válida: experiencia >= 2 AND (edad > 25 OR titulo = \"Master\")\n// - Clase Inválida: cualquier otra combinación\n___BLANK___",
  "expectedAnswer": "puedeAplicar(3, 30, \"Licencia\"); puedeAplicar(3, 20, \"Master\"); puedeAplicar(2, 24, \"Licencia\");",
  "hint": "Necesitas 3 pruebas: 1) Ambas subcondiciones verdaderas, 2) Segunda subcondición OR verdadera, 3) Alguna condición falsa.",
  "explanation": "Con AND/OR, debes probar que la expresión complete sea true y false. El OR significa que cualquiera de sus opciones hace que sea verdadera.",
  "testCases": [
    {
      "input": "puedeAplicar(3, 30, \"Licencia\")",
      "expectedOutput": "true",
      "description": "Exp >= 2 Y edad > 25 (primer OR verdadero)"
    },
    {
      "input": "puedeAplicar(3, 20, \"Master\")",
      "expectedOutput": "true",
      "description": "Exp >= 2 Y titulo = Master (segundo OR verdadero)"
    },
    {
      "input": "puedeAplicar(2, 24, \"Licencia\")",
      "expectedOutput": "false",
      "description": "Exp >= 2 PERO edad < 25 Y titulo ≠ Master (ambos OR falsos)"
    }
  ]
}', 3);

-- EJERCICIO INTERMEDIO 3: procesarEntrada(input)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para procesarEntrada() cubriendo guard clauses.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a procesarEntrada(input) que cubran:\n// - Clase Inválida 1: tipo no string\n// - Clase Inválida 2: string vacío\n// - Clase Válida: string con contenido\n___BLANK___",
  "expectedAnswer": "procesarEntrada(123); procesarEntrada(\"\"); procesarEntrada(\"Hola\");",
  "hint": "Las guard clauses (chequeos rápidos) manejan clases inválidas primero. Necesitas 3 pruebas para las 3 ramas.",
  "explanation": "Las funciones con guard clauses manejan excepciones al inicio. Esto es una buena práctica defensiva.",
  "testCases": [
    {
      "input": "procesarEntrada(123)",
      "expectedOutput": "Tipo de dato incorrecto",
      "description": "Guard Clause 1: typeof input !== ''string''"
    },
    {
      "input": "procesarEntrada(\"\")",
      "expectedOutput": "Cadena vacía",
      "description": "Guard Clause 2: input === \"\""
    },
    {
      "input": "procesarEntrada(\"Hola\")",
      "expectedOutput": "Cadena procesada",
      "description": "Clase Válida: string con contenido"
    }
  ]
}', 4);

-- EJERCICIO INTERMEDIO 4: clasificarNota(nota)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para clasificarNota() con switch/case.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a clasificarNota(nota) que cubran todos los cases:\n// - case 10: \"Excelente\"\n// - cases 9,8: \"Notable\"\n// - case 7: \"Aprobado\"\n// - default: \"Insuficiente o Inválida\"\n___BLANK___",
  "expectedAnswer": "clasificarNota(10); clasificarNota(8); clasificarNota(7); clasificarNota(5);",
  "hint": "Cada case es una rama. Necesitas probar cada rama: 10, 9 o 8, 7, y un default (como 5).",
  "explanation": "Los switch con múltiples cases crean tantas ramas como opciones. El default maneja todos los valores no cubiertos.",
  "testCases": [
    {
      "input": "clasificarNota(10)",
      "expectedOutput": "Excelente",
      "description": "Case 10"
    },
    {
      "input": "clasificarNota(8)",
      "expectedOutput": "Notable",
      "description": "Case 9/8 (sin break, fall-through)"
    },
    {
      "input": "clasificarNota(7)",
      "expectedOutput": "Aprobado",
      "description": "Case 7"
    },
    {
      "input": "clasificarNota(5)",
      "expectedOutput": "Insuficiente o Inválida",
      "description": "Default (ningún case coincide)"
    }
  ]
}', 5);

-- ============================================================================
-- 9. EJERCICIOS PRÁCTICOS DE CÓDIGO - NIVEL AVANZADO
-- ============================================================================

-- INFO para lección de práctica nivel avanzado
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Práctica de Código - Nivel Avanzado",
  "introduction": "El desafío final: funciones con objetos anidados, múltiples condiciones complejas, guard clauses con OR y ciclos. ¡Demuestra que eres un experto en cobertura de ramas!",
  "objectives": ["Probar objetos con propiedades anidadas", "Cubrir guard clauses con múltiples OR", "Manejar ciclos con salida temprana"]
}', 1);

-- EJERCICIO AVANZADO 1: checkEstadoUsuario(user)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para checkEstadoUsuario() con objetos anidados.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a checkEstadoUsuario(user) que cubran:\n// - Rama 1: user.perfil.activo === true\n// - Rama 2: user.perfil existe pero activo ≠ true\n// - Rama 3: user.perfil no existe\n___BLANK___",
  "expectedAnswer": "checkEstadoUsuario({perfil: {activo: true}}); checkEstadoUsuario({perfil: {activo: false}}); checkEstadoUsuario({});",
  "hint": "Los objetos anidados requieren chequeos encadenados. Necesitas 3 objetos diferentes para las 3 ramas.",
  "explanation": "Con anidamientos profundos, la primera rama activa solo si TODAS las subcondiciones son verdaderas. Las siguientes se activan cuando falla la anterior.",
  "testCases": [
    {
      "input": "{perfil: {activo: true}}",
      "expectedOutput": "Activo",
      "description": "Todas las propiedades existen y activo = true"
    },
    {
      "input": "{perfil: {activo: false}}",
      "expectedOutput": "Inactivo o Bloqueado",
      "description": "Perfil existe pero activo ≠ true"
    },
    {
      "input": "{}",
      "expectedOutput": "Usuario Inválido",
      "description": "Objeto vacío, sin perfil"
    }
  ]
}', 2);

-- EJERCICIO AVANZADO 2: aplicarTarifa(monto, clientePremium)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para aplicarTarifa() con anidamientos complejos.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a aplicarTarifa(monto, premium) que cubran:\n// - monto > 500 & premium = true → 5%\n// - monto > 1000 & premium = false → 2%\n// - 500 < monto <= 1000 & premium = false → 7%\n// - 100 < monto <= 500 → 8%\n// - monto <= 100 → 10%\n___BLANK___",
  "expectedAnswer": "aplicarTarifa(600, true); aplicarTarifa(1200, false); aplicarTarifa(750, false); aplicarTarifa(300, false); aplicarTarifa(50, false);",
  "hint": "Necesitas 5 pruebas para las 5 ramas anidadas. Elige montos que caigan en cada rango y valores de premium que fuerzen la rama correcta.",
  "explanation": "Los if anidados multiplican las ramas. Cada if interno crea subcondiciones que dependen del if externo.",
  "testCases": [
    {
      "input": "aplicarTarifa(600, true)",
      "expectedOutput": "605",
      "description": "Rama 1: monto > 500 & premium = true"
    },
    {
      "input": "aplicarTarifa(1200, false)",
      "expectedOutput": "1202",
      "description": "Rama 2: monto > 1000 & premium = false"
    },
    {
      "input": "aplicarTarifa(750, false)",
      "expectedOutput": "757",
      "description": "Rama 3: 500 < monto <= 1000 & premium = false"
    },
    {
      "input": "aplicarTarifa(300, false)",
      "expectedOutput": "308",
      "description": "Rama 4: 100 < monto <= 500"
    },
    {
      "input": "aplicarTarifa(50, false)",
      "expectedOutput": "60",
      "description": "Rama 5: monto <= 100 (default)"
    }
  ]
}', 3);

-- EJERCICIO AVANZADO 3: verificarPermiso(rol, isOwner, status)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para verificarPermiso() con guard clause y OR lógico.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a verificarPermiso(rol, isOwner, status) que cubran:\n// Guard: !rol || status !== \"approved\" || (rol === \"guest\" && !isOwner) → false\n// Else: true\n___BLANK___",
  "expectedAnswer": "verificarPermiso(\"admin\", true, \"approved\"); verificarPermiso(null, true, \"approved\");",
  "hint": "Esta es una guard clause con múltiples condiciones OR. Necesitas una prueba que pase (true) y otra que falle (false).",
  "explanation": "Las guard clauses con OR complejas usan la evaluación perezosa: tan pronto como una subcondición es verdadera, devuelven false.",
  "testCases": [
    {
      "input": "verificarPermiso(\"admin\", true, \"approved\")",
      "expectedOutput": "true",
      "description": "Todas las subcondiciones de la guard son falsas → pasa"
    },
    {
      "input": "verificarPermiso(null, true, \"approved\")",
      "expectedOutput": "false",
      "description": "!rol = true → guard es true → falla"
    },
    {
      "input": "verificarPermiso(\"admin\", true, \"pending\")",
      "expectedOutput": "false",
      "description": "status !== \"approved\" = true → guard es true → falla"
    }
  ]
}', 4);

-- EJERCICIO AVANZADO 4: buscarItem(arr, target)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico: Escribe pruebas para buscarItem() con guard y ciclo.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a buscarItem(arr, target) que cubran:\n// - Guard: no es Array → null\n// - Salida temprana: encontrado en el ciclo → índice\n// - Fin de ciclo: no encontrado → -1\n___BLANK___",
  "expectedAnswer": "buscarItem(\"no array\", 5); buscarItem([1,2,3], 2); buscarItem([1,2,3], 5);",
  "hint": "3 pruebas: 1) Guard clause (parámetro inválido), 2) Salida temprana (encontrado), 3) Ciclo completo (no encontrado).",
  "explanation": "Los ciclos tienen 3 clases: Cero iteraciones (guard), Salida temprana (break), Finalización normal.",
  "testCases": [
    {
      "input": "buscarItem(\"no array\", 5)",
      "expectedOutput": "null",
      "description": "Guard: !Array.isArray(arr)"
    },
    {
      "input": "buscarItem([1,2,3], 2)",
      "expectedOutput": "1",
      "description": "Salida temprana: encontrado en índice 1"
    },
    {
      "input": "buscarItem([1,2,3], 5)",
      "expectedOutput": "-1",
      "description": "Ciclo completo: no encontrado"
    }
  ]
}', 5);

-- EJERCICIO AVANZADO 5: procesarConfig(config)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3) AND position = 3), 'CODE_CHALLENGE', '{
  "type": "CODE_CHALLENGE",
  "question": "📝 Ejercicio Práctico Avanzado: Escribe pruebas para procesarConfig() con chequeos múltiples.",
  "codeTemplate": "// Tu código de prueba aquí\n// Llamadas a procesarConfig(config) que cubran:\n// - Guard 1: !config || !config.data || config.data.length === 0\n// - Rama 2: config.strictMode === true\n// - Rama 3: procesamiento estándar\n___BLANK___",
  "expectedAnswer": "procesarConfig(null); procesarConfig({data: [], strictMode: true}); procesarConfig({data: [1], strictMode: false});",
  "hint": "3 pruebas para las 3 ramas. La primera prueba la guard clause (vacío/inválido), la segunda strictMode, la tercera estándar.",
  "explanation": "Las guard clauses complejas usan múltiples chequeos encadenados. Si ANY falla, entra a la rama de guardia.",
  "testCases": [
    {
      "input": "{config: null}",
      "expectedOutput": "Configuración vacía o inválida",
      "description": "Guard: !config"
    },
    {
      "input": "{data: [], strictMode: true}",
      "expectedOutput": "Modo estricto aplicado",
      "description": "Pasa guard pero config.strictMode = true"
    },
    {
      "input": "{data: [1], strictMode: false}",
      "expectedOutput": "Procesamiento estándar",
      "description": "Modo normal: estándar"
    }
  ]
}', 6);