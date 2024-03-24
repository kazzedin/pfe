const express = require('express');
const router = express.Router();
const { messageModel } = require('../Db/Message');
require('dotenv').config();
const multer = require('multer'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator');
const verifyToken =require('../Middleware/EncadreurMiddleware/VerificationJwt')
const generateReference = require('../Middleware/EncadreurMiddleware/generateurRef')
const cookieParser=require('cookie-parser');
const nodemailer = require('nodemailer');
const {etudiantModel} = require('../Db/Acteurs/Etudiant')
const {encadreurModel} = require('../Db/Acteurs/Encadreur')
const { docsModel } =require('../Db/Docs')
const {dateModel} =require('../Db/Date')
const {pfeModel} = require('../Db/Pfe')
const path = require('path');
const fs = require('fs');
const pdfThumbnail = require('pdf-thumbnail');
const {fromPath} = require("pdf2pic");

router.use(cookieParser());

const options = {
    density: 100,           // Densité en DPI (plus la densité est élevée, meilleure sera la qualité)
    saveFilename: "thumbnail",   // Nom du fichier de sortie (sans extension)
    savePath: "public/thumbnails", // Répertoire où les miniatures seront sauvegardées
    format: "jpeg",         // Format de l'image de sortie (jpeg, png)
    size: "600x600"         // Taille de l'image de sortie (largeur x hauteur)
};
const converter = fromPath(options);

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

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/docs'); // Répertoire où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname); // Extraire l'extension du fichier
      const filename = path.basename(file.originalname, extension); // Extraire le nom du fichier sans l'extension
      cb(null, `${filename}${extension}`); // Nom de fichier unique avec l'extension d'origine et le timestamp
    }
  });

const upload2=multer({storage: storage2})


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user:process.env.ADMIN_EMAIL,
      pass:process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

