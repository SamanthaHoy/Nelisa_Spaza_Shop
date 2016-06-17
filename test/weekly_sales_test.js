// takes a sentence as a parameter and returns the sum of the length of words in it

var allProducts = require('../weekly_sales');
var mostProfitable = require('../most_profitable');
var assert = require('assert');
var result3 = undefined

describe("Accessing and writing functions for the week's csv file", function() {

  it('it should find the week1"s file ', function() {
    var readFile = allProducts.weeklySales(1);
    console.log(readFile);
    assert.equal(readFile.length, 105);
  });

  // it("it should find the week4's file ", function() {
  //   var readFile = allProducts.weeklySales(4);
  //   console.log(readFile);
  //   assert.equal(readFile.length, 120);
  // });

  it("it should return unique list of products", function() {
    var products = allProducts.weeklySales(1);
    var result1 = allProducts.groupedByProductName(products);
    result3 = result1;
    var result2 = {
      'Milk 1l': 39,
      Imasi: 30,
      Bread: 45,
      'Chakalaka Can': 23,
      'Gold Dish Vegetable Curry Can': 17,
      'Fanta 500ml': 33,
      'Coke 500ml': 54,
      'Cream Soda 500ml': 22,
      'Iwisa Pap 5kg': 17,
      'Top Class Soy Mince': 22,
      'Shampoo 1 litre': 3,
      'Soap Bar': 12,
      'Bananas - loose': 47,
      'Apples - loose': 36,
      'Mixed Sweets 5s': 49
    };
    assert.deepEqual(result1, result2);
  });

  it("it should return the most popular product", function() {
    var result3 = {
      'Milk 1l': 39,
      Imasi: 30,
      Bread: 45,
      'Chakalaka Can': 23,
      'Gold Dish Vegetable Curry Can': 17,
      'Fanta 500ml': 33,
      'Coke 500ml': 54,
      'Cream Soda 500ml': 22,
      'Iwisa Pap 5kg': 17,
      'Top Class Soy Mince': 22,
      'Shampoo 1 litre': 3,
      'Soap Bar': 12,
      'Bananas - loose': 47,
      'Apples - loose': 36,
      'Mixed Sweets 5s': 49
    };
    var result1 = allProducts.mostPopularProductSold(result3); // result from the grouped data
    var result2 = 'Coke 500ml';
    assert.equal(result1, result2);
  });

  it("it should return the least popular product", function() {
    var result3 = {
      'Milk 1l': 39,
      Imasi: 30,
      Bread: 45,
      'Chakalaka Can': 23,
      'Gold Dish Vegetable Curry Can': 17,
      'Fanta 500ml': 33,
      'Coke 500ml': 54,
      'Cream Soda 500ml': 22,
      'Iwisa Pap 5kg': 17,
      'Top Class Soy Mince': 22,
      'Shampoo 1 litre': 3,
      'Soap Bar': 12,
      'Bananas - loose': 47,
      'Apples - loose': 36,
      'Mixed Sweets 5s': 49
    };
    var result1 = allProducts.leastPopularProductSold(result3); // result from the grouped data
    var result2 = 'Shampoo 1 litre';
    assert.equal(result1, result2);
  });

  it('it should read the category file ', function() {
    var readFile = allProducts.getCategoriesFile();
    console.log(readFile);
    assert.equal(readFile.length, 15);
  });

  it('it should create an map of products with categories', function(){
    var readFile = allProducts.getCategoriesFile();
    var result1 = allProducts.createCategoryMap(readFile);
    var result2 =
      { 'Milk 1l': 'Dairy',
      Imasi: 'Dairy',
      Bread: 'Bakery',
      'Chakalaka Can': 'Non-perishable food',
      'Gold Dish Vegetable Curry Can': 'Non-perishable food',
      'Fanta 500ml': 'Drinks',
      'Coke 500ml': 'Drinks',
      'Cream Soda 500ml': 'Drinks',
      'Iwisa Pap 5kg': 'Non-perishable food',
      'Top Class Soy Mince': 'Non-perishable food',
      'Shampoo 1 litre': 'Toiletries',
      'Soap Bar': 'Toiletries',
      'Bananas - loose': 'Fruit',
      'Apples - loose': 'Fruit',
      'Mixed Sweets 5s': 'Sweets' };
    assert.deepEqual(result1,result2);
  });

  it('it should combine products and category into 1 map', function(){
    var prodData = {
      'Milk 1l': 39,
      Imasi: 30,
      Bread: 45,
      'Chakalaka Can': 23,
      'Gold Dish Vegetable Curry Can': 17,
      'Fanta 500ml': 33,
      'Coke 500ml': 54,
      'Cream Soda 500ml': 22,
      'Iwisa Pap 5kg': 17,
      'Top Class Soy Mince': 22,
      'Shampoo 1 litre': 3,
      'Soap Bar': 12,
      'Bananas - loose': 47,
      'Apples - loose': 36,
      'Mixed Sweets 5s': 49
    };
    var catData =
      { 'Milk 1l': 'Dairy',
     Imasi: 'Dairy',
     Bread: 'Bakery',
     'Chakalaka Can': 'Non-perishable food',
     'Gold Dish Vegetable Curry Can': 'Non-perishable food',
     'Fanta 500ml': 'Drinks',
     'Coke 500ml': 'Drinks',
     'Cream Soda 500ml': 'Drinks',
     'Iwisa Pap 5kg': 'Non-perishable food',
     'Top Class Soy Mince': 'Non-perishable food',
     'Shampoo 1 litre': 'Toiletries',
     'Soap Bar': 'Toiletries',
     'Bananas - loose': 'Fruit',
     'Apples - loose': 'Fruit',
     'Mixed Sweets 5s': 'Sweets' };
     result2 = {
       Dairy:69,
       Bakery:45,
       'Non-perishable food':79,
       Drinks:109,
       Toiletries:15,
       Fruit:83,
       Sweets:49
     };
  var result1 = allProducts.createProductCategoriesMap(prodData,catData);
    assert.deepEqual(result1,result2);
  });

  it("it should return the most popular category",function(){
    var catProdMap = {
      Dairy:69,
      Bakery:45,
      'Non-perishable food':79,
      Drinks:109,
      Toiletries:15,
      Fruit:83,
      Sweets:49
    };
    var result1 = allProducts.getMostPopularCategory(catProdMap);
    var result2 = 'Drinks';
    assert.deepEqual(result1,result2);
  });

  it("it should return the least popular category" , function(){
    var catProdMap = {
      Dairy:69,
      Bakery:45,
      'Non-perishable food':79,
      Drinks:109,
      Toiletries:15,
      Fruit:83,
      Sweets:49
    };
    result1 = allProducts.getLeastPopularCategory(catProdMap);
    result2 = 'Toiletries';
    assert.equal(result1,result2);
  });

  it("should return the grouped purchases product data with the unit cost price for week1's file",function(){
    var dateArray = mostProfitable.getPurchasesDateRange(1);
    var result1 = mostProfitable.getWeeklyPurchaseData(dateArray);
    var result2 =
      { 'Bananas - loose': 1,
     'Apples - loose': 1.5,
     'Mixed Sweets 5s': 3,
     'Shampoo 1 litre': 20,
     'Soap Bar': 3,
     Bread: 9,
     'Chakalaka Can': 7,
     'Coke 500ml': 3.5,
     'Cream Soda 500ml': 4.5,
     'Fanta 500ml': 4.5,
     'Gold Dish Vegetable Curry Can': 5,
     Imasi: 17,
     'Iwisa Pap 5kg': 20,
     'Milk 1l': 7,
     'Top Class Soy Mince': 8 };
     assert.deepEqual(result1,result2);
  });

  it ("it should return a product map with the total purchase price per product",function(){
    var prodData = {
      'Milk 1l': 39,
      Imasi: 30,
      Bread: 45,
      'Chakalaka Can': 23,
      'Gold Dish Vegetable Curry Can': 17,
      'Fanta 500ml': 33,
      'Coke 500ml': 54,
      'Cream Soda 500ml': 22,
      'Iwisa Pap 5kg': 17,
      'Top Class Soy Mince': 22,
      'Shampoo 1 litre': 3,
      'Soap Bar': 12,
      'Bananas - loose': 47,
      'Apples - loose': 36,
      'Mixed Sweets 5s': 49
    };
    var purchasesUnitCost  =
      { 'Bananas - loose': 1,
     'Apples - loose': 1.5,
     'Mixed Sweets 5s': 3,
     'Shampoo 1 litre': 20,
     'Soap Bar': 3,
     Bread: 9,
     'Chakalaka Can': 7,
     'Coke 500ml': 3.5,
     'Cream Soda 500ml': 4.5,
     'Fanta 500ml': 4.5,
     'Gold Dish Vegetable Curry Can': 5,
     Imasi: 17,
     'Iwisa Pap 5kg': 20,
     'Milk 1l': 7,
     'Top Class Soy Mince': 8 };
     var result1 = mostProfitable.getPurchasePriceData(prodData,purchasesUnitCost);
     var result2 = {
      'Milk 1l': 273,
      Imasi: 510,
      Bread: 405,
      'Chakalaka Can': 161,
      'Gold Dish Vegetable Curry Can': 85,
      'Fanta 500ml': 148.5,
      'Coke 500ml': 189,
      'Cream Soda 500ml': 99,
      'Iwisa Pap 5kg': 340,
      'Top Class Soy Mince': 176,
      'Shampoo 1 litre': 60,
      'Soap Bar': 36,
      'Bananas - loose': 47,
      'Apples - loose': 54,
      'Mixed Sweets 5s': 147 };
     assert.deepEqual(result1,result2);
  });

  it ("it should return the sales data for products for the week",function(){
    var productData = allProducts.weeklySales(1); // product sales data
    var result1 = mostProfitable.groupedbyProductTotalSales(productData);
    var result2 = {
  'Milk 1l': 390,
  Imasi: 750,
  Bread: 540,
  'Chakalaka Can': 230,
  'Gold Dish Vegetable Curry Can': 153,
  'Fanta 500ml': 214.5,
  'Coke 500ml': 351,
  'Cream Soda 500ml': 165,
  'Iwisa Pap 5kg': 510,
  'Top Class Soy Mince': 264,
  'Shampoo 1 litre': 90,
  'Soap Bar': 72,
  'Bananas - loose': 94,
  'Apples - loose': 72,
  'Mixed Sweets 5s': 120 };
    assert.deepEqual(result1,result2);
  });

  it ("it should return the most profitable product" , function (){
    var totalSalesData = {
  'Milk 1l': 390,
  Imasi: 750,
  Bread: 540,
  'Chakalaka Can': 230,
  'Gold Dish Vegetable Curry Can': 153,
  'Fanta 500ml': 214.5,
  'Coke 500ml': 351,
  'Cream Soda 500ml': 165,
  'Iwisa Pap 5kg': 510,
  'Top Class Soy Mince': 264,
  'Shampoo 1 litre': 90,
  'Soap Bar': 72,
  'Bananas - loose': 94,
  'Apples - loose': 72,
  'Mixed Sweets 5s': 120 };
  var totalPurchasesData = {
     'Milk 1l': 273,
      Imasi: 510,
      Bread: 405,
      'Chakalaka Can': 161,
      'Gold Dish Vegetable Curry Can': 85,
      'Fanta 500ml': 148.5,
      'Coke 500ml': 189,
      'Cream Soda 500ml': 99,
      'Iwisa Pap 5kg': 340,
      'Top Class Soy Mince': 176,
      'Shampoo 1 litre': 60,
      'Soap Bar': 36,
      'Bananas - loose': 47,
      'Apples - loose': 54,
      'Mixed Sweets 5s': 147 };
  var profitMap = mostProfitable.getWeeklyProfit(totalSalesData,totalPurchasesData);
  var result1 = mostProfitable.getMostProfitable(profitMap);
  var result2 = 'Imasi';
  assert.equal(result1,result2);
  });

  it("it should return the purchase dates", function (){
  var dateArray = mostProfitable.getPurchasesDateRange(1);
  console.log("dateArray: " + dateArray);
  var products = allProducts.weeklySales(1);// gets all products
  var prodData = allProducts.groupedByProductQtyandTotal(products);
  var readFile = allProducts.getCategoriesFile();
  var catData = allProducts.createCategoryMap(readFile);
  var prodCatQtymap = allProducts.createProductCategoriesMap(prodData,catData);
  });

  // it ("it should return the data grouped by product and total cost",function(){
  //   var products = allProducts.weeklySales(1);
  //
  //   var result1 = allProducts.groupedbyProductTotalCost(products);
  //   var result2 = { 'Milk 1l': 390,
  //       Imasi: 750,
  //       Bread: 540,
  //       'Chakalaka Can': 230,
  //       'Gold Dish Vegetable Curry Can': 153,
  //       'Fanta 500ml': 214.5,
  //       'Coke 500ml': 351,
  //       'Cream Soda 500ml': 165,
  //       'Iwisa Pap 5kg': 510,
  //       'Top Class Soy Mince': 264,
  //       'Shampoo 1 litre': 90,
  //       'Soap Bar': 72,
  //       'Bananas - loose': 94,
  //       'Apples - loose': 72,
  //       'Mixed Sweets 5s': 120 };
  //     assert.deepEqual(result1,result2);
  // });
  //
  // it("it should return the most profitable product per week",function(){
  //   var prodTotalCost = { 'Milk 1l': 390,
  //       Imasi: 750,
  //       Bread: 540,
  //       'Chakalaka Can': 230,
  //       'Gold Dish Vegetable Curry Can': 153,
  //       'Fanta 500ml': 214.5,
  //       'Coke 500ml': 351,
  //       'Cream Soda 500ml': 165,
  //       'Iwisa Pap 5kg': 510,
  //       'Top Class Soy Mince': 264,
  //       'Shampoo 1 litre': 90,
  //       'Soap Bar': 72,
  //       'Bananas - loose': 94,
  //       'Apples - loose': 72,
  //       'Mixed Sweets 5s': 120 };
  //   result1 = allProducts.getMostProfitable(prodTotalCost);
  //   result2 = 'Imasi';
  //   assert.equal(result1,result2);
  // });
  //
  // it("it should return a map of grouped Category and Total costs data", function (){
  //       var prodTotalCostData = { 'Milk 1l': 390,
  //       Imasi: 750,
  //       Bread: 540,
  //       'Chakalaka Can': 230,
  //       'Gold Dish Vegetable Curry Can': 153,
  //       'Fanta 500ml': 214.5,
  //       'Coke 500ml': 351,
  //       'Cream Soda 500ml': 165,
  //       'Iwisa Pap 5kg': 510,
  //       'Top Class Soy Mince': 264,
  //       'Shampoo 1 litre': 90,
  //       'Soap Bar': 72,
  //       'Bananas - loose': 94,
  //       'Apples - loose': 72,
  //       'Mixed Sweets 5s': 120 };
  //       var catData =
  //         { 'Milk 1l': 'Dairy',
  //        Imasi: 'Dairy',
  //        Bread: 'Bakery',
  //        'Chakalaka Can': 'Non-perishable food',
  //        'Gold Dish Vegetable Curry Can': 'Non-perishable food',
  //        'Fanta 500ml': 'Drinks',
  //        'Coke 500ml': 'Drinks',
  //        'Cream Soda 500ml': 'Drinks',
  //        'Iwisa Pap 5kg': 'Non-perishable food',
  //        'Top Class Soy Mince': 'Non-perishable food',
  //        'Shampoo 1 litre': 'Toiletries',
  //        'Soap Bar': 'Toiletries',
  //        'Bananas - loose': 'Fruit',
  //        'Apples - loose': 'Fruit',
  //        'Mixed Sweets 5s': 'Sweets' };
  //        result1 = allProducts.createProductCategoriesMap(prodTotalCostData,catData);
  //        result2 = { Dairy: 1140,
  //             Bakery: 540,
  //             'Non-perishable food': 1157,
  //             Drinks: 730.5,
  //             Toiletries: 162,
  //             Fruit: 166,
  //             Sweets: 120 };
  //        assert.deepEqual(result1,result2);
  // });
  //
  // it("it should return the most profitable category sold per week",function (){
  //   var catData = { Dairy: 1140,
  //        Bakery: 540,
  //        'Non-perishable food': 1157,
  //        Drinks: 730.5,
  //        Toiletries: 162,
  //        Fruit: 166,
  //        Sweets: 120 };
  //        result1 = allProducts.getMostProfitable(catData);
  //        result2 = 'Non-perishable food';
  //        assert.equal(result1,result2);
  // });

});
