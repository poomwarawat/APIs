const router = require('express').Router();
const User = require('../model/user');
const {registerValidation ,loginValidation} = require('../validate');
const bcrypt = require('bcryptjs');

router.post('/register',  async (req, res) =>{
    //Validate data before we a user
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    })

    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send("Email already exist")


    try{
        const savedUser = await user.save()
        res.send({ user : user._id})
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req,res) =>{
    const { error } = loginValidation(req.body)
    
    if(error) return res.status(400).send(error.details[0].message)

    //check if email exist
    const user = await User.findOne({ email : req.body.email})
    if(!user) return res.status(400).send("Email not found")

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Invalid Password") 

    res.send('Login success')
})

module.exports = router