const { username, password } = require('../config.js');
const pgp = require('pg-promise')(/*options*/);

var db = pgp(`postgres://${username}:${password}@localhost:5433/sdc`);

var getQuestions = async (productID) => {
  return db.any('SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = $1', [productID])
    .then((questions) => {
      return questions;
    })
    .catch((err) => {
      console.log('Error in getQuestions: ', err)
    })
}

var getAnswers = async (questionID) => {
  return db.any('SELECT answer_id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = $1', [questionID])
    .then ((answers) => {
      return (answers);
    })
    .catch((err) => {
      console.log('Error in getAnswers: ', err)
    })
}

// var addQuestions = async (productID) => {
//   await db.none('INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)', [productID, *])
// }

module.exports = {
  getQuestions,
  getAnswers
}