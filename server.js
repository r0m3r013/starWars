const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const RequestSW = require('./models/request')

const routes = require('./routes/router')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('app'))
app.use(routes)

mongoose.connect('mongodb://127.0.0.1:27017/RequestSW', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log('ERROR: connecting to DataBase. ', err)
    }
    app.listen(3000, () => {
        console.log('Node server runing on http://localhost:3000')
    })
})