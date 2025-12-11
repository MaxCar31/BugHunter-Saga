-- ============================================================================
-- Migration: V6__Seed_Module_A_EP_BVA.sql
-- Description: Inserta el contenido teórico del Módulo A (Equivalencia y Valores Límite)
--              VERSIÓN CORREGIDA con sintaxis SQL válida
-- Author: BugHunter Saga Team
-- Date: 2025-12-09
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
((SELECT id FROM modules WHERE code = 'moduleA'), 1, 'Técnicas Fundamentales: Particiones de Equivalencia y Análisis de Valores Frontera'),
((SELECT id FROM modules WHERE code = 'moduleA'), 2, 'Aplicación Práctica de Clases de Equivalencia'),
((SELECT id FROM modules WHERE code = 'moduleA'), 3, 'Análisis Avanzado de Valores Límite y BVA Robusto');

-- ============================================================================
-- 3. CREAR LECCIONES (4 POR UNIDAD)
-- ============================================================================

-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'book', 'Fundamentos del Dominio y su Rol en Particiones & Valores Frontera', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'dumbbell', 'Introducción a las Particiones de Equivalencia', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'trophy', 'Introducción al Análisis de Valores Frontera', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'book', 'Tipos Teóricos y Aplicaciones de Clases de Equivalencia', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'dumbbell', 'Ejercicios Prácticos: Clases Válidas e Inválidas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'trophy', 'Evaluación: Casos Prácticos de Equivalencia', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'book', 'Fundamento del Análisis de Valores Límite', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'dumbbell', 'Aplicación y Relación entre Equivalencia y BVA', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'trophy', 'Evaluación: BVA y Análisis Robusto', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS - UNIT 1
-- ============================================================================

-- ==================== UNIT 1 - LESSON 1 (BOOK) ====================
-- Bloque Teórico 1: Qué son las pruebas de caja negra
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Qué son las pruebas de caja negra",
  "introduction": "Las pruebas de caja negra evalúan cómo responde un sistema a sus entradas sin considerar el funcionamiento interno o el código. El tester se enfoca únicamente en los datos que ingresan y los resultados que el sistema produce, analizando el comportamiento visible.",
  "objectives": ["Comprender el concepto de pruebas de caja negra", "Diferenciar entre entradas y salidas del sistema"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de las siguientes opciones describe correctamente una prueba de caja negra?",
  "answers": [
    {"name": "Revisa cómo funciona el código internamente."},
    {"name": "Se basa en evaluar entradas y salidas sin ver el código."},
    {"name": "Analiza la arquitectura interna del sistema."},
    {"name": "Requiere acceso al repositorio del proyecto."}
  ],
  "correctAnswer": 1
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Las pruebas de caja negra se enfocan en las ____ y ____ del sistema sin analizar su implementación interna.",
  "answerTiles": ["entradas", "clases", "rutas", "salidas"],
  "correctAnswerIndices": [0, 3]
}', 3);

-- Bloque Teórico 2: El dominio de entrada
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "El dominio de entrada",
  "introduction": "El dominio de entrada representa todos los valores, rangos y condiciones que un sistema puede recibir. Incluye datos válidos e inválidos, longitudes permitidas, estados lógicos y cualquier forma de entrada posible. Comprender este dominio es el primer paso para aplicar técnicas de diseño de pruebas.",
  "objectives": ["Definir el dominio de entrada", "Identificar valores válidos e inválidos"]
}', 4),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál opción describe correctamente el dominio de entrada?",
  "answers": [
    {"name": "La lista de casos de prueba escritos por un tester."},
    {"name": "Todos los valores posibles que pueden llegar al sistema."},
    {"name": "El conjunto de datos usados por los desarrolladores."},
    {"name": "Las rutas internas del código."}
  ],
  "correctAnswer": 1
}', 5),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El dominio de entrada incluye todos los valores, ____ y ____ que un sistema puede recibir.",
  "answerTiles": ["valores", "rangos", "comandos",  "condiciones"],
  "correctAnswerIndices": [1, 3]
}', 6);

