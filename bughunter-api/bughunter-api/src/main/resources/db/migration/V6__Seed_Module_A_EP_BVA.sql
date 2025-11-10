-- ============================================================================
-- Migration: V6__Seed_Module_A_EP_BVA.sql
-- Description: Inserta el contenido teórico del Módulo A (Equivalencia y Valores Límite)
-- Author: BugHunter Saga Team
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

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
(1, 1, 'Conceptos Fundamentales de Equivalencia y Valores Límite'),
(1, 2, 'Aplicación Práctica de Clases de Equivalencia'),
(1, 3, 'Análisis Avanzado de Valores Límite y BVA Robusto');

-- 3. CREAR LECCIONES
INSERT INTO lessons (unit_id, type, description, position) VALUES
-- UNIT 1
(1, 'book', 'Fundamento Teórico de la Partición de Equivalencia', 1),
(1, 'star', 'Definiciones y Propósito de la Técnica de Equivalencia', 2),
(1, 'trophy', 'Evaluación: Fundamentos Teóricos de Equivalencia', 3),
(1, 'treasure', 'Cofre del Tesoro: Unidad 1', 4),

-- UNIT 2
(2, 'book', 'Tipos Teóricos y Aplicaciones de Clases de Equivalencia', 1),
(2, 'star', 'Ejercicios Prácticos: Clases Válidas e Inválidas', 2),
(2, 'trophy', 'Evaluación: Casos Prácticos de Equivalencia', 3),
(2, 'treasure', 'Cofre del Tesoro: Unidad 2', 4),

