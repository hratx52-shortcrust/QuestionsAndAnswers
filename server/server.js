const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { getQuestions, getAnswers, postQuestion, postAnswer } = require('../database/questionsQuery')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});


//List Questions
app.get('/qa/questions', async (req, res) => {
  let productID = req.query.product_id;
  var questionQuery = {
    product_id: productID
  }

  questionQuery.results = await getQuestions(productID);
  if (questionQuery.results.name === 'error') {
    res.sendStatus(404);
  } else {
    res.send(questionQuery).status(200);
  }
});

//Answers List
app.get('/qa/questions/:question_id/answers', async (req, res) => {
  let questionID = req.params.question_id;
  let page = req.query.page || 1;
  let count = req.query.count || 5
  var answerQuery = {
    question: questionID,
    page: page,
    count: count
  }
  answerQuery.results = await getAnswers(questionID);

  if (answerQuery.results.name === 'error') {
    res.sendStatus(404);
  } else {
    res.send(answerQuery).status(200);
  }
});

//Add a Question
app.post('/qa/questions', async (req, res) => {
  var postedQuestion = await postQuestion(req.body);
  res.sendStatus(postedQuestion);
});

//Add an Answer
app.post('/qa/questions/:question_id/answers', async (req, res) => {
  let questionID = req.params.question_id;
  var postedAnswer = await postAnswer(questionID, req.body);

  res.sendStatus(postedAnswer);

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

