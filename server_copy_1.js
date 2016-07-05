// Create a file called server.js

var express = require('express');
var app = express();
var product_stats = require('./product_stats.js');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// create my routes
// app.get('/sales/week1', function(req , res) { // this will send the output of my htmlstring to my browser
//   res.send(product_stats.getWeeklyStats(1)); // use this when getting the compiled template+data htmlstring
// });
app.get('/sales/week1', function(req , res) {
  // var week_num = req.params.week_no ;
  var data = product_stats.getWeeklyStats(1);
  // res.send(product_stats.getWeeklyStats(1));
  res.render('week_template', data );
});

// start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
