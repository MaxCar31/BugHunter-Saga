-- ============================================================================
-- Migration: V5__Seed_Module_B_Decision_Tables.sql
-- Description: Inserta el contenido del Módulo B (Tablas de Decisión)
-- Author: BugHunter Saga Team
-- ============================================================================

-- 1. CREAR MÓDULO B
INSERT INTO modules (code, name, description, ui_config) VALUES
    ('mod-b', 'Tablas de Decisión',
     'Técnica de caja negra para reglas de negocio complejas.',
     '{"backgroundColor": "bg-green-500", "icon": "🔲", "color": "green"}');

-- 2. CREAR UNIDADES
INSERT INTO units (module_id, unit_number, description) VALUES
    (2, 1, 'Modelando Lógica Compleja');

-- 3. CREAR LECCIONES (IDs 9, 10, 11)
INSERT INTO lessons (unit_id, type, description, position) VALUES
                                                               (5, 'book', 'Introducción a Tablas de Decisión', 1),
                                                               (5, 'star', 'Crea tu Primera Tabla', 2),
                                                               (5, 'fast-forward', 'Desafío Rápido: Reglas Complejas', 3);

-- 4. CREAR PROBLEMAS
INSERT INTO problems (lesson_id, type, content, position) VALUES
                                                              (9, 'INFO', '{"title": "Tablas de Decisión", "content": "Las tablas de decisión modelan lógica compleja con múltiples condiciones...", "example": "Sistema de descuentos: Cliente VIP + Compra > $100 + Cupón = 30% descuento"}', 1),
                                                              (10, 'SELECT_1_OF_3', '{"question": "Si tienes 3 condiciones de entrada (ej. V/F, V/F, V/F), ¿cuántas reglas (columnas) necesitas?", "options": [{"id": "a", "text": "3 reglas"}, {"id": "b", "text": "6 reglas"}, {"id": "c", "text": "8 reglas (2^3)"}], "correctAnswer": "c", "explanation": "El número de reglas es 2 elevado al número de condiciones binarias (2^3 = 8)."}', 1),
                                                              (10, 'FILL_IN_THE_BLANK', '{"question": "Una tabla de decisión se divide en 4 cuadrantes: Condiciones, Acciones, Reglas de Condición y Reglas de ___.", "blanks": ["respuesta"], "correctAnswers": ["Acción"], "hint": "Las condiciones de entrada guían a las... de salida."}', 2),
                                                              (11, 'MATCH_PAIRS', '{"title": "Empareja la Regla con la Acción", "prompt": "Para un descuento de aerolínea:", "pairs": [{"id": "p1", "prompt": "Regla 1: (VIP = SI, Vuelo Lleno = SI)"}, {"id": "p2", "prompt": "Regla 2: (VIP = SI, Vuelo Lleno = NO)"}, {"id": "p3", "prompt": "Regla 3: (VIP = NO, Vuelo Lleno = SI)"}, {"id": "p4", "prompt": "Regla 4: (VIP = NO, Vuelo Lleno = NO)"}], "answers": [{"id": "a1", "text": "Acción: Dar Upgrade a 1ra Clase"}, {"id": "a2", "text": "Acción: Ofrecer 10% descuento"}, {"id": "a3", "text": "Acción: Poner en lista de espera"}, {"id": "a4", "text": "Acción: No hacer nada"}], "correctMapping": {"p1": "a1", "p2": "a2", "p3": "a3", "p4": "a4"}}', 1),
                                                              (11, 'SELECT_1_OF_3', '{"question": "¿Cuál es el principal beneficio de las Tablas de Decisión?", "options": [{"id": "a", "text": "Probar el rendimiento."}, {"id": "b", "text": "Garantizar que no se olvide ninguna combinación de reglas de negocio."}, {"id": "c", "text": "Probar cada línea de código."}], "correctAnswer": "b", "explanation": "Son ideales para sistemas con lógica de negocio compleja (muchos IF-ELSE)."}', 2),
                                                              (11, 'INFO', '{"title": "Simplificación de Reglas", "content": "A veces, el valor de una condición no importa (se marca con ''-'')...", "example": "Regla: (Condición: VIP = NO, Condición: Compra > 100 = ''-''), Acción: (Acceso Denegado = SÍ)"}', 3);