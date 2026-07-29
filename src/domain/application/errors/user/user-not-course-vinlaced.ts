export class UserNotCourseVinlacedError extends Error {
  constructor() {
    super('Curso informado não está vinculado ao usuário.')
  }
}
