import { type Router } from 'express'
import { UserController } from './controllers/user.controller'
import { newUserEmailValidator, userValidator } from './middlewares'

export const userRoutes = (router: Router) => {
  const userController = new UserController()

  router.post('/user',
    newUserEmailValidator,
    userController.cadastrarUser)

  router.get('/user/:userID',
    userValidator,
    userController.buscarUser)

  router.get('/users',
    userController.listarUsers
  )

  router.delete('/user/:userID',
    userValidator,
    userController.excluirUsuario
  )
}
