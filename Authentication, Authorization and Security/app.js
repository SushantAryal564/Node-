const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const app = express();
const appError = require("./utils/appError");
const globalErrorHandler = require("./Controller/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
// 1) Global Middelware

// Security HTTP Headers
app.use(helmet());
// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour.",
});
app.use("/api", limiter);
// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Body parser, reading data from body into req.body.
app.use(
  express.json({
    limit: "10kb",
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingQuantity",
      "ratingAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Data sanitization against XSS
app.use(xss());
// Serving static file:
app.use(express.static(`${__dirname}/public`));
// app.use((req, res, next) => {
//   console.log('Hello from middleware 😁😁');
//   next();
// });
// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
/*
app.route('/api/v1/users/:id).get(getUser).patch(updatePatch).delete(deleteUser);
app.route("/api/v1/users/").get(getAllUser).post(createUser);
*/
// Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server.`,
  // });
  ///////////////////////////////////////
  // const error = new Error(`Can't find ${req.originalUrl} on this server.`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);
  ////////////////////////////////////////
  next(new appError(`Can't find ${req.originalUrl} on this server!.`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
