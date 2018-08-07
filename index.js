const express = require('express')
const app = express()

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
 
app.get('/api/persons', (req, res) => {
    res.json(catalogue)
 })
 

const port=3001
app.listen(port, ()  => {
  console.log('running')  
})