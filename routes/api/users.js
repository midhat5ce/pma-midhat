const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLogInInput = require('../../validation/login');

const User = require('../../models/User');



// api/posts/test
// public

router.get('/test',(req, res) =>res.json({msg: " Users works"}));

//api/posts/register

router.post('/register',(req, res)=>{
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user =>{
            if(user){
                errors.email = "Email already exists";
                return res.status(400).json(errors);
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt ,(err,hash)=>{
                        if(err) throw err;
                        newUser.password= hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
});


// api/users/login

router.post('/login',(req,res)=>{

 
    const { errors, isValid } = validateLogInInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user =>{
            if(!user){
                errors.email= "User not found"
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        const payload = {id: user.id, name: user.name}
                        jwt.sign(payload, keys.secretOrKey,{ expiresIn: 7200}, (err, token)=>{
                            res.json({success: true, token:'Bearer '+token });
                        });
                    }else{
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/current',passport.authenticate('jwt', { session: false}),(req, res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});



module.exports = router;