import { writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const database = path.join(__dirname, '..', 'database.json')

export const save = async (data) => {
  const currentData = JSON.parse(await readFile(database))
  currentData.push(data)

  await writeFile(database, JSON.stringify(currentData))
}
