-- Database: sdc

DROP DATABASE sdc;
-- DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc

DROP TABLE IF EXISTS answers_photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id SERIAL,
  reported integer NOT NULL,
  question_date date NOT NULL,
  question_body TEXT NOT NULL,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  question_helpfulness integer NOT NULL,
  product_id integer NOT NULL,
    CONSTRAINT questions_pkey
      PRIMARY KEY (question_id)
);

CREATE TABLE answers(
  answer_id SERIAL,
  reported integer NOT NULL,
  date date NOT NULL,
  body TEXT NOT NULL,
  answerer_name TEXT NOT NULL,
  answerer_email TEXT NOT NULL,
  helpfulness integer NOT NULL,
  question_id integer NOT NULL,
    CONSTRAINT answers_pkey
      PRIMARY KEY (answer_id),
    CONSTRAINT fk_question
      FOREIGN KEY(question_id)
        REFERENCES questions(question_id)
);

CREATE TABLE answers_photos(
  id SERIAL,
  answer_id integer NOT NULL,
  url TEXT NOT NULL,
  CONSTRAINT answers_photos_pkey
    PRIMARY KEY (id),
  CONSTRAINT fk_answers
    FOREIGN KEY(answer_id)
      REFERENCES answers(answer_id)
);

CREATE INDEX question_index ON questions (product_id);
CREATE INDEX answer_index ON answers (question_id);
CREATE INDEX answerphoto_index ON answers (answer_id);