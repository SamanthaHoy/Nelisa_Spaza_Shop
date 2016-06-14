//gets the week's purchase data into a map format
exports.getWeeklyPurchaseData = function(week) {
  var fs = require('fs'); // imports the csv file
  // want to calculate a week's worth of data from the week and purchase files from the week's date
  var weeklyFile = fs.readFileSync('./files/week' + week + '.csv', 'utf8');
  var productsFile = weeklyFile.split('\n').slice(0, -1);
  var products = productsFile[0].split(','); // gets the first line
  var prodDate = products[1]; // gets the date from the first line
  var startDate = new Date(prodDate); // converts it to date format
  var endDate = new Date(+new Date(startDate) + 1000 * 60 * 60 * 24 * 6);
  console.log("prodDate :" + prodDate + " startDate: " + startDate + " endDate: " + endDate);

  var fileContent = fs.readFileSync('./files/purchases.csv', 'utf8');
  var purchases = fileContent.split('\n').slice(1, -1); /* splits the content by the new line character , ignores 1st and last lines*/

  var weeklyPurchasesMap = {};
  purchases.forEach(function(purchase) {
    var delimitedData = purchase.split(';');
    var date = delimitedData[1];
    var Stock_item = delimitedData[2];
    var totalPurchaseCost = delimitedData[5].replace(",", ".").replace("R", "");
    var currentDate = new Date(date);
    if (currentDate >= startDate && currentDate <= endDate) { // only want the data within range
      if (weeklyPurchasesMap[Stock_item] === undefined) {
        weeklyPurchasesMap[Stock_item] = 0;
      }
      weeklyPurchasesMap[Stock_item] += Number(totalPurchaseCost);
    }
  });
  console.log(weeklyPurchasesMap);
  return weeklyPurchasesMap;
}

exports.getWeeksData = function(purchases, week) {
  var firstRec = true;

  purchases.forEach(function(purchase) {
    var delimitedData = purchase.split(';');
    var date = delimitedData[1];
    var Stock_item = delimitedData[2];
    var totalPurchaseCost = delimitedData[5];
    var currentDate = new Date(date);



  });

  // switch (week) {
  //   case 1:
  //     if (date >= '23-Jan' && date < '28-Jan') {
  //       if (weeklyPurchasesMap[Stock_item] === undefined) {
  //         weeklyPurchasesMap[Stock_item] = 0
  //       }
  //       weeklyPurchasesMap[Stock_item] += totalPurchaseCost;
  //     }
  //     break;
  //   case 2:
  //     if (date >= '02-Feb' && date < '08-Feb') {
  //       if (weeklyPurchasesMap[Stock_item] === undefined) {
  //         weeklyPurchasesMap[Stock_item] = 0
  //       }
  //       weeklyPurchasesMap[Stock_item] += totalPurchaseCost;
  //     }
  //     break;
  //   case 3:
  //     if (date >= '23-Jan' && date < '28-Jan') {
  //       if (weeklyPurchasesMap[Stock_item] === undefined) {
  //         weeklyPurchasesMap[Stock_item] = 0
  //       }
  //       weeklyPurchasesMap[Stock_item] += totalPurchaseCost;
  //     }
  //     break;
  //   case 4:
  //     if (date >= '23-Jan' && date < '28-Jan') {
  //       if (weeklyPurchasesMap[Stock_item] === undefined) {
  //         weeklyPurchasesMap[Stock_item] = 0
  //       }
  //       weeklyPurchasesMap[Stock_item] += totalPurchaseCost;
  //     }
  //     break;
  //
  // }

  return purchases;
};

// exports.groupedbyProductTotalCost = function(products) {
//   var prodPriceMap = {};
//
//   products.forEach(function(product) {
//     var delimitedData = product.split(',');
//     var Stock_item = delimitedData[2];
//     var No_sold = delimitedData[3];
//     var Price = delimitedData[4].replace(/R/g, "");
//     var totalCost = parseFloat(No_sold * Price);
//     if (prodPriceMap[Stock_item] === undefined) {
//       prodPriceMap[Stock_item] = 0;
//     }
//     prodPriceMap[Stock_item] += totalCost;
//   });
//   console.log(prodPriceMap);
//   return prodPriceMap;
// }

// exports.getMostProfitable = function(prodTotalCost) {
//   var maxValue = 0;
//   var maxProduct = undefined;
//
//   for (var prod in prodTotalCost) {
//     if (prodTotalCost[prod] > maxValue) {
//       maxValue = prodTotalCost[prod];
//       maxProduct = prod;
//     }
//   }
//   console.log("The most profitable is " + maxProduct + " with a value of " + maxValue);
//   return maxProduct;
// }
