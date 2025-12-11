-- ============================================================================
-- Migration: V8__Seed_Module_C_Statement_Testing.sql
-- Description: Inserta el contenido del Módulo C - Control de Flujo en Java
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO C
INSERT INTO modules (code, name, description, ui_config) VALUES
('moduleC', 'Pruebas de Rama',
'Técnica de caja blanca enfocada en decisiones, condiciones y flujo lógico en Java.',
'{
  "icon": "🔀",
  "color": "purple",
  "backgroundColor": "bg-purple-500",
  "borderColor": "border-purple-700",
  "textColor": "text-white"
}');

-- ============================================================================
-- 2. CREAR UNIDADES (3)
-- ============================================================================
INSERT INTO units (module_id, unit_number, description) VALUES
((SELECT id FROM modules WHERE code = 'moduleC'), 1, 'Fundamentos de Condicionales'),
((SELECT id FROM modules WHERE code = 'moduleC'), 2, 'Control Intermedio: Switch y Anidamientos'),
((SELECT id FROM modules WHERE code = 'moduleC'), 3, 'Ramas Complejas y Condiciones Avanzadas');

-- ============================================================================
-- 3. CREAR LECCIONES (3 por unidad: book, dumbbell, treasure)
-- ============================================================================
-- UNIT 1
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'book', 'Conceptos Básicos', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'dumbbell', 'Práctica Intermedia', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 1 LIMIT 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 3);

-- UNIT 2
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'book', 'Estructuras Switch y Anidamientos', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'dumbbell', 'Análisis de Ramas Intermedias', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 2 LIMIT 1), 'treasure', 'Cofre del Tesoro: Unidad 2', 3);

-- UNIT 3
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'book', 'Condiciones Avanzadas', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'dumbbell', 'Análisis de Ramas Complejas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleC') AND unit_number = 3 LIMIT 1), 'treasure', 'Cofre del Tesoro: Unidad 3', 3);

-- ============================================================================
-- 4. CREAR PROBLEMAS - UNIDAD 1 (Preguntas 1-10)
-- ============================================================================

-- ========== UNIT 1 - BOOK (INFO + 4 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Conceptos Básicos' AND type = 'book' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Nivel 1",
  "introduction": "Comencemos con los fundamentos de las condicionales en Java. Aprenderás sobre estructuras if-else, operadores de comparación y operadores lógicos básicos.",
  "objectives": ["Comprender palabras clave condicionales", "Dominar operadores de comparación", "Conocer operadores lógicos básicos", "Evaluar expresiones booleanas simples"]
}', 1);

-- PREGUNTA 1
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Conceptos Básicos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué palabra clave se usa para una condición en Java?",
  "answers": [
    {"name": "when"},
    {"name": "if"},
    {"name": "check"},
    {"name": "cond"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 2
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Conceptos Básicos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el operador para \"igualdad\" en Java?",
  "answers": [
    {"name": "="},
    {"name": "=="},
    {"name": "==="},
    {"name": ":="}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 3
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Conceptos Básicos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué hace este código?<br><br<span style=\"background: #1e1e1e; color: #ce9178; padding: 8px 12px; border-radius: 4px; font-family: Consolas, monospace; font-size: 14px; display: inline-block; border-left: 3px solid #9966cc;\">if (x > 10) { ... }</span>",
  "answers": [
    {"name": "Ejecuta el bloque si x es menor que 10"},
    {"name": "Ejecuta el bloque siempre"},
    {"name": "Ejecuta el bloque si x es mayor que 10"},
    {"name": "No compila"}
  ],
  "correctAnswer": 2
}', 4);

-- PREGUNTA 4
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Conceptos Básicos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de estos es un operador lógico?",
  "answers": [
    {"name": "+"},
    {"name": "&&"},
    {"name": "%"},
    {"name": ""}
  ],
  "correctAnswer": 1
}', 5);

-- ========== UNIT 1 - DUMBBELL (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Práctica Intermedia' AND type = 'dumbbell' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Nivel 1 Continúa",
  "introduction": "Sigue practicando con más ejercicios sobre condicionales y operadores lógicos.",
  "objectives": ["Aplicar estructuras if-else", "Comprender la negación lógica", "Evaluar expresiones mixtas"]
}', 1);

-- PREGUNTA 5
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Práctica Intermedia' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime este código si x = 5?<br><br><pre class=\"code-block\">if (x &lt; 10) {<br>  System.out.println(\"Menor\");<br>} else {<br>  System.out.println(\"Mayor\");<br>}</pre>",
  "answers": [
    {"name": "Menor"},
    {"name": "Mayor"},
    {"name": "Error"},
    {"name": "Nada"}
  ],
  "correctAnswer": 0
}', 2);

