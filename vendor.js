'use strict';

const faker = require('faker');
const events = require('./events');


require('dotenv').config();
const storeName = process.env.STORENAME;



setInterval(() => {
  let storeNum = faker.phone.phoneNumber();
  let orderNum = faker.random.uuid();
  let customerName = faker.name.findName();
  let customerAddress = faker.address.streetAddress();
  events.emit('create', { event: 'Pickup', time: Date(Date.now), payload: { store: storeNum, orderID: orderNum, customer: customerName, address: customerAddress}});
},5000);

events.on('inTransit', pickUp);

function pickUp(payload) {
  console.log('  -VENDOR: let me know when its has arrived', payload);
} 
