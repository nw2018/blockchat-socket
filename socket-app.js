let handlers = require('./lib/handlers');

let socketApp = (IO,socket) =>{
  let user = {
    name:"alex",
    roomID:"",
    location:null
  };
  //connect
  handlers.onConnect();
  //find room and send rooms info
  socket.on('find_room',handlers.onFindRoom.bind(null,user,socket,IO));
  //send msg
  socket.on('send_msg',handlers.onSendMsg.bind(null,user,socket,IO));
  //get room info
  //socket.on('get_info',handlers.onGetRoomInfo.bind(null,user,socket,IO));
  //disconnect
  socket.on('disconnect',handlers.onDisconnect.bind(null,user,socket,IO));

};

module.exports= socketApp;