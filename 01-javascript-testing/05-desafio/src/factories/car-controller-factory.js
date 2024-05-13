import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { CarService } from '../services/car-service.js'
import { CarController } from '../presentation/car-controller.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carsDb = path.join(__dirname, '..', '..', 'database', 'cars.json')

export function carControllerFactory() {
  const carService = new CarService({ cars: carsDb })
  return new CarController(carService)
}

