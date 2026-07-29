import { RegisterCategoryUseCase } from "@/domain/application/use-cases/category/register";
import { PrismaCategoriesRepository } from "@/infra/database/prisma/repositories/prisma-categories-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";

export function makeRegisterCategoriesUseCase() {
  const categoryRepository = new PrismaCategoriesRepository();
  const userRepository = new PrismaUsersRepository();

  const registerdCategoryCase = new RegisterCategoryUseCase(
    categoryRepository,
    userRepository,
  );

  return registerdCategoryCase;
}
