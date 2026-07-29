export class UserAlreadyExistsForRoleError extends Error {
  constructor() {
    super('Existe usuários associados ao perfil de acesso.')
  }
}
