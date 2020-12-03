const express = require('express')
const fs = require('fs')
const app = express();
const pgp = require('pg-promise')(/*options*/);
const port = 3000;

var db = pgp('postgres://dlichter:hackreactor@localhost:5433/sdc')

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

db.none("COPY questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful)FROM 'C:/Users/Public/questions.csv' DELIMITER ',' CSV HEADER;")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  })

console.log(db);
