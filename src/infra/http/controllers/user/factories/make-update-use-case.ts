import { UpdateUserUseCase } from '@/domain/application/use-cases/user/update'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeUpdateUserUseCase() {
  const userRepository = new PrismaUsersRepository()

  const bcriptyAdapater = new BcryptAdapter()
  const userUdateUsersCase = new UpdateUserUseCase(
    userRepository,
    bcriptyAdapater,
  )

  return userUdateUsersCase
}
