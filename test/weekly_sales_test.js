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

  it("it should find the week4's file ", function() {
    var readFile = allProducts.weeklySales(4);
    console.log(readFile);
    assert.equal(readFile.length, 120);
  });

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
      'Chakalaka Can': 'Non-Perishable food',
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

  it("should return the grouped purchases data for week4's file",function(){
    var result1 = mostProfitable.getWeeklyPurchaseData(4);
    var result2 = { 'Chakalaka Can': 227.5,
  'Bananas - loose': 20,
  'Apples - loose': 225,
  'Mixed Sweets 5s': 24,
  Bread: 326,
  'Coke 500ml': 147,
  'Cream Soda 500ml': 81,
  'Fanta 500ml': 94,
  'Gold Dish Vegetable Curry Can': 150.5,
  Imasi: 510,
  'Milk 1l': 280,
  'Top Class Soy Mince': 295,
  'Soap Bar': 54,
  'Shampoo 1 litre': 180,
  'Iwisa Pap 5kg': 230 };
    assert.deepEqual(result1,result2);
  });

  it("should return the week's purchase data",function(){
    var readFile = mostProfitable.getWeeklyPurchaseData(4);
    var result1 = mostProfitable.getWeeksData(readFile,4);
    assert.equal(readFile.length, 153);
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
