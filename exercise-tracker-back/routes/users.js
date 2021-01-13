const router = require('express').Router()
const User = require('../models/user.model')
const errorHandlig = require('../errorHandling')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => errorHandlig(err, res))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new User({ username })

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => errorHandlig(err, res))
})

module.exports = router