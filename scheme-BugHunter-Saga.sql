--
-- PostgreSQL database dump
--

\restrict rYlbY5hqeGm4SK4jsL3EIRwBVdEQULawqjfRiXn2NzXXtlJEGpTYY8Ba3VIzgCU

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO admin;

--
-- Name: leagues; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.leagues (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    min_xp integer NOT NULL,
    max_xp integer,
    icon character varying(50)
);


ALTER TABLE public.leagues OWNER TO admin;

--
-- Name: leagues_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.leagues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leagues_id_seq OWNER TO admin;

--
-- Name: leagues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.leagues_id_seq OWNED BY public.leagues.id;


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.lessons (
    id integer NOT NULL,
    unit_id integer NOT NULL,
    type character varying(50) NOT NULL,
    description text,
    "position" integer NOT NULL,
    CONSTRAINT chk_lesson_type CHECK (((type)::text = ANY ((ARRAY['dumbbell'::character varying, 'book'::character varying, 'trophy'::character varying, 'treasure'::character varying, 'fast-forward'::character varying])::text[])))
);


ALTER TABLE public.lessons OWNER TO admin;

--
-- Name: TABLE lessons; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.lessons IS 'Lecciones individuales (tiles) en el camino de aprendizaje';


--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lessons_id_seq OWNER TO admin;

--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- Name: modules; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.modules (
    id integer NOT NULL,
    code character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    ui_config jsonb
);


ALTER TABLE public.modules OWNER TO admin;

--
-- Name: TABLE modules; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.modules IS 'Módulos de aprendizaje (ej. Módulo A - Equivalencia)';


--
-- Name: modules_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modules_id_seq OWNER TO admin;

--
-- Name: modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.modules_id_seq OWNED BY public.modules.id;


--
-- Name: problems; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.problems (
    id integer NOT NULL,
    lesson_id integer NOT NULL,
    type character varying(50) NOT NULL,
    content jsonb NOT NULL,
    "position" integer NOT NULL,
    CONSTRAINT chk_problem_type CHECK (((type)::text = ANY ((ARRAY['INFO'::character varying, 'SELECT_1_OF_3'::character varying, 'FILL_IN_THE_BLANK'::character varying, 'MULTIPLE_CHOICE'::character varying, 'CODE_CHALLENGE'::character varying])::text[])))
);


ALTER TABLE public.problems OWNER TO admin;

--
-- Name: TABLE problems; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.problems IS 'Contenido específico de cada lección (problemas/pantallas)';


--
-- Name: problems_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.problems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.problems_id_seq OWNER TO admin;

--
-- Name: problems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.problems_id_seq OWNED BY public.problems.id;


--
-- Name: shop_items; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.shop_items (
    id integer NOT NULL,
    item_code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    cost integer DEFAULT 0 NOT NULL,
    icon character varying(50)
);


ALTER TABLE public.shop_items OWNER TO admin;

--
-- Name: shop_items_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.shop_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shop_items_id_seq OWNER TO admin;

--
-- Name: shop_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.shop_items_id_seq OWNED BY public.shop_items.id;


--
-- Name: units; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.units (
    id integer NOT NULL,
    module_id integer NOT NULL,
    unit_number integer NOT NULL,
    description text
);


ALTER TABLE public.units OWNER TO admin;

--
-- Name: TABLE units; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.units IS 'Unidades dentro de cada módulo';


--
-- Name: units_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.units_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.units_id_seq OWNER TO admin;

--
-- Name: units_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.units_id_seq OWNED BY public.units.id;


