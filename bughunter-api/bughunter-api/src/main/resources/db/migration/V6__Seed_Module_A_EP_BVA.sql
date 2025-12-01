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

-- UNIT 1 (MODIFICADA CON NUEVOS TÍTULOS)
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'book', 'Fundamentos del Dominio y su Rol en Particiones & Valores Frontera', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'star', 'Construcción Conceptual de Particiones de Equivalencia', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'trophy', 'Principios del Análisis de Valores Frontera en el Diseño de Pruebas', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1), 'treasure', 'Cofre del Tesoro: Unidad 1', 4);

-- UNIT 2 (SIN CAMBIOS)
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'book', 'Tipos Teóricos y Aplicaciones de Clases de Equivalencia', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'star', 'Ejercicios Prácticos: Clases Válidas e Inválidas', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'trophy', 'Evaluación: Casos Prácticos de Equivalencia', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2), 'treasure', 'Cofre del Tesoro: Unidad 2', 4);

-- UNIT 3 (SIN CAMBIOS)
INSERT INTO lessons (unit_id, type, description, position) VALUES
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'book', 'Fundamento del Análisis de Valores Límite', 1),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'star', 'Aplicación y Relación entre Equivalencia y BVA', 2),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'trophy', 'Evaluación: BVA y Análisis Robusto', 3),
((SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3), 'treasure', 'Cofre del Tesoro: Unidad 3', 4);

-- ============================================================================
-- 4. CREAR PROBLEMAS - UNIT 1 CON EJEMPLOS NO NUMÉRICOS EN INFO
-- ============================================================================

-- ==================== UNIT 1 - LESSON 1 (BOOK) ====================
-- Subtítulo 1: Reconocimiento del dominio
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Fundamentos del Dominio y su Rol en Particiones & Valores Frontera",
  "introduction": "El dominio de entrada representa el conjunto total de valores que el sistema está preparado para recibir y procesar, ya sea de forma válida o inválida.",
  "example": "En una plataforma que permite subir solo archivos PDF, DOCX y TXT, estos tipos representan el dominio válido. Archivos como MP3 o ZIP quedan fuera del dominio de aceptación.",
  "objectives": ["Comprender qué es el dominio de entrada", "Diferenciar entre valores válidos e inválidos del dominio"]
}', 1),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál de las siguientes opciones describe correctamente el dominio de entrada?",
  "answers": [
    {"name": "Los datos usados por los desarrolladores para hacer pruebas"},
    {"name": "Todos los valores que el sistema puede recibir y procesar"},
    {"name": "Los errores producidos durante el uso"},
    {"name": "Los valores almacenados en la base de datos"}
  ],
  "correctAnswer": 1
}', 2),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de los siguientes elementos pueden formar parte de un dominio de entrada en un sistema? (Selecciona todas las que apliquen)",
  "answers": [
    {"name": "Tipos de archivo permitidos"},
    {"name": "Estados funcionales válidos"},
    {"name": "Permisos asociados a roles"},
    {"name": "Los datos de un log histórico"}
  ],
  "correctAnswers": [0, 1, 2]
}', 3),

-- Subtítulo 2: Comprensión de agrupación de valores
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Fundamentos del Dominio y su Rol en Particiones & Valores Frontera",
  "introduction": "Las clases de equivalencia se usan para agrupar valores que desencadenan el mismo comportamiento en el sistema, permitiendo reducir pruebas sin perder cobertura.",
  "example": "En un sistema de roles: Administrador, Editor y Lector, todos los Editores comparten permisos comunes (modificar contenido), por lo que forman una clase funcional.",
  "objectives": ["Identificar clases de equivalencia", "Reconocer comportamientos compartidos entre valores"]
}', 4),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué define que dos valores pertenezcan a la misma clase de equivalencia?",
  "answers": [
    {"name": "Que sean valores utilizados por usuarios similares"},
    {"name": "Que produzcan el mismo comportamiento en el sistema"},
    {"name": "Que estén incluidos en la misma vista de la interfaz"},
    {"name": "Que tengan nombres parecidos"}
  ],
  "correctAnswer": 1
}', 5),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de los siguientes serían ejemplos válidos de clases de equivalencia? (Selecciona todas las que apliquen)",
  "answers": [
    {"name": "Todos los archivos que pueden previsualizarse"},
    {"name": "Todos los roles que permiten crear contenido"},
    {"name": "Todos los usuarios que usan el sistema diariamente"},
    {"name": "Todos los estados que requieren aprobación antes de continuar"}
  ],
  "correctAnswers": [0, 1, 3]
}', 6),

