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

DROP TABLE IF EXISTS answers;

CREATE TABLE answers
(
  id SERIAL,
  reported integer NOT NULL,
  date_written date NOT NULL,
  body TEXT NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  helpful integer NOT NULL,
  question_id integer NOT NULL,
  CONSTRAINT answers_pkey PRIMARY KEY (id),
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);

DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos
(
  id SERIAL,
  answer_id integer NOT NULL,
  url TEXT NOT NULL,
  CONSTRAINT answers_photos_pkey PRIMARY KEY (id),
  CONSTRAINT fk_answers
    FOREIGN KEY(answer_id)
      REFERENCES answer(id)
);