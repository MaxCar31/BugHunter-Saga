-- ============================================================================
-- Migration: V12__Seed_Module_A_Level_2_3.sql
-- Description: Inserta el contenido COMPLETO del Nivel 2 (Unit 2) y Nivel 3 (Unit 3) del Módulo A
-- Author: BugHunter Saga Team
-- Date: 2025-12-07 (Versión Completa)
-- ============================================================================

-- ============================================================================
-- UNIT 2 - LESSON 1 (BOOK) - Formularios y validaciones básicas
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Fundamentos de Particiones de Equivalencia (EP)",
  "introduction": "Las Particiones de Equivalencia (EP) dividen el dominio de entrada en clases donde todos los valores comparten el mismo comportamiento esperado. Esta técnica permite seleccionar un valor representativo por clase, reduciendo pruebas sin perder cobertura. Las clases válidas agrupan valores aceptados; las clases inválidas agrupan valores que deben generar error. En esta lección, aplicarás EP a validaciones de formularios usando rangos, longitudes y formatos.",
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
  "question": "En una clase válida se selecciona un valor que cumple la condición mínima. Un sistema establece que el nombre de usuario debe tener entre 4 y 12 caracteres. ¿Cuál opción pertenece claramente a la partición válida?",
  "answers": [
    {"name": "AJ "},
    {"name": "MARCO "},
    {"name": "Q "},
    {"name": "MARCO_GONZALEZ123 "}
  ],
  "correctAnswer": 1
}', 2);

-- Pregunta 2: EP - formato de email
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema de registro valida emails con estas reglas: debe contener exactamente un símbolo @, tener al menos un carácter antes del @, y el dominio debe incluir al menos un punto. Dado el email válido de referencia: lucia.torres@miempresa.com.mx, ¿cuál de los siguientes emails pertenece a la misma clase de equivalencia (válida)?",
  "answers": [
    {"name": "pedro.ramirez@biblioteca.org "},
    {"name": "usuario@correo "},
    {"name": "@soporte.net"},
    {"name": "admin@@sistema.com "}
  ],
  "correctAnswer": 0
}', 3);

-- Pregunta 3: EP - intentos de login (MOVIDA DESDE LESSON 2)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Las particiones separan las cantidades permitidas de las no permitidas. Un sistema permite máximo 3 intentos de inicio de sesión. ¿Cuál opción pertenece a la partición inválida?",
  "answers": [
    {"name": "1 intento"},
    {"name": "2 intentos"},
    {"name": "3 intentos"},
    {"name": "4 intentos"}
  ],
  "correctAnswer": 3
}', 4);

-- Pregunta 4: EP - métodos de pago (MOVIDA DESDE LESSON 2)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Las categorías forman particiones claras y no se mezclan. Una tienda online acepta solo tarjeta, transferencia o wallet digital. Completa: Si se quiere realizar un pago con Paypal, entonces este es considerado una clase ____ y debe ser tratado como ____.",
  "answerTiles": ["inválida", "permitida", "aprobada", "no permitida", "válida"],
  "correctAnswerIndices": [0, 3]
}', 5);

-- Pregunta 5: EP - cantidad de productos (MOVIDA DESDE LESSON 2)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Los límites definen particiones claras entre valores aceptables e inaceptables. Un carrito de compras solo permite seleccionar cantidades entre 1 y 99. Completa: El valor 0 pertenece a la clase ____, mientras que el valor ____ pertenece a la clase válida.",
    "answerTiles": ["válida", "inválida", "100", "105", "70"],
  "correctAnswerIndices": [1, 0]
}', 6);



-- ============================================================================
-- UNIT 2 - LESSON 2 (DUMBBELL) - Análisis de Valores Frontera (BVA)
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Análisis de Valores Frontera (BVA)",
  "introduction": "El Análisis de Valores Frontera (BVA) se centra en los límites del dominio de entrada. Los puntos mínimos, máximos y los valores adyacentes a ellos tienden a generar más errores de implementación. Esta técnica verifica que el sistema maneje correctamente las transiciones en esos bordes críticos. En esta lección, aplicarás BVA a rangos numéricos, fechas y límites de sistemas reales.",
  "objectives": [
    "Recordar qué son los valores frontera y por qué son críticos",
    "Identificar límites mínimos, máximos y valores adyacentes",
    "Aplicar BVA a casos prácticos de validación de rangos"
  ]
}', 1);

