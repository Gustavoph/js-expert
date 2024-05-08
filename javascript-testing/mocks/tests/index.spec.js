import assert from 'node:assert'
import { fileURLToPath } from 'url'
import path from 'node:path' 

import { File } from '../src/file.js'
import { exeptions } from '../src/exceptions.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

;(async () => {
  {
    const filePath = path.resolve(__dirname, './mocks/invalid-size-empty.csv')

    const expected = new Error(exeptions.FILE_LENGTH)
    const result = File.csvToJSON(filePath)

    await assert.rejects(result, expected)
  }

  {
    const filePath = path.resolve(__dirname, './mocks/invalid-header.csv')

    const expected = new Error(exeptions.FILE_FIELDS)
    const result = File.csvToJSON(filePath)

    await assert.rejects(result, expected)
  }

  {
    const filePath = path.resolve(__dirname, './mocks/invalid-size-longer.csv')

    const expected = new Error(exeptions.FILE_LENGTH)
    const result = File.csvToJSON(filePath)

    await assert.rejects(result, expected)
  }

  {
    const filePath = path.resolve(__dirname, './mocks/valid.csv')

    const expected = [
      {
        id: '1',
        name: "Gustavo",
        profession: "Node Developer",
        age: '22'
      },
      {
        id: '2',
        name: "Lucas",
        profession: "React Native Developer",
        age: '23'
      },
      {
        id: '3',
        name: "Daniel",
        profession: "PHP Developer",
        age: '24'
      }
    ]
    const result = await File.csvToJSON(filePath)

    assert.deepEqual(result, expected)
  }
})()