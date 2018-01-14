let Room = require('./room').Room;
let RoomManager = require('./room').RoomManager;

let roomManager = new RoomManager();

exports.onConnect=(user)=>{
  console.log("user connected");
}

exports.onDisconnect=(user,socket,IO)=>{
  console.log("user disconnected");
  let room = roomManager.getRoomByID(user.roomID);
  if(room){
    room.removeUser(user);
    if(room.users.length===0){
      roomManager.removeRoomByID(room.name);
    }
  }
  
  console.log(roomManager.rooms);
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