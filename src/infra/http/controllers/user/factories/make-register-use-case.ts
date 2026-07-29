import { RegisterAppUserUseCase } from '@/domain/application/use-cases/user/register'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeRegisterUserUseCase() {
  const userRepository = new PrismaUsersRepository()

  const bcriptyAdapater = new BcryptAdapter()
  const registerAppUserUseCase = new RegisterAppUserUseCase(
    userRepository,
    bcriptyAdapater,
  )

  return registerAppUserUseCase
}
