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
    IO.to(room.name).emit('sys',{
      text:user.name+' left room.',
      name:user.name,
      action:"logout",
      location:user.location,
      time:new Date()
    });
    if(room.users.length===0){
      roomManager.removeRoomByID(room.name);
    }
  }
  
  console.log(roomManager.rooms);
}


exports.onFindRoom=(user,socket,IO,userData)=>{
  console.log("find_room is called!");
  //check location
  if(!userData.location){
    socket.emit("error",{
      code:1,
      msg:"location is null in userData!"
    })
    return;
  }
  //set user.name
  if(userData.name){
    user.name = userData.name;
    user.location = userData.location;
  }
  let room = roomManager.getRoomByLocation(userData.location);
  user.roomID = room.name;
  if(!room.isUserExist(user)){
    room.addUser(user);
  }
  console.log(roomManager.rooms);
  socket.join(room.name);

  //broadcast login info
  IO.to(room.name).emit('sys',{
    text:user.name+' entered room.',
    action:"login",
    name:user.name,
    location:userData.location,
    //this should use client time
    time:new Date()
  });

  //send room info to client
  let res={
    ownRoom:null,
    nearbyRooms:[]
  };
  if(room){
    res.ownRoom=room;
    res.nearbyRooms=roomManager.getNearbyRooms(room.location);
  }
  else if(userData.location){
    res.nearbyRooms=roomManager.getNearbyRooms(userData.location);
  }
  socket.emit('room_info',res);
}

exports.onSendMsg=(user,socket,IO,userData)=>{
  //broadcast to all users
  //TODO: don't send to emitter
  IO.to(user.roomID).emit('normal',userData);
}

/*exports.onGetRoomInfo=(user,socket,IO,userData)=>{
  let room = roomManager.getRoomByID(user.roomID);
  let res={
    ownRoom:null,
    nearbyRooms:[]
  };
  if(room){
    res.ownRoom=room;
    res.nearbyRooms=roomManager.getNearbyRooms(room.location);
  }
  else if(userData.location){
    res.nearbyRooms=roomManager.getNearbyRooms(userData.location);
  }
  socket.emit('room_info',res);
}*/
