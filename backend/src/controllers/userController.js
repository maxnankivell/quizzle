const authHelper = require('../auth/auth-helper');
const User = require('./../models/userModel');
const AppError = require('./../error-handling/appError');
const crypto = require('crypto');

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

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    // eslint-disable-next-line no-unused-vars
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // const resetURL = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/v1/users/resetPassword/${resetToken}`;

    // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      // await sendEmail({
      //   email: user.email,
      //   subject: 'Your password reset token (valid for 10 min)',
      //   message
      // });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      next(new AppError('There was an error sending the email. Try again later!'), 500);
    }
  } catch {
    next(new AppError('There was an error resetting your password. Try again later!'), 500);
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ status: 'success' });
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (req.body.password !== req.body.passwordConfirm) {
      next(new AppError('Passwords dont match', 500));
    }

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    user.password = req.body.password;
    await user.save();

    authHelper.createToken(user, res);

    // Remove password from output
    user.password = undefined;

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch {
    next(new AppError('Error creating user', 500));
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  } catch {
    next(new AppError('Failed to get user', 500));
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const userToUpdate = await User.findById(req.user.id);

    if (!userToUpdate) {
      return next(new AppError('No user found with that ID', 404));
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedUser,
      },
    });
  } catch {
    next(new AppError('Failed to update quiz', 500));
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    const userToDelete = await User.findById(req.user.id);

    if (!userToDelete) {
      return next(new AppError('No user found with that ID', 404));
    }

    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch {
    next(new AppError('Failed to delete user', 500));
  }
};
