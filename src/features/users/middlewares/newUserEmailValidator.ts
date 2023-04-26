import { type Request, type Response, type NextFunction } from 'express'
import { buscarUsuariosDB } from '../../../db/users'
import { type ResponseAPI } from '../../responseAPI'

export const newUserEmailValidator = (request: Request, response: Response, next: NextFunction) => {
  const { email } = request.body

  const listaUsers = buscarUsuariosDB()

  if (listaUsers.some((user) => user.email === email)) {
    const resposta: ResponseAPI = {
      success: false,
      message: 'email ja cadastrado',
      data: null
    }

    return response.status(400).json(resposta)
  }

  next()
}
