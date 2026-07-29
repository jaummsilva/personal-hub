import { UpdateTagUseCase } from '@/domain/application/use-cases/tag/update'
import { PrismaTagsRepository } from '@/infra/database/prisma/repositories/prisma-tags-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeUpdateTagUseCase() {
  const tagsRepository = new PrismaTagsRepository()
  const usersRepository = new PrismaUsersRepository()

  const updateTagUseCase = new UpdateTagUseCase(
    tagsRepository,
    usersRepository,
  )

  return updateTagUseCase
}