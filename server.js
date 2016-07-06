// Create a file called server.js

var express = require('express');
var app = express();
var product_stats = require('./product_stats.js');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/sales/week/:week_no', function(req , res) {
  var week_num = Number(req.params.week_no) ;
  var data = product_stats.getWeeklyStats(week_num);
  res.render('week_template', data );
});

// app.get('/sales/week1', function(req , res) {
//   // var week_num = req.params.week_no ;
//   var data = product_stats.getWeeklyStats(1);
//   res.render('week_template', data );
// });
//
// app.get('/sales/week2', function(req , res) {
//   var data = product_stats.getWeeklyStats(2);
//   res.render('week_template', data );
// });
// app.get('/sales/week3', function(req , res) {
//   var data = product_stats.getWeeklyStats(3);
//   res.render('week_template', data );
// });
// app.get('/sales/week4', function(req , res) {
//   var data = product_stats.getWeeklyStats(4);
//   res.render('week_template', data );
// });

// start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
