let handlers = require('./lib/handlers');

let socketApp = (IO,socket) =>{
  let user = {
    name:"alex",
    roomID:""
  };
  //connect
  handlers.onConnect();
  //find room
  socket.on('find_room',handlers.onFindRoom.bind(null,user,socket,IO));
  //send msg
  socket.on('send_msg',handlers.onSendMsg.bind(null,user,socket,IO));
  //disconnect
  socket.on('disconnect',handlers.onDisconnect.bind(null,user,socket,IO));

};

module.exports= socketApp;