//route de login de l'encadreur
  router.post('/login-prf',[
    check("email","Please enter a valid email address").isEmail()
  ],(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if (errors.isEmpty()) {  
        encadreurModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            const prf_access_token = jwt.sign({ email: user.email,password:password }, process.env.PRF_ACCESS_TOKEN, { expiresIn: '20m' });
                            const prf_refresh_token = jwt.sign({ email: user.email,password:password  }, process.env.PRF_REFRESH_TOKEN, { expiresIn: '1h' });
                            res.cookie("prf_access_token", prf_access_token, { maxAge: 1200000, httpOnly: true, secure: true, sameSite: 'strict' });
                            res.cookie("prf_refresh_token", prf_refresh_token, { maxAge: 60000000, httpOnly: true, secure: true, sameSite: 'strict' }); 
                            console.log(req.cookies.prf_refresh_token);
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



//route pour check les inforamtions de login
router.get('/check',verifyToken,(req,res)=>{
    res.json({Valide:true,User_Email:req.email,User_Password:req.password});
})  

router.get('/profile/:EncadreurUserEmail',async (req,res)=>{
  try {
    const { EncadreurUserEmail } = req.params;

    // Recherche de l'étudiant par son adresse e-mail
    const user = await encadreurModel.findOne({ email: EncadreurUserEmail });

    if (user) {
        // Si l'utilisateur est trouvé, récupérez les informations du thème s'il est associé à un thème
        if (user.theme) {
            // Recherche du thème associé à l'utilisateur
            const theme = await pfeModel.findById(user.theme);
            if (theme) {
                // Si le thème est trouvé, incluez le titre du thème dans les informations de réponse
                const userInfo = {
                    'nom/prenom': user.nomPrenom,
                    section: user.section,
                    filier: user.filier,
                    theme: theme.titre,
                    id:user._id // Récupération du titre du thème
                    
                };
                res.json({ image: user.photo_profile, status: user.etat_cnx, info: userInfo });
            } else {
                res.json({ message: "Thème non trouvé" });
            }
        } else {
            // Si l'utilisateur n'est associé à aucun thème, renvoyez les informations de base
            const userInfo = {
                'nom/prenom': user.nomPrenom,
                section: user.section,
                filier: user.filier,
                theme: null,
                id:user._id
               
            };
            res.json({ image: user.photo_profile, status: user.etat_cnx, info: userInfo });
        }
    } else {
        res.json({ message: "Utilisateur non trouvé" });
    }
} catch (error) {
    console.error("Une erreur s'est produite lors de la recherche de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
}
})

router.put('/changeEtat/:EncadreurUserEmail',(req,res)=>{
  const {EncadreurUserEmail}=req.params;
  const {state}=req.body;
  console.log(state);
  encadreurModel.findOneAndUpdate({email:EncadreurUserEmail},{$set:{etat_cnx:state}})
  .then(user=>{
      if(user){
          res.json({message:'success'})
      }else{
          res.json({message:'failed'})
      }
  })
  .catch(err=>console.log(err)) ;
  })

  router.put('/changePhoto/:EncadreurUserEmail', upload.single('image'), (req, res) => {
    const { EncadreurUserEmail } = req.params;
    const image = req.file.filename;
     // Remplacer les contre-obliques par des barres obliques
    encadreurModel.findOneAndUpdate({ email: EncadreurUserEmail }, {
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

router.get('/logout', (req, res) => {
  res.clearCookie('prf_access_token');
  res.clearCookie('prf_refresh_token');
  res.json({response:true});
  })

  router.put('/changement-info/:EncadreurUserEmail',[
    check("nvemail","Please enter a valid email address").isEmail(),
    // Ajouter une vérification pour le mot de passe
    check('nvpwd', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const { EncadreurUserEmail } = req.params;
    const { nvemail, nvpwd } = req.body;
    console.log(nvemail, nvpwd)
    // Vérifier s'il y a des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        
    }

    try {
        // Hacher le nouveau mot de passe
        const hashedPwd = await bcrypt.hash(nvpwd, 10);
        
        // Mettre à jour le document MongoDB avec le nouveau mot de passe et le nouvel email
        const updatedUser = await encadreurModel.findOneAndUpdate(
            { email: EncadreurUserEmail },
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

router.get('/getUser/:EncadreurUserEmail',(req,res)=>{
  const {EncadreurUserEmail}=req.params
  encadreurModel.findOne({email:EncadreurUserEmail})
  .then(response=>{
      res.json({image:response.photo_profile,status:response.etat_cnx});
  })
  .catch(err=>console.log(err))
})


router.post('/propose_theme', upload2.single('file'), async (req, res) => {
  try {
    const { buffer, mimetype, originalname } = req.file;
    const { email, titre, experties, domaine, description, type, nomPrenom } = req.body;
    let newPfe;
    const ref = generateReference();

    const existingPfe = await pfeModel.findOne({
      titre: titre,
      reference: ref,
    });

    // Si un document avec les mêmes attributs existe déjà, renvoyez une réponse indiquant l'échec de l'ajout
    if (existingPfe) {
      return res.json({ message: 'Un thème avec le même titre existe déjà. Vérifiez vos informations.' });
    }

    const user = await encadreurModel.findOne({ email: email });

    if (user) {
       newPfe = new pfeModel({
        titre: titre,
        description: description,
        experties: experties,
        type: type,
        domain: domaine,
        reference: ref,
        encadreur: user._id,
        info: {
          nomPrenom: nomPrenom,
          email: email,
        },
        file: {
          data: buffer,
          contentType: mimetype,
          filename: originalname
        }
      });

      await newPfe.save();

      // Ajouter l'ID du nouveau thème à la liste des thèmes de l'encadreur
      user.themes.push(newPfe._id);
      await user.save();
    } 

    res.status(201).json({ message: 'success', newPfe: newPfe });
  } catch (error) {
    console.error('Erreur lors du téléchargement du document :', error);
    res.status(500).json({ message: 'error' });
  }
});



router.get('/get-pfes',(req,res)=>{
  pfeModel.find()
  .then(result=>res.json(result))
  .catch(err=>console.log(err));
})

router.delete('/delete-pfe/:EncadreurUserEmail/:id',async(req,res)=>{
  const  {EncadreurUserEmail,id}=req.params;
 
  try {
    // Supprimer le thème de la collection PFE
    await pfeModel.findByIdAndDelete(id);

    // Mettre à jour l'encadreur pour supprimer l'ID du thème
    await encadreurModel.findOneAndUpdate({email:EncadreurUserEmail}, { $pull: { themes: id } });

    res.json({ message: 'success' });
  } catch (error) {
    console.error('Erreur lors de la suppression du thème :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du thème.' });
  }
 
})

router.get('/get-theme-enc/:EncadreurUserEmail',(req, res)=>{
  const {EncadreurUserEmail}=req.params;
  encadreurModel.findOne({email:EncadreurUserEmail})
  .then(enc=>{
    if(enc){
      pfeModel.findById({_id:enc.themes})
      .then(pfe=>{
        if(pfe){
          res.json(pfe.titre)
        }else{
          res.json({message:'pas de theme pour ce encadreur'})
        }
      })
      .catch(err=>console.log(err));
    }else{
      res.json({message:'encadreur non trouver'})
    }
  })
  .catch(err=>console.log(err))
})
module.exports = router;   