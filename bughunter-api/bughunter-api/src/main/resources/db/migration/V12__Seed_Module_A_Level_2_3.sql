-- ============================================================================
-- Migration: V12__Seed_Module_A_Level_2_3.sql
-- Description: Inserta el contenido COMPLETO del Nivel 2 (Unit 2) y Nivel 3 (Unit 3) del Módulo A
-- Author: BugHunter Saga Team
-- Date: 2025-12-07 (Versión Completa - Corregida)
-- ============================================================================

-- ============================================================================
-- UNIT 2 - LESSON 1 (BOOK) - Formularios y validaciones básicas
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Fundamentos de Particiones de Equivalencia (EP)",
  "introduction": "Las Particiones de Equivalencia (EP) dividen el dominio de entrada en clases de valores que generan el mismo comportamiento esperado del sistema. Estas clases se definen a partir de reglas, rangos, longitudes, formatos o conjuntos permitidos. Cada clase puede ser válida, cuando contiene valores aceptados por el sistema, o inválida, cuando agrupa valores que deben generar error o rechazo. Para cada clase se selecciona un valor representativo, lo que permite reducir pruebas redundantes sin perder cobertura. En esta lección, aplicarás EP a validaciones de formularios considerando distintos criterios de entrada.",
  "objectives": [
    "Recordar cómo EP divide el dominio en clases válidas e inválidas",
    "Identificar valores representativos de cada clase de equivalencia",
    "Aplicar EP a casos prácticos de validación"
  ]
}', 1);

-- Pregunta 1: EP - longitud mínima de username
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema establece que el nombre de usuario debe tener entre 4 y 12 caracteres. Considerando la partición válida definida por esta regla, ¿cuál opción pertenece a esa clase de equivalencia?",
  "answers": [
    {"name": "AJ"},
    {"name": "MARCO"},
    {"name": "Q"},
    {"name": "MARCO_GONZALEZ123"}
  ],
  "correctAnswer": 1
}', 2);

-- Pregunta 2: EP - formato de email
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema de registro valida emails con estas reglas: debe contener exactamente un símbolo @, tener al menos un carácter antes del @, y el dominio debe incluir al menos un punto. Dado el email válido de referencia: lucia.torres@miempresa.com.mx, ¿cuál de los siguientes emails genera el mismo comportamiento esperado del sistema?",
  "answers": [
    {"name": "pedro.ramirez@biblioteca.org"},
    {"name": "usuario@correo"},
    {"name": "@soporte.net"},
    {"name": "admin@@sistema.com"}
  ],
  "correctAnswer": 0
}', 3);

-- Pregunta 3: EP - intentos de login
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Las particiones separan valores que generan el mismo comportamiento del sistema. Un sistema permite máximo 3 intentos de inicio de sesión. ¿Cuál opción pertenece a la partición inválida?",
  "answers": [
    {"name": "1 intento"},
    {"name": "2 intentos"},
    {"name": "3 intentos"},
    {"name": "4 intentos"}
  ],
  "correctAnswer": 3
}', 4);

-- Pregunta 4: EP - métodos de pago
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Las categorías forman particiones claras y no se mezclan. Una tienda online acepta solo tarjeta, transferencia o wallet digital. Completa: Paypal pertenece a una clase ____ y puede usarse como valor ____ de todos los métodos no aceptados.",
  "answerTiles": ["inválida", "válida", "representativo", "permitido"],
  "correctAnswerIndices": [0, 2]
}', 5);

-- Pregunta 5: EP - cantidad de productos
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "En Particiones de Equivalencia, un solo valor puede representar el comportamiento de toda una clase. Un carrito de compras solo permite cantidades entre 1 y 99. Completa: El valor 0 pertenece a la clase ____, mientras que el valor ____ puede usarse como valor ____ de la clase válida.",
  "answerTiles": ["válida", "inválida", "70", "100", "representativo", "límite"],
  "correctAnswerIndices": [1, 2, 4]
}', 6);

-- ============================================================================
-- UNIT 2 - LESSON 2 (DUMBBELL) - Análisis de Valores Frontera (BVA)
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Análisis de Valores Frontera (BVA)",
  "introduction": "El Análisis de Valores Frontera (BVA) se centra en los límites del dominio de entrada. Los puntos mínimos, máximos y los valores inmediatamente adyacentes a ellos suelen concentrar errores de implementación. BVA verifica que el sistema responda correctamente cuando una entrada cruza esos límites, validando las transiciones entre valores aceptados y no aceptados.",
  "objectives": [
    "Recordar qué son los valores frontera y por qué son críticos",
    "Identificar límites mínimos, máximos y valores adyacentes",
    "Aplicar BVA a casos prácticos de validación de rangos"
  ]
}', 1);

