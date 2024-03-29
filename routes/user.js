const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/users/register', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
         res.status(401).json({message: "check email and password", status: 401})
    }
})

router.post('/users/login', async(req, res) => {
  
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            res.status(400).json({message: "check email and password", status: 400})
        }
         console.log("hello")
        const token = await user.generateAuthToken()
        
      //  window={};
      //   window.localStorage.setItem("jwt", token)
        return res
    .cookie("jwt", token)
    
   
    
    .json({ message: "Logged in successfully 😊 👌" , jwt:token});
   
  

      

    // res.json("logged in successfully")

    } catch (error) {
        res.status(401).json({message: "check email and password", status: 401})
        console.log(error)
       
    }

})

router.get('/user/logout', async (req, res) => {

  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    
  });
 
  res.status(200).json({ status: 'successfully logged out', data: null });
});


module.exports = router