export class UserNotHasCoursesError extends Error {
  constructor() {
    super('Usuário não possui cursos vinculados.')
  }
}
