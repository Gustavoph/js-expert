import { Base } from './base.js'

export class Category extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name })

    this.carIds = carIds
    this.price = price
  }
}