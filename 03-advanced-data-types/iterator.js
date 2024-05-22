const array = [1, 2, 3, 4, 5];

// Como um iterator funciona
function Iterator(array) {
	let nextIndex = 0;
	return {
		next: function() {
			if (nextIndex < array.length) {
				return {
					value: array[nextIndex++],
					done: false,
				};
			} else {
				return {
					value: undefined,
					done: true,
				};
			}
		},
	}
}

const customIterator = Iterator(array);

console.log('CUSTOM ITERATOR')
console.log(customIterator.next()); // { value: 1, done: false }
console.log(customIterator.next()); // { value: 2, done: false }
console.log(customIterator.next()); // { value: 3, done: false }
console.log(customIterator.next()); // { value: 4, done: false }
console.log(customIterator.next()); // { value: 5, done: false }
console.log(customIterator.next()); // { value: undefined, done: true }

console.log('SYMBOL ITERATOR')

const symbolIterator = array[Symbol.iterator]();

console.log(symbolIterator.next()); // { value: 1, done: false }
console.log(symbolIterator.next()); // { value: 2, done: false }
console.log(symbolIterator.next()); // { value: 3, done: false }
console.log(symbolIterator.next()); // { value: 4, done: false }
console.log(symbolIterator.next()); // { value: 5, done: false }
console.log(symbolIterator.next()); // { value: undefined, done: true }