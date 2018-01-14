let Room = require('./room').Room;
let RoomManager = require('./room').RoomManager;

let roomManager = new RoomManager();

exports.onConnect=(user)=>{
  console.log("user connected");
}

exports.onDisconnect=()=>{
  console.log("user disconnected");
}

exports.onFindRoom=(user,socket,IO,userData)=>{
  console.log("find_room is called!");
  let room = roomManager.getRoomByLocation(userData.location);
  user.roomID = room.name;
  room.addUser(user);
  console.log(roomManager.rooms);
  roomName = room.name;
  socket.join(room.name);
  IO.to(room.name).emit('sys',user.name+' entered room.');
}

exports.onSendMsg=(user,socket,IO,userData)=>{
  IO.emit('normal',userData.text)
}