const mongoose = require('mongoose')
let Request = mongoose.model('RequestSW')
const api = require('axios')
const url = 'https://swapi.co/api/'

let saveRequest = (req, reqAPI, res, resAPI) => {
    let star = new Request({
        request: req,
        requestAPI: reqAPI,
        response: res,
        responseAPI: resAPI
    })
    star.save((err) => {
        if (err) return console.log('Err', err.message)
        console.log('Request saved')
    })
}

let findRequest = (req, res) => {
    Request.find((err, star) => {
        if (err) res.send(500, err.message)
        res.status(200).jsonp(star)
    })
}

let findStarWars = (req, res) => {
    let reqAPI = url + req.query.type + '/?search=' + encodeURI(req.query.name)
    console.log("Peticion: ", reqAPI)
    api.get(reqAPI)
        .then(response => {
            let resAPI = {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                method: response.request.method,
                data: response.data
            }
            saveRequest(req.query, reqAPI, response.data.results, resAPI)
            res.status(200).jsonp(response.data)
        })
        .catch(err => {
            console.log('Error find: ', err)
        })
}

module.exports = {
    saveRequest,
    findRequest,
    findStarWars
}