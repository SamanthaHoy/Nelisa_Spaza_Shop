
exports.display = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from sales', [], function(err, results) {
      if (err) return next(err);
      // console.log('this came from sales', results);
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
    connection.query('SELECT * from products', [], function(err, results) {
      if (err) return next(err);
      res.render('add_sales', {
        products: results,
      });
    });
  });
};

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var moment = require('moment');
    var day = moment(req.body.sales_date).format('dddd');
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
  var id = req.params.sales_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM products', [], function(err, products) {
      if (err) return next(err);
      connection.query('SELECT * FROM sales WHERE sales_id = ?', [id], function(err, sales) {
        if (err) return next(err);
        var sale = sales[0]; // first row returned
        products = products.map(function(prod) {
          prod.selected = prod.prod_id === sales.prod_id ? "selected" : "";
          return prod;
        });
        // console.log("Data from get: " + sale) ;
        res.render('edit_sales', {
          products: products,
          data: sale
        });
      });
    });
  });
};

exports.update = function(req, res, next) {
  var moment = require('moment');
  var day = moment(req.body.sales_date).format('dddd');
  var data = {
    sales_day: day,
    sales_date: moment(req.body.sales_date).format('YYYY-MM-DD'),
    prod_id: Number(req.body.prod_id),
    sales_quantity: Number(req.body.sales_quantity),
    sales_unit_price: parseFloat(req.body.sales_unit_price)
  };
  // console.log("Data:" + data);
  var id = req.params.sales_id;
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('UPDATE sales SET ? WHERE sales_id = ?', [data, id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/sales');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.sales_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM sales WHERE sales_id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/sales');
    });
  });
};
