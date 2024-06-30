const express = require('express');
const passport = require('passport');
const quizController = require('./../controllers/quizController');

const router = express.Router();

router.route('/').get(quizController.getAllQuizzes).post(quizController.createQuiz);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), quizController.getQuiz)
  .put(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

module.exports = router;
