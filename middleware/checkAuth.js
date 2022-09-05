const User = require('../models/User')
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
           res.json({ message: 'please login and try again' });
        }
        const verify = await jwt.verify(token,process.env.JWT_KEY);
        
        req.user = await User.findById(verify.id);
        next();

    } catch (error) {
    //    return next(error); 
    {res.json("wrong user please login")}
    }
}

module.exports = isAuthenticated;