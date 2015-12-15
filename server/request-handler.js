var url = require('url');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var messages = [
    // {
    //   text: 'Hello World',
    //   username: 'anonymous'
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

var requestHandler  = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;
  var pathName = request.url
  // console.log(pathName);

  if (request.method === 'GET' && pathName.search(/(classes)/) > 0){
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: messages}));
  } else if (request.method === 'POST') {
    createMessage(request, function(message){
      messages.push(message);
      response.writeHead(201, headers);
      response.end(null);
    });
  } else {
    response.writeHead(404, headers);
    response.end();
  }
  // } else if (request.method === 'OPTIONS') {
  //     response.writeHead(statusCode, headers);
  //     response.end(JSON.stringify(null));
  // }

};

exports.requestHandler = requestHandler;