require('dotenv').config();
const jwt=require('jsonwebtoken');
const cookie = require('cookie-parser');


function verifyToken(req, res, next) {
    const access_token = req.cookies.admin_access_token;
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
                
                req.email = decoded.email;
                req.password =decoded.password;
                next();
            }
            
        });
    }
}



// la fonction qui va faire le refresh de access token
function refrech_access_token(req, res) {
    const refresh_token = req.cookies.admin_refresh_token;
    let refresh=false;
    if (!refresh_token) {
       return res.json({Valide:false,message: 'Refresh token dont exist '})
      
    } else {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                
                return res.json({ Valide:false ,message: "Token is invalid or expired" });
            }
            else{
                const admin_access_token=jwt.sign({email:decoded.email},process.env.ACCESS_TOKEN,{expiresIn:'20m'})
                res.cookie("admin_access_token", admin_access_token, { maxAge: 1200000, httpOnly: true, secure: true, sameSite: 'strict' });
                req.email=decoded.email;
                req.password=decoded.password;
                refresh=true;
             }
            
        });
    }
    return refresh;
}


module.exports=verifyToken;    