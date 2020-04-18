
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
        return this.userModel.find({name:this.username}).populate('friends').then((res)=>{
            return Promise.resolve(res.friends.map((friend)=>{return {name:friend.name,id:friend._id}}));
        });
    }
    getProfile(){
        return this.userModel.findOne({name:this.username}).then((res)=>{
            // console.log(res);
            return Promise.resolve({name:res.name,age:res.age, hobbies:res.hobbies, job:res.job, aboutMe: res.ueberMich});
        });
    }
    getMyEvents(){
        return this.eventModel.find().populate({
            path: "participants",
            match: { name: this.username },
            select: "name"
        }).then((res)=>{
            let myEvents = [];
            for(const event of res){
                myEvents.push({topic: event.topic, date: event.date, time: event.time, participants: event.participants});
            }
            return myEvents;
        });
    }
    addToMyEvents(topic, date, time, participants){
        const newEvent = new EventModel({topic:topic, date: date, time: time, participants: participants.map(participant => id)})
        newEvent.save().then(() => console.log('Event saved'));
    }
}