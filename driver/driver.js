'use strict';
const { Socket } = require('socket.io-client');
/*
- Connect to caps hub socket
  - connect to hubs namespace
    - listen for 'pick up' event
    - log 'order pick up'
    - emit 'in-transit' to hub
  - wait 3 seconds
    - log 'delivered' to hub
    - emit 'delivered' to hub
*/
//GLOBAL
require('dotenv').config();
const socket = require('socket.io-client');
let host = process.env.HOST;

const capsNamespace = socket.connect(`${host}/caps`)

//NAME SPACE
// const capsNamespace = require('/caps')('socket.io-client')('http://localhost:5000');

capsNamespace.on('pickup', (payload) => {
  
 setTimeout(() => {
    inTransit(payload);
  },1500);

    
  setTimeout(() => {
    delivered(payload);
  },3000);

});

function inTransit(payload){
  console.log(`DRIVER: order # ${payload. orderID} is ready`)
  capsNamespace.emit('inTransit', payload)
}

function delivered(payload){
  console.log(`DRIVER: order # ${payload. orderID} has been delivered`)
  capsNamespace.emit('delivered', payload)
}
