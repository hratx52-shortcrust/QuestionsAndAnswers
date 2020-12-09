const { getQuestions, getAnswers, postQuestion, postAnswer, putQuestionHelpfulness, putAnswerHelpfulness, putReportQuestion, putReportAnswer, getAnswerPhotos, getSpecificQuestion, getSpecificAnswers } = require('../database/questionsQuery');

test('Gets questions from database', () => {
  return getQuestions(700)
    .then((data => {
      for (var i = 0; i < data.length; i++) {
        delete data[i].question_date;
      }
      expect(data).toMatchObject(
        [
            {
                "question_id": 2464,
                "question_body": "Omnis dolorem dolor iure vitae exercitationem et vel ab.",
                "asker_name": "Johnathan.Lind70",
                "question_helpfulness": 10,
                "reported": 0
            },
            {
                "question_id": 2465,
                "question_body": "Eos quibusdam odio est quia illo voluptate aut.",
                "asker_name": "Turner_Stracke",
                "question_helpfulness": 17,
                "reported": 0
            },
            {
                "question_id": 2466,
                "question_body": "Itaque rem voluptatem.",
                "asker_name": "Nedra.Sawayn59",
                "question_helpfulness": 4,
                "reported": 0
            }
        ]
      )
  }))
});

test('Gets answers from database', () => {
  return getAnswers(700)
    .then((data => {
      for (var i = 0; i < data.length; i++) {
        delete data[i].date;
      }
      expect(data).toMatchObject(
        [
          {
              "answer_id": 2274,
              "body": "Deserunt autem et veritatis natus enim voluptatum eaque.",
              "answerer_name": "Jarred.Bayer48",
              "helpfulness": 19
          },
          {
              "answer_id": 2275,
              "body": "Sapiente magnam minima a natus ullam facilis assumenda quia.",
              "answerer_name": "Lillian62",
              "helpfulness": 6
          },
          {
              "answer_id": 2276,
              "body": "Voluptatem velit necessitatibus facere.",
              "answerer_name": "Morris_Kunze",
              "helpfulness": 12
          }
      ]
    )
  }))
});

test('Mark question as helpful in database', () => {
  return getSpecificQuestion(5555)
    .then((question) => {
      return question[0].question_helpfulness
    })
    .then(async(initialHelpfulness) => {
      await putQuestionHelpfulness(5555);
      return initialHelpfulness;
    })
    .then(async(initialHelpfulness) => {
      var updatedHelpful = await getSpecificQuestion(5555)
      return {
        updatedHelpful: updatedHelpful[0].question_helpfulness,
        initialHelpfulness: initialHelpfulness
      }
    })
    .then((updated) => {
      expect(updated.updatedHelpful).toBe(updated.initialHelpfulness + 1)
    })
})

test('Mark answer as helpful in database', () => {
  return getSpecificAnswers(456789)
    .then((answer) => {
      return answer[0].helpfulness
    })
    .then(async (initialHelpfulness) => {
      await putAnswerHelpfulness(456789);
      return initialHelpfulness;
    })
    .then(async(initialHelpfulness) => {
      var updatedHelpful = await getSpecificAnswers(456789)
      return {
        updatedHelpful: updatedHelpful[0].helpfulness,
        initialHelpfulness: initialHelpfulness
      }
    })
    .then((updated) => {
      expect(updated.updatedHelpful).toBe(updated.initialHelpfulness + 1)
    })
})