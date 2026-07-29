import { DeleteTagUseCase } from '@/domain/application/use-cases/tag/delete'
import { PrismaTagsRepository } from '@/infra/database/prisma/repositories/prisma-tags-repository'

export function makeDeleteTagUseCase() {
  const tagsRepository = new PrismaTagsRepository()

  const deleteTagUseCase = new DeleteTagUseCase(
    tagsRepository,
  )

  return deleteTagUseCase
}