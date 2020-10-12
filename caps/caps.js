'use strict';
/*
- Connect to socket
- Create name space
- Create room for each vendor
- Listen for all events from vendor and driver
- Create logger function to track all events
*/

//const io = require('socket.io')(5000);
const port = process.env.PORT || 5000;

const io = require('socket.io')(port);


io.on('connection', (socket) => {

  // console.log('CONNECTED', socket.id); 
  
  // socket.on('pickup', payload => {
  //   logger('pickup', payload);
  // })
  // socket.on('inTransit', payload => {
  //   logger('inTransit', payload);
  // })
  // socket.on('delivered', payload => {
  //   logger('delivered', payload);
  // })

})

const capsNamespace = io.of('/caps')

capsNamespace.on('connect', socket => {

  socket.on('join', room => {
    //console.log('WELCOME', room)
    socket.join(room);

  })
  
  socket.on('pickup', payload => {
    logger('pickup', payload);
  })
  socket.on('inTransit', payload => {
    logger('inTransit', payload);
  })
  socket.on('delivered', payload => {
    logger('delivered', payload);
    capsNamespace.to(payload.store).emit('delivered', payload);
  })
})

function logger(event, payload){
  let date = new Date().toISOString();
  console.log('EVENT', {event, date, payload });
  capsNamespace.emit(event,payload);
}


