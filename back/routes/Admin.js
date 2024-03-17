const express = require('express');
const router = express.Router();
const { messageModel } = require('../Db/Message');
const { adminModel } = require('../Db/Acteurs/Admin');
require('dotenv').config();
const multer = require('multer'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator');
const verifyToken =require('../Middleware/AdminMiddleware/VerificationJwt')
const cookieParser=require('cookie-parser');
const nodemailer = require('nodemailer');
const genrateurpwd=require('../Middleware/AdminMiddleware/GerateurMotdePasse')
const {etudiantModel} = require('../Db/Acteurs/Etudiant')
const {encadreurModel} = require('../Db/Acteurs/Encadreur')
const { docsModel } =require('../Db/Docs')
const {dateModel} =require('../Db/Date')
const path = require('path');

router.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/docs'); // Répertoire où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); // Extraire l'extension du fichier
    const filename = path.basename(file.originalname, extension); // Extraire le nom du fichier sans l'extension
    cb(null, `${filename}${extension}`); // Nom de fichier unique avec l'extension d'origine et le timestamp
  }
});


const upload = multer({ storage: storage })

// la creation d'un trasporter pour envoyer des emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:process.env.ADMIN_EMAIL,
    pass:process.env.ADMIN_EMAIL_PASSWORD,
  },
});



//*********************************ROUTES D'ENVOI DES MESSAGES*********************************/
 //creation de message passer par l'utilisateur type contact 
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


// envoyer les informations pour les etudiant (login-info)
router.post('/Login-info-etu-message', [
    check("sender", "Please enter a valid email address").isEmail(),
    check("matricule", "Matricule must be 12 characters long").isLength({ min: 12, max: 12 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { sender, nom, prenom, section, filiere, matricule, message } = req.body;
    console.log(sender, nom, prenom, section, filiere, matricule, message )
    const nomPrenom = nom + ' ' + prenom;
    messageModel.findOne({ sender: sender, "info.nomPrenom":nomPrenom , "info.section": section, "info.filier": filiere, "info.matricule": matricule, type: 'login-info-etu' })
        .then(msg => {
            if (msg) {
                res.json({ message: 'failed' });
            } else {
                messageModel.create({ sender: sender, message: message, "info.nomPrenom": nomPrenom, "info.section": section, "info.filier": filiere, "info.matricule": matricule, type: 'login-info-etu' })
                    .then(() => res.json({ message: 'success' }))
                    .catch(() => res.json({ message: 'error' }));
            }
        })
        .catch(() => res.json({ message: 'error' }));
});

// envoyer les informations pour les prof (login-info)
router.post('/Login-info-prf-message', [
    check("sender", "Please enter a valid email address").isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { sender, nom, prenom, section, filiere, message } = req.body;
    const nomPrenom = nom + ' ' + prenom;
    const Section=section.join(',');
    const Filier=filiere.join(',');
    messageModel.findOne({ sender: sender, "info.nomPrenom": nomPrenom, "info.section": Section, "info.filier": Filier,type: 'login-info-prf' })
        .then(msg => {
            if (msg) {
                res.json({ message: 'failed' });
            } else {
                messageModel.create({ sender: sender, message: message, "info.nomPrenom": nomPrenom, "info.section": Section, "info.filier": Filier, type: 'login-info-prf' })
                    .then(() => res.json({ message: 'success' }))
                    .catch(() => res.json({ message: 'error' }));
            }
        })
        .catch(() => res.json({ message: 'error' }));
});
//************************************************************/



//**********************************ROUTES DE VERIFICATION****************************************/
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
                            const access_token = jwt.sign({ email: user.email,password:password }, process.env.ACCESS_TOKEN, { expiresIn: '20m' });
                            const refresh_token = jwt.sign({ email: user.email,password:password  }, process.env.REFRESH_TOKEN, { expiresIn: '1h' });
                            res.cookie("access_token", access_token, { maxAge: 1200000, httpOnly: true, secure: true, sameSite: 'strict' });
                            res.cookie("refresh_token", refresh_token, { maxAge: 60000000, httpOnly: true, secure: true, sameSite: 'strict' }); 
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
//************************************************************************ */



//************************************ROUTES DE PROFILE**********************/
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
  
  // Log Out
router.get('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.json({response:true});
  })
//*****************************************************************/

//*********************************************ROUTES DE INBOX****************************************/  
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
  const {email,message}=req.body;
  console.log(email,message);
  messageModel.findOneAndDelete({ sender:email,message:message})
    .then(response => res.json({ message: 'Deleted' }))
    .catch(err => res.json(err)); 
});

