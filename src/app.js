import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'

import config from './config'
import appRouter from './routes'
import * as middlewares from './middlewares'

// variables port, used by server
const SERVER_PORT = config.server.port

// the app object is created by calling express() function exported by the Express module
let app = express()

app
  .use(morgan('dev'))
  .use(helmet())
  .use(compression())
  // parse body params and attach them to req.body
  .use(json())
  .use(urlencoded({ extended: true }))
  // enable CORS - Cross Origin Resource Sharing
  .use(cors())

// mount routes
app.use('/api', appRouter)

app
  // error-handling route
  .use(middlewares.pageNotFound())
  // mount error-handling middleware last
  .use(middlewares.errorHandler())

app.listen(SERVER_PORT, err => {
  if (err) throw err
  console.log(`Server is up on port: ${SERVER_PORT}`)
})

export default app
