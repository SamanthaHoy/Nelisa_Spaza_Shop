// Create a file called server.js

var express = require('express');
var app = express();
var product_stats = require('./product_stats.js');

// create a route
// app.get('/hello', function(req, res) {
//   res.send('Hello Codex!');
// });

app.get('/sales/week1', function(req , res) { // this will send the output of my htmlstring to my browser
  res.send(product_stats.getWeeklyStats(4));
  // res.render("week_template",product_stats.getWeeklyStats(1));
});

// app.get('/sales/week/:week_no', function(req, res) { // cannot split the text and the variable part so a and extra / is necessary to be able to distinguish the variable part
//   /// res.send("the week_num :" + req.params.week_no);
//   var week_num = req.params.week_no;
//   res.send(product_stats.getWeeklyStats(week_num));
// });

// start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
