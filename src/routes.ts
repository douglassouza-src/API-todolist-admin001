import express, { type Response, type Request, type Application } from 'express'
import { recadosRouter } from './features/recados/recados.routes'
import { userRoutes } from './features/users/users.routes'

export const routesApp = (app: Application) => {
  const router = express.Router()

  app.use('/', router)
  router.get('/', (request: Request, response: Response) =>
    response.status(200).send('API OK')
  )

  userRoutes(router)
  recadosRouter(router)
}
