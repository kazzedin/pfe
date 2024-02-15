const express = require('express');
const router = express.Router();
const { messageModel } = require('../Db/Message');
const { adminModel } = require('../Db/Acteurs/Admin');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cookieParser());


router.post('/contact', (req, res) => {
    const { email, message } = req.body;
    messageModel.create({ email: email, message: message })
        .then((result) => {
            console.log(result);
            res.status(201).json({ message: 'Message sent successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.post('/verification',(req,res)=>{
    const {email,password}=req.body;
    adminModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json({message:"Success"})
            }else{
                res.json({message:"Faild"})
            }
        }else{
            res.json({message:"User not found"})
        }
    })
    .catch(err=>res.json(err))
   
})




module.exports = router