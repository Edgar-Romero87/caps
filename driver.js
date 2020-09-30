'use strict';

const events = require('./events');


// events.on('pickup', inTransit);
// events.on('pickup', delivered);

function pickup(payload) {
  console.log('Event:', payload);
} 

function inTransit(payload) {
  setTimeout(() => {
    if(payload.event == 'Pickup') {
      payload.event = 'In Transit';
      console.log('Event:', payload);
    }
  },1000);
}

function delivered(payload) {
  setTimeout(() => {
    if(payload.event == 'In Transit') {
      payload.event = 'Delivered';
      console.log('Event:', payload);
    }
  },3000);
}

events.on('create', pickup);
events.on('create', delivered);
events.on('create', inTransit);