-- Bloque Teórico 3: Qué es una Partición de Equivalencia (EP)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Qué es una Partición de Equivalencia (EP)",
  "introduction": "Una Partición de Equivalencia divide el dominio de entrada en grupos donde cada valor produce el mismo tipo de comportamiento esperado. Estos grupos se llaman clases de equivalencia. La técnica permite seleccionar un solo valor representativo por clase para reducir pruebas sin perder cobertura.",
  "objectives": ["Definir una partición de equivalencia", "Identificar clases de equivalencia"]
}', 7),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de las siguientes opciones describe correctamente una clase de equivalencia?",
  "answers": [
    {"name": "Valores que siempre producen resultados distintos."},
    {"name": "Un conjunto de valores que comparten comportamiento equivalente."},
    {"name": "Valores que deben ser procesados en orden secuencial."},
    {"name": "Valores usados solo por el sistema operativo."}
  ],
  "correctAnswer": 1
}', 8),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una clase de equivalencia agrupa valores que comparten el mismo ____ y producen el mismo ____ en el sistema.",
  "answerTiles": ["comportamiento", "resultado", "código", "flujo"],
  "correctAnswerIndices": [0, 1]
}', 9);

-- Bloque Teórico 4: Qué es el Análisis de Valores Frontera (BVA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Qué es el Análisis de Valores Frontera (BVA)",
  "introduction": "El Análisis de Valores Frontera se centra en los límites del dominio de entrada. Los puntos mínimos, máximos y los valores adyacentes tienden a generar más errores. Por ello, esta técnica verifica que el sistema maneje correctamente las transiciones en esos bordes.",
  "objectives": ["Definir el análisis de valores frontera", "Identificar límites y valores adyacentes"]
}', 10),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál opción describe correctamente el propósito del BVA?",
  "answers": [
    {"name": "Seleccionar valores completamente aleatorios del dominio."},
    {"name": "Evaluar los límites y puntos cercanos a ellos."},
    {"name": "Probar únicamente los valores centrales del rango."},
    {"name": "Evitar evaluar valores extremos."}
  ],
  "correctAnswer": 1
}', 11),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El BVA se concentra en los ____, los ____ y los valores ____ a esos límites.",
  "answerTiles": ["mínimos", "cercanos", "distantes", "máximos"],
  "correctAnswerIndices": [0, 3, 1]
}', 12);

-- ==================== UNIT 1 - LESSON 2 (DUMBBELL) ====================
-- Bloque Teórico 1: La lógica de dividir el dominio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "La lógica de dividir el dominio",
  "introduction": "En particiones de Equivalencia, dividir el dominio ayuda a organizar los valores según cómo debería responder el sistema. En lugar de evaluar cada dato por separado, se agrupan los que generan un mismo tipo de resultado, lo que permite estructurar el análisis y simplificar el diseño de pruebas.",
  "objectives": ["Comprender cómo dividir el dominio", "Organizar valores en particiones"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Dividir el dominio permite organizar valores en ____ que comparten un mismo ____.",
  "answerTiles": ["grupos", "comportamiento", "código", "nivel"],
  "correctAnswerIndices": [0, 1]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un formulario acepta edades entre 18 y 60 años. Si queremos agrupar valores que generen la misma respuesta, ¿qué opción representa correctamente una agrupación?",
  "answers": [
    {"name": "18, 25 y 40 porque todas son edades aceptadas."},
    {"name": "12, 18 y 90 porque son edades muy distintas."},
    {"name": "18 y 19 porque están cerca entre sí."},
    {"name": "60 y 61 porque una es válida y otra no."}
  ],
  "correctAnswer": 0
}', 3);

-- Bloque Teórico 2: Clases válidas e inválidas
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Clases válidas e inválidas",
  "introduction": "Una clase válida contiene valores aceptados por el sistema; una clase inválida contiene valores que deben generar error o rechazo. Esta separación asegura que se cubren tanto los comportamientos correctos como las fallas esperadas.",
  "objectives": ["Diferenciar clases válidas e inválidas", "Cubrir comportamientos correctos y fallas"]
}', 4),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una clase inválida contiene valores que el sistema debe ____ o ____.",
  "answerTiles": ["rechazar", "fallar", "aceptar", "procesar"],
  "correctAnswerIndices": [0, 1]
}', 5);

INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un campo de número de documento acepta únicamente 8 dígitos exactos. ¿Cuál valor pertenece a la clase inválida?",
  "answers": [
    {"name": "12345678"},
    {"name": "1234567"},
    {"name": "87654321"},
    {"name": "00000000"}
  ],
  "correctAnswer": 1
}', 6);

-- Bloque Teórico 3: Cómo identificar una partición
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Cómo identificar una partición",
  "introduction": "Una partición surge cuando varios valores conducen al mismo tipo de reacción del sistema. Los criterios más comunes se basan en rangos, longitudes, condiciones lógicas o conjuntos permitidos.",
  "objectives": ["Identificar particiones", "Definir criterios comunes para particiones"]
}', 7),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una partición se identifica cuando un conjunto de valores produce el mismo ____, responde bajo la misma ____ y pertenece a la misma ____ lógica.",
  "answerTiles": ["resultado", "regla", "categoría", "código"],
  "correctAnswerIndices": [0, 1, 2]
}', 8);

INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema de gestión de inventario clasifica productos por su estado: {disponible, agotado, descontinuado}. ¿Cuál agrupación forma una clase válida según Particiones de Equivalencia?",
  "answers": [
    {"name": "{disponible, agotado} "},
    {"name": "{reservado}"},
    {"name": "{disponible, vendido} "},
    {"name": "{agotado, vencido}"}
  ],
  "correctAnswer": 1
}', 9);

-- Bloque Teórico 4: El valor representativo
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "El valor representativo",
  "introduction": "Un valor representativo es un único dato elegido para verificar el comportamiento completo de una partición. Si funciona correctamente, se asume que el resto de valores de la clase también lo harán.",
  "objectives": ["Definir valor representativo", "Reducir pruebas redundantes"]
}', 10),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El valor representativo confirma el ____ de la clase y permite reducir ____ redundantes.",
  "answerTiles": ["comportamiento", "errores", "pruebas", "datos"],
  "correctAnswerIndices": [0, 2]
}', 11),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un campo de cantidad de ítems permite valores entre 1 y 10. Si ya identificaste que esta es una clase válida, ¿cuál sería un valor representativo adecuado?",
  "answers": [
    {"name": "5, porque está dentro del rango permitido."},
    {"name": "0, porque es un límite inferior."},
    {"name": "12, para probar valores altos."},
    {"name": "1 y 10 juntos como par."}
  ],
  "correctAnswer": 0
}', 12);

-- ==================== UNIT 1 - LESSON 3 (TROPHY) ====================
-- Bloque Teórico 1: Límites y fronteras en dominios acotados
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Límites y fronteras en dominios acotados",
  "introduction": "Los límites marcan los puntos donde una condición cambia de válida a inválida, o viceversa. En BVA, se prueban los valores exactos del límite, los inmediatamente inferiores y superiores, porque son los más propensos a generar errores de implementación (como <= vs <).",
  "objectives": ["Comprender qué son los límites en BVA", "Identificar valores frontera críticos", "Reconocer por qué los límites generan errores frecuentes"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Los límites marcan el punto donde una condición cambia de ____ a ____, o viceversa.",
  "answerTiles": ["válida", "inválida", "activa", "nula"],
  "correctAnswerIndices": [0, 1]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema acepta valores entre 10 y 50 (inclusive). ¿Cuál opción identifica correctamente un valor frontera?",
  "answers": [
    {"name": "10, porque es el límite inferior exacto del rango permitido."},
    {"name": "25, porque está en el medio del rango."},
    {"name": "100, porque está muy lejos del rango."},
    {"name": "5, porque es menor que el límite."}
  ],
  "correctAnswer": 0
}', 3);

