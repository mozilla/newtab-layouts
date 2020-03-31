// Env:
require('dotenv').config()
const { PORT } = process.env

const express = require('express')
const app = express()

app.use(express.static('layouts'))

app.get('/', (req, res) => res.send('Firefox Newtab Layout Service'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
