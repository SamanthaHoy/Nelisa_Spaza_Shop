/***
 * A very basic CRUD example using MySQL
 */

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
  var id = req.params.id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM categories', [id], function(err, categories) {
      if (err) return next(err);
      connection.query('SELECT * FROM products WHERE id = ?', [id], function(err, products) {
        if (err) return next(err);
        var product = products[0];
        categories = categories.map(function(category) {
          category.selected = category.id === product.category_id ? "selected" : "";
          return category;
        });
        res.render('edit', {
          categories: categories,
          data: product
        });
      });
    });
  });
};

exports.update = function(req, res, next) {

  var data = {
    category_id: Number(req.body.category_id),
    description: req.body.description,
    price: Number(req.body.price)
  };
  var id = req.params.id;
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/products');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM products WHERE id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/products');
    });
  });
};
