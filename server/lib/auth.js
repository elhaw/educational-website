const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel')

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({
            email: username
        }).exec()
        if (!user) {
            return done(null, false, {
                message: 'Invalid user name'
            })
        }
        const validPassword = await user.checkPassword(password)
        if (!validPassword) {
            return done(null, false, {
                message: 'Invalid user  password'
            })
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
}))

passport.serializeUser((user,done)=>{
    return done(null, user._id); 
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = UserModel.findById(id).exec()
        return done(null,user)
    } catch (error) {
        done(error)
    }
})
module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: async (req, res, next) => {
        try {
            const curentUser = await req.user;
            res.locals.user =  curentUser;
        }
        catch(err){
            return next();

        }
        return next();
    }
}