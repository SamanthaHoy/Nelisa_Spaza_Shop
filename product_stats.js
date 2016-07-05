var allProducts = require('./weekly_sales');
var mostProfitable = require('./most_profitable');
var assert = require('assert');
var Handlebars = require('handlebars');
var fs = require('fs');
var statsMap_week1 = {};

// var express = require('express');
// var handlebars = require('express-handlebars');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var flash = require('express-flash');

// it("it should return the most popular product"
function getWeeklyValues(week) {
  var products = allProducts.weeklySales(week);
  var prodData = allProducts.groupedByProductName(products);
  var mostPopularProduct = allProducts.mostPopularProductSold(prodData);

  // it("it should return the least popular product"
    var leastPopularProduct = allProducts.leastPopularProductSold(prodData);

  // it("it should return the most popular category"
  var readFile = allProducts.getCategoriesFile(); // reads the category file in
  var catData = allProducts.createCategoryMap(readFile); // converts the categories file to a map
  var catQtyData = allProducts.createProductCategoriesMap(prodData, catData); // returns the categories with product quantities
  var mostPopularCategory = allProducts.getMostPopularCategory(catQtyData); // returns the category with the max quantity

  // it("it should return the least popular category"
    var leastPopularCategory = allProducts.getLeastPopularCategory(catQtyData); // returns the category with the least quantity

  // it ("it should return the most profitable product"
  var totalProductSalesPrice = mostProfitable.groupedbyProductTotalSales(products); // returns the total product sales per product
  var dateArray = mostProfitable.getPurchasesDateRange(week); // reads in the purchase file , creates the start and end dates
  var productPurchasesUnitCost = mostProfitable.getWeeklyPurchaseData(dateArray); // gets the purchase data between the date range,returns the product unit cost
  var totalProductsPurchasePrice = mostProfitable.getPurchasePriceData(prodData, productPurchasesUnitCost); // returns the purchase price totals for each product
  var productProfitMap = mostProfitable.getWeeklyProfit(totalProductSalesPrice, totalProductsPurchasePrice); // returns the profile per product
  var mostProfitableProduct = mostProfitable.getMostProfitable(productProfitMap); // returns the most profitable product

  // it("it should return the most profitable category"
  var catProdMap = allProducts.createProductCategoriesMap(productProfitMap, catData); // returns 1 map of category total sales
  var mostProfitableCategory = mostProfitable.getMostProfitable(catProdMap); // returns the most popular category

  var statsMap = { // shaping the data so that it can be used in handlebars
    "title": "Nelisa's Spaza Shop",
    "heading1": "Nelisa's Spaza Shop",
    "heading2" : "Week " + week + "'s" + " Statistics",
    "mostPopularProduct": mostPopularProduct,
    "leastPopularProduct": leastPopularProduct,
    "mostPopularCategory": mostPopularCategory,
    "leastPopularCategory": leastPopularCategory,
    "mostProfitableProduct": mostProfitableProduct,
    "mostProfitableCategory": mostProfitableCategory
  };
  return statsMap;
}

exports.getWeeklyStats = function (week) {
  var statsMap = getWeeklyValues(week);
  return statsMap;
  // var htmlString = createHtml(statsMap); // when returning the htmlstring with compiled template+data combined , use this
  // return htmlString; // returning the htmlString
}
