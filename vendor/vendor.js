'use strict';
/*
- Connect to caps hub socket and namespace
- Join a room for each unique store
- Emit a join event to caps namespace with payload (order info)
- Set order interval to 5 seconds
 - generate payload within interval
    - storeNAme
    -ID
    - customer name
    - address
  - emit pick up event to caps namespace
- Listen for 'delivered' event from caps hub
  - on listen, log 'Thanks for ordering'!!
*/
require('dotenv').config();
const faker = require('faker');

//GLOBAL
const io = require('socket.io-client')('http://localhost:5000');

//NAME SPACE
const capsNamespace = require('socket.io-client')('http://localhost:5000/caps');

capsNamespace.emit('join'.process.env.STORE_NAME)

setInterval(() => {
  let payload = {
    store : process.env.STORE_NAME,
    storeNum : faker.phone.phoneNumber(),
    orderID : faker.random.uuid(),
    customerName : faker.name.findName(),
    customerAddress : faker.address.streetAddress(),
  }

  capsNamespace.emit('pickup', payload);

},5000);


capsNamespace.on('delivered', (payload) => {
  console.log('VENDOR: Thanks');

})
