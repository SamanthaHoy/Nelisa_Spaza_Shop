// Create a file called server.js
// use express handlebars to pass data to your template and render it to your browser

var fs = require('fs');
var mysql = require('mysql'); // node-mysql module
var weeklySales = require('./weekly_sales.js');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  // port: 3306,
  database: 'nelisa'
});

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

var cat_sql = "SELECT * FROM categories";

connection.query(cat_sql, function(err, categories) {
  if (err) throw err;
  //console.log('The solution is: ', rows);
  console.log(categories);
  connection.end();

  // var catData = [];
  var catData = {};
  for (cat in categories) { // need to convert the categories map into pure data
    // var catVar = [categories[cat].cat_name, categories[cat].cat_id]; // to put it into array format
    // catData.push( // to put it into array format
    //   catVar // to put it into array format
    // )
    var cat_name = categories[cat].cat_name;
    var cat_id = categories[cat].cat_id;
    if (catData[cat_name] === undefined){ // puts it into a map format
      catData[cat_name] = cat_id
    }
  };

  // console.log("catDatafromDB");
  // console.log(catData);
  // console.log("======================================");

  var prodCatData = weeklySales.getCategoriesFile(); // reads the categories.csv in
  // console.log("prodCatData");
  // console.log(prodCatData);
  // console.log("======================================");

  // var prodCatMap = weeklySales.createCategoryMap(catData);
  var prodCatMap = weeklySales.createCategoryMap(prodCatData); // converted into a map
  // console.log("prodCatMap");
  // console.log(prodCatMap);
  // console.log("======================================");

  var prodCatMap = weeklySales.createProductCategoryIdArray(prodCatMap,catData);
  var products_sql = "INSERT  FROM categories";

});
