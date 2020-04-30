/**
 * This module exports every necessary database class (and object) that will by the application. We use Monoose as MongoDB ORM.
 */
const mongoose = require('mongoose');
// mongoose.set('debug', true);

// Fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const Schema = mongoose.Schema;
mongoose.connect('mongodb://root:My1%25%267%2F34W%267%2F%28%2545345jdsf%29@mongo:27017/UserDB?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

const UserModel = mongoose.model('User', { name: {type:String, unique : true, required : true, dropDups: true}, 
                                            age: Number, 
                                            hobbies: String, 
                                            job: String, 
                                            ueberMich: String, 
                                            password: String, 
                                            friends:[{type: Schema.Types.ObjectId, ref: 'User'}],
                                            mondayFreetime: String, 
                                            tuesdayFreetime: String, 
                                            wednessdayFreetime: String ,
                                            thursdayFreetime: String,
                                            fridayFreetime: String,
                                            saturdayFreetime: String,
                                            sundayFreetime: String 
});

const EventModel = mongoose.model('Event', { topic:String, date: String, time: String, organiser: {type: Schema.Types.ObjectId, ref: 'User'}, participants: [{type: Schema.Types.ObjectId, ref: 'User'}], platform: String, description: String, joinedParticipants:[{type: Schema.Types.ObjectId, ref: 'User'}]});

module.exports = {mongoose, UserModel, EventModel}