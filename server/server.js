const express = require('express')
const app = express();
const port = 3000;
const { getQuestions, getAnswers } = require('../database/questionsQuery')

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

//List Questions
app.get('/qa/questions', (req, res) => {
  let productID = req.query.product_id;
  var questionQuery = getQuestions(productID);

  //response status 200
});

//Answers List
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let questionID = req.params.question_id;
  var answerQuery = getAnswers(questionID);

  //response status 200
});

//Add a Question
app.post('/qa/questions', (req, res) => {
  // Body parameters: {
  //   body,
  //   name,
  //   email,
  //   product_id
  // }

  //response status 201
});

//Add an Answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  let questionID = req.params.question_id;
  // Body parameters: {
  //   body,
  //   name,
  //   email,
  //   photos
  // }

  //response status 201
});

//Mark Question as Helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let questionID = req.params.question_id;

  //response status 204
});

//Report Question
app.put('/qa/questions/:question_id/report', (req, res) => {
  let questionID = req.params.question_id;

  //response status 204
});

//Mark Answer as Helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let answerID = req.params.question_id;

  //response status 204
});

//Report Answer
app.put('/qa/questions/:answer_id/report', (req, res) => {
  let answerID = req.params.question_id;

  //response status 204
});

