export class UserAlreadyExistsWithCpfError extends Error {
  constructor() {
    super('Já existe usuário com o cpf informado.')
  }
}
