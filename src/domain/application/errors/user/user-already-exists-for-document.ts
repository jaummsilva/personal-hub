export class UserAlreadyExistsForDocumentError extends Error {
  constructor() {
    super('Existe documentos associados a este usuário')
  }
}
