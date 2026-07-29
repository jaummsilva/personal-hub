export class UserAlreadyExistsForCertificateError extends Error {
  constructor() {
    super('Existe um certificado associado ao usuário.')
  }
}
