import path from 'node:path'
import { before, beforeEach, afterEach, describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { Transaction } from '../../src/entities/transaction.js'

import validCar  from '../mock/validCar.json' assert { type: 'json' }
import validCategory  from '../mock/validCategory.json' assert { type: 'json' }
import validCustomer  from '../mock/validCustomer.json' assert { type: 'json' }

import { CarService } from '../../src/service/carService.js'

const carsDatabase = path.join(path.resolve(), 'src/infra/database', 'cars.json')

const mocks = { validCar, validCategory, validCustomer }

describe('CarService Suite Tests', () => {
  let carService = {}
  let sandbox = {}

  before(() => {
    carService = new CarService({ cars: carsDatabase })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it ('should retrieve a random position from an array', () => {
    const data = [0 , 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)
    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it ('should choose the first id from carIds in category', () => {
    const category = mocks.validCategory
    const carIdIndex = 0

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(category)
    const expected = category.carIds[0]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it ('given a category it should return an available car!', async () => {
    const car = mocks.validCar
    const category = Object.create(mocks.validCategory)
    category.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(category)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })

  it ('given a category, customer and numberOfDays ut should calculate final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50

    const category = Object.create(mocks.validCategory)
    category.price = 37.6

    sandbox.stub(
      carService,
      'taxesBasedOnAge'
    ).get(() => [{ from: 40, to: 50, then: 1.3 }])

    const numberOfDays = 5
    const expected = carService.currencyFormat.format(244.40)
    const result = carService.calculateFinalPrice(
      customer, category, numberOfDays
    )

    expect(result).to.be.deep.equal(expected)
  })

  it ('given a customer and a car category it should return a transaction receipt', async () => {
    const car = mocks.validCar
    const category = {
      ...mocks.validCategory,
      price: 37.6,
      carIds: [car.id]
    }

    const customer = Object.create(mocks.validCustomer)
    customer.age = 20

    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'

    const today = new Date()
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    const now = new Date(2020, 10, 5)
    sandbox.useFakeTimers(now.getTime())


    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    const expectedAmount = carService.currencyFormat.format(206.80)
    const result = await carService.rent(customer, category, numberOfDays)

    const expected = new Transaction({
      customer, car, amount: expectedAmount, dueDate
    })

    expect(result).to.be.deep.equal(expected)
  })
})
