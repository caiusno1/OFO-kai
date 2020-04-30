/**
 * Service for doing the actual database querys
 */

const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class UserService {
    username;
    userID;
    db;
    eventModel;
    userModel;

    constructor(puser, pdb, pUserModel, EventModel){
        this.userModel = pUserModel;
        this.db = pdb;
        this.username = puser.name;
        this.userID = puser.id;
        this.eventModel = EventModel;
    }
    getFriends(){
        return this.userModel.findOne({name:this.username}).populate('friends').then((res)=>{
            return res.friends.map((friend)=>{return {name:friend.name, 
                                                        id:friend._id,
                                                        mondayFreetime: friend.mondayFreetime, 
                                                        tuesdayFreetime: friend.tuesdayFreetime, 
                                                        wednessdayFreetime: friend.wednessdayFreetime ,
                                                        thursdayFreetime: friend.thursdayFreetime,
                                                        fridayFreetime: friend.fridayFreetime,
                                                        saturdayFreetime: friend.saturdayFreetime,
                                                        sundayFreetime: friend.sundayFreetime
                                                    }});
        });
    }
    addFriend(friendname){
        if(friendname == this.username){
            return Promise.reject("Same user and friend");
        }
        return this.userModel.findOne({name:friendname}).then((newFriend)=>{
            if(newFriend) { // friend exists in database
                return this.userModel.findOneAndUpdate({name:this.username}, {$addToSet:{friends:[newFriend._id]}}).then((user)=>{
                    if(!user.friends || !Array.isArray(user.friends)){
                        user.friends = []; // initialise array if necessary 
                    } 
                    user.friends.push(newFriend._id);
                    return { status: 0} // status: everything fine
                });
            } else return { status : 2} //status: problem with database (can't find entry ....)
        });
    }
    getProfile(){
        return this.userModel.findOne({name:this.username}).then((res)=>{
            // map to not disclose password hash and other private data
            return {name:res.name,age:res.age, hobbies:res.hobbies, job:res.job, aboutMe: res.ueberMich};
        });
    }
    getMyEvents(){
        return this.eventModel.find({$or:[{participants:[this.userID]},{organiser:this.userID}]})
        .populate({
            path: "participants",
        })
        .populate({
            path: "organiser",
        })
        .populate({
            path: "joinedParticipants",
        })
        .then((res)=>{
            let myEvents = [];
            for(const event of res){
                myEvents.push({id:event._id, topic: event.topic, date: event.date, time: event.time, participants: event.participants.map((participant) => {return {name:participant.name, id:participant._id}}), service:event.platform, joinedParticipants: event.joinedParticipants.map((participant)=> {return {name:participant.name, id:participant._id}}), organiser: {name:event.organiser.name, id:event.organiser._id}});
            }
            return myEvents;
        }).catch(err => {
            console.log(`Error:${err}`);
        });
    }
    getMyEventByID(id){
        return this.eventModel.findOne({_id:ObjectId(id)})
        .populate('organiser')
        .populate('participants')
        .populate('joinedParticipants')
        .then((event) => {
            return {topic: event.topic, date: event.date, time: event.time, participants: event.participants.map((participant)=> {return {name:participant.name, id:participant._id}}), service:event.platform, organiser: {name:event.organiser.name, id:event.organiser._id}, description: event.description, joinedParticipants: event.joinedParticipants.map((participant)=> {return {name:participant.name, id:participant._id}})};
        })
    }
    addToMyEvents(event){
        const newEvent = new this.eventModel({topic:event.topic, date: event.date, time: event.time, participants: event.participants.map(participant => ObjectId(participant.id)), organiser: this.userID, platform: event.platform, description: event.description})
        return newEvent.save().then(function(newevent) {
                return {id:newevent.id};
         });
    }
    joinMeToEvent(id){
        return this.eventModel.findOneAndUpdate({_id:ObjectId(id)}, {$addToSet:{participants:[this.userID], joinedParticipants:[this.userID]}}).then((res) => {
            //console.log(res);
        }); 
    }
    removeMeFromEvent(id){
        return this.eventModel.findOneAndUpdate({_id:ObjectId(id)}, {$pull:{participants:this.userID, joinedParticipants:this.userID}}, {new: true}).then((res) => {
            // console.log(res);
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