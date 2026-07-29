import { DeleteCategoryUseCase } from '@/domain/application/use-cases/category/delete'
import { PrismaCategoriesRepository } from '@/infra/database/prisma/repositories/prisma-categories-repository'

export function makeDeleteCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const deleteCategoryUseCase = new DeleteCategoryUseCase(
    categoriesRepository,
  )

  return deleteCategoryUseCase
}
