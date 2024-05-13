import { routes } from './routes.js'

export function handler(request, response) {
  const { url, method } = request

  const routeKey = `${url}:${method}`.toLowerCase()
  const choosen = routes[routeKey] || routes.default

  return choosen(request, response)
}