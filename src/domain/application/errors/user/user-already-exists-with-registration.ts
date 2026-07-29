export class UserAlreadyExistsWithRegistrationError extends Error {
  constructor() {
    super('Já existe usuário com a matrícula informada.')
  }
}
