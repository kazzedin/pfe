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
    check("sender","Please enter a valid email address").isEmail()
], (req, res) => {
    const { sender, message,type } = req.body;
    const errors=validationResult(req);
    console.log(errors.array());
    if(errors.isEmpty()){
        messageModel.create({ sender: sender, message: message,type:type })
        .then((result) => {
            console.log(result);
            res.status(201).json({ message: 'Message sent successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    }else{
        res.json({message:'You Enterd Invalid Email'});
    }
    
});


// la verifcation de JWT dans le cas denter dans la page Admin Pour Allowd or not 
router.get('/check',verifyToken,(req,res)=>{
    res.json({Valide:true,User_Email:req.email,User_Password:req.password});
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
                            const access_token = jwt.sign({ email: user.email,password:password }, process.env.ACCESS_TOKEN, { expiresIn: '1m' });
                            const refresh_token = jwt.sign({ email: user.email,password:password  }, process.env.REFRESH_TOKEN, { expiresIn: '5m' });
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


// Modifier les information de Ladmin
router.put('/profil', [
    check("email", "Please enter a valid email address").isEmail()
  ], async (req, res) => {
    const { email, password, find } = req.body;
    const errors = validationResult(req);
  
    if (errors.isEmpty()) {
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Use findOneAndUpdate with proper update object
        adminModel.findOneAndUpdate(
          { email: find }, // Query to find the document
          { $set: { email, password: hashedPassword } }, // Update object to set the new email and password
          { new: true } // Option to return the updated document
        )
          .then(updatedDocument => {
            if (updatedDocument) {
              res.json({ message: "Success" });
            } else {
              res.status(404).json({ message: "User not found" });
            }
          })
          .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).json({ message: "Internal server error" });
          });
      } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      // Handle validation errors
      res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }
  });
  
  router.get('/inbox', (req, res) => {
    messageModel.find()
        .then(messages => res.json({ messages: messages })) // Envoyer les messages dans la réponse JSON
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error fetching messages' }); // Gérer les erreurs
        });
});

router.delete('/deletemessage', (req, res) => {
  console.log(req.body.sender);
  messageModel.findOneAndDelete({ sender: req.body.sender })
    .then(response => res.json({ message: 'Deleted' }))
    .catch(err => res.json(err));
});

  








module.exports = router