-- Subtítulo 3: Identificación de valores críticos
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Fundamentos del Dominio y su Rol en Particiones & Valores Frontera",
  "introduction": "Un valor frontera es un punto exacto donde el sistema cambia su comportamiento, como pasar de un estado válido a uno inválido o de un estado a otro.",
  "example": "Cuando un documento pasa de Borrador a Publicado, la acción Publicar es una frontera funcional: es el punto donde el sistema cambia su comportamiento.",
  "objectives": ["Identificar valores frontera en sistemas", "Reconocer cambios de comportamiento del sistema"]
}', 7),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "Un valor frontera se define como:",
  "answers": [
    {"name": "Un valor muy usado por los usuarios"},
    {"name": "El punto donde cambia la respuesta del sistema"},
    {"name": "Un valor configurado por el administrador"},
    {"name": "Un valor interno de base de datos"}
  ],
  "correctAnswer": 1
}', 8),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'book' AND position = 1), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de los siguientes casos representan valores frontera? (Selecciona todas las que apliquen)",
  "answers": [
    {"name": "Cambiar un documento de Pendiente a Aprobado"},
    {"name": "Cambiar un rol de Editor a Administrador"},
    {"name": "Cambiar un estado de Activo a Suspendido"},
    {"name": "Cambiar el color del tema visual del sistema"}
  ],
  "correctAnswers": [0, 1, 2]
}', 9);

-- ==================== UNIT 1 - LESSON 2 (STAR) ====================
-- Subtítulo 1: Distinción entre clases válidas e inválidas
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Construcción Conceptual de Particiones de Equivalencia",
  "introduction": "Las clases válidas contienen valores que cumplen las reglas de entrada; las clases inválidas contienen valores que no cumplen dichas reglas.",
  "example": "Si una plataforma solo acepta imágenes en PNG, JPG y SVG, estos forman la clase válida. Cualquier otro formato pertenece a clases inválidas.",
  "objectives": ["Diferenciar clases válidas de inválidas", "Identificar violaciones de reglas de entrada"]
}', 1),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué determina que una clase sea inválida?",
  "answers": [
    {"name": "Que contenga valores obtenidos de un log"},
    {"name": "Que incluya valores que violan las reglas de entrada"},
    {"name": "Que tenga pocos valores"},
    {"name": "Que no se haya documentado"}
  ],
  "correctAnswer": 1
}', 2),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de los siguientes son ejemplos de clases inválidas? (Selecciona todas las que apliquen)",
  "answers": [
    {"name": "Archivos GIF en un sistema que permite solo PNG/JPG/SVG"},
    {"name": "Roles no reconocidos por el sistema"},
    {"name": "Estados que pertenecen a otro módulo no relacionado"},
    {"name": "Extensiones de archivo inventadas por el usuario"}
  ],
  "correctAnswers": [0, 1, 3]
}', 3),

-- Subtítulo 2: Característica estructural de una clase
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Construcción Conceptual de Particiones de Equivalencia",
  "introduction": "Una clase de equivalencia reúne valores que producen exactamente el mismo resultado esperado, sin importar sus diferencias superficiales.",
  "example": "En una sección donde todas las imágenes válidas pueden previsualizarse, el comportamiento previsualizar correctamente es la característica que define la clase.",
  "objectives": ["Reconocer comportamientos compartidos", "Identificar características estructurales de clases"]
}', 4),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué característica permite agrupar valores dentro de una misma clase?",
  "answers": [
    {"name": "Que se vean iguales"},
    {"name": "Que activen la misma lógica interna del sistema"},
    {"name": "Que estén en la misma carpeta"},
    {"name": "Que los usuarios los prefieran"}
  ],
  "correctAnswer": 1
}', 5),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles opciones representan criterios válidos para definir una clase funcional? (Selecciona todas)",
  "answers": [
    {"name": "Que generen permisos idénticos"},
    {"name": "Que disparen la misma validación"},
    {"name": "Que estén nombrados de forma similar"},
    {"name": "Que activen el mismo flujo interno"}
  ],
  "correctAnswers": [0, 1, 3]
}', 6),

