const mongoose = require('mongoose')

const url = 'mongodb://fstakkaaja:salaTstac3@ds219532.mlab.com:19532/fstackkanta'

mongoose.connect(url, { useNewUrlParser: true })


const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})

module.exports = Person
