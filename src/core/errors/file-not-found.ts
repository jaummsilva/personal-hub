export class FileNotFoundError extends Error {
  constructor() {
    super('Arquivo/Foto não encontrado.')
  }
}
