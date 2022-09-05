const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
         
        const token = await user.generateAuthToken()
      const cookiesOption= res.cookie('jwt', token);


        // res.send({ user, token ,cookiesOption})

    res.json("logged in successfully")

    } catch (error) {
        // res.status(400,).send(error)
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