-- Subtítulo 3: Representación de un comportamiento
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Construcción Conceptual de Particiones de Equivalencia",
  "introduction": "Un valor representativo permite evaluar una clase completa, evitando probar cada valor individual sin perder cobertura.",
  "example": "En la clase de imágenes válidas (PNG, JPG, SVG), PNG puede elegirse como representante, ya que su procesamiento es equivalente al resto.",
  "objectives": ["Seleccionar valores representativos", "Optimizar cobertura de pruebas sin redundancia"]
}', 7),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Para qué se utiliza un valor representativo?",
  "answers": [
    {"name": "Para cubrir el comportamiento de todos los valores de la clase"},
    {"name": "Para identificar valores límite"},
    {"name": "Para reemplazar técnicas de validación"},
    {"name": "Para detectar errores visuales"}
  ],
  "correctAnswer": 0
}', 8),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Qué criterios permiten seleccionar un valor representativo? (Selecciona todas)",
  "answers": [
    {"name": "Que sea fácil de obtener"},
    {"name": "Que active el mismo comportamiento que el resto de la clase"},
    {"name": "Que represente adecuadamente la lógica interna"},
    {"name": "Que tenga el mayor tamaño posible"}
  ],
  "correctAnswers": [1, 2]
}', 9),

-- Subtítulo 4: Identificación de clases dentro del dominio
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Construcción Conceptual de Particiones de Equivalencia",
  "introduction": "El número de clases depende directamente del número de comportamientos diferentes definidos en el dominio funcional.",
  "example": "En un sistema de tickets con estados Nuevo, Asignado, Resuelto, Cerrado, cada estado representa una clase porque cada uno activa reglas distintas.",
  "objectives": ["Contar clases según comportamientos", "Mapear dominio funcional correctamente"]
}', 10),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál factor determina cuántas clases deben definirse?",
  "answers": [
    {"name": "El número de usuarios en el sistema"},
    {"name": "La cantidad de comportamientos funcionales distintos"},
    {"name": "La cantidad de pantallas del sistema"},
    {"name": "La frecuencia de uso"}
  ],
  "correctAnswer": 1
}', 11),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "Son ejemplos de clases distintas dentro de un dominio: (Selecciona todas)",
  "answers": [
    {"name": "Estados de un flujo con reglas diferentes"},
    {"name": "Tipos de archivos con comportamiento distinto"},
    {"name": "Roles con permisos distintos"},
    {"name": "Colores de interfaz seleccionados por el usuario"}
  ],
  "correctAnswers": [0, 1, 2]
}', 12),

-- Subtítulo 5: Verificación de consistencia en la partición
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Construcción Conceptual de Particiones de Equivalencia",
  "introduction": "Una clase mal definida puede mezclar valores que producen comportamientos diferentes, causando pruebas incorrectas.",
  "example": "Si la clase Usuarios con permisos de edición incluye accidentalmente un usuario Administrador, la clase queda mal estructurada.",
  "objectives": ["Detectar inconsistencias en particiones", "Validar definiciones de clases correctamente"]
}', 13),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es una señal de que una clase está mal definida?",
  "answers": [
    {"name": "Tiene pocos valores"},
    {"name": "Mezcla valores con comportamientos diferentes"},
    {"name": "No está ordenada alfabéticamente"},
    {"name": "No es usada en producción"}
  ],
  "correctAnswer": 1
}', 14),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'star' AND position = 2), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de las siguientes situaciones indican inconsistencia en una clase? (Selecciona todas)",
  "answers": [
    {"name": "Agrupa estados que activan reglas distintas"},
    {"name": "Combina valores que pertenecen a otro módulo"},
    {"name": "Mezcla roles con permisos distintos"},
    {"name": "Solo contiene un valor"}
  ],
  "correctAnswers": [0, 1, 2]
}', 15);

-- ==================== UNIT 1 - LESSON 3 (TROPHY) ====================
-- Subtítulo 1: Determinación de límites
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Principios del Análisis de Valores Frontera en el Diseño de Pruebas",
  "introduction": "Los límites representan el punto donde el sistema cambia de comportamiento, como aceptar o rechazar un valor o permitir un cambio de estado.",
  "example": "Cambiar de Borrador a Publicado es un límite funcional que marca el comienzo de un nuevo estado.",
  "objectives": ["Identificar límites funcionales", "Reconocer cambios de estado en sistemas"]
}', 1),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué define un límite funcional?",
  "answers": [
    {"name": "Un elemento gráfico"},
    {"name": "El punto exacto donde el sistema cambia su estado o condición"},
    {"name": "El tiempo de ejecución"},
    {"name": "El usuario que opera"}
  ],
  "correctAnswer": 1
}', 2),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de los siguientes ejemplos representan límites? (Selecciona todas)",
  "answers": [
    {"name": "Cambio de Pendiente a Aprobado"},
    {"name": "Cambio de Visible a Oculto"},
    {"name": "Cambio de Activo a Suspendido"},
    {"name": "Cambiar el idioma de la interfaz"}
  ],
  "correctAnswers": [0, 1, 2]
}', 3),

