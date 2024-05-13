import { carControllerFactory } from '../factories/car-controller-factory.js'

export const routes = {
  '/rent:post': (request, response) => 
      carControllerFactory().rent(request, response),
  default: (request, response) => {
    response.writeHead(404)
    return response.end('Not Found.')
  },
}
