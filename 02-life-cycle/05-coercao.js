/*
 Conversão de um valor para outro tipo
   - pode ser convertido para 3 tipos, string, number ou boolean
  - coerção implicita, quando usamos sinal de soma, loose equality operator (==)
  - coerção explicita, usando parseInt, parseFloat, entre outros
*/

/* 
  Conversão implicita
  - o compilador do js converte os valores para poder
  executar a operação, ao invés de quebrar, como exemplo
  ao invés de gerar uma exception ao somar um numero com
  um boolean ele converte o boolean para poder executar
  o calculo, o que acaba gerando comportamentos bizarros
  na plataforma
*/
{
  console.log(true + 2) // 3
  console.log(true - 2) // -1
  console.log('21' - true) // 20
  console.log(0.1 + 0.2 === 0.3) // false
  console.log(9999999999999999) // 10000000000000000
  console.log('B' + 'a' + + 'a' + 'a') // BaNaNa
}

/*
 Coerção explicita
 - Prefira conversões explicitas, usando o strict equality operator
 - strict equality (valida o valor e o tipo)
 - loose equality (valida somente o valor)
*/
{
  console.log('1' == 1) // true
  console.log('1' === 1) // false
}

{
  console.assert(('hello' || 123) === 'hello', '|| retorna o primeiro elemento')
  console.assert(('hello' && 123) === 123, '|| retorna o ultimo elemento')
}

// ----------------------
/*
  - Quando tentamos converter um objeto ele acaba fazendo chamadas para verificar
  se existe uma implementação para ele de forma primitiva.
  - Se tentamos conveter um objeto para um número, ele chama a função valueOf
  - Se tentamos converter para uma string, ele chama o toString
  - Porém existe uma metódo que substitui o compostamento dos dois, implementando
  tanto a chamada para a string quando para o number ou boolean
*/


const user = {
  name: 'Gustavo',
  age: 25,

  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },

  valueOf() {
    return this.age
  },

  [Symbol.toPrimitive](coercionType) {
    if (coercionType === 'string') {
      return `Name: ${this.name}, Age: ${this.age}, New!`
    }

    if (coercionType === 'number') {
      return this.age + 10
    }
  }
}

// implicitamente tentando converter para um number (chama o valueOf)
console.log(Number(user)) 

// implicitamente está tentando converter para uma string (chama o toString)
console.log(''.concat(user))

// Para data ele tenta chamar o default (boolean)
console.log(new Date(user))