-- PREGUNTA 6
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Práctica Intermedia' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál estructura permite varias condiciones seguidas?",
  "answers": [
    {"name": "if – else if – else"},
    {"name": "repeat – else"},
    {"name": "switch – repeat"},
    {"name": "loop – case"}
  ],
  "correctAnswer": 0
}', 3);

-- PREGUNTA 7
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Práctica Intermedia' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Para qué sirve el operador !=?",
  "answers": [
    {"name": "Asignar"},
    {"name": "Restar"},
    {"name": "Es diferente"},
    {"name": "Comparar cadenas"}
  ],
  "correctAnswer": 2
}', 4);

-- ========== UNIT 1 - TREASURE (INFO + 2 bonus + treasure reward) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 1' AND type = 'treasure' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Desafío Final Unidad 1",
  "introduction": "¡Casi estamos! Resuelve estos últimos desafíos para desbloquear el Cofre del Tesoro.",
  "objectives": ["Evaluar expresiones complejas", "Comprender precedencia de operadores"]
}', 1);

-- PREGUNTA 8
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 1' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué evalúa este código?<br><br><pre class=\"code-block\">if (a == b &amp;&amp; b == c)</pre>",
  "answers": [
    {"name": "Si al menos uno es igual"},
    {"name": "Si todos son distintos"},
    {"name": "Si a, b, c son iguales"},
    {"name": "Si a es mayor que c"}
  ],
  "correctAnswer": 2
}', 2);

-- PREGUNTA 9
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 1' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué palabra permite una alternativa cuando el if no se cumple?",
  "answers": [
    {"name": "swap"},
    {"name": "retry"},
    {"name": "else"},
    {"name": "option"}
  ],
  "correctAnswer": 2
}', 3);

-- PREGUNTA 10
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 1' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime el siguiente código si x=0?<br><br><pre class=\"code-block\">if (x &gt; 0) System.out.println(\"Positivo\");<br>else System.out.println(\"No positivo\");</pre>",
  "answers": [
    {"name": "Positivo"},
    {"name": "Error"},
    {"name": "0"},
    {"name": "No positivo"}
  ],
  "correctAnswer": 3
}', 4);

-- ============================================================================
-- 5. CREAR PROBLEMAS - UNIDAD 2 (Preguntas 11-20)
-- ============================================================================

-- ========== UNIT 2 - BOOK (INFO + 4 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Estructuras Switch y Anidamientos' AND type = 'book' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Nivel 2",
  "introduction": "Avancemos con control de flujo más complejo. Exploraremos estructuras switch, anidamientos de if-else y análisis de ramas más detallado.",
  "objectives": ["Dominar la estructura switch", "Entender anidamientos condicionales", "Analizar flujo de control con múltiples decisiones", "Detectar problemas con fall-through en switch"]
}', 1);

-- PREGUNTA 11
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Estructuras Switch y Anidamientos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué estructura es más adecuada para comparar un número con varios valores exactos?",
  "answers": [
    {"name": "for"},
    {"name": "while"},
    {"name": "switch"},
    {"name": "do–while"}
  ],
  "correctAnswer": 2
}', 2);

-- PREGUNTA 12
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Estructuras Switch y Anidamientos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime este código?<br><br><pre class=\"code-block\">int x = 3;<br>switch(x) {<br>  case 1: System.out.println(\"Uno\"); break;<br>  case 2: System.out.println(\"Dos\"); break;<br>  default: System.out.println(\"Otro\");<br>}</pre>",
  "answers": [
    {"name": "Uno"},
    {"name": "Dos"},
    {"name": "Otro"},
    {"name": "Nada"}
  ],
  "correctAnswer": 2
}', 3);

-- PREGUNTA 13
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Estructuras Switch y Anidamientos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué sucede si falta el break en un switch?",
  "answers": [
    {"name": "Error fatal"},
    {"name": "Salta al siguiente case"},
    {"name": "No ejecuta nada"},
    {"name": "Se repite infinitamente"}
  ],
  "correctAnswer": 1
}', 4);

-- PREGUNTA 14
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Estructuras Switch y Anidamientos' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si x=15?<br><br><pre class=\"code-block\">if (x &gt; 10)<br>  if (x &lt; 20)<br>    System.out.println(\"Rango\");<br>  else<br>    System.out.println(\"Fuera\");</pre>",
  "answers": [
    {"name": "Rango"},
    {"name": "Fuera"},
    {"name": "Error"},
    {"name": "Nada"}
  ],
  "correctAnswer": 0
}', 5);

