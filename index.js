const express = require('express');
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import Routes
const authRoute = require('./routes/auth');


dotenv.config()

//connect to DB
mongoose.connect( process.env.DB_CONNECT, { useUnifiedTopology: true }, () => 
    console.log("Connect to Database"))

//middlewares
app.use(express.json())

//route middlewares
app.use('/api/user', authRoute)
app.listen(3000, () => console.log("Server's running"))