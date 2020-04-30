const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const  LocalStrategy  =  require('passport-local').Strategy;

const userServiceMock = require('./services/mocks/MockUserService');
const userService = require('./services/mongo/UserService');
const {db, UserModel, EventModel} = require('./services/mongo/MainDBService')
const AuthService = require('./services/mongo/AuthService');
const authService = new AuthService(db, UserModel);
const crypto = require('crypto');

require('express-ws')(app);

app.set('trust proxy', 'loopback')
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
const strategy = new LocalStrategy(
    function(username, password, done) {
        authService.verify(username,password)
        .then((user) => {
            if(user){
                return done(null, {name:user.name, id:user._id});
            }
            else {
                return done("unauthorized access", false);
            }
        })
        .catch((err) =>{
            return done("unauthorized access", false);
        });
    }
);
passport.use(strategy);
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'd325468j8"!§%5g&jhd&&4755/$%()56s'
},
function (jwtPayload, cb) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    if(authService.userNameExists(jwtPayload.name)){
        return cb(null,jwtPayload);
    }
}
));

app.ws('*/wschatapi', passport.authenticate('jwt', {session: false}) ,function(ws, req) {
    ws.on('connection', function(ws){
        console.log('new client connected');
    })
    ws.on('message', function(message){
        console.log(`received ${message}`);
    })
});

app.post('*/authenticate', function (req, res, next) {    passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: `Something is not right ${err}`,
            user   : user
        });
    }       req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }           // generate a signed son web token with the contents of user object and return it in the response           
       const token = jwt.sign(user, 'd325468j8"!§%5g&jhd&&4755/$%()56s');
       return res.json({user, token});
    });
})(req, res);
});
app.post('*/register', (req, res) => { 
    UserModel.exists({name:req.body.name}).then(userExists => {
        if(!userExists){
            const pwhash = crypto.createHash('sha256').update(req.body.password).digest('base64');
            const newUser = new UserModel({ name: req.body.name.trim(), id: req.body.id, age: req.body.age, hobbies: req.body.hobbies, job: req.body.job, ueberMich: req.body.aboutMe, password: pwhash });
            newUser.save().then(
                () => {
                    res.send({message:"User created", status : 0})
                }
            ).catch((err) => 
                res.send({message:"User could not be created due to server error. Please try again later.", status : 1})
            );
        } else {
            res.send({message:"User already exists", status : 1})
        }  
    });
    
});
app.get('*/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    new userService(req.user, db, UserModel, EventModel).getProfile().then((profile)=> {
        res.send(profile);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`});
    });
});
app.get('*/myevents', passport.authenticate('jwt', {session: false}), (req, res) => {
    new userService(req.user, db, UserModel, EventModel).getMyEvents().then((myevents)=> {
        res.send(myevents);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`});
    });
});
app.get('*/friends', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).getFriends().then((friends)=> {
        res.send(friends);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`});
    });
});
app.post('*/addFriend', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).addFriend(req.body.name).then((friends)=> {
        res.send(friends);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status: 1});
    });
});
app.post('*/addEvent', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).addToMyEvents(req.body).then((event)=> {
        res.send(event);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});
app.post('*/getMyEvent', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).getMyEventByID(req.body.id).then((myevent)=> {
        res.send(myevent);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});
app.post('*/joinMeToEvent', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).joinMeToEvent(req.body.id).then((myevent)=> {
        res.send({msg: 'Successfully joined to event'});
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});
app.post('*/removeMeFromEvent', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).removeMeFromEvent(req.body.id).then((myevent)=> {
        res.send({msg: 'Successfully removed from event'});
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});

app.post('*/setMyFreetime', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).setMyFreetime(req.body).then((myevent)=> {
        res.send(myevent);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});

app.get('*/getMyFreetime', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).getMyFreetime().then((myevent)=> {
        res.send(myevent);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});

app.get('*/getUserFreetime', passport.authenticate('jwt', {session: false}) , (req, res) => {
    new userService(req.user, db, UserModel, EventModel).getUserFreetime().then((myevent)=> {
        res.send(myevent);
    }).catch(err => {
        res.send({message:`Failure while loading: ${err}`, status : 1});
    });
});

app.use(function(req, res){
    res.send(`This is the default api route ${req.url}`);
});

app.listen(8080, (error) => {
    if(error){
        console.log(error);
    }
    console.log("connected");
})
