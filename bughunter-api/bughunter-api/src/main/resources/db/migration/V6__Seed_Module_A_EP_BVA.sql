-- ============================================================================
-- Migration: V6__Seed_Module_A_EP_BVA.sql
-- Description: Inserta el contenido teórico del Módulo A (Equivalencia y Valores Límite)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO A
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleA', 'Partición de Equivalencia y Valores Límite',
 'Comprende los fundamentos teóricos de las técnicas que optimizan el diseño de pruebas funcionales.',
 '{"backgroundColor": "bg-blue-500", "icon": "🎯", "color": "blue"}');

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
(1, 1, 'Conceptos Fundamentales de Equivalencia'),
(1, 2, 'Clasificación Teórica de Clases de Equivalencia'),
(1, 3, 'Conceptos Fundamentales de Valores Límite'),
(1, 4, 'Principios del BVA Robusto');

-- 3. CREAR LECCIONES
INSERT INTO lessons (unit_id, type, description, position) VALUES
(1, 'book', 'Fundamento Teórico de la Partición de Equivalencia', 1),
(1, 'star', 'Definiciones y Propósito de la Técnica de Equivalencia', 2),
(2, 'book', 'Tipos Teóricos de Clases de Equivalencia', 1),
(2, 'star', 'Formulación Conceptual de Clases Válidas e Inválidas', 2),
(3, 'book', 'Fundamento del Análisis de Valores Límite', 1),
(3, 'star', 'Relación Teórica entre Valores Límite y Equivalencia', 2),
(4, 'book', 'Principios Teóricos del BVA Robusto', 1),
(4, 'star', 'Interpretación Conceptual de los Límites Extremos', 2);

-- 4. CREAR PROBLEMAS
-- --- EQUIVALENCIA DE PARTICIONES ---
INSERT INTO problems (lesson_id, type, content, position) VALUES
-- INFO
(1, 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Definición de Partición de Equivalencia",
  "introduction": "La Partición de Equivalencia es una técnica teórica de diseño de pruebas que divide el dominio de entrada en clases o grupos con comportamiento esperado similar.",
  "objectives": ["Comprender el concepto teórico de clases de equivalencia"]
}', 1),
(1, 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Propósito Conceptual",
  "introduction": "El propósito teórico de la Partición de Equivalencia es representar el comportamiento del sistema mediante subconjuntos de datos equivalentes, evitando redundancias en la verificación.",
  "objectives": ["Entender la utilidad conceptual de la técnica"]
}', 2),

-- MULTIPLE_CHOICE
(2, 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué representa conceptualmente una clase de equivalencia?",
  "answers": [
    {"name": "Un conjunto de datos con comportamiento similar frente al sistema"},
    {"name": "Un grupo de datos sin relación funcional"},
    {"name": "Un conjunto aleatorio de valores no estructurados"}
  ],
  "correctAnswer": 0
}', 1),
(3, 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Desde un punto de vista teórico, ¿qué diferencia a una clase válida de una inválida?",
  "answers": [
    {"name": "Las válidas cumplen las condiciones del dominio permitido, las inválidas no"},
    {"name": "Las válidas son más amplias que las inválidas"},
    {"name": "No existe distinción entre clases válidas e inválidas"}
  ],
  "correctAnswer": 0
}', 1),

-- FILL_IN_THE_BLANK
(4, 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "La Partición de Equivalencia es una técnica de diseño de pruebas de ___ ___",
  "answerTiles": ["caja", "negra", "blanca"],
  "correctAnswerIndices": [0, 1]
}', 1),
(4, 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Cada clase de equivalencia agrupa datos que se ___ teóricamente de manera similar.",
  "answerTiles": ["comportan", "procesan", "repiten"],
  "correctAnswerIndices": [0]
}', 2);

-- --- VALORES LÍMITE ---
INSERT INTO problems (lesson_id, type, content, position) VALUES
-- INFO
(5, 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Concepto Teórico de Valores Límite",
  "introduction": "El Análisis de Valores Límite se fundamenta en la teoría de que los errores se manifiestan con mayor frecuencia en los límites de los rangos de entrada que en sus valores centrales.",
  "objectives": ["Analizar el principio teórico de los valores límite"]
}', 1),
(5, 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Relación Conceptual con la Equivalencia",
  "introduction": "El enfoque teórico de los Valores Límite complementa a la Equivalencia, al centrarse en los extremos de cada clase de datos válidos e inválidos.",
  "objectives": ["Relacionar conceptualmente la técnica de equivalencia y valores límite"]
}', 2),

-- MULTIPLE_CHOICE
(6, 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es la base teórica del Análisis de Valores Límite?",
  "answers": [
    {"name": "Los errores tienden a concentrarse en los puntos extremos de los rangos de entrada"},
    {"name": "Los errores se distribuyen de forma uniforme en todo el dominio"},
    {"name": "Los límites no influyen en el comportamiento del sistema"}
  ],
  "correctAnswer": 0
}', 1),

-- FILL_IN_THE_BLANK
(7, 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El análisis de Valores Límite se enfoca en los ___ de las clases de equivalencia.",
  "answerTiles": ["bordes", "centros", "promedios"],
  "correctAnswerIndices": [0]
}', 1),
(8, 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "El enfoque robusto del BVA analiza también valores ligeramente ___ del rango permitido.",
  "answerTiles": ["fuera", "dentro", "cerca"],
  "correctAnswerIndices": [0]
}', 1);
-- ============================================================================