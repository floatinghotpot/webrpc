# WebRPC.js

A reusable API server/client framework, running on socket.io

### Install

In your project folder:

```bash
$ npm install webrpc.js --save
```

### Example Code

#### Server:

```javascript
#!/usr/bin/env node

'use strict';

var socketio = require('socket.io'),
    express = require('express'),
    http = require('http');

// create http server with express
var app = express().use(express.static('./'));
var httpserver = http.createServer(app);
httpserver.listen(3000);

// create socket io
var io = socketio.listen(httpserver);

// create RPC server and bind to io
var rpcd = require('webrpc.js').Server(io);

// add some API handler
rpcd.on('hello', function(args, reply){
  console.log(args);
  if(args) {
    reply(0, "You just sent me: " + JSON.stringify(args));
  } else {
    reply(404, "Please send something.");
  }
});
```

#### Client

```html
  <script src="/socket.io/socket.io.js"></script>
  <script src="webrpc.js"></script>
```

```javascript
  var client = new WebRPCClient();
  client.bind(io());
  client.rpc('hello', { param1: "anything" }, function(err, ret){
    console.log(err, ret);
  });
```

### Credits

Created by Raymond Xie, re-used in some projects.

Published under MIT license. Welcome to fork and send comments.
