-- ============================================================================
-- Migration: V6__Seed_Module_A_EP_BVA.sql
-- Description: Inserta el contenido teórico del Módulo A (Equivalencia y Valores Límite)
--              VERSIÓN CORREGIDA - Sin símbolos < > <= en JSON
-- Author: BugHunter Saga Team
-- Date: 2025-12-14
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
((SELECT id FROM modules WHERE code = 'moduleA'), 2, 'Aplicación Básica de Clases de Equivalencia y Valores Frontera'),
((SELECT id FROM modules WHERE code = 'moduleA'), 3, 'Análisis Avanzado y Casos Prácticos de EP y BVA');

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
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'book', 'Aplicación de EP y BVA en Pruebas de Software', 1),
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

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Las pruebas de caja negra se enfocan en las ____ y ____ del sistema sin analizar su implementación interna.",
  "answerTiles": ["entradas", "clases", "rutas", "salidas"],
  "correctAnswerIndices": [0, 3]
}', 2);

-- Bloque Teórico 2: El dominio de entrada
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "El dominio de entrada",
  "introduction": "El dominio de entrada representa todos los valores, rangos y condiciones que un sistema puede recibir. Incluye datos válidos e inválidos, longitudes permitidas, estados lógicos y cualquier forma de entrada posible. Comprender este dominio es el primer paso para aplicar técnicas de diseño de pruebas.",
  "objectives": ["Definir el dominio de entrada", "Identificar valores válidos e inválidos"]
}', 3),
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
}', 4),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El dominio de entrada incluye todos los valores, ____ y ____ que un sistema puede recibir.",
  "answerTiles": ["valores", "rangos", "comandos",  "condiciones"],
  "correctAnswerIndices": [1, 3]
}', 5);

-- Bloque Teórico 3: Qué es una Partición de Equivalencia (EP)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Qué es una Partición de Equivalencia (EP)",
  "introduction": "Una Partición de Equivalencia divide el dominio de entrada en grupos donde cada valor produce el mismo tipo de comportamiento esperado. Estos grupos se llaman clases de equivalencia. La técnica permite seleccionar un solo valor representativo por clase para reducir pruebas sin perder cobertura.",
  "objectives": ["Definir una partición de equivalencia", "Identificar clases de equivalencia"]
}', 6),
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
}', 7);

-- Bloque Teórico 4: Qué es el Análisis de Valores Frontera (BVA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Qué es el Análisis de Valores Frontera (BVA)",
  "introduction": "El Análisis de Valores Frontera se centra en los límites del dominio de entrada. Los puntos mínimos, máximos y los valores adyacentes tienden a generar más errores. Por ello, esta técnica verifica que el sistema maneje correctamente las transiciones en esos bordes.",
  "objectives": ["Definir el análisis de valores frontera", "Identificar límites y valores adyacentes"]
}', 8),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El BVA se concentra en los ____, los ____ y los valores ____ a esos límites.",
  "answerTiles": ["mínimos", "cercanos", "distantes", "máximos"],
  "correctAnswerIndices": [0, 3, 1]
}', 9);

-- ==================== UNIT 1 - LESSON 2 (DUMBBELL) ====================
-- Bloque Teórico 1: La lógica de dividir el dominio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "La lógica de dividir el dominio",
  "introduction": "En Particiones de Equivalencia, dividir el dominio significa separar todos los valores posibles de entrada en grupos según el comportamiento que el sistema aplica a cada uno. En lugar de analizar cada valor individualmente, el tester identifica qué valores activan las mismas reglas, validaciones o resultados, y los agrupa como equivalentes. Esta división incluye tanto valores válidos como inválidos y permite organizar el análisis del dominio, reduciendo la cantidad de pruebas sin perder cobertura técnica.",
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
  "question": "Un formulario acepta edades entre 18 y 60 años. ¿Qué conjunto de valores puede representar una misma partición válida según Particiones de Equivalencia?",
  "answers": [
    {"name": "Cualquier edad entre 18 y 60, ya que todas generan la misma respuesta del sistema."},
    {"name": "18 y 19 porque están cerca entre sí."},
    {"name": "12 y 90 porque son edades extremas."},
    {"name": "60 y 61 porque están cerca del límite."}
  ],
  "correctAnswer": 0
}', 3);

