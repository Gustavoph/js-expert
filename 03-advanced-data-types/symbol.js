// sempre unico em endereço de memória
const unique = Symbol('name')

const user = {}

user["name"] = 'value for normal objects'
user[unique] = 'value for symbol'

console.log(user.name)

// não acessa o mesmo endereço de memoria
// mesmo tendo o mesmo valor
console.log(user[Symbol('name')])
console.log(user[unique])

console.log(Object.getOwnPropertySymbols(user))

const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

console.log(Array.from(obj))

const kItems = Symbol('kItems')

class CustomDate {
  constructor(...args) {
    this[kItems] = args.map(args => new Date(...args))
  }

  [Symbol.toPrimitive](type) {
    if (type !== 'string') throw new TypeError()
    
    const items = this[kItems]
      .map(item => {
        return new Intl.DateTimeFormat('pt-BR', { 
          month: 'long', 
          day: '2-digit', 
          year: 'numeric' 
        }).format(item)
      })

      return new Intl.ListFormat('pt-BR', {
        style: 'long',
        type: 'conjunction'
      }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return 'what ?'
  }
}

const dates = new CustomDate(
  [2020, 3, 1],
  [2018, 2, 1]
)

console.log(String(dates))
console.log(Object.prototype.toString.call(dates))
console.log([...dates])
;(async () => {
  for await (const item of dates) {
    console.log(item)
  }
})()

;(async () => {
  const results = await Promise.all([...dates])
  console.log(results)
})()