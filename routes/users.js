exports.display = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var adminAccess = req.session.user.is_admin;
    console.log("admin access in user display is : " + req.session.user.is_admin);
    connection.query('SELECT * from users', [], function(err, results) {
      if (err) return next(err);
      res.render('users', {
        no_users: results.length === 0,
        users: results
      });
    });
  });
};

exports.showAdd = function(req, res) {
  res.render('add_user');
}

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    // var bcrypt = require('bcryptjs');

    // const myFormPassword = req.body.password;
    // console.log("myFormPassword :" + myFormPassword);
    // bcrypt.hash(myFormPassword, 10, function(err, hashedPw) {

      var data = {
        username: req.body.username,
        password: req.body.password , // hashedPw,
        email: req.body.email,
        is_admin: req.body.is_admin
      };
      connection.query('insert into users set ?', data, function(err, results) {
        if (err) return next(err);
        res.redirect('/users');
      });
    // }); // bcrypt
  });
};

exports.get = function(req, res, next) {
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM users WHERE user_id = ?', [id], function(err, result) {
      if (err) return next(err);
      res.render('edit_user', {
        data: result[0]
      });
    });
  });
};

exports.update = function(req, res, next) {

  var data = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  };
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('UPDATE users SET ? WHERE user_id = ?', [data, id], function(err, rows) {
      if (err) next(err);
      res.redirect('/users');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM users WHERE user_id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/users');
    });
  });
};
