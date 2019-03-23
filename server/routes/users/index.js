const passport = require('passport')
const {Router} = require('express')
const router = Router()
const UserModel = require('../../models/userModel')

function alreadyLogged(req,res,next) {
    if(req.user) return res.redirect('/')
    return next();
}
function protectAccount(req,res,next,err) {
    if(req.user) {
      return  next()
    }
    return next(err)
}

module.exports = () => {
    router.get('/login', alreadyLogged,(req, res) => {
        res.render('users/login')
    })
    router.post('/login', passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login'        
    }))

    router.get('/logout', (req, res) => {
        req.logout();
        return res.redirect('/');
      });
    router.get('/regestration', alreadyLogged,(req, res) => {
        res.render('users/regestration')
    })
    router.post('/regestration', async (req, res, next) => {

        try {
            const user = new UserModel(req.body);
            const savedUser = await user.save()
            if (savedUser) {
                res.redirect('users/account')
            }
            return next(new Error('Failed to save user for unknown reasons'));
        } catch (err) {
            return next(err)
        }
    })

    router.get('/account',protectAccount,(req,res)=>{
        res.render('users/account')
    })


    return router;
}