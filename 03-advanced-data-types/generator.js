function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = myGenerator();

console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

function* fibonacciGenerator() {
  let current = 0;
  let next = 1;

  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

// Create an instance of the Fibonacci generator
const fibonacci = fibonacciGenerator();

// Generate the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci.next().value);
}