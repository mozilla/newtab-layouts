var assert = require('assert')
var Ajv = require('ajv')

// Set up AJV for JSON validation
var ajv = new Ajv({allErrors: true})

// TODO : Pull from file
var schema = {
  "properties": {
    "foo": { "type": "string" },
    "bar": { "type": "number", "maximum": 3 }
  }
};

var validate = ajv.compile(schema)

// TODO : pull array of layouts




// Run tests
describe('Layouts', () => {
  it('Should be parseable JSON', () => {
    var jsonString = `{"foo":1}`
    var parseResult
    var isValidJSON = true

    try {
      JSON.parse(jsonString)
    } catch (error) {
      parseResult = error
      isValidJSON = false
    }

    assert(isValidJSON, parseResult)
  })
})
