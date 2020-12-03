const express = require('express')
const fs = require('fs')
const app = express();
const pgp = require('pg-promise')(/*options*/);
const port = 3000;

var db = pgp('postgres://dlichter:hackreactor@localhost:5433/sdc');

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

createTables = async function () {
  await db.none("DROP TABLE IF EXISTS answers_photos;")
    .then(async () => {
      await db.none('DROP TABLE IF EXISTS answers;')
    })
    .then(async () => {
      await db.none('DROP TABLE IF EXISTS questions;')
    })
    .then(async() => {
      await db.none('CREATE TABLE questions (id SERIAL, reported integer NOT NULL, date_written date NOT NULL, body TEXT NOT NULL, asker_name TEXT NOT NULL, asker_email TEXT NOT NULL, helpful integer NOT NULL, product_id integer NOT NULL, CONSTRAINT questions_pkey PRIMARY KEY (id));')
    })
    .then(async () => {
      await db.none("COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM 'C:/Users/Public/questions.csv' DELIMITER ',' CSV HEADER;")
    })
    .then(async () => {
      await db.none('CREATE TABLE answers(id SERIAL, reported integer NOT NULL, date_written date NOT NULL, body TEXT NOT NULL, answerer_name TEXT NOT NULL, answerer_email TEXT NOT NULL, helpful integer NOT NULL, question_id integer NOT NULL, CONSTRAINT answers_pkey PRIMARY KEY (id), CONSTRAINT fk_question FOREIGN KEY(question_id) REFERENCES questions(id));')
    })
    .then(async () => {
      await db.none("COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM 'C:/Users/Public/answers.csv' DELIMITER ',' CSV HEADER;")
    })
    .then(async () => {
      await db.none('CREATE TABLE answers_photos(id SERIAL, answer_id integer NOT NULL, url TEXT NOT NULL, CONSTRAINT answers_photos_pkey PRIMARY KEY (id), CONSTRAINT fk_answers FOREIGN KEY(answer_id) REFERENCES answer(id);')
    })
    .then(async () => {
      await db.none("COPY answers_photos(id, answer_id, url) FROM 'C:/Users/Public/answers_photos.csv' DELIMITER ',' CSV HEADER;")
    })
    .then(async () => {
      await console.log("DONE");
    })
    .catch((err) => {
      console.log(err);
    });
}

createTables();