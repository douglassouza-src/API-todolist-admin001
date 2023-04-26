import express from 'express'
import cors from 'cors'
import { routesApp } from './routes'

const allowerOrigins = ['*']

export const options: cors.CorsOptions = {
  origin: allowerOrigins
}

const app = express()
app.use(cors())
app.use(express.json())
const port = '8080'

routesApp(app)

app.listen(port, () => { console.log('server running') })
