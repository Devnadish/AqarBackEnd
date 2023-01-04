var express = require('express');
// const fileUpload = require('express-fileupload');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ApiError = require("./controller/errorhandler");
const globalError = require("./middeware/errorWiddleware");
const resposeTimeout = require("response-time");
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aqarRouter = require("./routes/aqarRouter");
var libRouter = require("./routes/libRouter");
var OfferRouter = require("./routes/OfferRouter");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());

app.use(resposeTimeout());
app.use(globalError);
app.use(cors());
app.use(logger('dev'));


// app.get("/", (req, res) => {
//   res.send("welcome To AqarMarket");
// });
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/lib", libRouter);
app.use("/aqar", aqarRouter);
app.use("/aqar/newoffer", OfferRouter);




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
