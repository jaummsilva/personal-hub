export class UserPasswordRequiredError extends Error {
  constructor() {
    super('Na criação do usuário é necessário informar a senha.')
  }
}
