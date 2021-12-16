# Node Redis Mutil Request

## Setup
### Install package
```sh 
$ npm install
```

```sh
$ npm redis.v1.js
$ npm redis.v2.js

$ curl http://localhost:3000/order
```


## How to subscribe to multiple channels on Redis NodeJS

```javascript
var redis = require('redis')

const subscribe = redis.createClient({
    host: 'localhost',
    port: 6379
}) 
subscribe.psubscribe(`user:chat:*`)

subscribe.on('message', function(pattern, channel, message) {
    console.log(channel, message, pattern)
    // Write Your Awesome Code here.
})
```

## Video
- [Bài toán tồn kho còn 1 nhưng có nhiều USERS mua hàng cùng một lúc - P1](https://www.youtube.com/watch?v=qxRtMizGvWE)
- [Bài toán tồn kho còn 1 nhưng có nhiều USERS mua hàng cùng một lúc - P2](https://www.youtube.com/watch?v=OUGfEleDGaE)

https://stackoverflow.com/questions/66123057/redis-connection-with-promise
https://stackoverflow.com/questions/70197001/unhandledpromiserejectionwarning-error-the-client-is-closed-in-nodejs-and-redi
https://stackoverflow.com/questions/70160820/cannot-connect-to-redis-using-node-js-module
