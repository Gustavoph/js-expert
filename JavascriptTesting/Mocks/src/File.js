const { readFile } = require('fs/promises')
const { join } = require('path')

const User = require('./User')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    if (!validation.valid) throw new Error(validation.error)
    const users = File.parseCSVToJSON(content)
    return users
  }

  static async getFileContent(filePath) {
    const fileName = join(__dirname, filePath)
    return (await readFile(fileName)).toString('utf-8')
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString
      .split('\n')
      .filter(line => line.length > 0)

    const isHeaderValid = header === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const fileHasInformation = fileWithoutHeader.length > 0
    const fileLinesSmallerThanLimit = fileWithoutHeader.length <= options.maxLines

    const isContentLengthAccepted = (
      fileHasInformation &&
      fileLinesSmallerThanLimit
    )
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n').filter(line => line.length > 0)
    const firstLine = lines.shift()
    const header = firstLine.split(',')
    const users = lines.map(line => {
      const columns = line.split(',')
      let user = {}
      for (const index in columns) {
        user[header[index]] = columns[index]
      }
      return new User(user)
    })

    return users
  }
}

// (async () => {
//   // const result = await File.csvToJson('./../files/InvalidHeader.csv');
//   // const result = await File.csvToJson('./../files/FourItemsInvalid.csv');
//   const result = await File.csvToJson('./../files/ThreeItemsValid.csv');
//   console.log("Result >>", result);
// })()

module.exports = File
