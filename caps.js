'use strict';

const faker = require('faker');

const events = require('./events');

require('./vendor.js');
require('./driver.js');

//VENDOR
events.on('pickup', logger);

//DRIVER
events.on('inTransit', logger);


function logger(payload) {
  console.log('==================================');
  console.log('CAPS', payload);
}