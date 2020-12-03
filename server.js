const express = require('express')
const fs = require('fs')
const app = express();
const pgp = require('pg-promise')(/*options*/);
const port = 3000;

var db = pgp('postgres://dlichter:hackreactor@localhost:5433')

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

console.log(db);