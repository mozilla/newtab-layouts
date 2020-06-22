const assert = require('assert')
const fs = require('fs')
const Ajv = require('ajv')
const chai = require('chai')
const expect = require('chai').expect

chai.use(require('chai-json'))

// Set up AJV for JSON validation
let ajv = new Ajv({allErrors: true})

// TODO : Pull from file
let schema = {
  "properties": {
    "spocs": { "type": "string" },
    "layout": { "type": "number", "maximum": 3 }
  }
};

let validate = ajv.compile(schema)

// Injest array of layouts paths:

let layoutFilenames = []
let layoutContents = {}
let allPathsRead = false
let dir = fs.opendirSync(`./layouts`)

while (!allPathsRead) {
  let entry = dir.readSync();

  if (entry) {
    layoutFilenames.push(entry.name)
  } else {
    allPathsRead = true;
  }
}

dir.closeSync()

layoutFilenames.sort(); // Paths are read in non-alphabetical order

// Construct array of layout file contents

layoutFilenames.forEach((path) => {
  const contents = fs.readFileSync(`./layouts/${path}`, `utf8`)
  layoutContents[path.split(`.`)[0]] = contents
})

// Run tests
describe('Layouts', () => {
  it('Should be a JSON file', () => {
    layoutFilenames.forEach((filename) => {
      expect(`./layouts/${filename}`).to.be.a.jsonFile()
    })
  })
})
