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
                myEvents.push({id:event._id, topic: event.topic, date: event.date, time: event.time, participants: event.participants.map((participant)=> {return {name:participant.name, id:participant.id}}), service:event.platform});
            }
            return myEvents;
        }).catch(err => {
            console.log(`Error:${err}`);
        });
    }
    getMyEventByID(id){
        return this.eventModel.findOne({_id:ObjectId(id)}).populate('organiser').populate('participants').then((event) => {
            return {topic: event.topic, date: event.date, time: event.time, participants: event.participants.map((participant)=> {return {name:participant.name, id:participant.id}}), service:event.platform, organiser: event.organiser, description: event.description};
        })
    }
    addToMyEvents(event){
        const newEvent = new this.eventModel({topic:event.topic, date: event.date, time: event.time, participants: event.participants.map(participant => ObjectId(participant.id)), organiser: this.userID, platform: event.platform, description: event.description})
        return newEvent.save().then(function(newevent) {
                return {id:newevent.id};
         });
    }
    setMyFreetime(event){
        return this.userModel.findOneAndUpdate({name: this.username}, { $set: { mondayFreetime: event.mondayFreetime, 
                                                                        tuesdayFreetime: event.tuesdayFreetime, 
                                                                        wednessdayFreetime: event.wednessdayFreetime ,
                                                                        thursdayFreetime: event.thursdayFreetime,
                                                                        fridayFreetime: event.fridayFreetime,
                                                                        saturdayFreetime: event.saturdayFreetime,
                                                                        sundayFreetime: event.sundayFreetime
                                                                    }});
    }
    getMyFreetime(){
        return this.userModel.findOne({name: this.username}).then((res) => {
            return { mondayFreetime: res.mondayFreetime, 
                tuesdayFreetime: res.tuesdayFreetime, 
                wednessdayFreetime: res.wednessdayFreetime ,
                thursdayFreetime: res.thursdayFreetime,
                fridayFreetime: res.fridayFreetime,
                saturdayFreetime: res.saturdayFreetime,
                sundayFreetime: res.sundayFreetime
            }
        })
    }
    getUserFreetime(uname){
        return this.userModel.findOne({name: uname}).then((res) => {
            return { mondayFreetime: res.mondayFreetime, 
                tuesdayFreetime: res.tuesdayFreetime, 
                wednessdayFreetime: res.wednessdayFreetime ,
                thursdayFreetime: res.thursdayFreetime,
                fridayFreetime: res.fridayFreetime,
                saturdayFreetime: res.saturdayFreetime,
                sundayFreetime: res.sundayFreetime
            }
        })
    }
}