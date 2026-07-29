export class TagNotExistsError extends Error {
  constructor() {
    super('Tag não existe')
  }
}
