const crypto = require('crypto');
module.exports = class AuthService {
    constructor(db,userModel){
        // console.log(`User ${userName} issues a request`);
        this.db = db;
        this.userModel=userModel;
    }
    verify(userName,password){
        const pwhash = crypto.createHash('sha256').update(password).digest('base64');
        return this.userModel.findOne({name:userName, password:pwhash});
    }
    userNameExists(userName){
        return this.userModel.exists({name:userName});
    }
}