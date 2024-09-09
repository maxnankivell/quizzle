const jwt = require('jsonwebtoken');

exports.createToken = (user, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN.toString() + 'd',
  });

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: 'None',
  };

  res.cookie('jwt', token, cookieOptions);
};
