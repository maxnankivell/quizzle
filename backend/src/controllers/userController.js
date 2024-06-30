const authHelper = require('../auth/auth-helper');
const User = require('./../models/userModel');
const AppError = require('./../error-handling/appError');

exports.signup = async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    next(new AppError('Passwords dont match', 500));
  }

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    authHelper.createToken(newUser, res);

    // Remove password from output
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch {
    next(new AppError('Error creating user', 500));
  }
};
