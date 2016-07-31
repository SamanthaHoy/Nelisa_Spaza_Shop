// Create a file called server.js
// use express handlebars to pass data to your template and render it to your browser

var express = require('express');
var app = express();
var product_stats = require('./product_stats.js');
var exphbs = require('express-handlebars');
var mysql  = require('mysql');  // node-mysql module
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json(); // create application/json parser
var urlencodedParser = bodyParser.urlencoded({extended: false}); // create application /x-www-form-urlencoded-parser
var categories = require('./routes/categories');
var products = require('./routes/products');
var sales = require('./routes/sales');
var purchases = require('./routes/purchases');

app.use(express.static(__dirname + '/public'));

var myConnection = require('express-myconnection'); // express-myconnection module
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      port: 3306,
      database: 'nelisa'
    };

app.use(myConnection(mysql, dbOptions, 'single'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setup the handlers
app.get('/', categories.display);
app.get('/categories', categories.display);
app.get('/categories/add', categories.showAdd);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', categories.delete);

app.get('/', products.display);
app.get('/products', products.display);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);

//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

app.get('/sales' , sales.display);

app.get('/purchases' , purchases.display);

// app.get('/sales/week/:week_no', function(req, res) {
//   var week_num = Number(req.params.week_no);
//   if (week_num < 5) {
//     var data = product_stats.getWeeklyStats(week_num);
//     return res.render('week_template', data); // return = break
//   } else {
//     var error = {error_message:"This is not a valid week.Please re-enter a number between 1-4"};
//     res.render('error_template', error);
//   };
// });

// start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server app listening at http://%s:%s', host, port);
});
