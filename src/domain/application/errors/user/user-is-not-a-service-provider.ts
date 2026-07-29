export class UserIsNotAServiceProviderError extends Error {
  constructor() {
    super('O usuário não é um prestador de serviço.')
  }
}
