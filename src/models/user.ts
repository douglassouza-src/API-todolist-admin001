import { randomUUID } from 'crypto'
import { Recado } from './recados'

export interface UserCreatModelDTO {
  name: string
  email: string
  password: string
}

export interface UserDataBaseDTO {
  id: string
  name: string
  email: string
  password: string
  recados: Array<Recado>
}

export class User {
  private _id: string
  private _password: string
  private _nome: string
  private _email: string
  private _recados: Array<Recado>

  constructor (params: UserCreatModelDTO) {
    this._id = randomUUID()
    this._password = params.password
    this._nome = params.name
    this._email = params.email
    this._recados = []
  }

  public get id () {
    return this._id
  }

  public get name () {
    return this._nome
  }

  public get email () {
    return this._email
  }

  public get recados () {
    return this._recados
  }

  public get password () {
    return this._password
  }

  handleProperties () {
    return {
      id: this.id,
      name: this.name,
      email: this._email,
      password: this._password,
      recados: this._recados.map((recado) => recado.handleProperties())
    }
  }

  excluirRecado (index: number) {
    this._recados.splice(index, 1)
  }

  static criarUsuarioBD (params: UserDataBaseDTO) {
    const usuario = new User({
      name: params.name,
      email: params.email,
      password: params.password
    })
    usuario._id = params.id
    usuario._recados = params.recados.map((recado) => Recado.criarRecadoBD(recado))

    return usuario
  }
}
