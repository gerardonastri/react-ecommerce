const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

//REGISTER
router.post('/register', async (req,res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if(err) return res.status(500).json(err)
            res.status(401).json(registerUser)
        })
    } catch (e) {
        res.status(500).json(e.message)
    }
})
//LOGIN
router.post('/login', passport.authenticate('local', {failureFlash: false, failureRedirect: '/api/user/login'}), async (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (e) {
        res.status(500).json(e.message)
    }
})

//LOGOUT
router.get('/logout', (req,res) => {
    try {
        req.session.destroy();
        res.status(200).json('logout successfull')
    } catch (error) {
        res.status(500).json(error.message)
    }
})
  


module.exports = router;