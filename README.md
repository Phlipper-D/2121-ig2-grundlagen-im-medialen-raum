# Browser-MQTT-Communication

This setup allows sending messages through an mqtt broker from web browsers to web browsers.

## Installation

In `/client` is the script to start one client. But you can have multiple browser windows that connect to the socket server. In the terminal:

```bash
cd path/to/client
npm install
npm run start
```

Instead of `npm run start` it might be useful for testing to start two or more clients on different ports or give a different topic. Then:
```bash
node client.js 3001 teamplayer/myTeam
```
The parameter after the file name `client.js` is the port number. Default is `3001`.

After that you can give the topic your client will listen to. Default is `teamplayer/myTeam`. You might choose any path here, but please keep `teamplayer/`as a start followed by your team name. So, something like `teamplayer/littlePanda` would be good.

If you need the same configuration all the time open package.json and edit the line
```
  "start": "node ./client.js 3001 teamplayer/myTeam",
```
to whatever you need.

In your browser go to one of the examples, e.g.:

```
http://localhost:3001/1_example_color_buttons
```

If your testing on your own just open multiple browser windows.


## Reference

In your browser script you can use the mqtt connection as follows.

Get a reference to the web socket:
```javascript
let socket = io();
```

### Sending messages

Now you can emit messages like this:
```javascript
socket.emit('serverEvent', yourMessage1, yourMessage2, ...);
```

`yourMessage1` and so on can be any kind of "simple" value like a number, string, array or object. The web server will convert these values to a string. `'serverEvent'` is the only event type you can emit, but you can utilize the parameters to send different commands. Usually you will do it like this:

```javascript
// sends the command "draw" and an x and y coordinate
socket.emit('serverEvent', {type:"draw", x:mouseX, y:mouseY});
```
```javascript
// sends the command "reset" without any more information
socket.emit('serverEvent', {type:"reset"});
```

### Receiving messages

If another user sends a message the way described above you can receive this message this way:

```javascript
socket.on('serverEvent', function (message1, message2, ...) {
  // the variables message1, message2, ... will contain the sent messages. 
});
```

You will not just receive messages from other users but also the messages you sent.

If you just want to react on messages sent from other users you can listen to `'remoteEvent'`:
```javascript
socket.on('remoteEvent', function (message1, message2, ...) {
  // something you do with the message(s)
});
```

In addition there is the `'localEvent'` that brings you the messages that you sent:
```javascript
socket.on('localEvent', function (message1, message2, ...) {
  // something you do with the message(s)
});
```

### Special messages

Sometimes you might want to know how many other users are currently connected to your topic on the mqtt server. You can receive this status information by listening to `'newUsersEvent'`. This event fires when the list changes.

```javascript
socket.on('newUsersEvent', function (myID, myIndex, userList) {
  // myID contains your user id generated by the web socket script,
  // myIndex contains the index of your user in the userList,
  // userList contains all connected users including you.
});  
```

`userList` is an array of objects like the following. `since` is a timestamp from the connection time of this user.
```javascript
[
  { id: 'HK78CLZIN', since: 1614519074361 },
  { id: 'CNFQZMEO8', since: 1614519077162 },
  { id: 'ZYK5TU3U2', since: 1614519081121 }
]
```



Kaffee? Kaffee!
