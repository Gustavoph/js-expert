import path from 'path'

import { writeFile } from 'fs/promises'
import { faker, simpleFaker }  from '@faker-js/faker'

import { Car, Category, Customer } from '../../entities/index.js'

const seederBaseFolder = path.join(path.resolve(), 'src/', 'infra/', 'database')
console.log(path.resolve())
const ITEMS_AMOUNT = 2

const category = new Category({
  id: simpleFaker.string.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: simpleFaker.string.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })

  const customer = new Customer({
    id: simpleFaker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 50 })
  })

  customers.push(customer)
  category.carIds.push(car.id)
  cars.push(car)
}

const write = (filename, data) => writeFile(path.join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  console.log(cars, category, customers)
  await write('cars.json', cars)
  await write('category.json', [category])
  await write('customers.json', customers)
})()
