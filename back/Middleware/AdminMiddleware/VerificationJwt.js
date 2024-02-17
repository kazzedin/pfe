require('dotenv').config();
const jwt=require('jsonwebtoken');
const cookie = require('cookie-parser');


function verifyToken(req, res, next) {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        if (refrech_access_token(req, res)) {
            next();
        } else {
            return res.status(401).json({ Valide:false,message: "NON REFRESHING" });
        }
    } else {
        jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                
                return res.json({ Valide:false ,message: "Token is invalid or expired" });
            }
            else{
                console.log("Token verified");
                req.email = decoded.email;
                next();
            }
            
        });
    }
}


// la fonction qui va faire le refresh de access token
function refrech_access_token(req, res) {
    const refresh_token = req.cookies.refresh_token;
    let refresh=false;
    if (!refresh_token) {
       return res.json({Valide:false,message: 'Refresh token dont exist '})
      
    } else {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                
                return res.json({ Valide:false ,message: "Token is invalid or expired" });
            }
            else{
                const access_token=jwt.sign({email:decoded.email},process.env.ACCESS_TOKEN,{expiresIn:'1m'})
                res.cookie("access_token", access_token, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'strict' });
                refresh=true;
             }
            
        });
    }
    return refresh;
}


module.exports=verifyToken;    