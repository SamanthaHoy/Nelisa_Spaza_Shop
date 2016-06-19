//gets the week's purchase data into a map format
exports.getPurchasesDateRange = function(week) {
  var fs = require('fs'); // imports the csv file
  // want to calculate a week's worth of data from the week , and purchase files from the previous week's data
  var weeklyFile = fs.readFileSync('./files/week' + week + '.csv', 'utf8');
  if (week === 1) {
    var productsFile = weeklyFile.split('\n').slice(1, -1);
  } else if (week === 2 || week === 3 || week === 4) {
    var productsFile = weeklyFile.split('\n').slice(0, -1);
  }
  var products = productsFile[0].split(','); // gets the first line
  var prodDate = products[1]; // gets the date from the first line
  var startDate = new Date(+new Date(prodDate) - 1000 * 60 * 60 * 24 * 7); // converts it to date format, previous week's data
  var endDate = new Date(+new Date(startDate) + 1000 * 60 * 60 * 24 * 6);
  var dateArray= [];
  dateArray[0] = startDate;
  dateArray[1] = endDate;
  console.log("prodDate :" + prodDate + " startDate: " + startDate + " endDate: " + endDate);
  return dateArray;
}

exports.getWeeklyPurchaseData = function(dateArray) {
  var startDate = dateArray[0];
  var endDate = dateArray[1];
  var fs = require('fs');
  var fileContent = fs.readFileSync('./files/purchases.csv', 'utf8');
  var purchases = fileContent.split('\n').slice(1, -1); /* splits the content by the new line character , ignores 1st and last lines*/

  var stockTotalCostMap = {};
  var stockTotalQuantityMap = {};
  purchases.forEach(function(purchase) {
    var delimitedData = purchase.split(';');
    var date = delimitedData[1];
    var Stock_item = delimitedData[2];
    var quantity = delimitedData[3];
    var totalPurchaseCost = delimitedData[5].replace(",", ".").replace("R", "");
    var currentDate = new Date(date);
    if (currentDate >= startDate && currentDate <= endDate) { // only want the data within previous week's range
      if (stockTotalCostMap[Stock_item] === undefined) {
        stockTotalCostMap[Stock_item] = 0;
      }
      stockTotalCostMap[Stock_item] += Number(totalPurchaseCost); // calculating the total purchase cost per product

      if (stockTotalQuantityMap[Stock_item] === undefined) {
        stockTotalQuantityMap[Stock_item] = 0;
      }
      stockTotalQuantityMap[Stock_item] += Number(quantity); // calculating the total quantity per product
    }
  });
  // console.log(stockTotalCostMap);
  // console.log(stockTotalQuantityMap);
  var weeklyProdPurchaseUnitCostMap = {};
  for (prod in stockTotalCostMap) {
    var prodTotalCost = stockTotalCostMap[prod];
    var prodQuantity = stockTotalQuantityMap[prod];
    var prodUnitCost = prodTotalCost / prodQuantity;
    console.log("prod : " + prod + " totalcost : " + prodTotalCost + " totalquantity : " + prodQuantity);
    if (weeklyProdPurchaseUnitCostMap[prod] === undefined) {
      weeklyProdPurchaseUnitCostMap[prod] = 0;
    }
    weeklyProdPurchaseUnitCostMap[prod] = Math.round(prodUnitCost * 100) / 100; // should round it up to 2 decimal points
  };
  console.log("weeklyProdPurchaseUnitCostMap : ");
  console.log(weeklyProdPurchaseUnitCostMap);
  return weeklyProdPurchaseUnitCostMap; // product map with unit cost price
};

exports.getPurchasePriceData = function(productsMap, unitCostMap) {
  var productPurchasesMap = {};
  for (prod in productsMap) {
    var quantity = productsMap[prod];
    var unitCost = unitCostMap[prod];
    var totalPurchaseCost = quantity * unitCost;
    // console.log("Quantity : " + quantity + " unitCost: " + unitCost + " totalPurchaseCost :" + totalPurchaseCost);
    if (productPurchasesMap[prod] === undefined) {
      productPurchasesMap[prod] = 0;
    }
    productPurchasesMap[prod] = totalPurchaseCost;
  }
  console.log("The products purchases map with the total cost per product");
  console.log(productPurchasesMap);
  return productPurchasesMap; // product map with the total cost of the product purchases
};

