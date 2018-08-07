const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

let catalogue = [
    { name: 'Eka Nimi',
      number: '040-12345',
      id: 1
    },
    { name: 'Toka Nimi',
      number: '040-123456',
      id: 2
    },
    { name: 'Kolmas Nimi',
      number: '040-1234567',
      id: 3
    },
    { name: 'Neljäs Nimi',
      number: '040-1234',
      id: 4
    },
    { name: 'Viides Nimi',
      number: '040-1234586',
      id: 5
    },
    { name: 'Kuudes Nimi',
      number: '060-1234586',
      id: 6
    },
]

app.get('/info', (req, res) => {
    res.send('<div>Puhelinluettolossa on ' + catalogue.length + ' henkilön tiedot</div>' +
              '<div>' + new Date()+ '</div>')
 })
 
app.get('/api/persons/:id', (req, res) => {
   const id = Number(req.params.id)
   const person = catalogue.find(person => person.id === id)
   console.log('Found person ', person)
   if (person) {
       res.json(person)
   } else {
       res.status(404).end()
   }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    catalogue = catalogue.filter(person => person.id !== id)
    res.json(person)
    res.status(204).end()
 })

 app.post('/api/persons/', (req, res) => {
  const newperson = req.body
  console.log('Tuli ', req.body)
 
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

  console.log('Adding person ', newperson)


  do {
    var id = (Math.random()*100000).toFixed()
  } while(catalogue.find(person => person.id === id))

  newperson.id = id
  catalogue.push(newperson)
  res.json(newperson)
})

app.get('/api/persons', (req, res) => {
    res.json(catalogue)
 })
 

const port=3001
app.listen(port, ()  => {
  console.log('running')  
})