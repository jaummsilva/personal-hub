import { FetchProjectsUseCase } from '@/domain/application/use-cases/project/fetch-projects'
import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

export function makeFetchProjectsUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const fetchProjectsCase = new FetchProjectsUseCase(projectsRepository)

  return fetchProjectsCase
}