exports.groupedbyProductTotalSales = function(products) {
  var prodSalesMap = {};

  products.forEach(function(product) {
    var delimitedData = product.split(',');
    var Stock_item = delimitedData[2];
    var No_sold = delimitedData[3];
    var Price = delimitedData[4].replace(/R/g, "");
    var totalCost = parseFloat(No_sold * Price);
    // console.log("Product: " + Stock_item + " quantity: " + No_sold + " Price: " + Price + " totalCost: R" + totalCost);
    if (prodSalesMap[Stock_item] === undefined) {
      prodSalesMap[Stock_item] = 0;
    }
    prodSalesMap[Stock_item] += totalCost;
  });
  console.log("The sales map with the total cost per product");
  console.log(prodSalesMap);
  return prodSalesMap; // products map with the total sales of the product sales
};

exports.getWeeklyProfit = function(totalSalesMap, totalPurchaseMap) {
  var profitMap = {};

  for (prod in totalSalesMap) {
    var salesTotal = totalSalesMap[prod];
    var purchaseTotal = totalPurchaseMap[prod];
    var profit = salesTotal - purchaseTotal;
    console.log("prod: " + prod + " salesTotal: " + salesTotal + " purchaseTotal: " + purchaseTotal + " Profit: " + profit);
    if (profitMap[prod] === undefined) {
      profitMap[prod] = 0;
    }
    profitMap[prod] = profit;
  };
  console.log("Profit map");
  console.log(profitMap);
  return profitMap;
};

exports.getMostProfitable = function(profitMap) {
  var maxValue = 0;
  var maxProduct = undefined;

  for (var prod in profitMap) {
    if (profitMap[prod] > maxValue) {
      maxValue = profitMap[prod];
      maxProduct = prod;
    }
  }
  console.log("=================================================================================");
  console.log("The most profitable is " + maxProduct + " (with a value of R" + maxValue + ")");
  console.log("=================================================================================");
  return maxProduct;
};

// exports.groupedByProductQtyandTotal = function(products) {
//   var prodQtySalesArray = [];
//   var productQtyData = {};
//   var productSalesTotalsData = {};
//   var firstProductLine = products[0].split(','); // gets the first line
//   var prodDate = firstProductLine[1]; // gets the date from the first line
//   var startDate = new Date(prodDate); // converts it to date format
//   var endDate = new Date(+new Date(startDate) + 1000 * 60 * 60 * 24 * 6);
//   console.log("prodDate :" + prodDate + " startDate: " + startDate + " endDate: " + endDate);
//
//   products.forEach(function(product) {
//     var delimitedData = product.split(',');
//     var date = delimitedData[1];
//     var currentDate = new Date(date);
//     var Stock_item = delimitedData[2];
//     var No_Sold = delimitedData[3];
//     var price = delimitedData[4].replace(/R/g, "");
//     var salesPrice = parseFloat(No_Sold * price);
//     console.log("Stock_item: " + Stock_item + " No_Sold: " + No_Sold + " price: " + price + " salesPrice: " + salesPrice);
//     if (currentDate >= startDate && currentDate <= endDate) {
//       if (productQtyData[Stock_item] === undefined) { //if it doesn't exist , add it and assign it a value of 0
//         productQtyData[Stock_item] = 0; // initialising
//         productSalesTotalsData[Stock_item] = 0;
//       }
//       productQtyData[Stock_item] += Number(No_Sold);
//       productSalesTotalsData[Stock_item] += Number(salesPrice);
//     }
//   });
//   console.log("Product Quantity Data");
//   console.log(productQtyData);
//   console.log("Product Sales Total Data");
//   console.log(productSalesTotalsData);
//   prodQtySalesArray[0] = productQtyData ;
//   prodQtySalesArray[1] = productSalesTotalsData ;
//   return prodQtySalesArray; // returns 2 maps , 1 for the product quantity and 1 for the product sales total
// };

// exports.createProductDataCategoriesMap = function(productData, categoryData) {
//   var productQtyData = productData[0];
//   var productSalesData = productData[1];
//   var catProdMap = {};
//   var totalProdSalesMap = {};
//
//   for (var prod in productQtyData) {
//     var category = categoryData[prod];
//     var quantity = productQtyData[prod];
//     var totalProdSales = productSalesData[prod];
//     if (catProdMap[category] === undefined) {
//       catProdMap[category] = 0;
//       totalProdSalesMap[category] = 0;
//     }
//     catProdMap[category] += Number(quantity);
//     totalProdSalesMap[category] += Number(totalProdSales);
//   }
//   console.log("Grouped Category Quantity Map");
//   console.log(catProdMap);
//   console.log("Grouped Total Sales Map");
//   console.log(totalProdSalesMap);
//   var catProdArray = [];
//   catProdArray[0] = catProdMap;
//   catProdArray[1] = totalProdSalesMap;
//   return catProdArray;
// };