-- Bloque Teórico 2: Cómo identificar valores adyacentes
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Cómo identificar valores adyacentes",
  "introduction": "Los valores adyacentes son aquellos que están justo antes o justo después del límite. Si el límite es 10, los adyacentes son 9 (antes) y 11 (después). Estos valores permiten verificar que el sistema respeta correctamente las transiciones entre válido e inválido.",
  "objectives": ["Definir valores adyacentes", "Identificar adyacentes en límites", "Comprender su importancia en BVA"]
}', 4),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Si el límite superior de un rango es 100, el valor adyacente ____ es 99 y el valor adyacente ____ es 101.",
  "answerTiles": ["inferior", "superior", "central", "extremo"],
  "correctAnswerIndices": [0, 1]
}', 5),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un campo acepta contraseñas de 8 a 20 caracteres. ¿Cuáles valores representan correctamente los adyacentes del límite inferior?",
  "answers": [
    {"name": "7 (antes del mínimo) y 8 (el mínimo exacto)."},
    {"name": "8 (el mínimo) y 9 (después del mínimo)."},
    {"name": "1 (muy corto) y 30 (muy largo)."},
    {"name": "8 y 20 porque son los límites."}
  ],
  "correctAnswer": 1
}', 6);

-- Bloque Teórico 3: BVA aplicado a rangos numéricos
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "BVA aplicado a rangos numéricos",
  "introduction": "En rangos numéricos, el BVA se centra en el mínimo permitido, el máximo permitido, y los valores adyacentes (justo antes del mínimo y justo después del máximo). Esto asegura que las condiciones de rango se implementen correctamente sin errores de cálculo o comparación.",
  "objectives": ["Aplicar BVA a rangos numéricos", "Identificar límites mínimos y máximos", "Seleccionar valores frontera correctos"]
}', 7),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "En un rango de 1 a 100, los valores frontera son: ____ (mínimo), ____ (máximo), ____ (antes del mínimo) y ____ (después del máximo).",
  "answerTiles": ["1", "100", "0", "101", "50"],
  "correctAnswerIndices": [0, 1, 2, 3]
}', 8),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema permite descargas de archivos de 1 MB a 500 MB. ¿Cuál conjunto de valores representa correctamente el BVA completo?",
  "answers": [
    {"name": "0 MB, 1 MB, 500 MB, 501 MB (límites y adyacentes)."},
    {"name": "1 MB, 250 MB, 500 MB (límites y punto medio)."},
    {"name": "100 MB, 200 MB, 300 MB (valores intermedios)."},
    {"name": "0 MB y 1000 MB (extremos del espacio de almacenamiento)."}
  ],
  "correctAnswer": 0
}', 9);

-- Bloque Teórico 4: Relación entre EP y BVA
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Relación entre EP y BVA",
  "introduction": "EP y BVA son complementarias: EP divide el dominio en clases, mientras que BVA refuerza la cobertura seleccionando valores críticos en los límites de esas clases. Usarlas juntas maximiza la detección de errores con eficiencia.",
  "objectives": ["Comprender cómo EP y BVA se complementan", "Aplicar ambas técnicas en conjunto", "Maximizar cobertura de pruebas"]
}', 10),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "EP divide el dominio en ____, mientras que BVA refuerza la cobertura en los ____ de esas clases.",
  "answerTiles": ["clases", "límites", "rangos", "errores"],
  "correctAnswerIndices": [0, 1]
}', 11),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un campo de edad permite valores de 18 a 65 años. ¿Cuál estrategia combina EP y BVA correctamente?",
  "answers": [
    {"name": "EP: [18-65] válido, [<18, >65] inválido; BVA: 17, 18, 65, 66."},
    {"name": "EP: cualquier edad; BVA: solo 18 y 65."},
    {"name": "EP: [18-65]; BVA: solo 18."},
    {"name": "EP: dividir en décadas; BVA: no aplicar."}
  ],
  "correctAnswer": 0
}', 12);

-- ============================================================================
-- FIN DE LA MIGRACIÓN V6
-- ============================================================================