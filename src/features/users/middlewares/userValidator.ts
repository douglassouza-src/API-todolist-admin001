import { type Request, type Response, type NextFunction } from 'express'
import { buscarUsuariosDB } from '../../../db/users'
import { type ResponseAPI } from '../../responseAPI'

export const userValidator = (request: Request, response: Response, next: NextFunction) => {
  const { userID } = request.params

  const listaUsers = buscarUsuariosDB()

  const user = listaUsers.find((e) => e.id === userID)

  if (!user) {
    const resposta: ResponseAPI = {
      success: false,
      message: 'usuario nao encontrado',
      data: null
    }

    return response.status(400).json(resposta)
  }

  next()
}
