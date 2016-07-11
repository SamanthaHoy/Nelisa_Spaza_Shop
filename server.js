// Create a file called server.js
// use express handlebars to pass data to your template and render it to your browser

var express = require('express');
var app = express();
var product_stats = require('./product_stats.js');
var exphbs = require('express-handlebars');
var mysql  = require('mysql');  // node-mysql module

var myConnection = require('express-myconnection'); // express-myconnection module
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      port: 3306,
      database: 'NELISA'
    };

app.use(myConnection(mysql, dbOptions, 'single'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/sales/week/:week_no', function(req, res) {
  var week_num = Number(req.params.week_no);
  if (week_num < 5) {
    var data = product_stats.getWeeklyStats(week_num);
    return res.render('week_template', data); // return = break
  } else {
    var error = {error_message:"This is not a valid week.Please re-enter a number between 1-4"};
    res.render('error_template', error);
  };
});

// start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  //console.log('Example app listening at http://%s:%s', host, port);
});
