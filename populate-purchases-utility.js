// Module used to populate the sales table with values from the week?.csv file(sales data) and the values from the
// products database , in order to get the prod_id , which would be inserted
// saved in an array format and inserted into the sales table

var fs = require('fs');
var mysql = require('mysql'); // node-mysql module
var mostProfitable = require('./most_profitable.js');

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

var sql = "SELECT * FROM products";

connection.query(sql, function(err, products) {
  if (err) throw err;
  //console.log('The solution is: ', rows);
  // console.log(products);
  // connection.end();

  var prodDataMap = {};
  for (prod in products) { // need to convert the categories map into pure data
    var prod_id = products[prod].prod_id;
    var product_name = products[prod].product_name;
    if (prodDataMap[product_name] === undefined) { // puts it into a map format
      prodDataMap[product_name] = prod_id;
    }
  };

  console.log(prodDataMap);

  var values = mostProfitable.getWeeklyPurchaseProductIDinArray(prodDataMap); // gets the purchase data between the date range,returns the product unit cost
  // console.log(values);
  var sql = "INSERT INTO purchases (shop, purchase_date, prod_id, purchases_quantity, purchases_unit_price ) VALUES ?";
  connection.query(sql, [values], function(err, purchases) {
    if (err) {
      console.log("There is an error with the purchases insertion sql");
    };
    throw err;
    console.log('The solution is: ', rows);
    console.log(purchases);
    connection.end();
  });

});
