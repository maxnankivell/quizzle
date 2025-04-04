const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const cors = require('cors');

const router = require('./router');
const AppError = require('./error-handling/appError');
const globalErrorCatcher = require('./error-handling/errorCatcher');
const initializePassport = require('./auth/passport-jwt');

const app = express();

// Allow cross origin requests
const whitelist = process.env.NODE_ENV === 'production' ? ['https://produrlgoeshere.com'] : ['http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

// Limit requests from same API
app.use(
  '/api',
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  }),
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());
// TODO

// Prevent parameter pollution
// app.use(hpp());
// TODO

// Initialize passport for auth
initializePassport(passport);

// Router
app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorCatcher);

module.exports = app;
