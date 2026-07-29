export class UserAlreadyExistsForCardError extends Error {
  constructor() {
    super('Existe uma carteirinha associada ao usuário.')
  }
}
