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

  it('it should find the category file ', function() {
    var readFile = allProducts.getCategoriesFile();
    console.log(readFile);
    assert.equal(readFile.length, 15);
  });

  it('it should create an array of categories with products', function(){
    var readFile = allProducts.getCategoriesFile();
    var result1 = allProducts.groupedByCategory(readFile);
    var result2 = [
  { Category: 'Dairy', Stock_item: 'Milk 1l' },
  { Category: 'Dairy', Stock_item: 'Imasi' },
  { Category: 'Bakery', Stock_item: 'Bread' },
  { Category: 'Non-Perishable food', Stock_item: 'Chakalaka Can' },
  { Category: 'Non-perishable food',
    Stock_item: 'Gold Dish Vegetable Curry Can' },
  { Category: 'Drinks', Stock_item: 'Fanta 500ml' },
  { Category: 'Drinks', Stock_item: 'Coke 500ml' },
  { Category: 'Drinks', Stock_item: 'Cream Soda 500ml' },
  { Category: 'Non-perishable food', Stock_item: 'Iwisa Pap 5kg' },
  { Category: 'Non-perishable food',
    Stock_item: 'Top Class Soy Mince' },
  { Category: 'Toiletries', Stock_item: 'Shampoo 1 litre' },
  { Category: 'Toiletries', Stock_item: 'Soap Bar' },
  { Category: 'Fruit', Stock_item: 'Bananas - loose' },
  { Category: 'Fruit', Stock_item: 'Apples - loose' },
  { Category: 'Sweets', Stock_item: 'Mixed Sweets 5s' } ];
    assert.deepEqual(result1,result2);
  });

  // it('it should group products by category', function(){
  //   var categories = allProducts.getProductCategories();
  //   var result1 = groupProductsByCategory(categories);
  // })
});
