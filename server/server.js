const express = require('express')
const app = express();
const port = 3000;
const { getQuestions, getAnswers } = require('../database/questionsQuery')

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.get('/qa/questions', (req, res) => {
  productID = req.query.product_id;
  var questionQuery = getQuestions(productID);
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  questionID = req.params.question_id;
  var answerQuery = getAnswers(questionID);
})
