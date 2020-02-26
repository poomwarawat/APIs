const express = require('express');
const app = express()
const mongoose = require('mongoose');


//connect to DB
mongoose.connect(
    'mongodb+srv://poom:poomwarawat@cluster0-abnio.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
    () => console.log("Connect to Database"))

//import Routes
const authRoute = require('./routes/auth');

//route middlewares
app.use('/api/user', authRoute)
app.listen(3000, () => console.log("Server's running"))