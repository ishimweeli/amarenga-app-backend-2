const User = require('../models/user')
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            const message="please try and login again"
       return next(message)
        }
        const verify = await jwt.verify(token,process.env.JWT_KEY);
        
        req.user = await User.findById(verify.id);
        next();

    } catch (error) {
       return next(error); 
    // const err="wrong user please login"
    // return err
    }
}

module.exports = isAuthenticated;