-- Pregunta 1: BVA - edad mínima permitida
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En BVA, el valor inmediatamente anterior al límite mínimo es un valor frontera inválido. Para registrarse en un sistema, la edad permitida va de 18 a 65 años. ¿Cuál valor representa el primer valor inválido?",
  "answers": [
    {"name": "17 años (justo antes del mínimo)"},
    {"name": "18 años (límite mínimo válido)"},
    {"name": "19 años (dentro del rango)"},
    {"name": "16 años (muy por debajo del límite)"}
  ],
  "correctAnswer": 0
}', 2);

-- Pregunta 2: BVA - límite máximo de archivos adjuntos
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En BVA, el valor inmediatamente posterior al límite máximo es un valor frontera crítico. Un sistema permite adjuntar entre 1 y 5 archivos en un formulario. ¿Cuál valor representa el límite superior externo (primer valor inválido)?",
  "answers": [
    {"name": "4 archivos (dentro del rango permitido)"},
    {"name": "5 archivos (límite máximo válido)"},
    {"name": "6 archivos (justo después del máximo)"},
    {"name": "10 archivos (muy por encima del límite)"}
  ],
  "correctAnswer": 2
}', 3);

-- Pregunta 3: BVA - rango de archivos subidos (CORREGIDA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un sistema permite subir entre 2 y 10 archivos en una sola operación. En BVA, los valores frontera incluyen los límites y sus valores adyacentes. Completa: El valor ____ está justo antes del mínimo (inválido), el valor ____ es el mínimo válido, el valor ____ es el máximo válido, y el valor ____ está justo después del máximo (inválido).",
  "answerTiles": ["1", "2", "10", "11", "3", "9"],
  "correctAnswerIndices": [0, 1, 2, 3]
}', 4);

-- Pregunta 4: BVA - límite de asientos en reserva (ORDEN MEZCLADO)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un sistema permite reservar entre 8 y 20 asientos por pedido. Los valores frontera incluyen los límites y sus adyacentes. Completa: El valor ____ está justo antes del mínimo (inválido), el valor ____ es el mínimo válido, el valor ____ es el máximo válido, y el valor ____ está justo después del máximo (inválido).",
  "answerTiles": ["19", "21", "9", "7", "8", "20"],
  "correctAnswerIndices": [3, 4, 5, 1]
}', 5);

-- Pregunta 5: BVA - límite de intentos de login
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema bloquea la cuenta después de 3 intentos fallidos. En BVA, ¿qué conjunto de valores cubre correctamente el límite máximo y sus valores adyacentes?",
  "answers": [
    {"name": "2 intentos, 3 intentos, 4 intentos"},
    {"name": "1 intento, 2 intentos, 3 intentos"},
    {"name": "3 intentos, 4 intentos, 5 intentos"},
    {"name": "0 intentos, 3 intentos, 6 intentos"}
  ],
  "correctAnswer": 0
}', 6);

-- ============================================================================
-- UNIT 2 - LESSON 3 (TROPHY) - Viajes, configuraciones y soporte técnico
-- ============================================================================

INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Cómo se complementan EP y BVA",
  "introduction": "Las Particiones de Equivalencia (EP) y el Análisis de Valores Frontera (BVA) trabajan juntas para cubrir el dominio de entrada de forma eficiente. EP permite dividir el dominio en clases que representan comportamientos distintos del sistema, mientras que BVA se enfoca en los puntos críticos donde una clase cambia a otra. Primero se identifican las particiones con EP, y luego se seleccionan los valores más sensibles de esas particiones usando BVA. Esta combinación reduce la cantidad de pruebas sin perder cobertura en los escenarios más propensos a fallos.",
  "objectives": [
    "Reconocer el rol de EP en la división del dominio de entrada",
    "Reconocer el rol de BVA en la selección de valores críticos",
    "Comprender el orden lógico de uso: EP primero, BVA después",
    "Entender cómo ambas técnicas se refuerzan mutuamente"
  ]
}', 1);

-- Pregunta 1: EP con matriz simple de soporte técnico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En EP, las combinaciones válidas se definen por reglas del sistema, y en BVA se analizan los límites de esas reglas. Un sistema de soporte técnico define: Incidente permite prioridad hasta Alta; Consulta permite prioridad hasta Media; Reclamo permite únicamente prioridad Alta. Considerando estas reglas, ¿qué combinación pertenece a una clase inválida por superar un límite definido?",
  "answers": [
    {"name": "Consulta + Baja"},
    {"name": "Incidente + Alta"},
    {"name": "Consulta + Alta"},
    {"name": "Reclamo + Alta"}
  ],
  "correctAnswer": 2
}', 2);

