// finds the weekly sales
exports.weeklySales = function(week) {
  var fs = require('fs'); // imports the csv file
  var fileContent = fs.readFileSync('./files/week' + week + '.csv', 'utf8'); /* gets the content of all the files from the pathname */
  var products = [];
  if (week === 1) {
    products = fileContent.split('\n').slice(1, -1); /* splits the content by the new line character , ignores 1st and last lines*/
  } else if (week > 1 && week < 5) {
    products = fileContent.split('\n').slice(0, -1); /* splits the content by the new line character , ignores last lines*/
  }
  return products;
};

exports.groupedByProductName = function(products) {
  var productData = {};
  var firstProductLine = products[0].split(','); // gets the first line
  var prodDate = firstProductLine[1]; // gets the date from the first line
  var startDate = new Date(prodDate); // converts it to date format
  var endDate = new Date(+new Date(startDate) + 1000 * 60 * 60 * 24 * 6);
  // console.log("prodDate :" + prodDate + " startDate: " + startDate + " endDate: " + endDate);

  products.forEach(function(product) {
    var delimitedData = product.split(',');
    var date = delimitedData[1];
    var currentDate = new Date(date);
    var Stock_item = delimitedData[2];
    var No_Sold = delimitedData[3];
    if (currentDate >= startDate && currentDate <= endDate) {
      if (productData[Stock_item] === undefined) { //if it doesn't exist , add it and assign it a value of 0
        productData[Stock_item] = 0; // initialising
      }
      productData[Stock_item] += Number(No_Sold);
    }
  });
  // console.log(productData);
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
  // console.log("=================================================================================");
  // console.log("The mostPopularProduct sold is :" + mostPopularProduct + " with a quantity of : " + maxValue);
  // console.log("=================================================================================");
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
  // console.log("=================================================================================");
  // console.log("The least popular product is :" + leastPopularProduct + " with a quantity of :" + minValue);
  // console.log("=================================================================================");
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
  // console.log("Product category data");
  // console.log(categoryData);
  return categoryData;
};

exports.createProductCategoriesMap = function(productData, categoryData) {
  var catProdMap = {};
  for (var prod in productData) {
    var category = categoryData[prod];
    var quantity = productData[prod];
    if (catProdMap[category] === undefined) {
      catProdMap[category] = 0;
    }
    catProdMap[category] += Number(quantity);
  }
  // console.log("Grouped Category Map");
  // console.log(catProdMap);
  return catProdMap;
};

exports.createProductCategoryIdArray = function(prodCatMap, catDataMap) { //* categories.csv file and category map from the DB
  var catProdArray1 = []; // new array
  var catProdArray2 = []; // new array
  for (var product in prodCatMap) {
    var product_category_name = prodCatMap[product];
    var category_id = catDataMap[product_category_name];
    catProdArray1.push(product,category_id);
    // console.log("product:" + prod + " prod category_name:" + product_category_name);
    // console.log("category_id : " + category_id);
  }
  console.log("catProdArray1");
  console.log(catProdArray1);
  var catProdArray2 = catProdArray1;
  console.log("catProdArray2");
  console.log(catProdArray2);
  return catProdArray2;
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
  // console.log("=================================================================================");
  // console.log("The most popular category is " + maxCat + " (with a value of R" + maxValue + ")");
  // console.log("=================================================================================");
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
  // console.log("=================================================================================");
  // console.log("The least popular category is " + minCat + " (with a value of R" + minValue + ")");
  // console.log("=================================================================================");
  return minCat;
}
