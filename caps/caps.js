'use strict';

const io = require('socket.io')(5000);
// const port = process.env.PORT || 3000;

// const io = require('socket.io')(port);


//GLOBAL -- all connections and all events go to everyone
io.on('connection', (socket) => {

  console.log('CONNECTED', socket.id);

  socket.on('create', (payload) => {
    console.log('Ready for Pickup', payload);
    io.emit('inTransit', payload);
  })

  socket.on('inTransit', (payload) => {
    console.log('In Transit', payload);
  })

})
