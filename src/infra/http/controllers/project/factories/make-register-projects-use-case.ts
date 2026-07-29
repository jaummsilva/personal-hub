import { RegisterProjectUseCase } from "@/domain/application/use-cases/project/register";
import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";

export function makeRegisterProjectsUseCase() {
  const projectsRepository = new PrismaProjectsRepository()
  const userRepository = new PrismaUsersRepository();

  const registerdProjectCase = new RegisterProjectUseCase(
    projectsRepository,
    userRepository,
  );

  return registerdProjectCase;
}