-- Pregunta 2: BVA con gráfico de peso permitido por maleta
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema de transporte permite hasta 28 kg cuando se viaja con 2 maletas. ¿Cuál es el primer valor que debería ser rechazado por superar ese límite?",
  "answers": [
    {"name": "27 kg"},
    {"name": "28 kg"},
    {"name": "29 kg"},
    {"name": "20 kg"}
  ],
  "correctAnswer": 2
}', 3);

-- Pregunta 3: EP + BVA con gráfico simple de niveles de brillo
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una app de configuración divide el brillo en tres zonas: Zona A (1–3), Zona B (4–7) y Zona C (8–10). Completa: El valor 3 pertenece a la partición ____ y actúa como un valor ____, mientras que el valor 4 pertenece a la partición ____ y representa el ____ de esa zona.",
  "answerTiles": [
    "Zona A",
    "Zona B",
    "Zona C",
    "límite superior",
    "límite inferior",
    "valor interno"
  ],
  "correctAnswerIndices": [0, 3, 1, 4]
}', 4);

-- ============================================================================
-- UNIT 3 - LESSON 1 (BOOK) - Análisis de Particiones Complejas (EP)
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Análisis de Particiones Complejas (EP)",
  "introduction": "Las particiones complejas surgen cuando el comportamiento del sistema depende de múltiples reglas o del contexto de uso. En estos escenarios, las clases de equivalencia no se definen por un único campo, sino por la combinación de varios atributos, restricciones cruzadas o conjuntos cerrados de valores permitidos. El uso correcto de EP permite clasificar el dominio combinado de entradas en clases coherentes, incluso cuando existen dependencias entre campos o reglas condicionales.",
  "objectives": [
    "Aplicar EP en escenarios con dependencias entre múltiples campos",
    "Identificar clases de equivalencia definidas por conjuntos cerrados de valores",
    "Clasificar entradas según reglas contextuales y combinadas"
  ]
}', 1);

-- Pregunta 1: EP - Formulario con dependencias (código postal según país)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un formulario valida direcciones donde el país determina el formato del código postal. Para Ecuador, el sistema acepta únicamente códigos numéricos de exactamente 6 dígitos. ¿Cuál de los siguientes valores pertenece a la clase válida para un usuario de Ecuador?",
  "answers": [
    {"name": "A92K4"},
    {"name": "12345"},
    {"name": "098761"},
    {"name": "12-3456"}
  ],
  "correctAnswer": 2
}', 2);

-- Pregunta 2: EP - Sistema de streaming (validación combinada mime-type + marcado)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema de streaming procesa archivos de video solo si cumplen dos condiciones simultáneas: el mime-type debe ser uno de los permitidos (video/mp4 o video/webm), y el contenido debe estar marcado como video. El equipo de QA ha definido tres clases de equivalencia según estas reglas. ¿Cuál de los siguientes valores puede considerarse un representante de la clase válida?",
  "answers": [
    {"name": "audio/mp4 (contenido marcado como audio)"},
    {"name": "video/avi (contenido marcado como video)"},
    {"name": "video/webm (contenido marcado como video)"},
    {"name": "application/mp4 (contenido marcado como video)"}
  ],
  "correctAnswer": 2
}', 3);

-- Pregunta 3: EP - Plataforma educativa (clasificación por dificultad con análisis completo de clases)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una plataforma clasifica puntajes de tareas en tres niveles de dificultad: Básico (0-50), Medio (51-80) y Avanzado (81-100). El equipo de QA debe definir todas las clases de equivalencia del sistema, incluyendo una clase inválida para puntajes fuera del dominio permitido. Según la técnica de Particiones de Equivalencia, se identifican cuatro clases: Clase A (puntajes Básico), Clase B (puntajes Medio), Clase C (puntajes Avanzado) y Clase D (puntajes fuera del rango 0-100). Completa: El valor 45 es un representante de la Clase ____, el valor 78 pertenece a la Clase ____, el valor 95 representa la Clase ____, y el valor 120 es un representante de la Clase ____.",
  "answerTiles": ["A", "B", "C", "D", "válida", "inválida"],
  "correctAnswerIndices": [0, 1, 2, 3]
}', 4);

-- ============================================================================
-- UNIT 3 - LESSON 2 (DUMBBELL) - Análisis de Valores Frontera (BVA)
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Análisis de Valores Frontera (BVA)",
  "introduction": "El Análisis de Valores Frontera (BVA) se enfoca en identificar y probar los límites críticos donde las condiciones del sistema cambian de estado. Los valores frontera incluyen los límites exactos, los valores inmediatamente superiores e inferiores, y los puntos de activación de reglas condicionales.",
  "objectives": [
    "Identificar valores antes y después de límites críticos",
    "Reconocer valores frontera válidos en rangos inclusivos",
    "Clasificar valores según zonas de estado del sistema"
  ]
}', 1);

