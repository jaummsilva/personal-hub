export class AllClassUsersAlreadyExistsForEnrollmentError extends Error {
  constructor() {
    super(
      'Todos os usuários da turma não estão aptos para o(s) treinamento(s).',
    )
  }
}
