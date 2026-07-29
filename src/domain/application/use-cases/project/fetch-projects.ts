import { type Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import type { Project } from '@/domain/enterprise/project'
import type { ProjectsRepository } from '../../repositories/projects-repository'

interface FetchProjectsUseCaseRequest {
  query?: string
  page?: number
  perPage?: number
  userId?: string
}

type FetchProjectsUseCaseResponse = Either<
  ResourceNotFoundError,
  { projects: Project[]; meta: MetaResponse }
>

export class FetchProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    query,
    page,
    perPage,
    userId
  }: FetchProjectsUseCaseRequest): Promise<FetchProjectsUseCaseResponse> {
    const result = await this.projectsRepository.findMany({
      page,
      query,
      perPage,
      userId
    })

    const projects = result.projects
    const meta = result.meta

    return right({ projects, meta })
  }
}