-- Pregunta 1: BVA - Prioridad de tickets según carga del servidor
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El sistema prioriza tickets según el nivel de carga del servidor (0–100%). El flujo cambia al alcanzar el umbral crítico de 85%. Completa: Un ticket con nivel de carga 84% está ____ respecto al límite, se clasifica en la zona ____ y, según las reglas del flujo, este ticket se considera ____.",
  "answerTiles": ["antes", "después", "normal", "crítica", "justo", "dentro", "fuera", "permitido", "bloqueado"],
  "correctAnswerIndices": [0, 2, 7]
}', 2);

-- Pregunta 2: BVA - Gestión de inventario (valores frontera válidos)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un almacén procesa pedidos solo si el stock se encuentra dentro del rango 20–500 unidades (inclusive). Completa: Un pedido con 20 unidades está ____ respecto al límite inferior, pertenece a la zona ____ y se considera ____ según las reglas del sistema.",
  "answerTiles": ["antes", "después", "igual", "normal", "crítica", "permitido", "bloqueado"],
  "correctAnswerIndices": [2, 4, 5]
}', 3);

-- Pregunta 3: BVA - Sistema de bicicletas eléctricas (CORREGIDA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un sistema de bicicletas eléctricas limita la activación según el nivel de batería: Disponible (≥35%), Reserva (20–34%), Bloqueada (<20%). Completa: Un nivel de batería de 34% se encuentra ____ respecto al límite de la zona Disponible, pertenece a la zona ____, es el límite ____ de esa zona, y el sistema lo considera ____.",
  "answerTiles": ["por debajo", "por encima", "igual", "disponible", "reserva", "bloqueada", "superior", "inferior", "permitido", "bloqueado"],
  "correctAnswerIndices": [0, 4, 6, 8]
}', 4);

-- ============================================================================
-- UNIT 3 - LESSON 3 (TROPHY) - Flujos Secuenciales y Reglas Encadenadas
-- ============================================================================

-- Pregunta 1: EP/BVA - Flujo de aprobación de solicitudes académicas (TIPO: FILL_IN_THE_BLANK)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un portal académico procesa solicitudes según el promedio del estudiante. El sistema define tres estados: Revisión manual (promedio <60), Revisión prioritaria (60–79) y Aprobación directa (≥80). Completa: Un promedio de ____ pertenece a la partición ____, mientras que un promedio de ____ activa el estado ____ y representa el límite ____ de esa zona.",
  "answerTiles": ["59", "60", "79", "80", "Revisión manual", "Revisión prioritaria", "Aprobación directa", "inferior", "superior"],
  "correctAnswerIndices": [0, 4, 3, 6, 7]
}', 1);
-- Pregunta 2: EP/BVA - Control de temperatura en Smart Home
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un sistema de climatización inteligente clasifica la temperatura de una habitación en tramos de confort y seguridad. Completa: La temperatura se considera Fría cuando está por debajo de ____, el tramo Confort está entre ____ y ____, se considera Caliente a partir de ____ y un valor de 27°C se encuentra dentro del tramo ____.",
  "answerTiles": ["18", "20", "21", "26", "27", "Muy Fría", "Fría", "Confort", "Caliente"],
  "correctAnswerIndices": [1, 2, 3, 4, 8]
}', 2);

-- Pregunta 3: EP/BVA - Gamificación de logros diarios (CORREGIDA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un juego asigna logros diarios según los puntos acumulados por el jugador. Completa: El tramo Bronze cubre desde ____ hasta ____ puntos, Silver inicia en ____ y termina en ____, y Gold se obtiene a partir de ____ puntos.",
  "answerTiles": ["0", "99", "100", "149", "150", "Bronze", "Silver", "Gold"],
  "correctAnswerIndices": [0, 1, 2, 3, 4]
}', 3);

-- Pregunta 4: EP/BVA + API - Validación de parámetro retryCount (CORREGIDA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un endpoint POST /auth/login controla el número de intentos consecutivos con el parámetro retryCount, que debe cumplir un rango operativo definido en la tabla interna del backend. Completa: El valor mínimo permitido para retryCount es ____ y el valor máximo es ____. Un intento con retryCount=6 se considera ____ y activaría ____ en el sistema.",
  "answerTiles": ["0", "5", "dentro del rango", "fuera del rango", "bloqueo temporal", "alerta de seguridad"],
  "correctAnswerIndices": [0, 1, 3, 5]
}', 4);

-- ============================================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================================