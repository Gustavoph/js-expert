const http = require('node:http')
const events = require('node:events')

const USER = {
  name: 'Gustavo',
  password: '123456Ab'
}

const PORT = 3333

const toLower = (text) => text.toLowerCase()

const routes = {
  '/login:post': async (req, res) => {
    const data = JSON.parse(await events.once(req, 'data'))
    
    if (
      toLower(USER.name) !== toLower(data.name) || 
      toLower(USER.password) !== toLower(data.password)
    ) {
      res.writeHead(401)
      res.end('Loggin failed!')
      return
    }

    return res.end('Login succeeded')
  },
  '/contact:get':  (req, res) => {
    res.write('Contact us page')
    return res.end()
  },
  default (req, res) {
    res.writeHead(404)
    res.write('Page not found')
    return res.end()
  }
}

function handler(req, res) {
  const { url, method } = req

  const routeKey = `${url}:${method}`.toLowerCase()
  const chosen = routes[routeKey] || routes.default

  return chosen(req, res)
}

const app = http.createServer(handler)

app.listen(PORT, () => {
  console.log(`Server running at: ${PORT}`)
})

module.exports = app 