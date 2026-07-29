export class UserNotEligibleForTrainingError extends Error {
  constructor() {
    super('Usuário não elegível para o(s) treinamento(s).')
  }
}
