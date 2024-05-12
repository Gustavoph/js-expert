import { BaseRepository } from '../repositories/base.js'
import { Tax } from '../entities/tax.js'
import { Transaction } from '../entities/transaction.js'

export class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge()

    this.currencyFormat = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(Math.random() * (listLength))
  }
  chooseRandomCar(category) {
    const randomCarIndex = this.getRandomPositionFromArray(category.carIds)
    const carId = category.carIds[randomCarIndex]

    return carId
  }
  async getAvailableCar(category) {
    const carId = this.chooseRandomCar(category)
    const car = await this.carRepository.find(carId)

    return car
  }

  calculateFinalPrice(customer, category, numberOfDays) {
    const { age } = customer

    const price = category.price
    const { then: tax } = this.taxesBasedOnAge
      .find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price) * numberOfDays)
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
  }

  async rent(customer, category, numberOfDays) {
    const car = await this.getAvailableCar(category)
    const finalPrice = this.calculateFinalPrice(customer, category, numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = { year: 'numeric', month: 'long', 'day': 'numeric' }
    const dueDate = today.toLocaleDateString('pt-br', options)

    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate
    })

    return transaction
  }
}
