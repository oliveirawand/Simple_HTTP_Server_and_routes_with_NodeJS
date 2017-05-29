//imports the used modules
var http = require('http');
var fs = require('fs');
var urlParser = require('url');

//creates the server
var server = http.createServer(function(require, response){
  //the "require.url" can be used, but the url module gives us a better url manipulation
  //below, we get the url path name. Example: with example.com/do_something?do=task
  //and using .pathname we get only "/do_something", using .query we could get "do=task"

  url = urlParser.parse(require.url).pathname;

  //checks what url was accessed. '/' is the root
  if(url == '/'){
    //gives a http code return and set a header
    response.writeHead(200, {'Content-Type':'text/html'});
    //writes the body response
    response.write('<meta charset="UTF-8">');
    response.write('<h1>Root</h1>');
    response.write('<h4>Root</h4>');
    response.write('<hr>');
    response.write('<h3>You have just accessed the root url!</h4>');
    //ends the body response
    response.end('<h4>Você acessou a url raíz do projeto!</h4>');

  }else if (url == '/other') {
    response.writeHead(200, {'Content-Type':'text/html'});

    //reads a html file
    fs.readFile('html/other.html', function(err, data){
      //checks if any error occurred
      if(err) throw err;

      //shows the html file content on the browser
      response.end(data);
    });

  //if the accessed url is not anything we want as a resource, shows a
  //404 error page
  }else{
    response.writeHead(404, {'Content-Type':'text/html'});

    fs.readFile('html/not_found.html', function(err, data){
      response.end(data);
    });
  }
});

//makes the server listen on port 3000
server.listen(3000);

console.log('Server running at http://127.0.0.1:3000');
