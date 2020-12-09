const { username, password } = require('../config.js');
const pgp = require('pg-promise')(/*options*/);

var db = pgp(`postgres://${username}:${password}@localhost:5433/sdc`);


var getQuestions = async (productID) => {
  return db.any('SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = $1 AND reported = $2', [productID, 0])
    .then((questions) => {
      return questions;
    })
    .catch((err) => {
      return err;
    })
  };

var getSpecificQuestion = async (questionID) => {
  return db.any('SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE question_id = $1', [questionID, 0])
    .then((questions) => {
      return questions;
    })
    .catch((err) => {
      return err;
    })
  };

  var getAnswers = async (questionID) => {
  return db.any('SELECT answer_id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = $1 AND reported = $2', [questionID, 0])
  .then ((answers) => {
    return answers;
  })
  .catch((err) => {
      return err;
    })
  };

  var getSpecificAnswers = async (answerID) => {
    return db.any('SELECT answer_id, body, date, answerer_name, helpfulness FROM answers WHERE answer_id = $1', [answerID])
    .then ((answers) => {
      return answers;
    })
    .catch((err) => {
        return err;
      })
    };

  var getAnswerPhotos = async (answerID) => {
    return db.any('SELECT id, url FROM answers_photos WHERE answer_id = $1', [answerID])
    .then((photos) => {
      return photos;
    })
    .catch((err) => {
      console.log('Error getting answer photos: ', err)
      return [];
    })
  }

var postQuestion = async (question) => {
  let date = new Date;
  return db.any("SELECT setval('questions_question_id_seq', max(question_id)) FROM questions;")
    .then(() => {
      return db.none('INSERT INTO questions (product_id, question_body, asker_name, asker_email, question_helpfulness, reported, question_date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [question.product_id, question.body, question.name, question.email, 0, 0, date])
        .then(() => {
          return 201;
        })
        .catch((err) => {
          console.log('Error inserting question: ', err)
          return 500;
        })
    })
    .catch((err) => {
      console.log('Error setting question id: ', err)
      return 500;
    })
};

//MAY NEED TO REFACTOR - ANSWER MAY BE POSTED WITH A PHOTO
var postAnswer = async (questionID, answer) => {
  let date = new Date;
  return db.any("SELECT setval('answers_answer_id_seq', max(answer_id)) FROM answers;")
    .then(() => {
      return db.none('INSERT INTO answers (question_id, body, answerer_name, answerer_email, helpfulness, reported, date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [questionID, answer.body, answer.name, answer.email, 0, 0, date])
        .then(() => {
          return 201;
        })
        .catch((err) => {
          console.log('Error inserting answer: ', err)
          return 500;
        })
    })
    .catch((err) => {
      console.log('Error setting answer id: ', err)
      return 500;
    })
};

var putQuestionHelpfulness = async (questionID) => {
  return db.any('SELECT question_helpfulness FROM questions WHERE question_id = $1', [questionID])
    .then(async (question) => {
      return question[0].question_helpfulness + 1;
    })
    .then((updatedHelpfulness) => {
      return db.any('UPDATE questions SET question_helpfulness = $2 WHERE question_id = $1', [questionID, updatedHelpfulness])
        .then(() => {
          return 204;
        })
        .catch((err) => {
          console.log('Error updating question helpfulness: ', err)
          return 500;
        })
    })
    .catch((err) => {
      console.log('Error selecting question helpfulness:', err);
      return 404;
    })
};

var putReportQuestion = async (questionID) => {
  return db.any('SELECT reported FROM questions WHERE question_id = $1', [questionID])
    .then(async (question) => {
      return question[0].reported + 1;
    })
    .then((reported) => {
      return db.any('UPDATE questions SET reported = $2 WHERE question_id = $1', [questionID, reported])
        .then(() => {
          return 204;
        })
        .catch((err) => {
          console.log('Error reporting question: ', err)
          return 500;
        })
    })
    .catch((err) => {
      console.log('Error selecting question reported:', err);
      return 404;
    })
};

var putAnswerHelpfulness = async (answerID) => {
  return db.any('SELECT helpfulness FROM answers WHERE answer_id = $1', [answerID])
    .then(async (answer) => {
      return answer[0].helpfulness + 1;
    })
    .then((updatedHelpfulness) => {
      return db.any('UPDATE answers SET helpfulness = $2 WHERE answer_id = $1', [answerID, updatedHelpfulness])
        .then(() => {
          return 204;
        })
        .catch((err) => {
          console.log('Error updating answer helpfulness: ', err)
          return 500;
        })
    })
    .catch((err) => {
      console.log('Error selecting answer helpfulness:', err);
      return 404;
    })
};

var putReportAnswer = async (answerID) => {
  return db.any('SELECT reported FROM answers WHERE answer_id = $1', [answerID])
    .then(async (answer) => {
      return answer[0].reported + 1;
    })
    .then((reported) => {
      return db.any('UPDATE answers SET reported = $2 WHERE answer_id = $1', [answerID, reported])
        .then(() => {
          return 204;
        })
        .catch((err) => {
          console.log('Error reporting answer: ', err)
          return 500;
        })
    })
    .catch((err) => {
      console.log('Error selecting answer reported:', err);
      return 404;
    })
};

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  putQuestionHelpfulness,
  putAnswerHelpfulness,
  putReportQuestion,
  putReportAnswer,
  getAnswerPhotos,
  getSpecificQuestion,
  getSpecificAnswers
}