-- Bloque Teórico 2: Clases válidas e inválidas
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Clases válidas e inválidas",
  "introduction": "En Particiones de Equivalencia, el dominio de entrada se divide en clases válidas e inválidas según el comportamiento esperado del sistema. Una clase válida agrupa valores que el sistema acepta y procesa correctamente, mientras que una clase inválida agrupa valores que el sistema debe rechazar o manejar como incorrectos. Ambas clases representan comportamientos distintos y deben considerarse en el diseño de pruebas para asegurar que el sistema responde correctamente tanto ante entradas permitidas como no permitidas.",
  "objectives": ["Diferenciar clases válidas e inválidas", "Cubrir comportamientos correctos y fallas"]
}', 4),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una clase inválida agrupa valores que el sistema debe ____ o tratar como ____.",
  "answerTiles": ["rechazar", "incorrectos", "aceptar", "válidos"],
  "correctAnswerIndices": [0, 1]
}', 5),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un campo de número de documento acepta únicamente valores con 8 dígitos exactos. ¿Qué opción representa un valor de una clase inválida por longitud?",
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
  "introduction": "Una partición se identifica cuando distintos valores provocan exactamente el mismo comportamiento en el sistema. Para reconocer una partición, el tester debe enfocarse en cómo responde el sistema ante los valores de entrada, no en si los valores se parecen entre sí. Si varios valores activan la misma regla, validación o resultado, pueden agruparse en una misma partición. Los criterios más comunes para identificar particiones incluyen conjuntos de valores permitidos, condiciones lógicas, rangos definidos y restricciones del negocio. Valores que generan comportamientos distintos nunca deben pertenecer a la misma partición.",
  "objectives": ["Identificar particiones", "Definir criterios comunes para particiones"]
}', 7),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una partición se identifica cuando un conjunto de valores produce el mismo ____ y responde bajo la misma ____.",
  "answerTiles": ["resultado", "regla", "código", "formato"],
  "correctAnswerIndices": [0, 1]
}', 8);

-- Bloque Teórico 3: Clases válidas e inválidas (Pregunta CORREGIDA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema de inventario permite vender productos solo cuando su estado es \"disponible\". Los productos \"agotados\" y \"descontinuados\" no pueden venderse. ¿Cuál agrupación forma una clase INVÁLIDA según Particiones de Equivalencia para la operación \"vender producto\"?",
  "answers": [
    {"name": "{agotado, descontinuado}"},
    {"name": "{disponible, agotado}"},
    {"name": "{reservado}"},
    {"name": "{disponible, vendido}"}
  ],
  "correctAnswer": 0
}', 9);

-- Bloque Teórico 4: El valor representativo
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "El valor representativo",
  "introduction": "Un valor representativo es un único dato seleccionado para comprobar el comportamiento de una partición completa. Se utiliza porque todos los valores dentro de una misma partición están definidos para generar el mismo resultado en el sistema. Por esta razón, probar un valor representativo permite verificar el comportamiento esperado de toda la clase, siempre que la partición haya sido correctamente definida.",
  "objectives": ["Definir valor representativo", "Reducir pruebas redundantes"]
}', 10),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "La cantidad de ítems permite valores entre 1 y 10. Considerando que un valor representativo es un único valor que se utiliza para representar el comportamiento de todos los valores válidos de una partición, ¿cuál de las siguientes opciones es un valor representativo válido?",
  "answers": [
    {"name": "5, porque está dentro del rango permitido."},
    {"name": "0, porque esta fuera del limite inferior del rango."},
    {"name": "12, porque está fuera del limite superior del rango."},
    {"name": "1 y 10 porque son los límites del rango."}
  ],
  "correctAnswer": 0
}', 11);

