import type { User } from '@/domain/enterprise/user'

export class UsersPresenter {
  static toHttp(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
