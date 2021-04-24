const env = process.env.NODE_ENV || 'development'

const config = require('./config/config')[env]
const express = require('express')
const indexRouter = require('./routes')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(config.dataBaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} ,(err) => {
    if (err) {
        console.error('error', err)
        throw err
    }

    console.log('Data base is connected');
})

require('./config/express')(app)

app.use('/', indexRouter)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`))