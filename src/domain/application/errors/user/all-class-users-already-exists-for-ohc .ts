export class AllClassUsersAlreadyExistsForCertificateError extends Error {
  constructor() {
    super('Todos os usuários da turma já possuem um certificado associado.')
  }
}
