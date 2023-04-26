import { type Request, type Response } from 'express'
import { buscarUsuariosDB, salvarUsuariosBD } from '../../../db/users'
import { Recado } from '../../../models/recados'
import { type ResponseAPI } from '../../responseAPI'

export class RecadosController {
  buscarRecados (request: Request, response: Response) {
    try {
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const recados = listaUsers[indexUser].recados.filter((e) => {
        if (!e.check) {
          return e
        }
        return false
      })

      const resposta: ResponseAPI = {
        success: true,
        message: 'Recados buscados',
        data: recados.map((e) => e.handleProperties())
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

  buscarRecadoporChave (request: Request, response: Response) {
    try {
      const { userID, key } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const recados = listaUsers[indexUser].recados.filter((e) => {
        if (e.description.toLocaleLowerCase().includes(key.toLocaleLowerCase())) {
          return e
        }

        if (e.detail.toLocaleLowerCase().includes(key.toLocaleLowerCase())) {
          return e
        }
        return false
      })

      const resposta: ResponseAPI = {
        success: true,
        message: 'Buscado com sucesso',
        data: recados.map((e) => e.handleProperties())
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

  buscarRecadosArquivados (request: Request, response: Response) {
    try {
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const recados = listaUsers[indexUser].recados.filter((e) => {
        if (e.check) {
          return e
        }
        return false
      })

      const resposta: ResponseAPI = {
        success: true,
        message: 'Recados Arquivados Buscados',
        data: recados.map((e) => e.handleProperties())
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

  cadastrarRecado (request: Request, response: Response) {
    try {
      const { detail, description } = request.body
      const { userID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const novoRecado = new Recado({ detail, description })

      listaUsers[indexUser].recados.push(novoRecado)

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'Recados cadastrado com sucesso',
        data: novoRecado.handleProperties()
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

  editarRecado (request: Request, response: Response) {
    try {
      const { userID, recadoID } = request.params
      const { description, detail, check } = request.body

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const indexRecado = listaUsers[indexUser].recados.findIndex((recado) => recado.id === recadoID)

      listaUsers[indexUser].recados[indexRecado].editarRecado({ description, detail, check })

      salvarUsuariosBD(listaUsers)

      const recadoAtualizado = listaUsers[indexUser].recados[indexRecado]

      const resposta: ResponseAPI = {
        success: true,
        message: 'Atualizado com sucesso',
        data: { id: recadoAtualizado.id, changes: { description, detail, check } }
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

  excluirRecado (request: Request, response: Response) {
    try {
      const { userID, recadoID } = request.params

      const listaUsers = buscarUsuariosDB()

      const indexUser = listaUsers.findIndex((user) => user.id === userID)

      const indexRecado = listaUsers[indexUser].recados.findIndex((recado) => recado.id === recadoID)

      const recadoDelete = listaUsers[indexUser].recados[indexRecado]

      listaUsers[indexUser].excluirRecado(indexRecado)

      salvarUsuariosBD(listaUsers)

      const resposta: ResponseAPI = {
        success: true,
        message: 'Excluido com sucesso',
        data: recadoDelete.id
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
}