-- Pregunta 1: BVA - edad mínima permitida (MOVIDA DESDE LESSON 1)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En BVA, el valor justo antes del límite mínimo es un valor frontera inválido crítico. Para registrarse en un sistema, la edad permitida va de 18 a 65 años. ¿Cuál valor representa el límite inferior externo (primer valor inválido)?",
  "answers": [
    {"name": "17 años (justo antes del mínimo)"},
    {"name": "18 años (límite mínimo válido)"},
    {"name": "19 años (dentro del rango)"},
    {"name": "16 años (muy por debajo del límite)"}
  ],
  "correctAnswer": 0
}', 2);

-- Pregunta 2: BVA - edad máxima permitida (NUEVA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "El valor justo después del límite máximo es otro valor frontera crítico. Para el mismo sistema con edades de 18 a 65 años, ¿cuál valor representa el límite superior externo (primer valor inválido por arriba)?",
  "answers": [
    {"name": "64 años (dentro del rango)"},
    {"name": "65 años (límite máximo válido)"},
    {"name": "66 años (justo después del máximo)"},
    {"name": "70 años (muy por arriba del límite)"}
  ],
  "correctAnswer": 2
}', 3);

-- Pregunta 3: BVA - fecha futura para reservas
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "La frontera superior marca el último día permitido antes de entrar a la clase inválida. Las reservas de un sistema solo pueden realizarse dentro de los próximos 30 días exactos. ¿Cuál fecha representa la salida inmediata del límite superior?",
  "answers": [
    {"name": "Día 29 (dentro del límite)"},
    {"name": "Día 30 (límite superior válido)"},
    {"name": "Día 31 (justo después del límite)"},
    {"name": "Día 28 (lejos del límite)"}
  ],
  "correctAnswer": 2
}', 4);

-- Pregunta 4: BVA - longitud mínima de contraseña (NUEVA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una contraseña debe tener entre 8 y 20 caracteres. Los valores frontera incluyen los límites y sus adyacentes. Completa: El valor ____ está justo antes del mínimo (inválido), el valor ____ es el mínimo válido, el valor ____ es el máximo válido, y el valor ____ está justo después del máximo (inválido).",
  "answerTiles": ["7", "8", "20", "21", "9", "19"],
  "correctAnswerIndices": [0, 1, 2, 3]
}', 5);

-- Pregunta 5: BVA - límite de productos en carrito (NUEVA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un carrito permite cantidades entre 1 y 99. En BVA, los valores críticos son los límites y sus adyacentes. Completa: El valor ____ es el límite inferior externo (inválido), el valor ____ es el límite inferior interno (válido), el valor ____ es el límite superior interno (válido), y el valor ____ es el límite superior externo (inválido).",
  "answerTiles": ["0", "1", "99", "100", "2", "98"],
  "correctAnswerIndices": [0, 1, 2, 3]
}', 6);

-- Pregunta 6: BVA - límite de intentos de login (NUEVA)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un sistema bloquea la cuenta después de 3 intentos fallidos. ¿Cuál conjunto de valores representa correctamente el BVA completo para este límite?",
  "answers": [
    {"name": "1, 2, 3 "},
    {"name": "0, 1, 3, 4 "},
    {"name": "3, 4, 5"},
    {"name": "1, 3, 5 "}
  ],
  "correctAnswer": 1
}', 7);


-- ============================================================================
-- UNIT 2 - LESSON 3 (TROPHY) - Viajes, configuraciones y soporte técnico
-- ============================================================================

INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Desafío Final: Integración de EP y BVA con Representaciones Visuales",
  "introduction": "En las lecciones anteriores practicaste EP para identificar clases de equivalencia y BVA  para encontrar valores frontera. Aprenderás a interpretar representaciones visuales de reglas de validación, identificar combinaciones válidas en matrices de categorías, y detectar límites críticos en gráficos de umbrales.",
  "objectives": [
    "Integrar EP y BVA en combinaciones permitidas",
    "Identificar valores frontera superiores",
    "Analizar diagramas de rangos para clasificar valores en zonas de validez"
  ]
}', 1);


-- Pregunta 9: EP con matriz simple de soporte técnico
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "En EP, una combinación es válida si pertenece a una categoría definida. Un sistema de soporte solo acepta las combinaciones mostradas en la tabla. ¿Cuál combinación corresponde a una clase inválida según la matriz?",
  "image": {
    "src": "/assets/lessons/moduleA/unit2/lesson3/tabla-soporte-tecnico.png",
    "alt": "Tabla mostrando tipos de ticket (Incidente, Consulta, Reclamo) y sus prioridades permitidas (Baja, Media, Alta)",
    "caption": "Tabla 1: Combinaciones válidas de tipos de ticket y prioridades"
  },
  "answers": [
    {"name": "Consulta + Baja"},
    {"name": "Incidente + Alta"},
    {"name": "Reclamo + Media"},
    {"name": "Consulta + Alta"}
  ],
  "correctAnswer": 3
}', 2);

-- Pregunta 10: BVA con gráfico de peso permitido por maleta
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "El límite superior marca el punto más alto permitido antes de volverse inválido. El sistema de transporte muestra el peso máximo permitido según el número de maletas. ¿Cuál valor marca la salida inmediata del límite superior para 2 maletas?",
  "image": {
    "src": "/assets/lessons/moduleA/unit2/lesson3/grafico-peso-maletas.png",
    "alt": "Gráfico de barras mostrando peso máximo permitido: 1 maleta = 20kg, 2 maletas = 28kg, 3 maletas = 32kg",
    "caption": "Figura 1: Límites de peso por número de maletas"
  },
  "answers": [
    {"name": "27 kg"},
    {"name": "28 kg"},
    {"name": "29 kg"},
    {"name": "20 kg"}
  ],
  "correctAnswer": 2
}', 3);

-- Pregunta 11: EP + BVA con gráfico simple de niveles de brillo
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un valor pertenece a una zona válida si cae dentro de su rango exacto. Una app de configuración divide el brillo en tres zonas como se muestra en el gráfico. Completa: El brillo 4 pertenece a la zona ____, mientras que el brillo 3 pertenece a la zona ____.",
  "image": {
    "src": "/assets/lessons/moduleA/unit2/lesson3/grafico-zonas-brillo.png",
    "alt": "Gráfico de rangos mostrando Zona A (1-3), Zona B (4-7), Zona C (8-10)",
    "caption": "Figura 2: Distribución de zonas de brillo en escala 1-10"
  },
  "answerTiles": ["Zona A", "Zona B", "Zona C", "límite inferior", "límite superior"],
  "correctAnswerIndices": [1, 0]
}', 4);

-- ============================================================================
-- UNIT 3 - LESSON 1 (BOOK) - Análisis de Particiones Complejas (EP)
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Análisis de Particiones Complejas (EP)",
  "introduction": "Las particiones complejas aparecen cuando las reglas de validación dependen de múltiples factores o contextos. En estos casos, EP permite dividir el espacio de entradas en clases considerando dependencias entre campos, formatos específicos por categoría, o listas predefinidas de valores permitidos.",
  "objectives": [
    "Aplicar EP en formularios con dependencias entre campos",
    "Identificar particiones válidas según listas de valores permitidos",
    "Clasificar valores según rangos definidos por categorías de dificultad"
  ]
}', 1);

-- Pregunta 1: EP - Formulario con dependencias (código postal según país)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un formulario avanzado valida dirección: el país determina el formato permitido para el código postal. La tabla del sistema muestra los formatos aceptados. ¿Cuál valor pertenece a la clase válida para un usuario de Perú?",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson1/tabla-codigos-postales.png",
    "alt": "Tabla mostrando países (México, Perú, Argentina) con sus formatos de código postal permitidos",
    "caption": "Tabla 1: Formatos de código postal por país"
  },
  "answers": [
    {"name": "3981"},
    {"name": "A92K4"},
    {"name": "777777"},
    {"name": "12-AB"}
  ],
  "correctAnswer": 1
}', 2);

