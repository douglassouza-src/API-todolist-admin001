import { randomUUID } from 'crypto'

export interface RecadosCreateModelDTO {
  description: string
  detail: string
}

export interface RecadoUpdateDTO {
  description: string
  detail: string
  check: boolean
}

export interface RecadoDataBaseDTO {
  id: string
  description: string
  detail: string
  check: boolean
}

export class Recado {
  private _id: string
  private _description: string
  private _detail: string
  private _check: boolean

  constructor (params: RecadosCreateModelDTO) {
    this._id = randomUUID()
    this._detail = params.detail
    this._description = params.description
    this._check = false
  }

  public get id () {
    return this._id
  }

  public get detail () {
    return this._detail
  }

  public get description () {
    return this._description
  }

  public get check () {
    return this._check
  }

  handleProperties () {
    return {
      id: this._id,
      description: this._description,
      detail: this._detail,
      check: this._check
    }
  }

  editarRecado (params: RecadoUpdateDTO) {
    if (params.detail) this._detail = params.detail

    if (params.description) this._description = params.description

    if (params.check) this._check = params.check

    if (!params.check) this._check = params.check
  }

  static criarRecadoBD (params: RecadoDataBaseDTO): Recado {
    const recado = new Recado({
      detail: params.detail,
      description: params.description
    })

    recado._id = params.id
    recado._check = params.check

    return recado
  }
}
