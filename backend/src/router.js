const express = require('express');
const userRouter = require('./routes/userRouter');
const quizzesRouter = require('./routes/quizzesRouter');

const router = express.Router();

router.use('/users', userRouter);
router.use('/quizzes', quizzesRouter);

module.exports = router;
