'use strict';

const faker = require('faker');

const Events = require('events');

const events = new Events();

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

//VENDOR
events.on('create', pickup);

//DRIVER
events.on('create', inTransit);

//DRIVER
events.on('create', delivered);


setInterval(() => {
  let storeNum = faker.phoneNumber();
  let orderNum = faker.random.uuid();
  let customerName = faker.name.findName();
  let customerAddress = faker.address.streetAddress();
  events.emit('create', { event: 'Pickup', time: Date(Date.now), payload: { store: storeNum, orderID: orderNum, customer: customerName, address: customerAddress}});
},5000);