-- ========== UNIT 2 - DUMBBELL (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Intermedias' AND type = 'dumbbell' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Nivel 2 Continúa",
  "introduction": "Profundiza en el análisis de ramas y operadores lógicos complejos.",
  "objectives": ["Comprender operadores lógicos avanzados", "Analizar flujos de decisión múltiples", "Identificar patrones de evaluación"]
}', 1);

-- PREGUNTA 15
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Intermedias' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de estos es un operador OR?",
  "answers": [
    {"name": "&&"},
    {"name": "||"},
    {"name": "++"},
    {"name": "<>"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 16
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Intermedias' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime?<br><br><pre class=\"code-block\">x=4<br><br>if (x%2==0) System.out.println(\"Par\");<br>else System.out.println(\"Impar\");</pre>",
  "answers": [
    {"name": "Par"},
    {"name": "Impar"},
    {"name": "Nada"},
    {"name": "Error"}
  ],
  "correctAnswer": 0
}', 3);

-- PREGUNTA 17
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Intermedias' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué significa rama (branch) en pruebas?",
  "answers": [
    {"name": "Probar memoria"},
    {"name": "Probar todas las decisiones posibles"},
    {"name": "Probar rendimiento"},
    {"name": "Probar gráficos"}
  ],
  "correctAnswer": 1
}', 4);

-- ========== UNIT 2 - TREASURE (INFO + 2 bonus + treasure reward) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 2' AND type = 'treasure' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Desafío Final Unidad 2",
  "introduction": "¡Casi al final! Completa estos desafíos para abrir el Cofre del Tesoro de la Unidad 2.",
  "objectives": ["Aplicar conocimiento de operadores lógicos", "Resolver problemas de lógica compleja"]
}', 1);

-- PREGUNTA 18
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 2' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué código detecta si un número NO está entre 5 y 10?",
  "answers": [
    {"name": "x > 5 && x < 10"},
    {"name": "x < 5 || x > 10"},
    {"name": "x == 5 && x == 10"},
    {"name": "!(x>10)"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 19
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 2' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es válido?",
  "answers": [
    {"name": "if (x = 5)"},
    {"name": "if x == 5"},
    {"name": "if (x == 5)"},
    {"name": "if: x == 5"}
  ],
  "correctAnswer": 2
}', 3);

-- PREGUNTA 20
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 2' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime?<br><br><pre class=\"code-block\">x=7<br><br>if (x &gt; 10)<br>  System.out.println(\"A\");<br>else if (x &gt; 5)<br>  System.out.println(\"B\");<br>else<br>  System.out.println(\"C\");</pre>",
  "answers": [
    {"name": "A"},
    {"name": "B"},
    {"name": "C"},
    {"name": "Nada"}
  ],
  "correctAnswer": 1
}', 4);

-- ============================================================================
-- 6. CREAR PROBLEMAS - UNIDAD 3 (Preguntas 21-30)
-- ============================================================================

-- ========== UNIT 3 - BOOK (INFO + 4 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Condiciones Avanzadas' AND type = 'book' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Nivel 3",
  "introduction": "Alcancemos el máximo nivel de complejidad en control de flujo. Analizaremos condiciones compuestas, prioridad de operadores, anidamientos profundos y equivalencia lógica.",
  "objectives": ["Evaluar expresiones lógicas complejas", "Comprender prioridad de operadores", "Dominar anidamientos profundos", "Aplicar negación lógica", "Pruebas exhaustivas de ramas"]
}', 1);

-- PREGUNTA 21
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Condiciones Avanzadas' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si a=5, b=5, c=10?<br><br><pre class=\"code-block\">if (a==b || b==c &amp;&amp; a&lt;c)<br>  System.out.println(\"OK\");<br>else<br>  System.out.println(\"NO\");</pre>",
  "answers": [
    {"name": "OK"},
    {"name": "NO"},
    {"name": "Error"},
    {"name": "Nada"}
  ],
  "correctAnswer": 0
}', 2);

-- PREGUNTA 22
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Condiciones Avanzadas' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué evalúa primero Java en esta expresión?<br><br><pre class=\"code-block\">a == b || b &lt; c &amp;&amp; c &gt; a</pre>",
  "answers": [
    {"name": "||"},
    {"name": "&&"},
    {"name": "=="},
    {"name": "Ninguno"}
  ],
  "correctAnswer": 1
}', 3);

