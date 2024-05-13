{
  // Tipo valor
  // Gera uma copia em memória
  let counter1 = 0
  let counter2 = counter1
  counter2++

  console.log('counter 1:', counter1)
  console.log('counter 2:', counter2)
}

{
  // Tipo refenrência
  // Copia um endereço de memória, apontando para o mesmo valor
  let item1 = { counter: 0 }
  let item2 = item1
  item2.counter++

  console.log('counter 1:', item1.counter)
  console.log('counter 2:', item1.counter)
}