-- Subtítulo 2: Definición de adyacencia
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Principios del Análisis de Valores Frontera en el Diseño de Pruebas",
  "introduction": "Los valores adyacentes son aquellos posicionados inmediatamente antes o después del límite.",
  "example": "Si una solicitud está Pendiente, y tras un evento pasa a Aprobada, la acción inmediatamente previa o posterior representa adyacencia funcional.",
  "objectives": ["Identificar valores adyacentes", "Comprender posición relativa a límites"]
}', 4),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué caracteriza a un valor adyacente?",
  "answers": [
    {"name": "Ser un valor usado con frecuencia"},
    {"name": "Estar justo antes o después del límite"},
    {"name": "Ser un valor aislado"},
    {"name": "Estar almacenado en la base de datos"}
  ],
  "correctAnswer": 1
}', 5),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "¿Cuáles de los siguientes escenarios representan adyacencia funcional? (Selecciona todas)",
  "answers": [
    {"name": "Antes del evento que autoriza un pago"},
    {"name": "Después del evento que activa una notificación"},
    {"name": "En medio de un cambio de rol entre grupos"},
    {"name": "Después de la acción que revoca permisos"}
  ],
  "correctAnswers": [0, 1, 3]
}', 6),

-- Subtítulo 3: Identificación de valores frontera
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Principios del Análisis de Valores Frontera en el Diseño de Pruebas",
  "introduction": "Un valor frontera es aquel en el que el sistema deja de comportarse como antes y cambia su decisión.",
  "example": "Si un documento puede enviarse solo después de ser aprobado, el evento aprobar es una frontera.",
  "objectives": ["Reconocer valores frontera", "Identificar cambios de decisión del sistema"]
}', 7),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué convierte a un valor en frontera?",
  "answers": [
    {"name": "Su frecuencia de uso"},
    {"name": "Su posición en la interfaz"},
    {"name": "Su capacidad de cambiar el estado del sistema"},
    {"name": "Su nombre"}
  ],
  "correctAnswer": 2
}', 8),

((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 1) AND type = 'trophy' AND position = 3), 'MULTIPLE_SELECT', '{
  "type": "MULTIPLE_SELECT",
  "question": "Son ejemplos de valores frontera: (Selecciona todas)",
  "answers": [
    {"name": "La acción que cambia un documento a Publicado"},
    {"name": "La acción que pasa un usuario a Suspendido"},
    {"name": "La acción que habilita permisos avanzados"},
    {"name": "La acción que cambia el modo oscuro"}
  ],
  "correctAnswers": [0, 1, 2]
}', 9);

-- ==================== UNIT 1 - TREASURE ====================
-- No tiene problemas, solo se reclama

-- ============================================================================
-- UNIT 2 Y UNIT 3 PERMANECEN SIN CAMBIOS (contenido original)
-- ============================================================================

