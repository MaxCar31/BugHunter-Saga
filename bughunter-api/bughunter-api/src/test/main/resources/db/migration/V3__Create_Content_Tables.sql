-- ============================================================================
-- Migration: V3__Create_Content_Tables.sql
-- Description: Crea las tablas para módulos, unidades, lecciones y problemas
-- Author: BugHunter Saga Team
-- Date: 2025-10-26
-- ============================================================================

-- Tabla para los módulos de aprendizaje (ej. Módulo A - Equivalencia)
CREATE TABLE modules (
                         id SERIAL PRIMARY KEY,
                         code VARCHAR(20) UNIQUE NOT NULL,
                         name VARCHAR(100) NOT NULL,
                         description TEXT,
                         ui_config JSONB
    );

COMMENT ON TABLE modules IS 'Módulos de aprendizaje (ej. Módulo A - Equivalencia)';

-- Tabla para las unidades dentro de cada módulo
CREATE TABLE units (
                       id SERIAL PRIMARY KEY,
                       module_id INTEGER NOT NULL,
                       unit_number INTEGER NOT NULL,
                       description TEXT,

                       CONSTRAINT fk_units_module
                           FOREIGN KEY (module_id)
                               REFERENCES modules(id)
                               ON DELETE CASCADE,

                       CONSTRAINT uq_unit_per_module UNIQUE (module_id, unit_number)
);

COMMENT ON TABLE units IS 'Unidades dentro de cada módulo';

CREATE INDEX idx_units_module_id ON units(module_id);

-- Tabla para las lecciones individuales (los "tiles" en tu UI)
CREATE TABLE lessons (
                         id SERIAL PRIMARY KEY,
                         unit_id INTEGER NOT NULL,
                         type VARCHAR(50) NOT NULL,
                         description TEXT,
                         position INTEGER NOT NULL,

                         CONSTRAINT fk_lessons_unit
                             FOREIGN KEY (unit_id)
                                 REFERENCES units(id)
                                 ON DELETE CASCADE,

                         CONSTRAINT chk_lesson_type
                             CHECK (type IN ('dumbbell', 'book', 'trophy', 'treasure', 'fast-forward'))
);

COMMENT ON TABLE lessons IS 'Lecciones individuales (tiles) en el camino de aprendizaje';

CREATE INDEX idx_lessons_unit_id ON lessons(unit_id);
CREATE INDEX idx_lessons_position ON lessons(unit_id, position);

-- Tabla para el contenido específico de cada lección (los problemas/pantallas)
CREATE TABLE problems (
                          id SERIAL PRIMARY KEY,
                          lesson_id INTEGER NOT NULL,
                          type VARCHAR(50) NOT NULL,
                          content JSONB NOT NULL,
                          position INTEGER NOT NULL,

                          CONSTRAINT fk_problems_lesson
                              FOREIGN KEY (lesson_id)
                                  REFERENCES lessons(id)
                                  ON DELETE CASCADE,

                          CONSTRAINT chk_problem_type
                              CHECK (type IN ('INFO', 'SELECT_1_OF_3', 'FILL_IN_THE_BLANK', 'MULTIPLE_CHOICE', 'CODE_CHALLENGE'))
);

COMMENT ON TABLE problems IS 'Contenido específico de cada lección (problemas/pantallas)';

CREATE INDEX idx_problems_lesson_id ON problems(lesson_id);
CREATE INDEX idx_problems_position ON problems(lesson_id, position);