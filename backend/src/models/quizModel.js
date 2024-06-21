const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: [true, 'A question must have a number'],
    unique: true,
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
  },
  questions: [questionSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
