require('newrelic');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 3000;
const { getQuestions, getAnswers, postQuestion, postAnswer, putQuestionHelpfulness, putAnswerHelpfulness, putReportQuestion, putReportAnswer, getAnswerPhotos } = require('../database/questionsQuery')

app.use(cors());
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
    count: count,
  }
  answerQuery.results = await getAnswers(questionID);

  if (answerQuery.results.name === 'error') {
    res.sendStatus(404);
  } else {
    for (var i = 0; i < answerQuery.results.length; i++) {
      answerQuery.results[i].photos = await getAnswerPhotos(answerQuery.results[i].answer_id)
    }
    res.send(answerQuery).status(200);
  }
});

//Add a Question
app.post('/qa/questions', async (req, res) => {
  var postedQuestionStatus = await postQuestion(req.body);
  res.sendStatus(postedQuestionStatus);
});

//Add an Answer
app.post('/qa/questions/:question_id/answers', async (req, res) => {
  let questionID = req.params.question_id;
  var postedAnswerStatus = await postAnswer(questionID, req.body);

  res.sendStatus(postedAnswerStatus);

});

//Mark Question as Helpful
app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  let questionID = req.params.question_id;
  var updatedQuestionHelpfulnessStatus = await putQuestionHelpfulness(questionID)

  res.sendStatus(updatedQuestionHelpfulnessStatus);
});

//Report Question
app.put('/qa/questions/:question_id/report', async (req, res) => {
  let questionID = req.params.question_id;
  var reportedQuestionStatus = await putReportQuestion(questionID)

  res.sendStatus(reportedQuestionStatus);
});

//Mark Answer as Helpful
app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  let answerID = req.params.answer_id;
  var updatedAnswerHelpfulnessStatus = await putAnswerHelpfulness(answerID);

  res.sendStatus(updatedAnswerHelpfulnessStatus);
});

//Report Answer
app.put('/qa/answers/:answer_id/report', async (req, res) => {
  let answerID = req.params.answer_id;
  var reportedAnswerStatus = await putReportAnswer(answerID);

  res.sendStatus(reportedAnswerStatus)
});

