let crypto = require('crypto');
let locationTools = require('./location');

const MAX_RADIUS = 0.001;

class Room {
  constructor(name,location=null,users=[]){
    this.location=location;
    this.users=users;
    this.name=name;
  }
  addUser(user){
    this.users.push(user);
  }
  isUserExist(user){
    let index = this.users.indexOf(user);
    return index != -1;
  }
  removeUser(user){
    let index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

class RoomManager {
  constructor(rooms={}){
    this.rooms=rooms;
  }
  addRoom(name,roomObj){
    this.rooms[name]=roomObj;
  }
  getRoomByID(roomID){
    if(roomID in this.rooms){
      return this.rooms[roomID];
    }
    else{
      return null;
    }
  }
  getRoomByLocation(location){
    let room=null;
    for(let roomName in this.rooms){
      if(locationTools.isInRange(location,this.rooms[roomName].location,MAX_RADIUS)){
        room = this.rooms[roomName];
        break;
      }
    }
    //room exist
    if(room){
      return room;
    }
    //create new room
    else{
      let name = crypto.createHash('md5').update(JSON.stringify(location)).digest("hex");
      room=new Room(
        name,
        location
      );
      this.addRoom(
        name,
        room
      );
      return room;
    }
  }
  removeRoomByID(roomID){
    if(roomID in this.rooms){
      delete this.rooms[roomID];
    }
  }
  getNearbyRooms(location){
    const offsets=[[0.0023,-0.0018],[-0.0015,0.0018],[-0.0018,-0.0017]]
    let roomlist=[];
    for(let offset of offsets){
      let tmpLocation = {lat:location.lat+offset[0],lng:location.lng+offset[1]};
      let tmpRoom = new Room(crypto.createHash('md5').update(JSON.stringify(tmpLocation)).digest("hex"),tmpLocation);
      if(Math.random()>0.4)
        tmpRoom.addUser({location:{lat:tmpLocation.lat+0.0005,lng:tmpLocation.lng-0.00032},name:"robot"},tmpLocation);
      if(Math.random()>0.4)
        tmpRoom.addUser({location:{lat:tmpLocation.lat-0.0003,lng:tmpLocation.lng+0.00015},name:"robot"},tmpLocation);
      if(Math.random()>0.4)
        tmpRoom.addUser({location:{lat:tmpLocation.lat+0.0013,lng:tmpLocation.lng-0.0001},name:"robot"},tmpLocation);
      roomlist.push(tmpRoom);  
    }
    return roomlist;
  }
}

exports.Room = Room;
exports.RoomManager = RoomManager;