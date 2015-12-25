/* Import node's http module: */
var http = require("http");
var handleRequest = require('./request-handler.js');
var urlParser = require('url');

var port = 3000;
var ip = "127.0.0.1";

// var server = http.createServer(function(request, response){
//   // console.log("Serving request type " + request.method + "for url " + request.url);
//   var parts = urlParser.parse(request.url);
//   if( parts.pathname === '/classes/messages' ){
//     handleRequest.requestHandler(request, response);
//   } else {
//     handleRequest.sendResponse(response, "Not Found", 404);
//   }
// });
var server = http.createServer(handleRequest.requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


