const express = require('express');
const app = express()

//import Routes
const authRoute = require('./routes/auth');

//route middlewares
app.use('/api/user', authRoute)
app.listen(3000, () => console.log("Server's running"))