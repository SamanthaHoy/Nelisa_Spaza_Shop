

exports.display = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from purchases', [], function(err, results) {
      if (err) return next(err);
      console.log('this came from purchases', results);
      res.render('purchases', {
        no_purchases: results.length === 0,
        purchases: results,
      });
    });
  });
};

exports.showAdd = function(req, res) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from products', [], function(err, results) {
      if (err) return next(err);
      res.render('add_purchases', {
        products: results,
      });
    });
  });
};

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var data = {
      shop : req.body.shop,
      purchase_date: req.body.purchase_date,
      prod_id: Number(req.body.prod_id),
      purchases_quantity: req.body.purchases_quantity,
      purchases_unit_price: Number(req.body.purchases_unit_price)
    };

    connection.query('insert into purchases set ?', data, function(err, results) {
      if (err) return next(err);
      res.redirect('/purchases');
    });
  });
};

exports.get = function(req, res, next) {
  var id = req.params.purchases_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM products', [], function(err, products) {
      if (err) return next(err);
      connection.query('SELECT * FROM purchases WHERE purchases_id = ?', [id], function(err, purchases) {
        if (err) return next(err);
        var purchase = purchases[0]; // first row returned
        products = products.map(function(prod) {
          prod.selected = prod.prod_id === purchases.prod_id ? "selected" : "";
          return prod;
        });
        // console.log("Data from get: " + sale) ;
        res.render('edit_purchases', {
          products: products,
          data: purchase
        });
      });
    });
  });
};

exports.update = function(req, res, next) {
  var moment = require('moment');
  var data = {
    shop : req.body.shop,
    purchase_date: moment(req.body.purchase_date).format('YYYY-MM-DD'),
    prod_id: Number(req.body.prod_id),
    purchases_quantity: Number(req.body.purchases_quantity),
    purchases_unit_price: parseFloat(req.body.purchases_unit_price)
  };
  // console.log("Data:" + data);
  var id = req.params.purchases_id;
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('UPDATE purchases SET ? WHERE purchases_id = ?', [data, id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/purchases');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.purchases_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM purchases WHERE purchases_id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/purchases');
    });
  });
};
