const express =require('express');
const router = express.Router();
const {messageModel} = require('../Db/Message');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const cookie =require('cookie-parser')

router.post('/contact',(req,res)=>{
    const {email,message}=req.body;
     console.log('hello')
})

module.exports = router