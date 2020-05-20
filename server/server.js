import express from 'express'
import path from 'path'
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import Root from '../client/config/root'

import Html from '../client/html'

let connections = []

const port = process.env.PORT || 8090
const server = express()
const { readFile, writeFile, unlink } = require('fs').promises

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

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
// const middleware = [
//   cors(),
//   express.static(path.resolve(__dirname, '../dist/assets')),
//   bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
//   bodyParser.json({ limit: '50mb', extended: true }),
//   cookieParser()
// ]

middleware.forEach((it) => server.use(it))

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

// server.get('/', (req, res) => {
//   const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
//   res.write(htmlStart)
//   appStream.pipe(res, { end: false })
//   appStream.on('end', () => {
//     res.write(htmlEnd)
//     res.end()
//   })
// })
const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
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
