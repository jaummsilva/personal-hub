import { type Either, left, right } from "@/core/either";

import type { UsersRepository } from "../../repositories/users-repository";
import { UserNotExistsError } from "../../errors/user/user-not-exists";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Project } from "@/domain/enterprise/project";
import type { ProjectsRepository } from "../../repositories/projects-repository";

interface RegisterProjectUseCaseRequest {
  name: string;
  userId: string;
  icon: string;
  color: string;
  description: string;
}

type RegisterProjectUseCaseResponse = Either<
  UserNotExistsError,
  { project: Project }
>;

export class RegisterProjectUseCase {
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
  }: RegisterProjectUseCaseRequest): Promise<RegisterProjectUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserNotExistsError());
    }

    const project = Project.create({
      name,
      userId: new UniqueEntityID(userId),
      icon,
      color,
      description,
    });

    const projectCreated = await this.projectsRepository.create(project);

    return right({ project: projectCreated });
  }
}
