exports.display = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from categories', [], function(err, results) {
        if (err) return next(err);
				// console.log('this came from categories', results);
				res.render( 'categories', {
						showNavBar	: req.session.user.showNavBar, 
						adminAccess : req.session.user.is_admin, // will refactor this soon
						is_admin: req.session.user.is_admin,
						no_products : results.length === 0,
						categories : results
				});
      });
	});
};

exports.showAdd = function(req, res){
	// res.render('add_category');
	res.render('add_category', {
			showNavBar	: req.session.user.showNavBar,
			is_admin: req.session.user.is_admin
	});
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body;
		var data = {
      		cat_name : input.cat_name
		};
		console.log("Data: " + data);
	connection.query('insert into categories set ?', data, function(err, results) {
			if (err) return next(err);
		res.redirect('/categories');
	});

	});
};

exports.get = function(req, res, next){
	var cat_id = req.params.cat_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE cat_id = ?', [cat_id], function(err,result){
			if(err) return next(err);
			// res.render('edit_category',{data : result[0]});
			res.render('edit_category',{
				showNavBar	: req.session.user.showNavBar, // testing
				is_admin: req.session.user.is_admin,
				data : result[0]});
		});
	});
};

exports.update = function(req, res, next){
  var data = {
		cat_name : req.body.cat_name
	};
  var id = req.params.cat_id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE categories SET ? WHERE cat_id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/categories');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.cat_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE cat_id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
};
