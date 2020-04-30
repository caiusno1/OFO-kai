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

/* for debug
UserModel.exists({ name: 'Kai'}).then(userExists => {
    if(!userExists){

        const testUser = new UserModel({ name: 'Kai', age: 23, password: 'admin', hobbies: "programming, volleyball, volunteer @ German Red Cross", job:"Student", ueberMich: "Nothing more to say ;-)" });
        testUser.save().then(() => {
            console.log('User saved');
        });

    }
});
*/
module.exports = {mongoose, UserModel, EventModel}