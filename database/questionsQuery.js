const pgp = require('pg-promise')(/*options*/);

var db = pgp('postgres://dlichter:hackreactor@localhost:5433/sdc');

var getQuestions = async (productID) => {
  await db.any('SELECT * FROM questions WHERE product_id = $1', [productID])
    .then ((questions) => {
      console.log (questions);
    })
    .catch((err) => {
      console.log('Error in getQuestions: ', err)
    })
}

var getAnswers = async (questionID) => {
  await db.any('SELECT * FROM answers WHERE question_id = $1', [questionID])
    .then ((answers) => {
      console.log(answers);
    })
    .catch((err) => {
      console.log('Error in getAnswers: ', err)
    })
}

module.exports = {
  getQuestions,
  getAnswers
}