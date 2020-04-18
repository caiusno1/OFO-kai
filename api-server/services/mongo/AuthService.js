module.exports = class AuthService {
    constructor(db,userModel){
        // console.log(`User ${userName} issues a request`);
        this.db = db;
        this.userModel=userModel;
    }
    verify(userName,password){
        return this.userModel.findOne({name:userName, password:password});
    }
    userNameExists(userName){
        return this.userModel.exists({name:userName});
    }
}