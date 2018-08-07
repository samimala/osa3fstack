const express = require('express')
const app = express()

let catalogue = [
    { name: 'Eka Nimi',
      number: 040-12345,
      id: 1
    },
    { name: 'Toka Nimi',
      number: 040-123456,
      id: 2
    },
    { name: 'Kolmas Nimi',
      number: 040-1234567,
      id: 3
    },
    { name: 'Neljäs Nimi',
      number: 040-1234,
      id: 4
    },
    { name: 'Viides Nimi',
      number: 040-1234586,
      id: 5
    },
    { name: 'Kuudes Nimi',
      number: 060-1234586,
      id: 6
    },
]

app.get('/', (req, res) => {
    res.send('<h1>Hittojako täällä, mene apin alle</h1>')
 })
 
app.get('/api', (req, res) => {
   res.send('<h1>Hittojako täällä, kokeile vielä person</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(catalogue)
 })
 

const port=3001
app.listen(port, ()  => {
  console.log('running')  
})