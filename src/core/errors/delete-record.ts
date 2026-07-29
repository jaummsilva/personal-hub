export class DeleteRecordError extends Error {
  constructor() {
    super('Não foi possível excluir o registro.')
  }
}
