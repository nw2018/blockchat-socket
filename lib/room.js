let crypto = require('crypto');

class Room {
  constructor(name,location=null,users=[]){
    this.location=location;
    this.users=users;
    this.name=name;
  }
  addUser(user){
    this.users.push(user);
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
  getRoomByLocation(location){
    let room=null;
    for(let roomName in this.rooms){
      if(false){
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
      let name = crypto.createHash('md5').update(location).digest("hex");
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
  
}

exports.Room = Room;
exports.RoomManager = RoomManager;