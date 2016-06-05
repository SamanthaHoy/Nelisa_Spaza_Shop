// finds the weekly sales

exports.weeklySales = function(week) {
  var fs = require('fs'); // imports the csv file
  var fileContent = fs.readFileSync('./files/week' + week + '.csv', 'utf8'); /* gets the content of all the files from the pathname */
  if (week === 1) { /* splits the content by the new line character , ignores 1st and last lines*/
    var products = fileContent.split('\n').slice(1, -1);
  }
  else if (week === 2 || week === 3 || week === 4) {
    var products = fileContent.split('\n').slice(0, -1); /* splits the content by the new line character , ignores last lines*/
  }
  return products;
};


exports.groupedByProductName = function(products) {
  var productData = {};

  products.forEach(function(product) {
    var delimitedData = product.split(',');
    var Stock_item = delimitedData[2];
    var No_Sold = delimitedData[3];
    if (productData[Stock_item] === undefined) { //if it doesn't exist , add it and assign it a value of 0
      productData[Stock_item] = 0; // initialising
    }
    productData[Stock_item] += Number(No_Sold); //
  });

  console.log(productData);
  return productData;
};