-- UNIT 3
(3, 'book', 'Fundamento del Análisis de Valores Límite', 1),
(3, 'star', 'Aplicación y Relación entre Equivalencia y BVA', 2),
(3, 'trophy', 'Evaluación: BVA y Análisis Robusto', 3),
(3, 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS
-- (Se incluyen problemas para todas las lecciones, incluyendo las tipo TROPHY)

-- ============================================================
-- UNIT 1
-- ============================================================

-- BOOK (lesson_id 1)
INSERT INTO problems (lesson_id, type, content, position) VALUES
(1, 'INFO', '{
  "title": "Definición de Partición de Equivalencia",
  "content": "La Partición de Equivalencia divide el dominio de entrada en clases o grupos con comportamiento esperado similar.",
  "example": "Por ejemplo, valores positivos, cero y negativos representan tres clases."
}', 1),
(1, 'FILL_IN_THE_BLANK', '{
  "question": "Una clase de equivalencia agrupa datos que se ___ de manera similar frente al sistema.",
  "tiles": ["procesan", "comportan", "repiten"],
  "correctIndices": [1]
}', 2),
(1, 'MULTIPLE_CHOICE', '{
  "question": "¿Qué representa conceptualmente una clase de equivalencia?",
  "options": [
    "Un conjunto de datos con comportamiento similar frente al sistema",
    "Un grupo de datos sin relación funcional",
    "Un conjunto aleatorio de valores no estructurados",
    "Un subconjunto de entradas inválidas"
  ],
  "correctAnswer": 0
}', 3),
(1, 'MULTIPLE_CHOICE', '{
  "question": "¿Cuál es el propósito teórico de la partición de equivalencia?",
  "options": [
    "Reducir redundancia en las pruebas representando comportamientos equivalentes",
    "Aumentar el número de casos posibles",
    "Ignorar los datos inválidos",
    "Clasificar valores por tipo de variable"
  ],
  "correctAnswer": 0
}', 4);

-- STAR (lesson_id 2)
INSERT INTO problems (lesson_id, type, content, position) VALUES
(2, 'INFO', '{
  "title": "Propósito Conceptual",
  "content": "El propósito teórico de la Partición de Equivalencia es representar el comportamiento del sistema mediante subconjuntos de datos equivalentes.",
  "example": "Evita probar todos los valores posibles reduciendo redundancia."
}', 1),
(2, 'FILL_IN_THE_BLANK', '{
  "question": "El diseño de clases de equivalencia permite reducir el número de ___ requeridas para cubrir el dominio.",
  "tiles": ["pruebas", "funciones", "entradas"],
  "correctIndices": [0]
}', 2),
(2, 'MULTIPLE_CHOICE', '{
  "question": "¿Qué diferencia a una clase válida de una inválida?",
  "options": [
    "Las válidas cumplen las condiciones del dominio permitido, las inválidas no",
    "Las válidas son más amplias que las inválidas",
    "No existe distinción entre clases válidas e inválidas",
    "Ambas generan errores"
  ],
  "correctAnswer": 0
}', 3),
(2, 'MULTIPLE_CHOICE', '{
  "question": "¿Qué beneficio teórico aporta la técnica?",
  "options": [
    "Permite identificar regiones de entrada equivalentes",
    "Duplica el número de pruebas necesarias",
    "Se usa solo en validación estática",
    "Elimina la necesidad de documentación"
  ],
  "correctAnswer": 0
}', 4);

-- TROPHY (lesson_id 3)
INSERT INTO problems (lesson_id, type, content, position) VALUES
(3, 'INFO', '{
  "title": "Evaluación de Fundamentos de Equivalencia",
  "content": "Evalúa tu comprensión de los conceptos básicos de la técnica de Partición de Equivalencia."
}', 1),
(3, 'FILL_IN_THE_BLANK', '{
  "question": "El objetivo de la partición de equivalencia es reducir la ___ en el conjunto de pruebas.",
  "tiles": ["redundancia", "complejidad", "aleatoriedad"],
  "correctIndices": [0]
}', 2),
(3, 'MULTIPLE_CHOICE', '{
  "question": "¿Cuál de las siguientes afirmaciones describe mejor una clase de equivalencia válida?",
  "options": [
    "Contiene datos dentro del dominio permitido",
    "Incluye valores fuera de los límites definidos",
    "No tiene relación con los datos de entrada",
    "Depende de la función hash del sistema"
  ],
  "correctAnswer": 0
}', 3),
(3, 'MULTIPLE_CHOICE', '{
  "question": "¿Qué sucede si una clase de equivalencia no está bien definida?",
  "options": [
    "Las pruebas pueden omitir comportamientos importantes del sistema",
    "El sistema se vuelve más rápido",
    "Se eliminan automáticamente las entradas inválidas",
    "No afecta los resultados de prueba"
  ],
  "correctAnswer": 0
}', 4);

-- ============================================================
-- UNIT 2
-- ============================================================

-- TROPHY (lesson_id 7)
INSERT INTO problems (lesson_id, type, content, position) VALUES
(7, 'INFO', '{
  "title": "Evaluación de Clases de Equivalencia",
  "content": "Evalúa tu capacidad para aplicar correctamente los principios de identificación de clases válidas e inválidas."
}', 1),
(7, 'FILL_IN_THE_BLANK', '{
  "question": "Las clases de equivalencia inválidas prueban la ___ del sistema ante entradas no permitidas.",
  "tiles": ["robustez", "eficiencia", "velocidad"],
  "correctIndices": [0]
}', 2),
(7, 'MULTIPLE_CHOICE', '{
  "question": "¿Qué representa una clase inválida correctamente identificada?",
  "options": [
    "Un conjunto de valores que provocan un comportamiento erróneo controlado",
    "Un subconjunto de valores válidos",
    "Una categoría de datos no relevantes",
    "Un rango de valores que no afecta el sistema"
  ],
  "correctAnswer": 0
}', 3),
(7, 'MULTIPLE_CHOICE', '{
  "question": "¿Por qué es importante mantener la trazabilidad entre clases válidas e inválidas?",
  "options": [
    "Permite asegurar una cobertura completa de los dominios de prueba",
    "Evita duplicar el código de prueba",
    "Reduce el número de entradas",
    "Simplifica los reportes de errores"
  ],
  "correctAnswer": 0
}', 4);

-- ============================================================
-- UNIT 3
-- ============================================================

-- TROPHY (lesson_id 11)
INSERT INTO problems (lesson_id, type, content, position) VALUES
(11, 'INFO', '{
  "title": "Evaluación de Análisis de Valores Límite",
  "content": "Evalúa tu comprensión de los fundamentos y aplicación del análisis BVA."
}', 1),
(11, 'FILL_IN_THE_BLANK', '{
  "question": "El enfoque BVA se centra en los valores más ___ del rango permitido.",
  "tiles": ["extremos", "internos", "medios"],
  "correctIndices": [0]
}', 2),
(11, 'MULTIPLE_CHOICE', '{
  "question": "¿Cuál es la diferencia entre BVA normal y robusto?",
  "options": [
    "El robusto incluye valores fuera del rango permitido",
    "No existe diferencia",
    "El normal prueba solo casos negativos",
    "El robusto ignora límites"
  ],
  "correctAnswer": 0
}', 3),
(11, 'MULTIPLE_CHOICE', '{
  "question": "¿Por qué los valores límite son relevantes?",
  "options": [
    "Porque los errores suelen concentrarse en los puntos extremos del dominio de entrada",
    "Porque simplifican el diseño de base de datos",
    "Porque eliminan redundancias lógicas",
    "Porque son útiles solo en teoría"
  ],
  "correctAnswer": 0
}', 4);
-- ============================================================================
