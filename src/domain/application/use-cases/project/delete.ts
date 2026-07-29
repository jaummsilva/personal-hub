import { Either, left, right } from '@/core/either'
import { ProjectNotExistsError } from '../../errors/project/project-not-exists'
import type { ProjectsRepository } from '../../repositories/projects-repository'


interface ProjectDeleteUseCaseRequest {
  projectId: string
}

type ProjectDeleteUseCaseResponse = Either<
  ProjectNotExistsError,
  { response: boolean }
>

export class DeleteProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
  ) {}

  async execute({
    projectId,
  }: ProjectDeleteUseCaseRequest): Promise<ProjectDeleteUseCaseResponse> {
    const Project = await this.projectsRepository.findById(projectId)
    if (!Project) {
      return left(new ProjectNotExistsError())
    }

    const response = await this.projectsRepository.delete(projectId)

    return right({ response })
  }
}
