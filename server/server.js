/* eslint-disable import/no-duplicates */
import express from 'express'
import path from 'path'
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import cookieParser from 'cookie-parser'
import Html from '../client/html'

let connections = []

const port = process.env.PORT || 8080
const server = express()
const { readFile, writeFile, unlink } = require('fs').promises

server.use(cors())

const setHeaders = (req, res, next) => {
  res.set('x-skillcrucial-user', '8cea9b3b-6342-4330-bb7b-f85683547fa6')
  res.set('Access-Control-Expose-Headers', 'X-SKILLCRUCIAL-USER')
  next()
}
server.use(setHeaders)

server.use(express.static(path.resolve(__dirname, '../dist/assets')))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

server.use(cookieParser())

const saveFile = async (users) => {
  const result = await writeFile(`${__dirname}/test.json`, JSON.stringify(users, 1, 2), {
    encoding: 'utf8'
  })
  return result
}

const readfile = async () => {
  const result = await readFile(`${__dirname}/test.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .catch(async () => {
      const { data: users } = await axios('https://jsonplaceholder.typicode.com/users')
      await saveFile(users)
      return users
    })
  return result
}

server.get('/api/v1/users', async (req, res) => {
  const users = await readfile()
  res.json(users)
})

server.post('/api/v1/users', async (req, res) => {
  const users = await readfile()
  const userId = users.reduce((acc, rec) => Math.max(rec.id), 0) + 1
  const newUser = { id: userId, ...req.body }
  await saveFile([...users, newUser])
  res.json({ status: 'success', id: newUser.id })
})

server.patch('/api/v1/users/:userId', async (req, res) => {
  const users = await readfile()
  const { userId } = req.params
  const newUser = req.body
  const result = users.map((user) => (user.id === +userId ? Object.assign(user, newUser) : user))
  await saveFile(result)
  res.json({ status: 'success', id: +userId })
})

server.delete('/api/v1/users/:userId', async (req, res) => {
  const users = await readfile()
  const { userId } = req.params
  const usersDelete = users.filter((item) => item.id !== +userId)
  await saveFile(usersDelete)
  res.json({ status: 'success', id: +userId })
})

server.delete('/api/v1/users/', (req, res) => {
  unlink(`${__dirname}/test.json`)
  res.json()
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const echo = sockjs.createServer()
echo.on('connection', (conn) => {
  connections.push(conn)
  conn.on('data', async () => {})
  conn.on('close', () => {
    connections = connections.filter((c) => c.readyState !== 3)
  })
})

server.get('/', (req, res) => {
  // const body = renderToString(<Root />);
  const title = 'Server side Rendering'
  res.send(
    Html({
      body: '',
      title
    })
  )
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

echo.installHandlers(app, { prefix: '/ws' })

// eslint-disable-next-line no-console
console.log(`Serving at http://localhost:${port}`)
