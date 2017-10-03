require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var apiRoutes = fs.readdirSync('../api');
var namespace = require('express-namespace');

var mongoose = require('mongoose');
mongoose.connection.openUri(process.env.MONGO_CONN_STRING);

var app = express();

var router = express.Router();
var port = process.env.PORT || 3000;
// app.set('port', port);

app.listen(port);

app.get('/', function(req, res) {
  res.send('Hello from the other side');
});

app.use(bodyParser.json({ limit: '50mb' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
// app.use('/api', router);

// app.namespace('/api', function routes() {
//   apiRoutes.forEach(function (route) {
//     var path = '../api/' + route + '/routes.js';
//
//     if (fs.existsSync(path)) {
//       require(path)(app);
//     }
//
//   });
//
//   app.get('/', function(req, res) {
//     res.send('Default');
//   });
// });

//defining routes
var user = require('./user/routes');
var word = require('./word/routes');
app.use('/users', user);
app.use('/words', word);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handling
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
