export class ProjectNotExistsError extends Error {
  constructor() {
    super('Projeto não existe')
  }
}
