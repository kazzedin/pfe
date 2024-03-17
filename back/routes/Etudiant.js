const express = require('express');
const router = express.Router();
const { messageModel } = require('../Db/Message');
require('dotenv').config();
const multer = require('multer'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator');
const verifyToken =require('../Middleware/EtudiantMiddleware/VerificationJwt')
const cookieParser=require('cookie-parser');
const nodemailer = require('nodemailer');
const {etudiantModel} = require('../Db/Acteurs/Etudiant')
const {encadreurModel} = require('../Db/Acteurs/Encadreur')
const { docsModel } =require('../Db/Docs')
const {dateModel} =require('../Db/Date')
const path = require('path');
const fs = require('fs');
const { fromPath } = require('pdf2pic');

router.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // Répertoire où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname); // Extraire l'extension du fichier
      const filename = path.basename(file.originalname, extension); // Extraire le nom du fichier sans l'extension
      cb(null, `${filename}_${Date.now()}${extension}`); // Nom de fichier unique avec l'extension d'origine et le timestamp
    }
  });
const upload = multer({ storage: storage })

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:process.env.ADMIN_EMAIL,
      pass:process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

//*Reste de password*//
router.post('/reset',[
  check("email","Please enter a valid email address").isEmail()
], (req, res) => {
  const { email } = req.body;
  const errors=validationResult(req);
  const resetPage = `http://localhost:5173/Reset?email=${email}`;
  let userType = '';
  if(errors.isEmpty()){
  etudiantModel.findOne({ email: email })
      .then(etudiant => {
          if (etudiant) {
              userType = 'etudiant';
          } else {
              return encadreurModel.findOne({ email: email });
          }
      })
      .then(encadreur => {
          if (encadreur) {
              userType = 'encadreur';
          }

          if (userType === 'etudiant' || userType === 'encadreur') {
              const mailOption = {
                  from: process.env.ADMIN_EMAIL,
                  to: email,
                  subject: "Réinitialisation du mot de passe",
                  html: `Bonjour, <br><br>
                  Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :<br><br>
                  <a href="${resetPage}">www.ResetPage.PfeaDistance</a><br><br>
                  Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.<br><br>
                  Cordialement,<br>
                  Pfe a Distance`
              };

              transporter.sendMail(mailOption, (err, result) => {
                  if (err) {
                      res.json({ message: "failed to send mail" });
                  } else {
                      res.json({ message: "success" });
                  }
              });
          } else {
              res.json({ message: "failed" });
          }
      })
      .catch(err => {
          console.log(err);
          res.json({ message: "failed" });
      });
    }
});



router.put('/reset-pwd', (req, res) => {
    const { email, newPassword } = req.body;
    let userType = '';
    // Hash du nouveau mot de passe
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Erreur lors du hashage du mot de passe:', err);
            res.status(500).json({ message: 'failed' });
            return;
        }

        etudiantModel.findOne({ email: email })
            .then(etudiant => {
                if (etudiant) {
                    userType = 'etudiant';
                    return etudiantModel.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true });
                } else {
                    return encadreurModel.findOne({ email: email });
                }
            })
            .then(encadreur => {
                if (encadreur) {
                    userType = 'encadreur';
                    return encadreurModel.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true });
                }
            })
            .then(() => {
                res.json({ message: 'success' });
            })
            .catch(err => {
                console.error('Erreur lors de la mise à jour du mot de passe:', err);
                res.status(500).json({ message: 'failed' });
            });
    });
});


