import { DeleteProjectUseCase } from '@/domain/application/use-cases/project/delete'
import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

export function makeDeleteProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const deleteProjectUseCase = new DeleteProjectUseCase(
    projectsRepository,
  )

  return deleteProjectUseCase
}
