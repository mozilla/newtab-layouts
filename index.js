// Env:
require('dotenv').config()
const { PORT } = process.env

const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
app.use(express.static('layouts'))

app.get('/', (req, res) => res.send('<h1>Firefox Newtab Layout Service</h1><p>Status: <strong>NORMAL</strong></p>'))

app.listen(PORT, () => console.log(`Firefox Newtab Layout Service\n\nListening on port: ${PORT}`))
