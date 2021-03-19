const { body } = require('express-validator')

module.exports = [
    body('name').isLength({min: 4}),
    body('email').isEmail(), 
    body('password').isLength({min: 6, max: 121})
]