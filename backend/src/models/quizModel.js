const mongoose = require('mongoose');
const AppError = require('../error-handling/appError');

const questionSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: [true, 'A question must have a number'],
  },
  prompt: {
    type: String,
    required: [true, 'A question must have a prompt'],
    trim: true,
  },
  image: {
    type: String,
  },
  answer: {
    type: String,
    required: [true, 'A question must have an answer'],
    trim: true,
  },
  options: [{ _id: false, option: String }],
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A quiz must have a title'],
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Quiz must belong to a user'],
  },
  questions: [questionSchema],
});

quizSchema.pre('save', function (next) {
  const questions = this.questions;
  const questionSet = [...new Set(questions.map((q) => q.position))];

  if (questionSet.length === questions.length) {
    next();
  } else {
    next(new AppError('There are two questions with the same position'));
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
