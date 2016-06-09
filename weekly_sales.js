// finds the weekly sales

exports.weeklySales = function(week) {
  var fs = require('fs'); // imports the csv file
  var fileContent = fs.readFileSync('./files/week' + week + '.csv', 'utf8'); /* gets the content of all the files from the pathname */
  if (week === 1) {
    var products = fileContent.split('\n').slice(1, -1); /* splits the content by the new line character , ignores 1st and last lines*/
  } else if (week === 2 || week === 3 || week === 4) {
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

exports.mostPopularProductSold = function(productData) {
  var maxValue = 0;
  var mostPopularProduct = undefined;

  for (key in productData) {
    if (productData[key] > maxValue) {
      maxValue = productData[key];
      mostPopularProduct = key;
    }
  }
  console.log("The mostPopularProduct sold is :" + mostPopularProduct + " with a quantity of : " + maxValue);
  return mostPopularProduct;
};

exports.leastPopularProductSold = function(productData) {
  var minValue = 10000000;
  var leastPopularProduct = undefined;

  for (key in productData) {
    if (productData[key] < minValue) {
      minValue = productData[key];
      leastPopularProduct = key;
    }
  }
  console.log("The least popular product is :" + leastPopularProduct + " with a quantity of :" + minValue);
  return leastPopularProduct;
};

exports.getCategoriesFile = function() {
  var fs = require('fs'); // imports the csv file
  var fileContent = fs.readFileSync('./files/categories.csv', 'utf8'); /* gets the content of all the files from the pathname */
  var categories = fileContent.split('\n').slice(0, -1); // splits and removes the last line
  return categories;
};

exports.createCategoryMap = function(categories) {
  var categoryData = {};

  categories.forEach(function(category) {
    var delimitedData = category.split(',');
    var Stock_item = delimitedData[0];
    var Category = delimitedData[1];
    if (categoryData[Stock_item] === undefined) { //if it doesn't exist , add it and assign it a value of 0
      categoryData[Stock_item] = Category; // initialising
    }
  });
  console.log(categoryData);
  return categoryData;
};


exports.createProductCategoriesMap = function(productData, categoryData) {
  var catProdMap = {};
  for (var prod in productData) {
    var category = categoryData[prod];
    var quantity = productData[prod];
    if (catProdMap[category] === undefined) {
      catProdMap[category] = 0;
      // console.log(" initialising - catProdMap : " + category);
    }
    catProdMap[category] += Number(quantity);
    // console.log("Adding to - catProdMap : " + category + " " + catProdMap[category]);
  }
  console.log(catProdMap);
  return catProdMap;
};

exports.getMostPopularCategory = function(catProdMap) {
  var maxCat = undefined;
  var maxValue = 0;

  for (var cat in catProdMap) {
    if (catProdMap[cat] > maxValue) {
      maxValue = catProdMap[cat];
      maxCat = cat;
    }
  }
  console.log("The most popular category is " + maxCat + " (with a value of " + maxValue + ")");
  return maxCat;
}

exports.getLeastPopularCategory = function(catProdMap) {
  var minCat = undefined;
  var minValue = 109;

  for (cat in catProdMap) {
    if (catProdMap[cat] < minValue) {
      minValue = catProdMap[cat];
      minCat = cat;
    }
  }
  console.log("The least popular category is " + minCat + " (with a value of " + minValue + ")");
  return minCat;
}
