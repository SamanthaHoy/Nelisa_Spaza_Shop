/***
 * A very basic CRUD example using MySQL
 */

exports.display = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from products', [], function(err, results) {
      if (err) return next(err);
      console.log('this came from products', results);
      res.render('products', {
        no_products: results.length === 0,
        products: results,
      });
    });
  });
};

exports.showAdd = function(req, res) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from categories', [], function(err, results) { // for the lookup of the category ID
      if (err) return next(err);
      res.render('add_products', {
        categories: results
      });
    });
  });
};

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var data = {
      product_name: req.body.product_name,
      cat_id: Number(req.body.category_id)
    };

    connection.query('insert into products set ?', data, function(err, results) {
      if (err) return next(err);
      res.redirect('/products');
    });
  });
};

exports.get = function(req, res, next) {
  var id = req.params.prod_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM categories', [], function(err, categories) {
      if (err) return next(err);
      connection.query('SELECT * FROM products WHERE prod_id = ?', [id], function(err, products) {
        if (err) return next(err);
        var product = products[0]; // first row returned
        categories = categories.map(function(category) {
          category.selected = category.cat_id === product.cat_id ? "selected" : "";
          return category;
        });
        res.render('edit_products', {
          categories: categories,
          data: product
        });
      });
    });
  });
};

exports.update = function(req, res, next) {
  var data = {
    product_name: req.body.product_name,
    cat_id: Number(req.body.category_id)
  };
  var id = req.params.prod_id;
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('UPDATE products SET ? WHERE prod_id = ?', [data, id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/products');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.prod_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM products WHERE prod_id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/products');
    });
  });
};
