import { RegisterTagUseCase } from '@/domain/application/use-cases/tag/register'
import { PrismaTagsRepository } from '@/infra/database/prisma/repositories/prisma-tags-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeRegisterTagUseCase() {
  const tagsRepository = new PrismaTagsRepository()
  const usersRepository = new PrismaUsersRepository()

  const registerTagUseCase = new RegisterTagUseCase(
    tagsRepository,
    usersRepository,
  )

  return registerTagUseCase
}