-- Pregunta 2: EP - Multimedia / Streaming (mime-types válidos)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Para subir un video, el sistema solo acepta formatos dentro de una lista de mime-types válidos. La lista muestra los formatos permitidos y no permitidos. ¿Cuál opción pertenece a la partición válida?",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson1/lista-mime-types.png",
    "alt": "Lista dividida en dos secciones: Válidos (video/mp4, video/webm, video/mov) e Inválidos (video/avi, video/flv)",
    "caption": "Lista 1: Mime-types válidos e inválidos para videos"
  },
  "answers": [
    {"name": "video/avi"},
    {"name": "video/flv"},
    {"name": "video/webm"},
    {"name": "video/x-msvideo"}
  ],
  "correctAnswer": 2
}', 3);

-- Pregunta 3: EP - Plataforma educativa (clasificación por dificultad)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una plataforma clasifica puntajes de tareas en clases de dificultad según el rango obtenido. La tabla muestra los rangos definidos. Completa: Un puntaje de 78 pertenece a la clase ____ dentro del rango ____.",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson1/tabla-rangos-dificultad.png",
    "alt": "Tabla mostrando tres niveles de dificultad: Básico (0-50), Medio (51-80), Avanzado (81-100)",
    "caption": "Tabla 2: Clasificación de puntajes por dificultad"
  },
  "answerTiles": ["51–80", "81–100", "Medio", "Avanzado", "Básico"],
  "correctAnswerIndices": [2, 0]
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

-- Pregunta 4: BVA - Ticket de soporte (límite de carga del sistema)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Los tickets se priorizan según el nivel de carga del sistema (0–100%). El límite para activar el modo Alto riesgo es ≥ 85%. La figura muestra el punto de activación. Completa: Un valor de 84% está ____ del límite y pertenece a la zona ____.",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson2/grafico-punto-activacion.png",
    "alt": "Diagrama mostrando dos zonas: Estado Normal (0-84%) y Estado Alto Riesgo (85-100%) con línea divisoria en 85%",
    "caption": "Figura 1: Punto de activación del modo Alto Riesgo"
  },
  "answerTiles": ["antes", "después", "normal", "crítica", "justo"],
  "correctAnswerIndices": [0, 2]
}', 2);

-- Pregunta 5: BVA - Gestión de inventario (valores frontera válidos)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un almacén acepta pedidos solo cuando el stock está entre 20 y 500 unidades (inclusive). ¿Cuál valor representa un valor frontera válido?",
  "answers": [
    {"name": "19"},
    {"name": "20"},
    {"name": "500"},
    {"name": "501"}
  ],
  "correctAnswer": 1
}', 3);

-- Pregunta 6: BVA - Sistema de movilidad (nivel de batería)
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'dumbbell' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un sistema de bicicletas eléctricas limita la activación según la batería. La tabla muestra los estados del sistema. Completa: Un nivel de 34% se encuentra en la zona ____ porque está ____ del límite de 35%.",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson2/tabla-estados-bateria.png",
    "alt": "Tabla mostrando tres estados: Disponible (≥35%), Reserva (20-34%), Bloqueada (<20%)",
    "caption": "Tabla 1: Estados del sistema según nivel de batería"
  },
  "answerTiles": ["reserva", "disponible", "debajo", "por encima", "cerca"],
  "correctAnswerIndices": [0, 2]
}', 4);

-- ============================================================================
-- UNIT 3 - LESSON 3 (TROPHY) - Flujos Secuenciales y Reglas Encadenadas
-- ============================================================================

