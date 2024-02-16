const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

function verifyToken(req, res, next) {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        // If access token is not present, proceed to verification of refresh token
        return verification_access_token(req, res, next);
    }

    jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err.message);
            return res.status(401).json({ error: "Token is invalid or expired" });
        }
        console.log("Token verified");
        req.email = decoded.email;
        next();
    });
}

// Function to verify the refresh token and generate a new access token
function verification_access_token(req, res, next) {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
        // If refresh token is not provided, send an error response
        return res.status(401).json({ Valide: false, message: "Refresh token not provided" });
    }

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) {
            // If refresh token doesn't match, send an error response
            return res.status(401).json({ Valide: false, message: "Refresh token doesn't match ERROR!!!!" });
        }
        
        // If refresh token is valid, generate a new access token
        const access_token = jwt.sign({ email: decoded.email }, process.env.ACCESS_TOKEN, { expiresIn: '1m' });
        res.cookie("access_token", access_token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60000 });
        next(); // Call next to proceed to the next middleware
    });
}

module.exports = verifyToken;
