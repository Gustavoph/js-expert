import assert from 'node:assert'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function *main() {
  yield 'Hello'
  yield '-'
  yield 'World'
  yield *calculation(20, 10)
}

const generator = main()
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log('Array.from', Array.from(main()))
console.log('Spread operator',[...main()])

async function* systemInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }
}

;(async () => {
  for await (item of systemInfo()) {
    console.log('for await', item)
  }
})

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

Promise.all([...promisified()])
  .then(result => console.log(result))

;(async () => {
  for await (item of promisified) {
    console.log('for await', item.toString())
  }
})