-- Bloque Recordatorio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Flujos Secuenciales y Reglas Encadenadas",
  "introduction": "Los sistemas complejos implementan flujos donde múltiples reglas se evalúan en secuencia, determinando el estado siguiente del proceso. Estas reglas encadenadas requieren identificar umbrales, tramos y valores frontera que activan transiciones entre estados, así como validar parámetros que controlan el comportamiento del flujo.",
  "objectives": [
    "Identificar valores que activan estados específicos en flujos de aprobación",
    "Reconocer límites entre tramos de clasificación y sus puntos de transición",
    "Validar parámetros de API según rangos operativos definidos"
  ]
}', 1);

-- Pregunta 1: EP/BVA - Flujo de aprobación de solicitudes académicas
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un portal académico procesa solicitudes según el promedio enviado por el estudiante. El sistema clasifica el promedio comparándolo con umbrales definidos para cada estado del flujo. La tabla muestra los umbrales. ¿Cuál de las siguientes entradas produce un salto directo al estado Aprobación directa, según los límites establecidos?",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson3/tabla-umbrales-flujo.png",
    "alt": "Tabla mostrando tres estados del sistema: Revisión inicial (<60), Revisión completa (60-79), Aprobación directa (≥80)",
    "caption": "Tabla 1: Umbrales del flujo de aprobación académica"
  },
  "answers": [
    {"name": "59"},
    {"name": "60"},
    {"name": "80"},
    {"name": "79"}
  ],
  "correctAnswer": 2
}', 2);

-- Pregunta 2: BVA - Tramos de calidad del servicio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un sistema de soporte clasifica los puntajes de satisfacción en tramos, determinando diferentes acciones automáticas según el límite alcanzado. El diagrama muestra los tramos. Completa: El sistema activa el tramo Intermedio cuando el puntaje supera el umbral que inicia en ____, y cambia al tramo Avanzado al alcanzar ____. El valor 89 se encuentra dentro del tramo ____.",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson3/diagrama-tramos-calidad.png",
    "alt": "Diagrama mostrando tres tramos: Básico (0-49), Intermedio (50-89), Avanzado (90-100)",
    "caption": "Diagrama 1: Tramos de calidad del servicio"
  },
  "answerTiles": ["Básico", "Intermedio", "Avanzado", "49", "50", "89", "90"],
  "correctAnswerIndices": [4, 6, 1]
}', 3);

-- Pregunta 3: EP/BVA - Flujos condicionales en seguimiento de actividad física
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Una app de salud ajusta el plan diario según los minutos reportados por el usuario. Cada rango activa un tipo distinto de recomendación automática. La tabla muestra los rangos del sistema. ¿Cuál de los siguientes valores está justo por debajo del límite que activa la recomendación Intensiva?",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson3/tabla-rangos-actividad.png",
    "alt": "Tabla mostrando tres tipos de recomendación: Ligera (0-29 min), Moderada (30-59 min), Intensiva (≥60 min)",
    "caption": "Tabla 2: Rangos de actividad física y recomendaciones"
  },
  "answers": [
    {"name": "29"},
    {"name": "30"},
    {"name": "59"},
    {"name": "60"}
  ],
  "correctAnswer": 2
}', 4);

-- Pregunta 4: EP/BVA + API - Validación de parámetro retryCount
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un endpoint de autenticación controla el número de intentos consecutivos mediante el parámetro retryCount, el cual debe respetar un rango operativo interno del backend. El esquema muestra el endpoint y la tabla define el rango operativo. Completa: El parámetro retryCount debe mantenerse entre ____ y ____ para que la petición avance sin activar controles adicionales. Un valor de 6 se ubica ____ de este rango.",
  "image": {
    "src": "/assets/lessons/moduleA/unit3/lesson3/esquema-endpoint-retrycount.png",
    "alt": "Esquema del endpoint POST /auth/login con body JSON mostrando parámetros username, password, retryCount, y tabla con límites 0 (inferior) y 5 (superior)",
    "caption": "Esquema 1: Endpoint de autenticación y rango operativo del parámetro retryCount"
  },
  "answerTiles": ["0", "1", "5", "6", "dentro", "fuera"],
  "correctAnswerIndices": [0, 2, 5]
}', 5);

-- ============================================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================================