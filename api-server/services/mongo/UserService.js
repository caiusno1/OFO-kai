const ObjectId = require("mongoose").Types.ObjectId;
module.exports = class UserService {
    userModel;
    username;
    userID;
    db;
    eventModel;

    constructor(puser, pdb, pUserModel, EventModel){
        this.userModel = pUserModel;
        this.db = pdb;
        this.username = puser.name;
        this.userID = puser.id;
        this.eventModel = EventModel;
    }
    getFriends(){
        return this.userModel.findOne({name:this.username}).populate('friends').then((res)=>{
            return res.friends.map((friend)=>{return {name:friend.name,id:friend._id}});
        });
    }
    getProfile(){
        return this.userModel.findOne({name:this.username}).then((res)=>{
            // console.log(res);
            return {name:res.name,age:res.age, hobbies:res.hobbies, job:res.job, aboutMe: res.ueberMich};
        });
    }
    getMyEvents(){
        return this.eventModel.find({$or:[{participants:[this.userID]},{organiser:this.userID}]})
        .populate({
            path: "participants",
        })
        .then((res)=>{
            let myEvents = [];
            for(const event of res){
                myEvents.push({topic: event.topic, date: event.date, time: event.time, participants: event.participants.map((participant)=> {return {name:participant.name, id:participant.id}}), service:event.platform});
            }
            return myEvents;
        }).catch(err => {
            console.log(`Error:${err}`);
        });
    }
    addToMyEvents(event){
        const newEvent = new this.eventModel({topic:event.topic, date: event.date, time: event.time, participants: event.participants.map(participant => ObjectId(participant.id)), organiser: this.userID, platform: event.platform})
        return newEvent.save().then(() => console.log('Event saved'));
    }
}