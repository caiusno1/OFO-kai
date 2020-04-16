const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const  LocalStrategy  =  require('passport-local').Strategy;

const userService = require('./services/mocks/MockUserService');
const userv = require('./services/mongo/UserService');
const {db, UserModel} = require('./services/mongo/MainDBService')
const AuthService = require('./services/mongo/AuthService');
const authService = new AuthService(db, UserModel);

require('express-ws')(app);

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
const strategy = new LocalStrategy(
    function(username, password, done) {
        authService.verify(username,password)
        .then((authentificated) => {
            console.log(authentificated);
            if(authentificated){
                return done(null, username);
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
    if(authService.userNameExists(jwtPayload)){
        return cb(null,jwtPayload);
    }
}
));

app.ws('*/wschatapi', isLoggedIn ,function(ws, req) {
    ws.on('connection', function(ws){
        console.log('new client connected');
    })
    ws.on('message', function(message){
        console.log(`received ${message}`);
    })
});
app.all('*/test', (req,res) => {
    res.send(`Hello World! ${req.url}`);
})

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
app.get('*/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(new userService(req.user, db, UserModel).getProfile());
});
app.get('*/myevents', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(new userService(req.user, db, UserModel).getMyEvents());
});
app.get('*/friends', passport.authenticate('jwt', {session: false}) , (req, res) => {
    res.send(new userService(req.user, db, UserModel).getFriends());
});

app.listen(8080, (error) => {
    if(error){
        console.log(error);
    }
    console.log("connected");
})
