// Importing all the dependencies needed
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Init the app using cors and express json parser
const app = express()
app.use(cors())
app.use(express.json())

// Init the application port
const port = process.env.PORT || 5000

const url = process.env.ATLAS_URL

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const { connection } = mongoose

connection.once('open', () => {
    console.log('MongoDB db connection is ok')
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// Starting the server
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})