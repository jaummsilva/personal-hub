import { FetchTagsUseCase } from '@/domain/application/use-cases/tag/fetch-tags'
import { PrismaTagsRepository } from '@/infra/database/prisma/repositories/prisma-tags-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeFetchTagsUseCase() {
  const tagsRepository = new PrismaTagsRepository()
  const usersRepository = new PrismaUsersRepository()

  const fetchTagsUseCase = new FetchTagsUseCase(
    tagsRepository,
    usersRepository,
  )

  return fetchTagsUseCase
}