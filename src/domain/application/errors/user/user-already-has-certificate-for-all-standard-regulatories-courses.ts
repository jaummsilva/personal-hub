export class UserAlreadyHasCertificateForAllStandardRegulatoriesCoursesError extends Error {
  constructor() {
    super('O usuário já possui um certificado para todos os cursos da NR.')
  }
}
