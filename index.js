// Env:
require('dotenv').config()
const { PORT } = process.env

const compression = require('compression')
const express = require('express')
const app = express()
const fs = require('fs')

let defaultLayout

// Attempt to cache the default layout
try {
  defaultLayout = JSON.parse(fs.readFileSync(`layouts/default.json`, `utf8`))
} catch (error) {
  console.error(`ERROR: Default layout is missing or malformed.`)
  process.exit(1)
}

app.use(compression())
app.use(`/layout`, express.static(`layouts`)) // Serve all layouts from `/layout route`

app.get('/', (req, res) =>
  res.send(
    `<h1>Firefox Newtab Layout Service</h1><p>Status: <strong>NORMAL</strong></p>`
  )
)

// Fall back to default layout
app.use(function (req, res, next) {
  res.status(203) // "non-authoritative information"
  res.json(defaultLayout)
})

app.listen(PORT, () =>
  console.log(`Firefox Newtab Layout Service\n\nListening on port: ${PORT}`)
)
