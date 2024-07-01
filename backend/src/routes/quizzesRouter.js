const express = require('express');
const passport = require('passport');
const quizController = require('./../controllers/quizController');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(quizController.getAllQuizzes).post(quizController.createQuiz);

router.route('/:id').get(quizController.getQuiz).put(quizController.updateQuiz).delete(quizController.deleteQuiz);

module.exports = router;
