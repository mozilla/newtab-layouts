const assert = require('assert')
const fs = require('fs')
const Ajv = require('ajv')

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

let layoutPaths = []
let layoutContents = {}
let allPathsRead = false
let dir = fs.opendirSync(`./layouts`)

while (!allPathsRead) {
  let entry = dir.readSync();

  if (entry) {
    layoutPaths.push(entry.name)
  } else {
    allPathsRead = true;
  }
}

layoutPaths.sort(); // Paths are read in non-alphabetical order

// Construct array of layout file contents

layoutPaths.forEach((path) => {
  const contents = fs.readFileSync(`./layouts/${path}`, `utf8`)
  layoutContents[path.split(`.`)[0]] = contents
})

// Run tests
describe('Layouts', () => {
  it('Should be parseable JSON', () => {
    // TODO - Parse all layouts & return meaningful failures

    let validateJSON = (jsonString, layoutID) => {
      let parseResult = `${layoutID} - `
      let isValidJSON = true

      try {
        JSON.parse(jsonString)
      } catch (error) {
        parseResult = error
        isValidJSON = false
      }

      assert(isValidJSON, layoutID)
    }

    validateJSON(layoutContents.default, `default`)
    validateJSON(layoutContents.collection, `collection`)

  })
})
