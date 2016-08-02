/***
 * A very basic CRUD example using MySQL
 */

exports.display = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from sales', [], function(err, results) {
      if (err) return next(err);
      console.log('this came from sales', results);
      res.render('sales', {
        no_sales: results.length === 0,
        sales: results,
      });
    });
  });
};

exports.showAdd = function(req, res) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from sales', [], function(err, sales) {
      if (err) return next(err);
      res.render('add_sales', {
        sales: sales,
      });
    });
  });
};

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var moment = require('moment');
    var day = moment(req.body.sales_date).format('dddd');
    console.log("day :" + day);
    var data = {
      sales_day: day,
      sales_date: moment(req.body.sales_date).format('YYYY-MM-DD'),
      prod_id: Number(req.body.prod_id),
      sales_quantity: Number(req.body.sales_quantity),
      sales_unit_price: parseFloat(req.body.sales_unit_price)
    };

    connection.query('insert into sales set ?', data, function(err, results) {
      if (err) return next(err);
      res.redirect('/sales');
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
