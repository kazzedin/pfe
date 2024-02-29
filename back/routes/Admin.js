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
const nodemailer = require('nodemailer');
const genrateurpwd=require('../Middleware/AdminMiddleware/GerateurMotdePasse')
const {etudiantModel} = require('../Db/Acteurs/Etudiant')
const {encadreurModel} = require('../Db/Acteurs/Encadreur')


router.use(cookieParser());


// la creation d'un trasporter pour envoyer des emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.ADMIN_EMAIL,
    pass:process.env.ADMIN_EMAIL_PASSWORD,
  },
});



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
                            const access_token = jwt.sign({ email: user.email,password:password }, process.env.ACCESS_TOKEN, { expiresIn: '2m' });
                            const refresh_token = jwt.sign({ email: user.email,password:password  }, process.env.REFRESH_TOKEN, { expiresIn: '10m' });
                            res.cookie("access_token", access_token, { maxAge: 120000, httpOnly: true, secure: true, sameSite: 'strict' });
                            res.cookie("refresh_token", refresh_token, { maxAge: 600000, httpOnly: true, secure: true, sameSite: 'strict' }); 
                            res.json({ message: "Success" });
                        } else {
                          res.json({ message: "Password Wrong" });
                        }
                    });
                } else {
                    res.json({ message: "User not found" });
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
  

// laffichage des messages stocker dans la base de donne  
  router.get('/inbox', (req, res) => {
    messageModel.find()
        .then(messages => res.json({ messages: messages })) // Envoyer les messages dans la réponse JSON
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error fetching messages' }); // Gérer les erreurs
        });
});

//la supprision des messages de la base de donne
router.delete('/deletemessage', (req, res) => {
  console.log(req.body.sender);
  messageModel.findOneAndDelete({ sender: req.body.sender })
    .then(response => res.json({ message: 'Deleted' }))
    .catch(err => res.json(err));
});

//envoyer une reponse pour les messages de type contact 
router.post('/response',(req,res)=>{
  const {message,sender} = req.body;
  const mailOption={
    from:process.env.ADMIN_EMAIL,
    to:sender,
    subject:"Repondre sur une qst",
    html:`<h1>Response</h1> <p>${message}</p>`
  }
  transporter.sendMail(mailOption,(err, result) => {
    if(err){
      res.json({message:"failed to send mail"})
    }else{
      res.json({message:"success"})
    }
  })
})


//envoyer les donner de login vers les etudiants
router.post('/login-info-etu', async (req, res) => {
  const { info } = req.body;
  const newStudents = [];

  try {
      for (const student of info) {
          // Vérifier si l'étudiant existe déjà dans la base de données
          const existingStudent = await etudiantModel.findOne({ email: student.email });

          // Si l'étudiant n'existe pas, ajoutez-le à la liste des nouveaux étudiants
          if (!existingStudent) {
              newStudents.push(student);
          }
      }

      // Parcourir la liste des nouveaux étudiants et envoyer un e-mail à chacun d'eux
      for (const student of newStudents) {
          const pwd = genrateurpwd(student.email);
          const hashedPwd = await bcrypt.hash(pwd, 10);

          const mailOptions = {
              from: process.env.ADMIN_EMAIL,
              to: student.email,
              subject: "Informations de connexion pour votre compte sur PFE à Distance",
              html: `
              <html>
              <head>
                  <style>
                      /* Styles CSS */
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>Informations de connexion pour votre compte sur PFE à Distance</h1>
                      <p>Bonjour ${student.nomPrenom},</p>
                      <p>Veuillez trouver ci-dessous vos informations de connexion :</p>
                      <div class="login-info">
                          <p><strong>Email :</strong> ${student.email}</p>
                          <p><strong>Mot de passe :</strong> ${pwd}</p>
                      </div>
                      <p>Vous pouvez utiliser ces informations pour accéder à votre compte sur PFE à Distance.</p>
                      <p>Merci et bonne journée !</p>
                  </div>
              </body>
              </html>
              `
          };

          await transporter.sendMail(mailOptions);

          // Enregistrer l'étudiant dans la base de données avec le mot de passe haché
          await etudiantModel.create({
              nomPrenom: student.nomPrenom,
              password: hashedPwd,
              email: student.email,
              matricule: student.matricule,
              filier: student.filier,
              section: student.section,
              etat:student.loginInfo,
          });
      }

      res.status(201).json({ message: 'success' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

//envoyer les informations de login pour les prof 
router.post('/login-info-prf', async (req, res) => {
  const { info } = req.body;
  const newProfss = [];

  try {
      for (const prof of info) {
          // Vérifier si l'étudiant existe déjà dans la base de données
          const existingProfesseur = await encadreurModel.findOne({ email: prof.email });

          // Si l'étudiant n'existe pas, ajoutez-le à la liste des nouveaux étudiants
          if (!existingProfesseur) {
            newProfss.push(prof);
          }
      }

      // Parcourir la liste des nouveaux étudiants et envoyer un e-mail à chacun d'eux
      for (const prof of newProfss) {
          const pwd = genrateurpwd(prof.email);
          const hashedPwd = await bcrypt.hash(pwd, 10);

          const mailOptions = {
              from: process.env.ADMIN_EMAIL,
              to: prof.email,
              subject: "Informations de connexion pour votre compte sur PFE à Distance",
              html: `
              <html>
              <head>
                  <style>
                      /* Styles CSS */
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>Informations de connexion pour votre compte sur PFE à Distance</h1>
                      <p>Bonjour ${prof.nomPrenom},</p>
                      <p>Veuillez trouver ci-dessous vos informations de connexion :</p>
                      <div class="login-info">
                          <p><strong>Email :</strong> ${prof.email}</p>
                          <p><strong>Mot de passe :</strong> ${pwd}</p>
                      </div>
                      <p>Vous pouvez utiliser ces informations pour accéder à votre compte sur PFE à Distance.</p>
                      <p>Merci et bonne journée !</p>
                  </div>
              </body>
              </html>
              `
          };

          await transporter.sendMail(mailOptions);

          // Enregistrer l'étudiant dans la base de données avec le mot de passe haché
          await encadreurModel.create({
              nomPrenom: prof.nomPrenom,
              password: hashedPwd,
              email: prof.email,
              filier: prof.filier,
              section: prof.section,
              etat:prof.loginInfo,
          });
      }

      res.status(201).json({ message: 'success' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});




module.exports = router