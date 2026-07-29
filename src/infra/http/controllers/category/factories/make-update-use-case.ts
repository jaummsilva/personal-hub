import { UpdateCategoryUseCase } from "@/domain/application/use-cases/category/update";
import { PrismaCategoriesRepository } from "@/infra/database/prisma/repositories/prisma-categories-repository";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoriesRepository();
  const usersRepository = new PrismaUsersRepository();

  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryRepository,
    usersRepository,
  );

  return updateCategoryUseCase;
}
