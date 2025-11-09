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
(3, 1, 'Introducción a Cobertura de Sentencia'),
(3, 2, 'Cobertura de Decisión y Condición'),
(3, 3, 'Prácticas Avanzadas de Cobertura');

-- 3. CREAR LECCIONES
-- Unidad 1 (ya existente)
INSERT INTO lessons (unit_id, type, description, position) VALUES
(6, 'book', '¿Qué es la Cobertura de Sentencia?', 1),
(6, 'star', 'Calculando Cobertura', 2),
(6, 'star', 'Desafío de Código', 3);

-- Unidad 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
(7, 'book', 'Introducción a Cobertura de Decisión', 1),
(7, 'star', 'Cobertura de Condición vs Sentencia', 2);

-- Unidad 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
(8, 'book', 'Cobertura de Camino', 1),
(8, 'star', 'Ejemplo Práctico Final', 2);

-- 4. CREAR PROBLEMAS
INSERT INTO problems (lesson_id, type, content, position) VALUES

-- --- Lección 1 ---
(12, 'INFO',
'{
  "type": "INFO",
  "moduleTitle": "Pruebas de Sentencia",
  "introduction": "Es una técnica de prueba de CAJA BLANCA que mide el porcentaje de líneas de código ejecutadas al menos una vez por un conjunto de pruebas.",
  "objectives": ["Comprender la definición de cobertura de sentencia", "Relacionar la ejecución de líneas con el grado de cobertura"],
  "image": "/assets/white-box.png"
}', 
1),

-- --- Lección 2 ---
(13, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "Un programa tiene 100 líneas ejecutables. Un set de pruebas ejecuta 75. ¿Cuál es la cobertura de sentencia?",
  "answers": [
    {"name": "75%"},
    {"name": "100%"},
    {"name": "No se puede saber"}
  ],
  "correctAnswer": 0,
  "explanation": "Cobertura = (75 / 100) * 100 = 75%."
}', 
1),

(13, 'FILL_IN_THE_BLANK',
'{
  "type": "FILL_IN_THE_BLANK",
  "question": "Lograr 100% de cobertura de sentencia ___ que el software esté libre de bugs.",
  "answerTiles": ["garantiza", "no garantiza"],
  "correctAnswerIndices": [1],
  "explanation": "Ejecutar todas las líneas no asegura que la lógica sea correcta; solo que cada sentencia se ejecutó al menos una vez."
}', 
2),

-- --- Lección 3 ---
(14, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "Considera el siguiente código:\\n\\npublic int calcular(int x, int y) {\\n  int r = x;  // S1\\n  if (x > 5) {  // S2\\n    r = x + y;  // S3\\n  }\\n  return r;   // S4\\n}\\n\\n¿Qué caso de prueba (x, y) logra 100% de cobertura de sentencia?",
  "answers": [
    {"name": "x = 4, y = 10"},
    {"name": "x = 6, y = 10"},
    {"name": "x = 5, y = 10"}
  ],
  "correctAnswer": 1,
  "explanation": "El caso (6, 10) ejecuta todas las sentencias incluyendo S3, alcanzando 100% de cobertura."
}', 
1),

(14, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "Usando el mismo código, ¿qué caso de prueba logra la MENOR cobertura de sentencia?",
  "answers": [
    {"name": "x = 10, y = 2"},
    {"name": "x = 2, y = 2"}
  ],
  "correctAnswer": 1,
  "explanation": "El caso (2, 2) no ejecuta la línea S3, por lo tanto, logra menor cobertura (3 de 4 sentencias)."
}', 
2),

-- --- Unidad 2 - Lección 1 ---
(15, 'INFO',
'{
  "type": "INFO",
  "moduleTitle": "Cobertura de Decisión y Condición",
  "introduction": "La cobertura de decisión verifica si cada resultado posible de una condición (verdadero/falso) se ha ejecutado al menos una vez.",
  "objectives": ["Comprender la diferencia entre sentencia y decisión", "Evaluar casos de prueba con condiciones múltiples"],
  "image": "/assets/decision-coverage.png"
}', 
1),

-- --- Unidad 2 - Lección 2 ---
(16, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "Si una condición tiene dos expresiones lógicas, ¿cuántos resultados posibles debe cubrir una prueba para lograr 100% de cobertura de decisión?",
  "answers": [
    {"name": "1"},
    {"name": "2"},
    {"name": "4"}
  ],
  "correctAnswer": 1,
  "explanation": "Cada decisión (if) tiene dos resultados: verdadero y falso."
}', 
1),

(16, 'FILL_IN_THE_BLANK',
'{
  "type": "FILL_IN_THE_BLANK",
  "question": "La cobertura de condición analiza las ___ individuales dentro de una decisión compuesta.",
  "answerTiles": ["expresiones", "funciones", "clases"],
  "correctAnswerIndices": [0],
  "explanation": "Cada subexpresión dentro de una condición debe evaluarse en verdadero y falso al menos una vez."
}', 
2),

-- --- Unidad 3 - Lección 1 ---
(17, 'INFO',
'{
  "type": "INFO",
  "moduleTitle": "Cobertura de Camino",
  "introduction": "La cobertura de camino garantiza que todas las rutas posibles de ejecución se hayan recorrido al menos una vez.",
  "objectives": ["Entender qué es un camino de ejecución", "Distinguir entre cobertura de sentencia y de camino"],
  "image": "/assets/path-coverage.png"
}', 
1),

-- --- Unidad 3 - Lección 2 ---
(18, 'MULTIPLE_CHOICE',
'{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de las siguientes coberturas es más completa?",
  "answers": [
    {"name": "Cobertura de sentencia"},
    {"name": "Cobertura de decisión"},
    {"name": "Cobertura de camino"}
  ],
  "correctAnswer": 2,
  "explanation": "La cobertura de camino incluye todas las combinaciones de decisiones, por lo tanto, es la más completa."
}', 
1),

(18, 'FILL_IN_THE_BLANK',
'{
  "type": "FILL_IN_THE_BLANK",
  "question": "A mayor número de caminos posibles, ___ será lograr cobertura total.",
  "answerTiles": ["más fácil", "más difícil"],
  "correctAnswerIndices": [1],
  "explanation": "Mientras más compleja la lógica, mayor número de rutas; por ende, lograr 100% de cobertura de camino se vuelve más difícil."
}', 
2);
