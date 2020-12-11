# QuestionsAndAnswers

### Overview:

A service for retrieving, posting and updating questions and answers for an apparel application.

### Features:

* Able to extract and transform questions and answers from an existing database and load into a newly created PostgreSQL database

* Provides routes for:
  * Retrieving questions
  * Retrieving answers
  * Posting a question
  * Posting an answer
  * Reporting a question
  * Reporting an answer
  * Marking a question as helpful
  * Marking an answer as helpful

* Reported questions and answers will not be retrieved from database

* Optimized database queries

* Median reponse time under 10 ms with more than 400 requests per second for retrieving questions and answers

### Installation
Run: npm install

### Usage
* To start the server: npm start
* To run test suite: npm test
* To create a database and import data from CSV files: npm run load
* To stress test: npm run stress

### Team
* Shortcrust : https://github.com/hratx52-shortcrust
* David Lichter : https://github.com/davidlichter
* Jesse Pye : https://github.com/jessepye

### Roadmap
Deployment to Amazon Web Services using EC2