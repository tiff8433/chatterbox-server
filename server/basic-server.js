// var http = require("http");
// var handleRequest = require("./request-handler").requestHandler;


// var port = 3000;

// var ip = "127.0.0.1";



// var server = http.createServer(handleRequest);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);
/****************************************/
var express = require("express");
var fs = require('fs');
var cors = require('cors');
var app = express();
var messages = [];

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Origin, content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

function createMessage(request, callback){
  var results = '';
  request.on('data', function(data){
    results += data;
  });
  request.on('end', function(){
    callback(results);
  });
}

app.use(cors())

app.get('/classes/messages', function(request, response){
  response.header(headers).status(200).send({results: messages});
});

app.post('/classes/messages', function(request, response){
  createMessage(request, function(message){
    messages.push(JSON.parse(message));
    console.log('inpost', messages)
    fs.writeFile('./messages.txt', JSON.stringify(message) + '\n');
    //message.objectId = ++objectId;
  });
  response.header(headers).status(201).send();
});