//envoyer une reponse pour les messages de type contact 
router.post('/response-contact',(req,res)=>{
  const {message,sender} = req.body;
  const mailOption={
    from:process.env.ADMIN_EMAIL,
    to:sender,
    subject:"Repondre sur une qst",
    html:`<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="background-color: #ffffff; border-radius: 5px; padding: 20px;">
      <h1 style="color: #333333; margin-bottom: 20px;">Réponse à votre question</h1>
      <p style="color: #666666; margin-bottom: 20px;">Bonjour,</p>
      <p style="color: #666666; margin-bottom: 20px;">Merci beaucoup pour votre message. Nous avons bien reçu votre question et nous y avons apporté toute notre attention.</p>
      <p style="color: #666666; margin-bottom: 20px;">Voici notre réponse :</p>
      <p style="color: #666666; margin-bottom: 20px;">${message}</p>
      <p style="color: #666666;">N'hésitez pas à nous contacter si vous avez d'autres questions.</p>
      <p style="color: #666666;">Cordialement,</p>
      <p style="color: #666666;">Pfe a distance</p>
    </div>
  </div>`
  }
  transporter.sendMail(mailOption,(err, result) => {
    if(err){
      res.json({message:"failed to send mail"})
    }else{
      res.json({message:"success"})
    }
  })
})

router.post('/response-login-info', (req, res) => {
  const { sender, type } = req.body;
  let mailOption = ''; // Déclaration de la variable

  if (type === 'attente') { // Correction du type ici
    mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: sender,
      subject: "Paraport aux Login information",
      html: `<div style="font-family: Arial, sans-serif;">
        <p>Bonjour,</p>
        <p>Nous vous contactons pour vous informer que vos informations de connexion ne correspondent pas aux listes d'étudiants actuellement disponibles pour la section et la filière spécifiées. En conséquence, nous vous demandons de patienter jusqu'à ce que les listes d'étudiants soient mises à jour.</p>
        <p>Une fois les listes mises à jour, nous vous enverrons vos informations de connexion.</p>
        <p>Merci de votre compréhension et de votre patience.</p>
        <p>Cordialement,<br>Pfe a Distance</p>
      </div>`
    }
  } else {
    mailOption = {
      from: process.env.ADMIN_EMAIL,
      to: sender,
      subject: "Paraport aux Login information",
      html: `<div style="font-family: Arial, sans-serif;">
        <p>Bonjour,</p>
        <p>Nous vous informons que nous avons déjà envoyé les informations de connexion à votre compte. Veuillez vérifier votre boîte de réception, ainsi que votre dossier de courrier indésirable (spam) au cas où notre e-mail aurait été filtré là-bas.</p>
        <p>Si vous ne trouvez pas notre e-mail dans votre boîte de réception ou votre dossier de spam, veuillez nous contacter immédiatement afin que nous puissions vous aider à accéder à vos informations de connexion.</p>
        <p>Merci.</p>
        <p>Cordialement,<br>Pfe a Distance</p>
      </div>`
    }
  }

  transporter.sendMail(mailOption, (err, result) => {
    if (err) {
      res.json({ message: "failed to send mail" })
    } else {
      res.json({ message: "success" })
    }
  })
})

