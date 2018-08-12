const mongoose = require('mongoose')

const url = 'mongodb://fstakkaaja:<salasanapuuttuu>@ds219532.mlab.com:19532/fstackkanta'

if (process.argv.length != 2 && process.argv.length != 4) {
    console.log("Kokeile joko ilman parametreja tai antamalla nimi ja puhelinnumero")
    console.log('Esim. node mongo.js')
    console.log('tai')
    console.log("node mongo.js 'Erkki Esimerkki' 123-45678")
    return
}

mongoose.connect(url, { useNewUrlParser: true })


const Person = mongoose.model('Person', {
    name: String,
    number: String,
})



const listPersons = () => {
    console.log('Puhelinluettelo:')
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, ' ', person.number)
            })
            mongoose.connection.close()
        })
}

const savePerson = (person) => {
    person
        .save()
        .then(result => {
            console.log(person,' talletettu')
            mongoose.connection.close()
        })
}


if (process.argv.length === 2) {
    listPersons()
    return
}

person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

savePerson(person)