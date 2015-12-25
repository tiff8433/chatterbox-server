var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 ,// Seconds.
  'Content-Type': "application/json"
};

var objectIdCounter = 0;
var messages = [
  // {
  //   text: 'hi hi hi',
  //   username: 'me', 
  //   objectId: objectIdCounter
  // }
];

function createMessage(request, callback){
  var results = '';
  request.on('data', function(data){
    results += data;
  });
  request.on('end', function(){
    callback(JSON.parse(results));
  });
};

module.exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var actions = {
  'GET': function(request, response){
    module.exports.sendResponse(response, {results: messages});
  },
  'POST': function(request, response){
    createMessage(request, function(message){
      message.objectId = ++objectIdCounter;
      messages.push(message);
      module.exports.sendResponse(response, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(request, response){
    console.log('options');
    module.exports.sendResponse(response, null);
  }
};




module.exports.requestHandler = function(request, response) {
  var action = actions[request.method];
  var pathName = request.url;
  if( action && pathName.search(/(classes)/) > 0 ){
    action(request, response);
  } else {
    module.exports.sendResponse(response, "Not Found", 404);
  }                                                                                               
}


