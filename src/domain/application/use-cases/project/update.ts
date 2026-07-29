import { type Either, left, right } from "@/core/either";
import { Project } from "@/domain/enterprise/project";

import type { UsersRepository } from "../../repositories/users-repository";
import { UserNotExistsError } from "../../errors/user/user-not-exists";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { ProjectsRepository } from "../../repositories/projects-repository";
import { ProjectNotExistsError } from "../../errors/project/project-not-exists";

interface UpdateProjectUseCaseRequest {
  projectId: string;
  name: string;
  userId: string;
  icon: string;
  color: string;
  description: string;
}

type UpdateProjectUseCaseResponse = Either<
  ProjectNotExistsError,
  { project: Project }
>;

export class UpdateProjectUseCase {
  constructor(
    private projectsRepository: ProjectsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    userId,
    icon,
    color,
    description,
    projectId,
  }: UpdateProjectUseCaseRequest): Promise<UpdateProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      return left(new ProjectNotExistsError());
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserNotExistsError());
    }

    project.name = name;
    project.color = color;
    project.icon = icon;
    project.userId = new UniqueEntityID(userId);
    project.description = description;

    await this.projectsRepository.update(project);
    return right({ project });
  }
}
