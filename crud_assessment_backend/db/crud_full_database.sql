--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: marks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marks (
    mark_id character varying(36) NOT NULL,
    fk_student_id character varying(36),
    subject character varying(50) NOT NULL,
    score integer NOT NULL
);


ALTER TABLE public.marks OWNER TO postgres;

--
-- Name: marks_mark_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marks_mark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.marks_mark_id_seq OWNER TO postgres;

--
-- Name: marks_mark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marks_mark_id_seq OWNED BY public.marks.mark_id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    student_id character varying(36) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    date_of_birth character varying(36) NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: marks mark_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marks ALTER COLUMN mark_id SET DEFAULT nextval('public.marks_mark_id_seq'::regclass);

--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (student_id, first_name, last_name, email, date_of_birth) FROM stdin;
75db4b32-0873-4e20-bc02-f246ffdd1f30	Tejas	A	tejas.a@example.com	2000-01-01
a6b92ecb-c86f-4b63-81cd-127802be86c7	Abhishek	J	abhishek.j@example.com	2000-01-01
a053a547-f3a0-4363-ac45-2d59ab4a5eac	Pratik	s	pratiks	2024-10-12
5aea7dd1-df94-49df-9c27-ee4078127257	Nikhil	g	nikhil	2024-10-16
\.

--
-- Data for Name: marks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marks (mark_id, fk_student_id, subject, score) FROM stdin;
5bace71e-5aba-4039-8252-e70ff3a96da0	75db4b32-0873-4e20-bc02-f246ffdd1f30	Math	85
86a6ee3d-d9c5-4273-904e-4c0455457cac	75db4b32-0873-4e20-bc02-f246ffdd1f30	Science	90
b712ccc2-05a0-4102-9bd3-8372ef0f2df2	a6b92ecb-c86f-4b63-81cd-127802be86c7	Math	85
e1e7e1ca-8a25-481a-a8d5-ddff6cf8c7c5	a6b92ecb-c86f-4b63-81cd-127802be86c7	Science	90
8d356eea-4b08-4ddf-9427-445e3de0b105	a053a547-f3a0-4363-ac45-2d59ab4a5eac	abc	    10
f94cd72c-1fad-4961-930f-7df11430bfd7	5aea7dd1-df94-49df-9c27-ee4078127257	maths	10
fa45127c-b853-418a-9207-3a3ce9d9057e	5aea7dd1-df94-49df-9c27-ee4078127257	science	100
\.





--
-- Name: marks_mark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marks_mark_id_seq', 1, false);


--
-- Name: marks marks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_pkey PRIMARY KEY (mark_id);


--
-- Name: students students_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- Name: marks marks_fk_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_fk_student_id_fkey FOREIGN KEY (fk_student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