-- ==================== UNIT 1 - LESSON 3 (TROPHY) ====================
-- Bloque Teórico 1: Límites y fronteras en dominios acotados (TEXTO CORREGIDO - SIN SÍMBOLOS < >)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Límites y fronteras en dominios acotados",
  "introduction": "Los límites marcan los puntos exactos donde una condición del sistema cambia de válida a inválida, o viceversa, dentro de un dominio que tiene reglas claramente definidas. En el Análisis de Valores Frontera (BVA), se prueban el valor del límite y los valores inmediatamente cercanos a ese punto, ya que son los más propensos a revelar errores de implementación, como interpretar incorrectamente si un límite está incluido o excluido en la condición.",
  "objectives": ["Comprender qué son los límites en BVA", "Identificar valores frontera críticos", "Reconocer por qué los límites generan errores frecuentes"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema acepta valores entre 10 y 50 (inclusive). Considerando que un valor frontera es aquel donde cambia la validez de una condición, ¿cuál opción identifica correctamente un valor frontera?",
  "answers": [
    {"name": "10, porque es el límite inferior exacto del rango permitido."},
    {"name": "25, porque está en el medio del rango."},
    {"name": "100, porque está muy lejos del rango."},
    {"name": "5, porque es menor que el límite."}
  ],
  "correctAnswer": 0
}', 2);

-- Bloque Teórico 2: Cómo identificar valores adyacentes
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Cómo identificar valores adyacentes",
  "introduction": "Los valores adyacentes son aquellos que se encuentran inmediatamente antes o inmediatamente después de un límite definido por una regla del sistema. Representan el punto exacto donde el comportamiento puede cambiar de válido a inválido, o viceversa. Por ejemplo, si una regla define un límite específico, los valores adyacentes son los que quedan justo a cada lado de ese límite. Probar estos valores permite verificar que el sistema maneja correctamente las transiciones.",
  "objectives": ["Definir valores adyacentes", "Identificar adyacentes en límites", "Comprender su importancia en BVA"]
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un valor adyacente es aquel que se encuentra inmediatamente antes o después de un límite. Si el límite superior de un rango es 100, el valor adyacente ____ es 99 y el valor adyacente ____ es 101.",
  "answerTiles": ["inferior", "superior", "central", "extremo"],
  "correctAnswerIndices": [0, 1]
}', 4),
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
}', 5);

-- Bloque Teórico 3: BVA aplicado a rangos numéricos
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "BVA aplicado a rangos numéricos",
  "introduction": "En rangos numéricos, el BVA se centra en el mínimo permitido, el máximo permitido, y los valores adyacentes (justo antes del mínimo y justo después del máximo). Esto asegura que las condiciones de rango se implementen correctamente sin errores de cálculo o comparación.",
  "objectives": ["Aplicar BVA a rangos numéricos", "Identificar límites mínimos y máximos", "Seleccionar valores frontera correctos"]
}', 6),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "En un rango de 1 a 100, los valores frontera son: ____ (mínimo), ____ (máximo), ____ (antes del mínimo) y ____ (después del máximo).",
  "answerTiles": ["1", "100", "0", "101", "50"],
  "correctAnswerIndices": [0, 1, 2, 3]
}', 7),
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
}', 8);

-- Bloque Teórico 4: Relación entre EP y BVA
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Relación entre EP y BVA",
  "introduction": "EP y BVA son técnicas complementarias que se utilizan de forma conjunta. Primero, EP permite dividir el dominio de entrada en clases de valores que generan el mismo comportamiento del sistema. Luego, BVA se aplica sobre esas clases para seleccionar valores cercanos a sus límites, donde es más probable encontrar errores. Esta combinación permite diseñar pruebas estructuradas y eficientes.",
  "objectives": ["Comprender cómo EP y BVA se complementan", "Aplicar ambas técnicas en conjunto", "Maximizar cobertura de pruebas"]
}', 9),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un campo de edad permite valores de 18 a 65 años. Considerando que EP divide el dominio en clases y que BVA selecciona valores en los límites de esas clases, ¿cuál estrategia combina EP y BVA correctamente?",
  "answers": [
    {"name": "EP: [18-65] válido, [menor a 18 o mayor a 65] inválido; BVA: 17, 18, 65, 66."},
    {"name": "EP: cualquier edad; BVA: solo 18 y 65."},
    {"name": "EP: [18-65]; BVA: solo 18."},
    {"name": "EP: dividir en décadas; BVA: no aplicar."}
  ],
  "correctAnswer": 0
}', 10);

-- ============================================================================
-- FIN DE LA MIGRACIÓN V6
-- ============================================================================