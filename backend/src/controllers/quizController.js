const AppError = require('./../error-handling/appError');
const Quiz = require('./../models/quizModel');

exports.getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find()
      .where('title')
      .regex(req.query.filter)
      .sort('-createdAd')
      .select('-__v')
      .skip(req.query.skip)
      .limit(req.query.limit)
      .exec();

    res.status(200).json({
      status: 'success',
      results: quizzes.length,
      data: {
        data: quizzes,
      },
    });
  } catch {
    next(new AppError('Failed to get all quizzes', 500));
  }
};

exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).exec();

    if (!quiz) {
      return next(new AppError('No quiz found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: quiz,
      },
    });
  } catch {
    next(new AppError('Failed to get quiz', 500));
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const newQuiz = await Quiz.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: newQuiz,
      },
    });
  } catch {
    next(new AppError('Failed to create quiz', 500));
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuiz) {
      return next(new AppError('No quiz found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedQuiz,
      },
    });
  } catch {
    next(new AppError('Failed to update quiz', 500));
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const doc = await Quiz.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No quiz found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch {
    next(new AppError('Failed to delete quiz', 500));
  }
};
