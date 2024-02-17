const express = require('express');
const router = express.Router();
const { messageModel } = require('../Db/Message');
const { adminModel } = require('../Db/Acteurs/Admin');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator');
const verifyToken =require('../Middleware/AdminMiddleware/VerificationJwt')
const cookieParser=require('cookie-parser');

router.use(cookieParser());


//creation de message passer par l'utilisateur
router.post('/contact',[
    check("email","Please enter a valid email address").isEmail()
], (req, res) => {
    const { email, message } = req.body;
    const errors=validationResult(req);
    if(errors.isEmpty()){
        messageModel.create({ email: email, message: message })
        .then((result) => {
            console.log(result);
            res.status(201).json({ message: 'Message sent successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    }else{
        res.json({message:"You Enter Invalid Email!!!"})
    }
    
});


// la verifcation de JWT dans le cas denter dans la page Admin Pour Allowd or not 
router.get('/check',verifyToken,(req,res)=>{
    res.json({Valide:true})
})



//verification des infomrations de l'admin
router.post('/verification',   [
    check("email", "Please enter a valid email address").isEmail()
],  (req, res) => {
    const { email, password } = req.body;
     const errors = validationResult(req);
    if (errors.isEmpty()) {  
        adminModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            const access_token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, { expiresIn: '1m' });
                            const refresh_token = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN, { expiresIn: '5m' });
                            res.cookie("access_token", access_token, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'strict' });
                            res.cookie("refresh_token", refresh_token, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' }); 
                            res.json({ message: "Success" });
                        } else {
                            res.status(401).json({ message: 'Incorrect password ' });
                        }
                    });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch(err => res.status(500).json({ message: "Internal server error", error: err }));
    } else {
        res.status(400).json({ message: "You Enter Invalid Email!!!" });
    }   
});

// Log Out
router.get('/logout', (req, res) => {
res.clearCookie('access_token');
res.clearCookie('refresh_token');
res.json({response:true});
})








module.exports = router