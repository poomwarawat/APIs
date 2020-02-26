const jwt = require('jsonwebtoken');

module.exports = function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token) return res.status(400).send('Access Denied')

    try{
        const verifyed = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verifyed
        next()
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}