import { Base } from './base.js'

export class Customer extends Base {
  constructor({ id, name, age }) {
    super({ id, name })

    this.age = age
  }
}
