const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://root:My1%25%267%2F34W%267%2F%28%2545345jdsf%29@mongo:27017/UserDB?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

const UserModel = mongoose.model('User', { name: {type:String, unique : true, required : true, dropDups: true}, age: Number, hobbies: String, job: String, ueberMich: String, password: String, friends:[{type: Schema.Types.ObjectId, ref: 'User'}] });
const EventModel = mongoose.model('Event', { topic:String, date: String, time: String, organiser: {type: Schema.Types.ObjectId, ref: 'User'}, participants: [{type: Schema.Types.ObjectId, ref: 'User'}]});

UserModel.exists({ name: 'Kai'}).then(userExists => {
    if(!userExists){

        const testUser = new UserModel({ name: 'Kai', age: 23, password: 'admin', hobbies: "programming, volleyball, volunteer @ German Red Cross", job:"Student", ueberMich: "Nothing more to say ;-)" });
        testUser.save().then(() => {
            console.log('User saved');
            /// Debug only START
            EventModel.exists({ topic: 'test Event'}).then(eventExists => {
                if(!eventExists){
                    UserModel.findOne({name: 'Kai'}).then( user =>
                    {
                        const testEvent = new UserModel({
                            date: '20.02.2020',
                            time: '10:30',
                            topic: 'test Event',
                            service: 'League of Legends',
                            participants: []
                        });
                        testEvent.save().then(() => console.log('Test Event saved'));
                    });
                }
            });
            /// Debug only END
        });

    }
});
module.exports = {mongoose, UserModel, EventModel}