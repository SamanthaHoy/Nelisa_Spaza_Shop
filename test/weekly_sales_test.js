// takes a sentence as a parameter and returns the sum of the length of words in it

var allProducts = require('../weekly_sales');
var assert = require('assert');
var result3 = undefined

describe("Accessing and writing functions for the week's csv file", function() {

  it('it should find the week1"s file ', function() {
    var readFile = allProducts.weeklySales(1);
    console.log(readFile);
    assert.equal(readFile.length, 105);
  });

  it("it should find the week2's file ", function() {
    var readFile = allProducts.weeklySales(2);
    console.log(readFile);
    assert.equal(readFile.length, 118);
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

});
