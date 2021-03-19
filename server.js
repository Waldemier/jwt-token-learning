const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authentication.rout')
const mainRoute = require('./routes/main.rout')
require('dotenv').config()

const app = express();

//for parsing json in req.body
app.use(express.json());

app.use('/api/main', mainRoute)
app.use('/api/user', authRoute)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
    if(error) {
        throw new Error("Connection failed")
    }
    console.info("Successful connection to the db")
})

app.listen(process.env.PORT, error => {
    if(error) {
        throw new Error("There was a problem with the server")
    }
    console.info(`Server is up on port ${process.env.PORT}`)
})