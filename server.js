// Create a file called server.js
// use express handlebars to pass data to your template and render it to your browser
// using routes

var express = require('express');
var flash = require('express-flash');
var exphbs = require('express-handlebars');
var session = require('express-session'); // used for HTTP authentication and authorisation
var mysql = require('mysql'); // node-mysql module
var bodyParser = require('body-parser');

// create application / x-www-form-urlencoded-parser
var product_stats = require('./functions/product_stats');
var categories = require('./routes/categories');
var products = require('./routes/products');
var sales = require('./routes/sales');
var users = require('./routes/users');
var purchases = require('./routes/purchases');
var moment = require('moment');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var jsonParser = bodyParser.json(); // create application/json parser
var app = express();

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
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
  }))
  // parse application/json
app.use(bodyParser.json())

var rolesMap = { // admin rights
  "Samantha": "admin",
  "Paul": "user",
  "Joe": "admin"
};
//set up HttpSession middleware
app.use(session({
  secret: 'my fortune cookie',
  cookie: {
    maxAge: 60000
  }
}));

// define the handlers for the authentication process
// app.use(function(req, res, next) {
//   console.log("in my middleware!");
//   // return res.redirect("/login"); // the user is not logged in redirect them to the login page
//   next(); //proceed to the next middleware component
// });

app.get('/', function(req, res) {
  res.redirect("/home");
});

// Route specific middleware allows you to add middleware components onto routes.
var checkUser = function(req, res, next) {
  if (req.session.user) { // if user exists , perform next task
    return next();
  }
  console.log("Checkuser...");
  res.redirect("/login"); // the user is not logged in redirect them to the login page
};

app.get("/home", checkUser, function(req, res) { // before logging in will check the user
  var s = req.session.user.username;
  res.render("home", {
    username: s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(), // first capital letter and rest lowercase
    is_admin: req.session.user.is_admin
  })
});

app.get("/login", function(req, res) {
  res.render("login", {});
});

app.post("/login", function(req, res) {

  if (rolesMap[req.body.username] === "admin") { // if admin then sets the is_admin to true , else false
    req.session.user = {
      username: req.body.username,
      is_admin: true
    };
  } else { // disables the rights to admin
    req.session.user = {
      username: req.body.username,
      is_admin: false
    };
  };

  var allowedToLogin = false; // variable reset for allowing a user to go to login page
  for (name in rolesMap) { // loops through the data object containing the names , roles and passwords
    if (req.session.user.username.trim() === name) { // if the form username matches with the database username , gets rid of the whitespaces
      allowedToLogin = true;
      break; // as soon as a match is found ,escapes for loop
    }
  }
  if (allowedToLogin) {    // if the user is found on the database (authenticated) , allow him or her to login
    res.redirect("/home"); // go home
  } else {
    res.redirect("/login"); // else if the user isn't authenticated , redirect back to the login page
  }
});

app.get("/logout", function(req, res) { // To authenticate logging out
  delete req.session.user;
  res.redirect("/login");
});

//setup the handlers ********************* taken out temporarily
// app.get("/", function(req, res) {
//   res.render("home");
//
//   app.get("/addProduct", function(req, res) {
//     res.render("add_products");
//   })
// });

app.get('/statistics/:week_no', function(req, res) {
  var week_num = Number(req.params.week_no);
  if (week_num < 5) {
    var data = product_stats.getWeeklyStats(week_num);
    return res.render('week_template', data); // return = break
  } else {
    var error = {
      error_message: "This is not a valid week.Please re-enter a number between 1-4"
    };
    res.render('error_template', error);
  };
});

// app.get('/', categories.display);
app.get('/categories', categories.display);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/edit/:cat_id', categories.get);
app.post('/categories/update/:cat_id', categories.update);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:cat_id', categories.delete);

app.get('/products', products.display);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/edit/:prod_id', products.get);
app.post('/products/update/:prod_id', products.update);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:prod_id', products.delete);

app.get('/sales', sales.display);
app.get('/sales/add', sales.showAdd);
app.post('/sales/add', sales.add);
app.get('/sales/edit/:sales_id', sales.get);
app.post('/sales/update/:sales_id', sales.update);
app.get('/sales/delete/:sales_id', sales.delete);

app.get('/purchases', purchases.display);
app.get('/purchases/add', purchases.showAdd);
app.post('/purchases/add', purchases.add);
app.get('/purchases/edit/:purchases_id', purchases.get);
app.post('/purchases/update/:purchases_id', purchases.update);
app.get('/purchases/delete/:purchases_id', purchases.delete);

app.get('/users', users.display);
app.get('/users/add', users.showAdd);
app.post('/users/add', users.add);
app.get('/users/edit/:user_id', users.get);
app.post('/users/update/:user_id', users.update);
app.get('/users/delete/:user_id', users.delete);

// start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server app listening at http://%s:%s', host, port);
});
