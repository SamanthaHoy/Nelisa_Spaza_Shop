var allProducts = require('./weekly_sales');
var mostProfitable = require('./most_profitable');
var assert = require('assert');
var Handlebars = require('handlebars');
var fs = require('fs');

// it("it should return the most popular product"
function getWeeklyValues(week) {
  var products = allProducts.weeklySales(week);
  var prodData = allProducts.groupedByProductName(products);
  var mostPopularProduct = allProducts.mostPopularProductSold(prodData);

  // it("it should return the least popular product"
  var products = allProducts.weeklySales(week);
  var prodData = allProducts.groupedByProductName(products);
  var leastPopularProduct = allProducts.leastPopularProductSold(prodData);

  // it("it should return the most popular category"
  var products = allProducts.weeklySales(week); // reads in the product file
  var prodData = allProducts.groupedByProductName(products); // groups the Product by quantity
  var readFile = allProducts.getCategoriesFile(); // reads the category file in
  var catData = allProducts.createCategoryMap(readFile); // converts the categories file to a map
  var catQtyData = allProducts.createProductCategoriesMap(prodData, catData); // returns the categories with product quantities
  var mostPopularCategory = allProducts.getMostPopularCategory(catQtyData); // returns the category with the max quantity

  // it("it should return the least popular category"
  var products = allProducts.weeklySales(week); // reads in the product file
  var prodData = allProducts.groupedByProductName(products); // groups the Product by quantity
  var readFile = allProducts.getCategoriesFile(); // reads the category file in
  var catData = allProducts.createCategoryMap(readFile); // converts the categories file to a map
  var catQtyData = allProducts.createProductCategoriesMap(prodData, catData); // returns the categories with product quantities
  var leastPopularCategory = allProducts.getLeastPopularCategory(catQtyData); // returns the category with the least quantity

  // it ("it should return the most profitable product"
  var productData = allProducts.weeklySales(week); // product sales data
  var totalProductSalesPrice = mostProfitable.groupedbyProductTotalSales(productData); // returns the total product sales per product
  var products = allProducts.weeklySales(week); // reads in the product file
  var prodData = allProducts.groupedByProductName(products); // groups the Product by quantity
  var dateArray = mostProfitable.getPurchasesDateRange(week); // reads in the purchase file , creates the start and end dates
  var productPurchasesUnitCost = mostProfitable.getWeeklyPurchaseData(dateArray); // gets the purchase data between the date range,returns the product unit cost
  var totalProductsPurchasePrice = mostProfitable.getPurchasePriceData(prodData, productPurchasesUnitCost); // returns the purchase price totals for each product
  var productProfitMap = mostProfitable.getWeeklyProfit(totalProductSalesPrice, totalProductsPurchasePrice); // returns the profile per product
  var mostProfitableProduct = mostProfitable.getMostProfitable(productProfitMap); // returns the most profitable product

  // it("it should return the most profitable category"
  var products = allProducts.weeklySales(week); // gets all product data
  var productData = allProducts.groupedByProductName(products); // gets all product quantities
  var totalSalesData = mostProfitable.groupedbyProductTotalSales(products); // get total product sales
  var dateArray = mostProfitable.getPurchasesDateRange(week); // gets the dates
  var purchasesUnitCost = mostProfitable.getWeeklyPurchaseData(dateArray); // gets purchases unit cost
  var totalPurchasesData = mostProfitable.getPurchasePriceData(productData, purchasesUnitCost); // get total purchases sales
  var profitMap = mostProfitable.getWeeklyProfit(totalSalesData, totalPurchasesData); // gets the profit per product

  var readFile = allProducts.getCategoriesFile(); // reads in the categories file
  var catData = allProducts.createCategoryMap(readFile); // creates a category map
  var catProdMap = allProducts.createProductCategoriesMap(profitMap, catData); // returns 1 map of category total sales
  var mostProfitableCategory = mostProfitable.getMostProfitable(catProdMap); // returns the most popular category

  var statsMap = { // shaping the data so that it can be used in handlebars
    "mostPopularProduct": mostPopularProduct,
    "leastPopularProduct": leastPopularProduct,
    "mostPopularCategory": mostPopularCategory,
    "leastPopularCategory": leastPopularCategory,
    "mostProfitableProduct": mostProfitableProduct,
    "mostProfitableCategory": mostProfitableCategory
  };
  return statsMap;
}

function createHtml(statsMap) {
  var source = fs.readFileSync('./views/week_template.hbs', 'utf8'); /* gets the template from the pathname */
  var template = Handlebars.compile(source); // handlebars template is compiled
  var data = statsMap; // the data being passed
  var result = template(data); // the compiled template with the data being passed
  return result;
}

for (var i = 1; i < 5; i++) {
  switch (i) {
    case 1:
      var statsMap_week1 = getWeeklyValues(i);
      var result = createHtml(statsMap_week1);
      var output = fs.writeFileSync("week1.html", result);
      break;
    case 2:
      var statsMap_week2 = getWeeklyValues(i);
      var result = createHtml(statsMap_week2);
      var output = fs.writeFileSync("week2.html", result);
      break;
    case 3:
      var statsMap_week3 = getWeeklyValues(i);
      var result = createHtml(statsMap_week3);
      var output = fs.writeFileSync("week3.html", result);
      break;
    case 4:
      var statsMap_week4 = getWeeklyValues(i);
      var result = createHtml(statsMap_week4);
      var output = fs.writeFileSync("week4.html", result);
      break;
  }
}