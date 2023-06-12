const http = require("http");

http.createServer( function(req,res){
  
  switch
    (req.url) {
    case "/":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Home Page</h1>");

        break;
    case "/about":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>About Page</h1>");
        break;
    }
  res.write("<h1>lo me a gya</h1>");
}).listen(8080);
