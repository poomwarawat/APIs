const router = require('express').Router();
const User = require('../model/user');
const {registerValidation} = require('../validate');


router.post('/register',  async (req, res) =>{
    //Validate data before we a user
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })

    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send("Email already exist")
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router