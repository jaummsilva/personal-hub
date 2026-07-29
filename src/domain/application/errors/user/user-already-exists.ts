export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Já existe usuário com o email informado.')
  }
}
