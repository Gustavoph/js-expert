const { error } = require('../src/constants')
const File = require('../src/File')
const { rejects, deepStrictEqual } = require('assert')

;(async () => {
  {
    const filePath = './../files/EmptyFileInvalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './../files/FourItemsInvalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './../files/ThreeItemsValid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "id": 123,
        "name": "Gustavo",
        "profession": "Javascript Profession",
        "birthDay": 2002
      },
      {
        "id": 321,
        "name": "Maryanna",
        "profession": "Java Profession",
        "birthDay": 2005
      },
      {
        "id": 456,
        "name": "Giovanna",
        "profession": "Python Profession",
        "birthDay": 2002
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