-- PREGUNTA 23
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Condiciones Avanzadas' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Resultado si x=3, y=9?<br><br><pre class=\"code-block\">if (x&lt;5)<br>  if (y&gt;10)<br>    System.out.println(\"A\");<br>  else<br>    System.out.println(\"B\");<br>else<br>  System.out.println(\"C\");</pre>",
  "answers": [
    {"name": "A"},
    {"name": "B"},
    {"name": "C"},
    {"name": "Nada"}
  ],
  "correctAnswer": 1
}', 4);

-- PREGUNTA 24
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Condiciones Avanzadas' AND type = 'book' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si x=0?<br><br><pre class=\"code-block\">if (x &gt;= 0)<br>  if (x == 0)<br>    System.out.println(\"Cero\");<br>  else<br>    System.out.println(\"Positivo\");<br>else<br>  System.out.println(\"Negativo\");</pre>",
  "answers": [
    {"name": "Cero"},
    {"name": "Positivo"},
    {"name": "Negativo"},
    {"name": "Error"}
  ],
  "correctAnswer": 0
}', 5);

-- ========== UNIT 3 - DUMBBELL (INFO + 3 preguntas) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Complejas' AND type = 'dumbbell' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Nivel 3 Continúa",
  "introduction": "Resuelve los problemas más desafiantes de lógica de control de flujo.",
  "objectives": ["Analizar negación lógica", "Aplicar equivalencias lógicas", "Resolver casos anidados complejos"]
}', 1);

-- PREGUNTA 25
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Complejas' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál condición verifica que un número esté FUERA del rango [1,100]?",
  "answers": [
    {"name": "x>1 && x<100"},
    {"name": "x<1 || x>100"},
    {"name": "x==50"},
    {"name": "!(x<100)"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 26
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Complejas' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime si a=4, b=2, c=8?<br><br><pre class=\"code-block\">if (a&gt;b &amp;&amp; b&lt;c &amp;&amp; a&lt;c)<br>  System.out.println(\"Correcto\");<br>else<br>  System.out.println(\"Incorrecto\");</pre>",
  "answers": [
    {"name": "Correcto"},
    {"name": "Incorrecto"},
    {"name": "Error"},
    {"name": "Nada"}
  ],
  "correctAnswer": 0
}', 3);

-- PREGUNTA 27
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Análisis de Ramas Complejas' AND type = 'dumbbell' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es un ejemplo de prueba de rama?",
  "answers": [
    {"name": "Verificar si un ciclo termina"},
    {"name": "Probar cada posible camino de decisiones"},
    {"name": "Medir el tiempo del código"},
    {"name": "Revisar comentarios"}
  ],
  "correctAnswer": 1
}', 4);

-- ========== UNIT 3 - TREASURE (INFO + 2 bonus + treasure reward) ==========
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 3' AND type = 'treasure' LIMIT 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo C - Desafío Final Unidad 3",
  "introduction": "¡El último desafío! Demuestra tu dominio total del control de flujo y abre el Cofre del Tesoro final.",
  "objectives": ["Resolver problemas de lógica extremadamente complejos", "Aplicar todos los conceptos aprendidos"]
}', 1);

-- PREGUNTA 28
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 3' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime?<br><br><pre class=\"code-block\">x=12<br><br>if (x%3==0 &amp;&amp; x%4==0)<br>  System.out.println(\"Múltiplo de ambos\");<br>else<br>  System.out.println(\"No múltiplo\");</pre>",
  "answers": [
    {"name": "No múltiplo"},
    {"name": "Múltiplo de ambos"},
    {"name": "Error"},
    {"name": "Nada"}
  ],
  "correctAnswer": 1
}', 2);

-- PREGUNTA 29
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 3' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es equivalente a !(x > 5)?",
  "answers": [
    {"name": "x >= 5"},
    {"name": "x < 5"},
    {"name": "x <= 5"},
    {"name": "x == 5"}
  ],
  "correctAnswer": 2
}', 3);

-- PREGUNTA 30
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE description = 'Cofre del Tesoro: Unidad 3' AND type = 'treasure' LIMIT 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué imprime?<br><br><pre class=\"code-block\">a=2, b=4, c=6<br><br>if (a&lt;b)<br>  if (b&lt;c)<br>    System.out.println(\"Cadena correcta\");<br>  else<br>    System.out.println(\"Problema\");<br>else<br>  System.out.println(\"Fuera\");</pre>",
  "answers": [
    {"name": "Cadena correcta"},
    {"name": "Problema"},
    {"name": "Fuera"},
    {"name": "Nada"}
  ],
  "correctAnswer": 0
}', 4);