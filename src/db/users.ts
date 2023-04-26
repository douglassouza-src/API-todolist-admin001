import fs from 'fs'
import { User } from '../models/user'

// eslint-disable-next-line n/no-path-concat
const local = 'db.json'

export function buscarUsuariosDB (): User[] {
  const conteudo = fs.readFileSync(local)

  const listaJSON = JSON.parse(
    conteudo.toString()
  ) as User[]

  return listaJSON.map((user) => User.criarUsuarioBD(user))
}

export function salvarUsuariosBD (lista: User[]) {
  fs.writeFileSync(
    local,
    JSON.stringify(lista.map((user) => user.handleProperties())))
}
