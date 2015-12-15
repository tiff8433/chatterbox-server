var url = require('url');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};
var objectId = 1;

var messages = [
    // {
    //   message: 'Hello World',
    //   username: 'anonymous',
    //   objectId: objectId
    // }
  ]

function createMessage(request, callback){
  var results = '';
  request.on('data', function(data){
    results += data;
  });
  request.on('end', function(){
    callback(JSON.parse(results));
  });
}

function sendResponse(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data))
}

var actions = {
  'GET': function(request, response){
    sendResponse(response, {results: messages})
  },
  'POST': function(request, response){
    createMessage(request, function(message){
      messages.push(message);
      message.objectId = ++objectId;
      sendResponse(response, {objectId: 1}, 201);
    });
  },
  'OPTIONS': function(request, response){
    sendResponse(response, null)
  }
}
var requestHandler  = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var pathName = request.url
  // console.log(pathName);
  var action = actions[request.method];
  if(action && pathName.search(/(classes)/) > 0){
    action(request, response);
  } else {
    sendResponse(response, "Not Found", 404);
  }

};

exports.requestHandler = requestHandler;