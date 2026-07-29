export class CategoryNotExistsError extends Error {
  constructor() {
    super('Categoria não encontrada.')
  }
}
