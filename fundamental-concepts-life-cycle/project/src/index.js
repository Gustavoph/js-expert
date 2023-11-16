import database from './database.json' assert { type: "json" };
import { Person } from './person.js';
import { TerminalController } from './terminalController.js';
import { save } from './repository.js'

const DEFALT_LANG = 'pt-BR'
const STOP_TERM = ':q'
const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFALT_LANG)

async function main() {
  try {
    const answer = await terminalController.question()
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('Process finished!')
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFALT_LANG))
    save(person)
    return main()
  } catch (err) {}
}

await main()