--
-- Name: user_inventory; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_inventory (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    item_code character varying(50) NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.user_inventory OWNER TO admin;

--
-- Name: user_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_inventory_id_seq OWNER TO admin;

--
-- Name: user_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_inventory_id_seq OWNED BY public.user_inventory.id;


--
-- Name: user_lesson_progress; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_lesson_progress (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    lesson_id integer NOT NULL,
    completed_at timestamp with time zone DEFAULT now(),
    score integer,
    attempt_number integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.user_lesson_progress OWNER TO admin;

--
-- Name: TABLE user_lesson_progress; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.user_lesson_progress IS 'Progreso de lecciones con soporte para múltiples intentos';


--
-- Name: COLUMN user_lesson_progress.attempt_number; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.user_lesson_progress.attempt_number IS 'Número de intento (1, 2, 3, ...)';


--
-- Name: user_lesson_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_lesson_progress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_lesson_progress_id_seq OWNER TO admin;

--
-- Name: user_lesson_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_lesson_progress_id_seq OWNED BY public.user_lesson_progress.id;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_profiles (
    user_id uuid NOT NULL,
    lingots integer DEFAULT 0 NOT NULL,
    daily_xp_goal integer DEFAULT 10 NOT NULL,
    sound_effects_enabled boolean DEFAULT true NOT NULL,
    CONSTRAINT chk_daily_xp_goal_range CHECK (((daily_xp_goal >= 1) AND (daily_xp_goal <= 100))),
    CONSTRAINT chk_lingots_positive CHECK ((lingots >= 0))
);


ALTER TABLE public.user_profiles OWNER TO admin;

--
-- Name: user_streaks; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_streaks (
    user_id uuid NOT NULL,
    activity_date date NOT NULL
);


ALTER TABLE public.user_streaks OWNER TO admin;

--
-- Name: user_xp_history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_xp_history (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    xp_earned integer NOT NULL,
    source_type character varying(50),
    source_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_xp_history OWNER TO admin;

--
-- Name: user_xp_history_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_xp_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_xp_history_id_seq OWNER TO admin;

--
-- Name: user_xp_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_xp_history_id_seq OWNED BY public.user_xp_history.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(50) NOT NULL,
    name character varying(100),
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password_reset_token character varying(255),
    password_reset_expires timestamp with time zone,
    lastname character varying(100),
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT chk_email_format CHECK (((email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text)),
    CONSTRAINT chk_username_length CHECK ((char_length((username)::text) >= 3))
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: leagues id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.leagues ALTER COLUMN id SET DEFAULT nextval('public.leagues_id_seq'::regclass);


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- Name: modules id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modules ALTER COLUMN id SET DEFAULT nextval('public.modules_id_seq'::regclass);


--
-- Name: problems id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.problems ALTER COLUMN id SET DEFAULT nextval('public.problems_id_seq'::regclass);


--
-- Name: shop_items id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.shop_items ALTER COLUMN id SET DEFAULT nextval('public.shop_items_id_seq'::regclass);


--
-- Name: units id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.units ALTER COLUMN id SET DEFAULT nextval('public.units_id_seq'::regclass);


--
-- Name: user_inventory id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_inventory ALTER COLUMN id SET DEFAULT nextval('public.user_inventory_id_seq'::regclass);


--
-- Name: user_lesson_progress id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_lesson_progress ALTER COLUMN id SET DEFAULT nextval('public.user_lesson_progress_id_seq'::regclass);


--
-- Name: user_xp_history id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_xp_history ALTER COLUMN id SET DEFAULT nextval('public.user_xp_history_id_seq'::regclass);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: leagues leagues_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.leagues
    ADD CONSTRAINT leagues_name_key UNIQUE (name);


--
-- Name: leagues leagues_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.leagues
    ADD CONSTRAINT leagues_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: modules modules_code_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_code_key UNIQUE (code);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- Name: problems problems_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.problems
    ADD CONSTRAINT problems_pkey PRIMARY KEY (id);


--
-- Name: shop_items shop_items_item_code_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.shop_items
    ADD CONSTRAINT shop_items_item_code_key UNIQUE (item_code);


--
-- Name: shop_items shop_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.shop_items
    ADD CONSTRAINT shop_items_pkey PRIMARY KEY (id);


--
-- Name: users uk6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: user_inventory uke4mpjx3f6cimfedjykq3nmf5t; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT uke4mpjx3f6cimfedjykq3nmf5t UNIQUE (user_id, item_code);


--
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: units units_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (id);


--
-- Name: units uq_unit_per_module; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT uq_unit_per_module UNIQUE (module_id, unit_number);


--
-- Name: user_inventory user_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_pkey PRIMARY KEY (id);


--
-- Name: user_inventory user_inventory_user_id_item_code_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT user_inventory_user_id_item_code_key UNIQUE (user_id, item_code);


--
-- Name: user_lesson_progress user_lesson_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_lesson_progress
    ADD CONSTRAINT user_lesson_progress_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (user_id);


--
-- Name: user_streaks user_streaks_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_streaks
    ADD CONSTRAINT user_streaks_pkey PRIMARY KEY (user_id, activity_date);


--
-- Name: user_xp_history user_xp_history_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_xp_history
    ADD CONSTRAINT user_xp_history_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: idx_lessons_position; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_lessons_position ON public.lessons USING btree (unit_id, "position");


--
-- Name: idx_lessons_unit_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_lessons_unit_id ON public.lessons USING btree (unit_id);


--
-- Name: idx_problems_lesson_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_problems_lesson_id ON public.problems USING btree (lesson_id);


--
-- Name: idx_problems_position; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_problems_position ON public.problems USING btree (lesson_id, "position");


--
-- Name: idx_units_module_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_units_module_id ON public.units USING btree (module_id);


--
-- Name: idx_user_lesson_progress_attempt; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_user_lesson_progress_attempt ON public.user_lesson_progress USING btree (user_id, lesson_id, attempt_number);


--
-- Name: idx_user_lesson_progress_lesson_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_user_lesson_progress_lesson_id ON public.user_lesson_progress USING btree (lesson_id);


--
-- Name: idx_user_lesson_progress_user_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_user_lesson_progress_user_id ON public.user_lesson_progress USING btree (user_id);


--
-- Name: idx_user_lesson_progress_user_lesson; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_user_lesson_progress_user_lesson ON public.user_lesson_progress USING btree (user_id, lesson_id);


--
-- Name: idx_users_created_at; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_users_created_at ON public.users USING btree (created_at);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_users_password_reset_token; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_users_password_reset_token ON public.users USING btree (password_reset_token);


--
-- Name: idx_users_username; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_users_username ON public.users USING btree (username);


--
-- Name: idx_xp_history_created_at; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_xp_history_created_at ON public.user_xp_history USING btree (created_at);


--
-- Name: idx_xp_history_user_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_xp_history_user_id ON public.user_xp_history USING btree (user_id);


--
-- Name: lessons fk_lessons_unit; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT fk_lessons_unit FOREIGN KEY (unit_id) REFERENCES public.units(id) ON DELETE CASCADE;


--
-- Name: problems fk_problems_lesson; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.problems
    ADD CONSTRAINT fk_problems_lesson FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: user_streaks fk_streaks_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_streaks
    ADD CONSTRAINT fk_streaks_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: units fk_units_module; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT fk_units_module FOREIGN KEY (module_id) REFERENCES public.modules(id) ON DELETE CASCADE;


--
-- Name: user_inventory fk_user_inventory_item; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT fk_user_inventory_item FOREIGN KEY (item_code) REFERENCES public.shop_items(item_code) ON DELETE CASCADE;


--
-- Name: user_inventory fk_user_inventory_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_inventory
    ADD CONSTRAINT fk_user_inventory_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_lesson_progress fk_user_lesson_progress_lesson; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_lesson_progress
    ADD CONSTRAINT fk_user_lesson_progress_lesson FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: user_lesson_progress fk_user_lesson_progress_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_lesson_progress
    ADD CONSTRAINT fk_user_lesson_progress_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_profiles fk_user_profiles_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_xp_history fk_xp_history_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_xp_history
    ADD CONSTRAINT fk_xp_history_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict rYlbY5hqeGm4SK4jsL3EIRwBVdEQULawqjfRiXn2NzXXtlJEGpTYY8Ba3VIzgCU

