var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//日志组件
var logger = require('morgan');



var app = express();

//全局变量
global.rname=__dirname;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//控制器
var indexRouter = require('./controller/index');
var customerRouter = require('./controller/customer');
var adminRouter = require('./controller/admin');
var greetRouter = require('./controller/test'); //just for test
var managerRouter = require('./controller/manager');
var receptionistRounter = require('./controller/receptionist');
app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/admin',adminRouter);
app.use('/manager',managerRouter);
app.use('/receptionost',receptionistRounter);
app.use('/greet',greetRouter);
//错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
