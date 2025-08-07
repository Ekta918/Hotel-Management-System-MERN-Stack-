const mongoose = require('mongoose');

var mongoURL = Your connection string

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})

connection.on('connected', ()=>{
    console.log('Mongo DB connection successfully')
})

module.exports = mongoose
