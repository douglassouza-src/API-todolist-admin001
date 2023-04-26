import { type Request, type Response, type NextFunction } from 'express'
import { type ResponseAPI } from '../../responseAPI'

export const newRecadoValidator = (request: Request, response: Response, next: NextFunction) => {
  const { detail, description } = request.body

  if (!detail || !description) {
    const resposta: ResponseAPI = {
      success: false,
      message: 'Campos obrigatórios',
      data: null
    }
    return response.status(400).json(resposta)
  }

  next()
}
