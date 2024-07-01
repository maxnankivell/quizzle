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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    authHelper.createToken(user, res);

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch {
    next(new AppError('Error logging in user', 500));
  }
};

exports.logout = (req, res, _next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
