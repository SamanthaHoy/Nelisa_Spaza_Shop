// takes a sentence as a parameter and returns the sum of the length of words in it

var allProducts = require('../weekly_sales');
var assert = require('assert');

describe("Accessing the week1's csv file", function() {

  it('it should find the week"s file ', function() {
    var readFile = allProducts.weeklySales(1);
    console.log(readFile);
    assert.equal(readFile.length, 105);
  });

  it('it should return unique list of products', function() {
    var products = allProducts.weeklySales(1);
    var result1 = allProducts.groupedByProductName(products);
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
  })

  // describe("")

});