router.post('/login-etu',[
    check("email","Please enter a valid email address").isEmail()
  ],(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if (errors.isEmpty()) {  
        etudiantModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            const access_token = jwt.sign({ email: user.email,password:password }, process.env.ETU_ACCESS_TOKEN, { expiresIn: '20m' });
                            const refresh_token = jwt.sign({ email: user.email,password:password  }, process.env.ETU_REFRESH_TOKEN, { expiresIn: '1h' });
                            res.cookie("access_token", access_token, { maxAge: 1200000, httpOnly: true, secure: true, sameSite: 'strict' });
                            res.cookie("refresh_token", refresh_token, { maxAge: 60000000, httpOnly: true, secure: true, sameSite: 'strict' }); 
                            res.json({ message: "success" });
                        } else if (err) {
                            // Gérer les erreurs de bcrypt
                            console.error('Erreur lors de la comparaison des mots de passe avec bcrypt:', err);
                            res.status(500).json({ message: "Internal server error", error: err });
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
    
})


router.get('/check',verifyToken,(req,res)=>{
    res.json({Valide:true,User_Email:req.email,User_Password:req.password});
})

router.get('/profile/:EtudiantUserEmail',(req,res)=>{
    const {EtudiantUserEmail}=req.params;
    etudiantModel.findOne({email:EtudiantUserEmail})
    .then(user=>{
        if(user){
          
            res.json({image:user.photo_profile,status:user.etat_cnx})
        }else{
           
            res.json({message:"user not found"})
        }
    })
    .catch(err=>console.log(err));
})


router.put('/changeEtat/:EtudiantUserEmail',(req,res)=>{
const {EtudiantUserEmail}=req.params;
const {state}=req.body;
console.log(state);
etudiantModel.findOneAndUpdate({email:EtudiantUserEmail},{$set:{etat_cnx:state}})
.then(user=>{
    if(user){
        res.json({message:'success'})
    }else{
        res.json({message:'failed'})
    }
})
.catch(err=>console.log(err)) ;
})

router.put('/changePhoto/:EtudiantUserEmail', upload.single('image'), (req, res) => {
    const { EtudiantUserEmail } = req.params;
    const image = req.file.filename;
     // Remplacer les contre-obliques par des barres obliques
    etudiantModel.findOneAndUpdate({ email: EtudiantUserEmail }, {
            $set: {
                photo_profile: image
            }
        })
        .then(user => {
            if (user) {
                res.json({ message: 'success', imageUrl:image });
            } else {
                res.json({ message: 'error' });
            }
        })
        .catch(err => console.log(err));
});

router.get('/getUser/:EtudiantUserEmail',(req,res)=>{
    const {EtudiantUserEmail}=req.params
    etudiantModel.findOne({email:EtudiantUserEmail})
    .then(response=>{
        res.json({image:response.photo_profile,status:response.etat_cnx});
    })
    .catch(err=>console.log(err))
})
router.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({response:true});
    })

    router.put('/changement-info/:EtudiantUserEmail', async (req, res) => {
        const { EtudiantUserEmail } = req.params;
        const { nvemail, nvpwd } = req.body;
        
        try {
            // Hacher le nouveau mot de passe
            const hashedPwd = await bcrypt.hash(nvpwd, 10);
            
            // Mettre à jour le document MongoDB avec le nouveau mot de passe et le nouvel email
            const updatedUser = await etudiantModel.findOneAndUpdate(
                { email: EtudiantUserEmail },
                { $set: { password: hashedPwd, email: nvemail } },
                { new: true } // Pour renvoyer le document mis à jour plutôt que l'ancien document
            );
    
            if (updatedUser) {
                res.json({ message: 'success' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });   


    router.get('/get-docs', (req, res) => {
        const destinataires = ["Etudiant", "Tout"]; // Liste des destinataires autorisés
        docsModel.find({ distinataire: { $in: destinataires } })
            .then(docs => res.json(docs))
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des documents." });
            });
    }); 

    router.get('/download-doc/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../public/docs/', filename); // Chemin vers le fichier
      
        // Vérifier si le fichier existe
        if (fs.existsSync(filePath)) {
          // Si le fichier existe, envoyer le fichier en tant que réponse
          res.download(filePath);
        } else {
          // Si le fichier n'existe pas, envoyer une réponse avec un code 404
          res.status(404).send("Fichier introuvable");
        }
      });

      router.get('/get-thumbnail/:filename', async (req, res) => {
        try {
            const filename = req.params.filename;
            const doc = await docsModel.findOne({ 'file.filename': filename });
    
            if (!doc) {
                return res.status(404).send('Document not found');
            }
    
           
            const Path = path.join(__dirname, `../public/docs/${filename}`);
           
            const options = {
                density: 100,           // Output image quality
                saveFilename: 'thumbnail',   // File name of the result image
                savePath: '../public/thumbnails',    // Output directory for the result image
                format: "png",          // Output image format
                width: 600,             // Width of the result image
                height: 600,            // Height of the result image
                pages: "1"              // Page number(s) to convert (first page)
            };
    
            const instance = fromPath(Path, options);
            instance.bulk()
            .then(result=>{
                res.json(result);
            })
            .catch(err=>console.log(err));
        } catch (error) {
            console.error('Error generating thumbnail:', error);
            res.status(500).send('Error generating thumbnail');
        }
    });
module.exports = router;