import { type Request, type Response } from 'express'
import { buscarUsuariosDB, salvarUsuariosBD } from '../../../db/users'
import { User } from '../../../models/user'
import { type ResponseAPI } from '../../responseAPI'

export class UserController {
  cadastrarUser (request: Request, response: Response) {
    try {
      const { name, email, password } = request.body

      const listaUsers = buscarUsuariosDB()

      const user = new User({ name, email, password })

      listaUsers.push(user)

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'user criado com sucesso',
        data: user.handleProperties()
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: error.message,
        data: null
      }

      return response.status(400).json(resposta)
    }
  }

  listarUsers (request: Request, response: Response) {
    try {
      const listaUsers = buscarUsuariosDB()

      const resposta: ResponseAPI = {
        success: true,
        message: 'buscadoss com sucesso',
        data: listaUsers.map((user) => user.handleProperties())
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: error.message,
        data: null
      }

      return response.status(400).json(resposta)
    }
  }

  buscarUser (request: Request, response: Response) {
    try {
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const user = listaUsers.find((user) => user.id === userID)

      const resposta: ResponseAPI = {
        success: true,
        message: 'usuario encontrado',
        data: user?.handleProperties()
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: 'usuario nao encontrado',
        data: null
      }

      return response.status(400).json(resposta)
    }
  }

  excluirUsuario (request: Request, response: Response) {
    try {
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      listaUsers.splice(indexUser, 1)

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'excluido com sucesso',
        data: listaUsers.map((user) => user.handleProperties())
      }

      return response.status(200).json(resposta)
    } catch (error: any) {
      const resposta: ResponseAPI = {
        success: false,
        message: 'usuario nao encontrado',
        data: null
      }

      return response.status(400).json(resposta)
    }
  }
}
