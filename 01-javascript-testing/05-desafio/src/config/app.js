import { createServer } from 'node:http'
import { handler } from './handler.js'

const PORT = 3333
const app = createServer(handler)

app.listen(PORT, () => {
  console.log(`App running at port:${PORT}`)
})