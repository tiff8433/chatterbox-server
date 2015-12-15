// var http = require("http");
// var handleRequest = require("./request-handler").requestHandler;


// var port = 3000;

// var ip = "127.0.0.1";



// var server = http.createServer(handleRequest);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);
/****************************************/
var express = require("express");
var app = express();
var messages;

function createMessage(request, callback){
  var results = '';
  request.on('data', function(data){
    results += data;
  });
  request.on('end', function(){
    callback(JSON.parse(results));
  });
}

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

app.get('/classes', function(request, response){
  response.header(headers).status(200).send(messages);
});

app.post('/classes', function(request, response){
  createMessage(request, function(message){
    messages.push(message);
    fs.appendFile('./messages.txt', JSON.stringify(message) + '\n');
    message.objectId = ++objectId;
    response.header(headers).status(201).send();
  });
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});