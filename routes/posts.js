const router = require('express').Router();
const verifyToekn = require('./verifyToken');



router.get('/', verifyToekn, (req,res) =>{
    res.send(req.user)
})

module.exports = router