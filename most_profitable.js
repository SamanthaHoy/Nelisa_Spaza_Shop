//gets the week's purchase data into a map format
exports.getWeeklyPurchaseData = function(week) {
    var fs = require('fs'); // imports the csv file
    // want to calculate a week's worth of data from the week , and purchase files from the previous week's data
    var weeklyFile = fs.readFileSync('./files/week' + week + '.csv', 'utf8');
    if (week === 1 ) {
        var productsFile = weeklyFile.split('\n').slice(1, -1);
      }
    else if (week === 2 || week === 3 || week === 4) {
        var productsFile = weeklyFile.split('\n').slice(0, -1);
    }
      var products = productsFile[0].split(','); // gets the first line
      var prodDate = products[1]; // gets the date from the first line
      var startDate = new Date(+new Date(prodDate) - 1000 * 60 * 60 * 24 * 7); // converts it to date format, previous week's data
      var endDate = new Date(+new Date(startDate) + 1000 * 60 * 60 * 24 * 6); console.log("prodDate :" + prodDate + " startDate: " + startDate + " endDate: " + endDate);

      var fileContent = fs.readFileSync('./files/purchases.csv', 'utf8');
      var purchases = fileContent.split('\n').slice(1, -1); /* splits the content by the new line character , ignores 1st and last lines*/

      var stockTotalCostMap = {};
      var stockTotalQuantityMap = {}; purchases.forEach(function(purchase) {
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
      }; console.log("weeklyProdPurchaseUnitCostMap : "); console.log(weeklyProdPurchaseUnitCostMap);
      return weeklyProdPurchaseUnitCostMap;
    };

    exports.getPurchasePriceData = function(productsMap,unitCostMap) {
      var productPurchasesMap = {};
      for (prod in productsMap) {
        var quantity = productsMap[prod];
        var unitCost = unitCostMap[prod];
        var totalPurchaseCost = quantity * unitCost;
        // console.log("Quantity : " + quantity + " unitCost: " + unitCost + " totalPurchaseCost :" + totalPurchaseCost);
        if(productPurchasesMap[prod] === undefined) {
          productPurchasesMap[prod] = 0;
        }
        productPurchasesMap[prod] = totalPurchaseCost;
      }
      console.log("The products purchases map with the total cost per product");
      console.log(productPurchasesMap);
      return productPurchasesMap;
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
