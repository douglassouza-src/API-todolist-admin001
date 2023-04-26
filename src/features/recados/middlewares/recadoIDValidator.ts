import { type Request, type Response, type NextFunction } from 'express'
import { buscarUsuariosDB } from '../../../db/users'
import { type ResponseAPI } from '../../responseAPI'

export const recadoIDValidator = (request: Request, response: Response, next: NextFunction) => {
  const { userID, recadoID } = request.params

  const listaUsers = buscarUsuariosDB()

  const user = listaUsers.find((e) => e.id === userID)

  const existRecado = user?.recados.some((recado) => recado.id === recadoID)

  if (!existRecado) {
    const resposta: ResponseAPI = {
      success: false,
      message: 'Recado com ID inválida',
      data: null
    }
    return response.status(400).json(resposta)
  }

  next()
}
