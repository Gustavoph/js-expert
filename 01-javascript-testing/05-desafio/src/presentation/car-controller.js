import events from 'node:events'

export class CarController {
  constructor({ carService }) {
    this.carService = carService
  }

  async rent(request, response) {
    try {
      const data = JSON.parse(await events.once(request, 'data'))
      console.log(data)
      // const result = await this.carService.rent(customer, category, numberOfDays)

      response.writeHead(200)
      return response.end('ok')
    } catch (error) {
      response.writeHead(500)
      return response.end('Internal Server error')
    }
  }
}