const mongoose = require('mongoose')

const url = 'mongodb://fstakkaaja:<salasana<@ds219532.mlab.com:19532/fstackkanta'

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
})

personSchema.statics.format = function(person) {
    console.log('statics format: ', person)
    return { name: person.name, number: person.number, id: person._id } 
};


const Person = mongoose.model('Person', personSchema)



module.exports = Person
