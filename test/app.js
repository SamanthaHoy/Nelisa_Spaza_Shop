var allProducts = require('../weekly_sales');
var mostProfitable = require('../most_profitable');
var assert = require('assert');

// var index = $("index-template").html();
// var weeks = $("weeks-template").html();
// var index_template = Handlebars.compile(index);
// var weeks_template = Handlebars.compile(weeks);

describe("Accessing and writing functions for the week's csv file", function() {

it("it should return the most popular product", function() { // works
  var products = allProducts.weeklySales(1);
  var result3 = allProducts.groupedByProductName(products);
  var result1 = allProducts.mostPopularProductSold(result3); // result from the grouped data
  var result2 = 'Coke 500ml';
  assert.equal(result1, result2);
});

it("it should return the least popular product", function() { // works
  var products = allProducts.weeklySales(1);
  var result3 = allProducts.groupedByProductName(products);
  var result1 = allProducts.leastPopularProductSold(result3); // result from the grouped data
  var result2 = 'Shampoo 1 litre';
  assert.equal(result1, result2);
});

it("it should return the most popular category",function(){ // works
  var products = allProducts.weeklySales(1); // reads in the product file
  var prodData = allProducts.groupedByProductName(products); // groups the Product by quantity
  var readFile = allProducts.getCategoriesFile(); // reads the category file in
  var catData = allProducts.createCategoryMap(readFile); // converts the categories file to a map
  var catQtyData = allProducts.createProductCategoriesMap(prodData,catData); // returns the categories with product quantities
  var mostPopularCategory = allProducts.getMostPopularCategory(catQtyData); // returns the category with the max quantity
  var result2 = 'Drinks';
  assert.deepEqual(mostPopularCategory,result2);
});

it("it should return the least popular category" , function(){ // works
  var products = allProducts.weeklySales(1); // reads in the product file
  var prodData = allProducts.groupedByProductName(products); // groups the Product by quantity
  var readFile = allProducts.getCategoriesFile(); // reads the category file in
  var catData = allProducts.createCategoryMap(readFile); // converts the categories file to a map
  var catQtyData = allProducts.createProductCategoriesMap(prodData,catData); // returns the categories with product quantities
  leastPopularCategory = allProducts.getLeastPopularCategory(catQtyData); // returns the category with the least quantity
  result2 = 'Toiletries';
  assert.equal(leastPopularCategory,result2);
});

it ("it should return the most profitable product" , function (){ // works
var productData = allProducts.weeklySales(1); // product sales data
var totalProductSalesPrice = mostProfitable.groupedbyProductTotalSales(productData); // returns the total product sales per product
var products = allProducts.weeklySales(1); // reads in the product file
var prodData = allProducts.groupedByProductName(products); // groups the Product by quantity
var dateArray = mostProfitable.getPurchasesDateRange(1); // reads in the purchase file , creates the start and end dates
var productPurchasesUnitCost = mostProfitable.getWeeklyPurchaseData(dateArray); // gets the purchase data between the date range,returns the product unit cost
var totalProductsPurchasePrice = mostProfitable.getPurchasePriceData(prodData,productPurchasesUnitCost); // returns the purchase price totals for each product
var productProfitMap = mostProfitable.getWeeklyProfit(totalProductSalesPrice,totalProductsPurchasePrice);// returns the profile per product
var mostProfitableProduct = mostProfitable.getMostProfitable(productProfitMap); // returns the most profitable product
var result2 = 'Imasi';
assert.equal(mostProfitableProduct,result2);
});

it("it should return the most profitable category", function (){
var products = allProducts.weeklySales(1); // gets all product data
var productData = allProducts.groupedByProductName(products); // gets all product quantities
var totalSalesData = mostProfitable.groupedbyProductTotalSales(products); // get total product sales
var dateArray = mostProfitable.getPurchasesDateRange(1); // gets the dates
var purchasesUnitCost = mostProfitable.getWeeklyPurchaseData(dateArray); // gets purchases unit cost
var totalPurchasesData = mostProfitable.getPurchasePriceData(productData,purchasesUnitCost); // get total purchases sales
var profitMap = mostProfitable.getWeeklyProfit(totalSalesData,totalPurchasesData); // gets the profit per product

var readFile = allProducts.getCategoriesFile(); // reads in the categories file
var catData = allProducts.createCategoryMap(readFile); // creates a category map
var catProdMap = allProducts.createProductCategoriesMap(profitMap,catData); // returns 1 map of category total sales
var getMostProfitableCategory = mostProfitable.getMostProfitable(catProdMap); // returns the most popular category
var result2 = 'Non-perishable food';
assert.equal(getMostProfitableCategory,result2);
});

});
