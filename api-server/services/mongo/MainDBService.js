const mongoose = require('mongoose');
mongoose.connect('mongodb://root:My1%25%267%2F34W%267%2F%28%2545345jdsf%29@mongo:27017/UserDB?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

const UserModel = mongoose.model('User', { name: String, id: String, age: Number, hobbies: Array, job: String, ueberMich: String, password: String });

const testUser = new UserModel({ name: 'Kai', age: 23, password: 'admin'  });

testUser.save().then(() => console.log('User saved'));

module.exports = {mongoose, UserModel}