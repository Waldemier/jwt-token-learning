const jwt = require('jsonwebtoken')
const User = require('../models/user.schema')

module.exports = async function(request, response, next) {

    const token = request.header('authorization-token')
    if(!token) response.status(401).send("Access denied.")

    try {

        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id })
        request.user = user

        next()

    } catch (error) {
        response.status(500).send("Invalid token")
    }
}