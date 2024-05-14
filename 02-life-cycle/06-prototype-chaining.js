const assert = require('node:assert')

const obj = {}
const arr = []
const fn = () => {}

// internamente, objetos literais viram funções explicitas
console.log('new Object() is {}', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia de objeto que possui as propriedades nele
console.log(obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log(arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log(fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

console.log(obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

class T1 {
  ping() {
    return 'ping'
  }
}

class T2 extends T1 {
  pong() {
    return 'pong'
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot'
  }
}

const t3 = new T3()
console.log('T3', t3.__proto__.__proto__.__proto__.__proto__.__proto__)
