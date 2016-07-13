// Create a file called server.js
// use express handlebars to pass data to your template and render it to your browser

var fs = require ('fs');
var mysql  = require('mysql');  // node-mysql module

var connection = mysql.createConnection({
    // your connection details here
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'nelisa'
});

var sql = "SELECT * FROM categories";

var categories = connection.query(sql, function(err) {
    if (err) throw err;
    console.log(categories);
});
connection.end(); 
