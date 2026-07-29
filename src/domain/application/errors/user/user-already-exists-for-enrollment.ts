export class UserAlreadyExistsForEnrollmentError extends Error {
  constructor() {
    super('Existe uma inscrição associada ao usuário.')
  }
}
