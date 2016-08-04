// Create a file called server.js
// use express handlebars to pass data to your template and render it to your browser

var express = require('express');
var product_stats = require('./product_stats.js');
var exphbs = require('express-handlebars');
var mysql  = require('mysql');  // node-mysql module
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false}); // create application /x-www-form-urlencoded-parser
var categories = require('./routes/categories');
var products = require('./routes/products');
var sales = require('./routes/sales');
var purchases = require('./routes/purchases');
var moment = require('moment');

var app = express();
var jsonParser = bodyParser.json(); // create application/json parser


app.use(express.static(__dirname + '/public'));

var myConnection = require('express-myconnection'); // express-myconnection module
var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      port: 3306,
      database: 'nelisa'
    };

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.get("/",function(req,res){
  res.render("home");

  app.get("/addProduct",function(req,res){
    res.render("add_products");
  })
});
//setup the handlers
app.get('/', categories.display);
app.get('/categories', categories.display);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/edit/:cat_id', categories.get);
app.post('/categories/update/:cat_id', categories.update);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:cat_id', categories.delete);

// app.get('/', products.display);
app.get('/products', products.display);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/edit/:prod_id', products.get);
app.post('/products/update/:prod_id', products.update);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:prod_id', products.delete);

app.get('/sales' , sales.display);
app.get('/sales/add', sales.showAdd);
app.post('/sales/add', sales.add);
app.get('/sales/edit/:sales_id', sales.get);
app.post('/sales/update/:sales_id', sales.update);
app.get('/sales/delete/:sales_id', sales.delete);

app.get('/purchases' , purchases.display);
app.get('/purchases/add', purchases.showAdd);
app.post('/purchases/add', purchases.add);



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
