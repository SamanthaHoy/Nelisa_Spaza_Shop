// Module used to populate the users table with values from the users database , in order to get the user_id , which would be inserted
// saved in an array format and inserted into the users table

var fs = require('fs');
var mysql = require('mysql'); // node-mysql module


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

var sql = "SELECT * FROM users WHERE username = ";

connection.query(sql, function(err, users) {
  if (err) throw err;
  //console.log('The solution is: ', rows);
  console.log(users);
  // connection.end();

  // var catData = {};
  // for (cat in categories) { // need to convert the categories map into pure data
  //   var cat_name = categories[cat].cat_name;
  //   var cat_id = categories[cat].cat_id;
  //   if (catData[cat_name] === undefined) { // puts it into a map format
  //     catData[cat_name] = cat_id
  //   }
  // };

  // var prodCatData = weeklySales.getCategoriesFile(); // reads the categories.csv in
  // var prodCatMap = weeklySales.createCategoryMap(prodCatData); // converted into a map
  // var prodCatArray = weeklySales.createProductCategoryIdArray(prodCatMap, catData); // creates the products,category ID in array format
  //
  // var sql = "INSERT INTO products (product_name, cat_id) VALUES ?";
  // var values = prodCatArray;
  //
  // connection.query(sql, [values], function(err, products) {
  //   if (err) {
  //     console.log("There is an error with the product insertion sql");
  //   };
  //   throw err;
  //   console.log('The solution is: ', rows);
  //   console.log(products);
    connection.end();
  });

});
