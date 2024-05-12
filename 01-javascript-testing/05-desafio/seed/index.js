import { fa, faker } from '@faker-js/faker';
import path from 'node:path'
import { writeFile } from 'fs/promises'

import { fileURLToPath } from 'node:url';

import { Car } from '../src/entities/car.js'
import { Category } from '../src/entities/category.js'
import { Customer } from '../src/entities/customer.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seederBaseFolder = path.join(__dirname, '..', 'database')

const ITENS_AMOUNT = 2

const category = new Category({
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for(let index = 0; index < ITENS_AMOUNT; index++) {
  const car = new Car({
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })

  category.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    age: faker.number.int({ min: 18, max: 50 })
  })

  customers.push(customer)
}

const write = (filename, data) => 
  writeFile(path.join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write('cars.json', cars)
  await write('categories.json', [category])
  await write('customers.json', customers)
})()