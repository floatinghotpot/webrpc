# WebRPC.js

A reusable javascript API server/client framework, running on socket.io

### Install

In your project folder:

```bash
$ npm install webrpc.js --save
```

### Example Code

#### Server:

Setup express and socket.io:

```javascript
#!/usr/bin/env node

'use strict';

var socketio = require('socket.io'),
    express = require('express'),
    http = require('http');

// create http server with express
var app = express().use(express.static('./www'));
var httpd = http.createServer(app);
httpd.listen(3000);

// create socket io
var io = socketio.listen(httpd);
```

Then create RPC server and bind to socket io:

```javascript
var rpcd = require('webrpc.js').Server(io);

// define some API handler
rpcd.on('hello', function(args, reply){
  console.log(args);
  if(args) {
    reply(0, "You just sent me: " + JSON.stringify(args));
  } else {
    reply(400, "Please send something.");
  }
});
```

#### Client

```html
  <script src="/socket.io/socket.io.js"></script>
  <script src="webrpc.js"></script>
```

```javascript
  // create RPC client, then bind it on web socket connection
  var client = new WebRPCClient();
  client.bind(io());

  // now call the API defined in server-side
  var args = { param1: 'something', param2: ['anything else'] };
  client.rpc('hello', args, function(err, ret){
    console.log(err, ret);
  });
```

### Credits

Created by Raymond Xie, re-used in some projects.

Published under MIT license. Welcome to fork and send comments.
