
  exports.handle = function  (products){

  var handlebars = require('handlebars');
  var fs = require('fs'); // imports the csv file

  var fileContent = fs.readFileSync('./files/week' + week + '.csv', 'utf8'); /* gets the content of all the files from the pathname */
  if (week === 1) {
    var products = fileContent.split('\n').slice(1, -1); /* splits the content by the new line character , ignores 1st and last lines*/
  } else if (week === 2 || week === 3 || week === 4) {
    var products = fileContent.split('\n').slice(0, -1); /* splits the content by the new line character , ignores last lines*/
  }
        var source = products.toString();
      
      // call the render function
      renderToString(source, weeklyData);

  // this will be called after the file is read
  function renderToString(source, data) {
    var template = handlebars.compile(source);
    var outputString = template(data);
    return outputString;
  }

}
