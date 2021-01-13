const router = require('express').Router()
const Exercise = require('../models/exercise.model')
const errorHandling = require('../errorHandling')

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({ username, description, duration, date })

    newExercise.save()
        .then(() => res.json('Exercise added'))
        .catch(err => errorHandling(err, res))
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => errorHandling(err, res))
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => errorHandling(err, res))
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username || exercise.username
            exercise.description = req.body.description || exercise.description
            exercise.duration = Number(req.body.duration) || exercise.duration
            exercise.date = Date.parse(req.body.date) || exercise.date

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => errorHandling(err, res))    
        })
        .catch(err => errorHandling(err, res))
})

module.exports = router