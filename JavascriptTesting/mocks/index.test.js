const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("node:assert");

(async () => {
  {
    const filePath = './files/emptyFileInvalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './files/fourItemsInvalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './files/threeItemsValid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "name": "Gustavo Oliveira",
        "id": 1,
        "profession": "Javascript Developer",
        "age": 21
      },
      {
        "name": "Erick Wendel",
        "id": 2,
        "profession": "Javascript Instructor",
        "age": 25
      },
      {
        "name": "Joãozinho",
        "id": 3,
        "profession": "Javascript Specialist",
        "age": 30
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
