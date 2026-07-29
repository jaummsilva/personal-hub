export class CategoryAlreadyExistsForCodeError extends Error {
  constructor() {
    super('Existe uma categoria com o mesmo código')
  }
}
