import { UpdateProjectUseCase } from "@/domain/application/use-cases/project/update";
import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";

export function makeUpdateProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository();
  const usersRepository = new PrismaUsersRepository();

  const updateProjectUseCase = new UpdateProjectUseCase(
    projectsRepository,
    usersRepository,
  );

  return updateProjectUseCase;
}
