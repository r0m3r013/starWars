const mongoose = require('mongoose')
const Schema = mongoose.Schema

let requestSchema = new Schema({
  requestAPI: { type: Object },
  request: { type: Object },
  response: { type: Object },
  responseAPI: { type: Object },
  timestamp: { type: Date, default: new Date().getTime() }
})

module.exports = mongoose.model('RequestSW', requestSchema)
