var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sql = require('mssql'); 

// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('ct:2e79401dbfb841a29094b3790e62388b@kahana.mongohq.com:10025/nodetest');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// var config = {
//     Server=tcp:qqy8bap74c.database.windows.net,
//     1433;Database=Learn;Uid=cttest@qqy8bap74c;Pwd={your_password_here};Encrypt=yes;Connection Timeout=30;
// }


var config = {
    user: 'cttest@qqy8bap74c',
    password: '*Tank.8280',
    server: 'tcp:qqy8bap74c.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    port: '1433',
    database: 'Learn',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }}

sql.connect(config, function(err) {
    var request = new sql.Request();
    request.query('select * from Users', function(err, recordset) {
        // ... error checks

        console.dir(recordset);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
