// Module used to populate the sales table with values from the week?.csv file(sales data) and the values from the
// products database , in order to get the prod_id , which would be inserted
// saved in an array format and inserted into the sales table

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

  for (var week = 1; week < 5; week++) {
    var salesData = weeklySales.weeklySales(week); // reads the week's.csv sales data
    // console.log(salesData);
    var values = weeklySales.getWeeklySalesProductIDinArray(salesData, prodDataMap);
    console.log(values);

    var sql = "INSERT INTO sales (sales_day,sales_date,prod_id,sales_quantity,sales_unit_price) VALUES ?";

    connection.query(sql, [values], function(err, sales) {
      if (err) {
        console.log("There is an error with the sales insertion sql");
      };
      throw err;
      console.log('The solution is: ', rows);
      console.log(sales);
      // connection.end();
    });
  }
  connection.end();
});
