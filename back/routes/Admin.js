const express = require('express');
const router = express.Router();
const { messageModel } = require('../Db/Message');
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
    if(email==="admin@usthb.com" && password==="admin"){
        res.json({message:"Success"})
    }else{
        res.json({message:"Faild"})
    }
})


module.exports = router