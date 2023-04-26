import { type Router } from 'express'
import { userValidator } from '../users/middlewares'
import { RecadosController } from './controllers/recados.controller'
import { newRecadoValidator, recadoIDValidator } from './middlewares'

export const recadosRouter = (router: Router) => {
  const recadosController = new RecadosController()

  router.get('/user/:userID/recados',
    userValidator,
    recadosController.buscarRecados
  )

  router.get('/user/:userID/arquivados',
    userValidator,
    recadosController.buscarRecadosArquivados
  )

  router.post('/user/:userID/novorecado',
    userValidator,
    newRecadoValidator,
    recadosController.cadastrarRecado
  )

  router.get('/user/:userID/buscaporchave/:key',
    userValidator,
    recadosController.buscarRecadoporChave
  )

  router.put('/user/:userID/:recadoID',
    userValidator,
    recadoIDValidator,
    newRecadoValidator,
    recadosController.editarRecado
  )

  router.delete('/user/:userID/:recadoID',
    userValidator,
    recadoIDValidator,
    recadosController.excluirRecado
  )
}
