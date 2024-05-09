import { readFile } from 'node:fs/promises'
import { exeptions } from './exceptions.js'

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

export class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf-8')
    
    const validation = this.isValid(content)
    if (!validation.valid) throw new Error(validation.error)

    return this.parseCSVToJSON(content)
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [headers, ...content] = csvString.split(/\r?\n/)

    const isValidHeaders = headers === options.fields.join(',')
    if (!isValidHeaders) {
      return {
        error: exeptions.FILE_FIELDS,
        valid: false
      }
    }

    if (!content.length || content.length > options.maxLines) {
      return {
        error: exeptions.FILE_LENGTH,
        valid: false
      }
    }

    return {
      valid: true
    }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)
    const firstLine = lines.shift()
    const header = firstLine.split(',')

    const users = lines.map(line => {
      const columns = line.split(',')
      let user = {}

      for (const index in columns) {
        user[header[index]] = columns[index].trim()
      }

      return user
    })

    return users
  }
}