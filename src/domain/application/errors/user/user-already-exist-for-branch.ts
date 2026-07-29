export class UsersAlreadyExistForBranchError extends Error {
  constructor() {
    super('Existem usuários associados a filial.')
  }
}
