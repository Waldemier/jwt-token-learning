const User = require('../models/user.schema')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const registerValidators = require('../validations/register.validation')
const loginValidators = require('../validations/login.validation')
const jwt = require('jsonwebtoken')

const router = require('express').Router();

router.post('/login', loginValidators, async (request, response) => {

    const errors = validationResult(request)

    if(!errors.isEmpty()) {
        return response.status(400).send(errors.array()[0].msg)
    } 

    try {
        
        const user = await User.findOne({ email: request.body.email })
        if(!user) return response.status(401).send("Wrong email. Try again.")
        
        const passwordValidate = await bcrypt.compare(request.body.password, user.password)
        if(!passwordValidate) return response.status(401).send("Password is wrong. Try again.")
        
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET) //third parameter is options (it will be expires for example)

        response.setHeader('authorization-token', token) //set token into request headers
        response.status(200).send("You are successfully signed!")

    } catch (error) {
        response.status(500).send(error)
    }
})


router.post('/registration', registerValidators, async (request, response) => {

    const errors = validationResult(request)

    if(!errors.isEmpty()) {
        return response.status(400).send(errors.array()[0].msg)
    } 

    try {

        const userExists = await User.findOne({ email: request.body.email })
        if(userExists) return response.status(422).send("This email already exists.")
        
        const salt = await bcrypt.genSalt(10) // additional hashing to main hashing
        const hashedPassword = await bcrypt.hash(request.body.password, salt)

        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword
        })

        await user.save()
        response.status(200).send("User was created!")

    } catch (error) {
        response.status(500).send(error)
    }
})


module.exports = router;