//changement d'etat pour les message de type login-info
router.put('/response-login-info-etat', async (req, res) => {
  try {
    const { sender, message, info,type } = req.body;
   
    // Recherche du message à mettre à jour
     const updatedMessage = await messageModel.findOneAndUpdate(
      { sender: sender, message: message, 'info.nomPrenom': info,type:type },
      { etat: true }, // Mettre à jour l'état du message à true
      { new: true } // Pour renvoyer le document mis à jour
    );

    if (updatedMessage) {
      res.status(200).json({ message: 'L\'état du message a été mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Aucun message correspondant trouvé' });
    } 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'état du message' });
  }
});
//changement d'etat pour les message de type contact 
router.put('/response-contact-etat', async (req, res) => {
  try {
    const { sender, message,type } = req.body;
    // Recherche du message à mettre à jour
    const updatedMessage = await messageModel.findOneAndUpdate(
      { sender: sender, message: message,type:type},
      { etat: true }, // Mettre à jour l'état du message à true
      { new: true } // Pour renvoyer le document mis à jour
    );

    if (updatedMessage) {
      res.status(200).json({ message: 'L\'état du message a été mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Aucun message correspondant trouvé' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la mise à jour de l\'état du message' });
  }
});



//envoyer les donner de login vers les etudiants
router.post('/login-info-etu', async (req, res) => {
  const { info } = req.body;
  const newStudents = [];
  

  try {
      for (const student of info) {
          // Vérifier si l'étudiant existe déjà dans la base de données
          const existingStudent = await etudiantModel.findOne({ email: student.email });

          // Si l'étudiant existe, ajouter à la liste des étudiants existants
          if (existingStudent) {
              res.json({message:'failed'})
          } else {
              // Si l'étudiant n'existe pas, ajouter à la liste des nouveaux étudiants
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

router.get('/information-etu',(req,res)=>{
  etudiantModel.find()
  .then(response=>res.json(response))
  .catch(err=>console.log(err));
})

router.get('/information-prf',(req,res)=>{
  encadreurModel.find()
  .then(response=>res.json(response))
  .catch(err=>console.log(err));
})
//**************************************************************************/

//***********************************ROUTES DES DOCUMENTS**********************/
//stocker les documents
router.post('/docs', upload.single('file'), async (req, res) => {
  try {
    const { buffer, mimetype, originalname } = req.file;
    const { title, category,description } = req.body;

    // Vérifiez si un document avec le même titre, nom de fichier et destinataire existe déjà
    const existingDoc = await docsModel.findOne({
      'file.filename': originalname,
    });

    // Si un document avec les mêmes attributs existe déjà, renvoyez une réponse indiquant l'échec de l'ajout
    if (existingDoc) {
      return res.json({ message: 'Un document avec le même nom de fichier existe déjà.Verifier votre informations' });
    }

    // Si aucun document avec les mêmes attributs n'existe, créez et sauvegardez le nouveau document
    const newDoc = new docsModel({
      titre: title,
      distinataire: category,
      description:description,
      file: {
        data: buffer,
        contentType: mimetype,
        filename: originalname
      }
    });

    await newDoc.save();

    res.status(201).json({ message: 'success' });
  } catch (error) {
    console.error('Erreur lors du téléchargement du document:', error);
    res.status(500).json({ message: 'error' });
  }
});

//display les documentes
router.get('/get-docs',(req,res)=>{
  docsModel.find()
  .then(data=>res.json(data))
  .catch(err=>console.log(err));
})

//modifier un document
router.put('/docs-modif/:id', upload.single('file'),(req,res)=>{
  const id=req.params.id;
  const { title, category,description } = req.body;
  const file = req.file;

  docsModel.findByIdAndUpdate(id,{titre:title,distinataire:category,'file.filename':file.originalname,description:description})
  .then(response=>{
    res.json({message:'success'})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: 'Une erreur s\'est produite lors de la suppression du document.'});
  });
})

//supprimer un document
router.delete('/docs-supp/:filename', upload.single('file'), (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  docsModel.findOneAndDelete({ 'file.filename': filename })
    .then(response => {
      if (!response) {
        // Si aucun document n'est trouvé avec ce nom de fichier, renvoyer une réponse d'erreur
        return res.status(404).json({ error: 'Le document n\'existe pas ou a déjà été supprimé.' });
      }
      // Si le document est supprimé avec succès, renvoyer une réponse de succès
      res.json({ message: 'success' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du document.' });
    });
});

//****************************************************/

//***********************************ROUTES DES DATE**********/
//dispaly des dates
// Récupérer toutes les dates
router.get('/date', (req, res) => {
  dateModel.find()
      .then(response => res.json(response))
      .catch(err => console.log(err));
});

// Ajouter une date
router.post('/ajout-date', (req, res) => {
  const { date, title,definition } = req.body;
  dateModel.findOne({ date: date, title: title,description: definition})
      .then(existingDate => {
          if (existingDate) {
              res.json({ message: 'failed' });
          } else {
              dateModel.create({ date: date, title: title })
                  .then(response => res.json({ message: 'success' }))
                  .catch(err => console.log(err));
          }
      })
      .catch(err => console.log(err));
});

// Supprimer une date
router.delete('/supp-date/:id', (req, res) => {
  const { id } = req.params; // Pas besoin de "req.params.id.id"
  dateModel.findByIdAndDelete(id)
      .then(response => res.json({ message: "success" }))
      .catch(err => console.log(err));
});

// Modifier une date
router.put('/modif-date/:id', (req, res) => {
  const { id } = req.params; // Pas besoin de "req.params.id.id"
  const { date, title,definition } = req.body;
  dateModel.findByIdAndUpdate(id, { title: title, date: date,description: definition})
      .then(response => res.json({ message: "success" }))
      .catch(err => console.log(err));
});
//******************************ROUTES DE DATA****************************/
router.get('/get-date', async (req, res) => {
  try {
      const counter = await dateModel.countDocuments();
      res.json({ count: counter }); // Renvoyer le nombre de documents sous forme d'objet JSON avec la clé 'count'
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du nombre de dates.' });
  }
});
router.get('/get-msg', async (req, res) => {
  try {
      const condition1 = { type: 'contact' };
      const condition2 = { type: 'login-info-etu' };
      const condition3 = { type: 'login-info-prf' };
      const condition4 = { etat: true };
      const condition5 = { etat: false };

      const contactIndex = await messageModel.countDocuments(condition1);
      const etuIndex = await messageModel.countDocuments(condition2);
      const prfIndex = await messageModel.countDocuments(condition3);
      const repIndex = await messageModel.countDocuments(condition4);
      const nrepIndex = await messageModel.countDocuments(condition5);
      const totalIndex = await messageModel.countDocuments();

      res.json({
          total: totalIndex,
          rep: repIndex,
          nrep: nrepIndex,
          prf: prfIndex,
          etu: etuIndex,
          contact: contactIndex
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du nombre de messages.' });
  }
});

router.get('/get-docs',async (req,res)=>{
  try {
    const counter = await docsModel.countDocuments();
    res.json({ count: counter }); // Renvoyer le nombre de documents sous forme d'objet JSON avec la clé 'count'
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du nombre de dates.' });
}
})

router.get('/get-usr', async (req, res) => {
  try {
      const condition1 = { etat: true };
      const condition2 = { etat: false };

      const eturec = await etudiantModel.countDocuments(condition1);
      const etunrec = await etudiantModel.countDocuments(condition2);
      const prfrec = await encadreurModel.countDocuments(condition1);
      const prfnrec = await encadreurModel.countDocuments(condition2);

      const total1 = eturec + prfrec;
      const total2 = etunrec + prfnrec;

      res.json({
          totalrec: total1,
          totalnrec: total2,
          prfn: prfnrec,
          prf: prfrec,
          etun: etunrec,
          etu: eturec
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du nombre d\'utilisateurs.' });
  }
});
module.exports = router