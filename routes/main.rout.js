//logged middleware import
const loggedMiddleware = require('../middlewares/logged.middleware');

const router = require('express').Router();

router.get('/', loggedMiddleware, (request, response) => {

    response.setHeader('Content-Type', 'application/json');

    response.status(200).send({
        page: "main",
        status: "logged",
        name: request.user.name
    })
})

module.exports = router;