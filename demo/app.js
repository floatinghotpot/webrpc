#!/usr/bin/env node

'use strict';

var socketio = require('socket.io'),
    express = require('express'),
    http = require('http');

// create http server with express
var app = express().use(express.static('./'));
var httpserver = http.createServer(app);
httpserver.listen(3000, function(){
  console.log('listening on port ' + 3000);
});

// create socket io
var io = socketio.listen(httpserver);

// create RPC server and bind to io
var rpcd = require('../webrpc.js').Server(io);

// add some API handler
rpcd.on('hello', function(args, reply){
  console.log(args);
  if(args) {
    reply(0, "You just sent me: " + JSON.stringify(args));
  } else {
    reply(404, "Please send something.");
  }
});
