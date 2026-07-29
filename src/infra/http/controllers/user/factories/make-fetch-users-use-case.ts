import { FetchUsersUseCase } from '@/domain/application/use-cases/user/fetch-users'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeFetchUsersUseCase() {
  const userRepository = new PrismaUsersRepository()
  const fetchUsersCase = new FetchUsersUseCase(userRepository)

  return fetchUsersCase
}