-- ==================== UNIT 2 - BOOK (position=1) ====================
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "Las clases de equivalencia se clasifican en válidas e inválidas según cumplan o no las condiciones del dominio.",
  "objectives": ["Distinguir tipos de clases", "Aplicar clasificación en ejemplos"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Una clase ___ representa datos que el sistema debería aceptar.",
  "answerTiles": ["válida", "inválida", "neutra"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué caracteriza a una clase inválida?",
  "answers": [
    {"name": "Contiene datos fuera del dominio permitido"},
    {"name": "Es más grande que una clase válida"},
    {"name": "Solo se usa en entornos de producción"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Por qué es importante probar clases inválidas?",
  "answers": [
    {"name": "Para verificar que el sistema rechaza datos incorrectos"},
    {"name": "Para aumentar el tiempo de ejecución"},
    {"name": "No es necesario probarlas"}
  ],
  "correctAnswer": 0
}', 4);

-- ==================== UNIT 2 - STAR (position=2) ====================
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "Practica identificando clases de equivalencia en escenarios reales.",
  "objectives": ["Identificar clases en ejemplos", "Justificar clasificación"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'star' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Para un campo de edad (18-65), el rango 18-65 es una clase ___.",
  "answerTiles": ["válida", "inválida", "mixta"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué valor pertenece a una clase inválida para edad (18-65)?",
  "answers": [
    {"name": "17"},
    {"name": "30"},
    {"name": "50"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuántas clases de equivalencia tiene un campo booleano?",
  "answers": [
    {"name": "2 (verdadero y falso)"},
    {"name": "1"},
    {"name": "Infinitas"}
  ],
  "correctAnswer": 0
}', 4);

-- ==================== UNIT 2 - TROPHY (position=3) ====================
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "Evaluación práctica sobre identificación de clases de equivalencia.",
  "objectives": ["Aplicar teoría en casos prácticos", "Validar comprensión"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Un campo que acepta solo letras tiene clases válidas (letras) e ___ (números/símbolos).",
  "answerTiles": ["inválidas", "opcionales", "redundantes"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué clase probarías para un email inválido?",
  "answers": [
    {"name": "Texto sin @"},
    {"name": "user@domain.com"},
    {"name": "admin@test.org"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 2) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el beneficio de probar una clase de cada tipo?",
  "answers": [
    {"name": "Cubre todo el comportamiento sin redundancia"},
    {"name": "Aumenta el tiempo de pruebas"},
    {"name": "Solo funciona en sistemas pequeños"}
  ],
  "correctAnswer": 0
}', 4);

-- ==================== UNIT 3 - BOOK (position=1) ====================
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "El Análisis de Valores Límite (BVA) se enfoca en probar los bordes de las clases de equivalencia.",
  "objectives": ["Comprender el concepto de valor límite", "Identificar valores críticos"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Los valores ___ son aquellos en los extremos de un rango válido.",
  "answerTiles": ["límite", "centrales", "aleatorios"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Por qué son importantes los valores límite?",
  "answers": [
    {"name": "Los errores suelen ocurrir en los bordes de los rangos"},
    {"name": "Son más fáciles de probar"},
    {"name": "Solo se usan en sistemas matemáticos"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'book' AND position = 1), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué valores probarías para un rango 1-100?",
  "answers": [
    {"name": "0, 1, 100, 101"},
    {"name": "50, 75"},
    {"name": "Solo el valor medio"}
  ],
  "correctAnswer": 0
}', 4);

-- ==================== UNIT 3 - STAR (position=2) ====================
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'star' AND position = 2), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "BVA se combina con Partición de Equivalencia para maximizar la cobertura de pruebas.",
  "objectives": ["Aplicar BVA en conjunto con EP", "Identificar valores críticos"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'star' AND position = 2), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "BVA complementa EP probando los ___ de cada clase.",
  "answerTiles": ["bordes", "centros", "extremos internos"],
  "correctAnswerIndices": [0]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué es BVA robusto?",
  "answers": [
    {"name": "Incluye valores justo fuera de los límites válidos"},
    {"name": "Solo prueba valores válidos"},
    {"name": "Ignora los límites"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'star' AND position = 2), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuál es el objetivo de BVA robusto?",
  "answers": [
    {"name": "Verificar que el sistema rechaza valores inválidos cercanos"},
    {"name": "Reducir el número de pruebas"},
    {"name": "Solo se usa en validación de tipos"}
  ],
  "correctAnswer": 0
}', 4);

-- ==================== UNIT 3 - TROPHY (position=3) ====================
INSERT INTO problems (lesson_id, type, content, position) VALUES
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'INFO', '{
  "type": "INFO",
  "moduleTitle": "Módulo A",
  "introduction": "Evaluación final sobre BVA y su aplicación con Partición de Equivalencia.",
  "objectives": ["Dominar identificación de límites", "Aplicar BVA robusto"]
}', 1),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'FILL_IN_THE_BLANK', '{
  "type": "FILL_IN_THE_BLANK",
  "question": "Para un rango 10-50, los valores límite son ___, 10, 50, ___.",
  "answerTiles": ["9", "51", "11", "49"],
  "correctAnswerIndices": [0, 1]
}', 2),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Cuántos valores prueba BVA básico para un rango?",
  "answers": [
    {"name": "4 (límite inferior, inicio, fin, límite superior)"},
    {"name": "2 (solo los extremos)"},
    {"name": "1 (un valor representativo)"}
  ],
  "correctAnswer": 0
}', 3),
((SELECT id FROM lessons WHERE unit_id = (SELECT id FROM units WHERE module_id = (SELECT id FROM modules WHERE code = 'moduleA') AND unit_number = 3) AND type = 'trophy' AND position = 3), 'MULTIPLE_CHOICE', '{
  "type": "MULTIPLE_CHOICE",
  "question": "¿Qué técnica combina clases de equivalencia y valores límite?",
  "answers": [
    {"name": "EP + BVA"},
    {"name": "Solo BVA"},
    {"name": "Pruebas aleatorias"}
  ],
  "correctAnswer": 0
}', 4);