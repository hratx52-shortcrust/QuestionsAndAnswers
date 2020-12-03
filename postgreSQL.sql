-- Database: sdc

DROP DATABASE sdc;
-- DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc

DROP TABLE IF EXISTS questions;

CREATE TABLE questions
(
  id SERIAL,
  reported integer NOT NULL,
  date_written date NOT NULL,
  body TEXT NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  helpful integer NOT NULL,
  product_id integer NOT NULL,
  CONSTRAINT questions_pkey PRIMARY KEY (id)
);
