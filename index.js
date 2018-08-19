const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const morgan = require('morgan')
//app.use(morgan('tiny'))
morgan.token('reqbody', (req,res) => JSON.stringify(req.body) )
app.use(morgan(':method :url :reqbody :status :res[content-length] - :response-time ms'))

const Person = require('./models/person')

app.get('/info', (req, res) => {
  Person
    .countDocuments({})
    .then(result => {
      res.send('<div>Puhelinluettolossa on ' + result + ' henkilön tiedot</div>' +
               '<div>' + new Date()+ '</div>')
    })
    .catch(error => {
      res.send('<div>Counting produce error: ' + error + '</div>')
    })
})
 
app.get('/api/persons/:id', (req, res) => {
   const id = Number(req.params.id)
   
  Person
    .findById(id)
    .then(person => {
      res.json(person)
    })
    .catch(
       res.status(404).end()
    )
})

app.delete('/api/persons/:id', (req, res) => {
    Person
      .findByIdAndRemove(req.params.id)
      .then(result=>res.status(204).end())
      .catch(error=>res.status(400).send({error: 'Error in id'}))
 })


app.put('/api/persons/:id', (req, res) => {
  const updateperson = req.body
  console.log('Got request: ', req)
  Person
    .findByIdAndUpdate(req.params.id, updateperson, {new: true})
    .then(person => {
      console.log('putted: ', Person.format(person)) 
      res.json(Person.format(person))
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({error: 'Error in id'})
    })
})

app.post('/api/persons/', (req, res) => {
  // Kloonataan json-olio, koska morgan tulostaa
  // req.bodyn vasta tämän routen loputtua, ja
  // routessa lisätään olioon id-kenttä
  const newperson = Object.assign({},req.body)
  
  // Tarkista, että data sisältää nimen ja numeron
  if (newperson.name === undefined) {
    return res.status(400).json({error: 'Name missing'})  
  }
  if (newperson.number === undefined) {
    return res.status(400).json({error: 'Number missing'})  
  }

  // Tarkista, onko nimi jo luettelossa
  if (catalogue.find(person => person.name === newperson.name)) {
    return res.status(400).json({error: 'Name already exists in the catalogue'})
  }

  let dbperson = new Person({
    name: newperson.name,
    number: newperson.number
  })

  dbperson
  .save()
  .then(person => {
    console.log('saved ', Person.format(person))
    res.json(Person.format(person))
  })
  .catch(error => {
    console.log('Add person: ', error)
  })
})

app.get('/api/persons', (req, res) => {
  console.log('Finding persons')
  Person
      .find({})
      .then(persons => {
          console.log('Persons found in DB')
          console.log(persons.map(Person.format))
          res.json(persons.map(Person.format))
      })
      .catch(error => {
        console.log('Get persons: ', error)
      }) 
 })
 

const port=process.env.PORT || 3001
app.listen(port, ()  => {
  console.log('running')  
})