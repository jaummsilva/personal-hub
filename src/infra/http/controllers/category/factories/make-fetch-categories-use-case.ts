import { FetchCategoriesUseCase } from '@/domain/application/use-cases/category/fetch-categories'
import { PrismaCategoriesRepository } from '@/infra/database/prisma/repositories/prisma-categories-repository'

export function makeFetchCategoriesUseCase() {
  const categoryRepository = new PrismaCategoriesRepository()
  const fetchCategoriesCase = new FetchCategoriesUseCase(categoryRepository)

  return fetchCategoriesCase
}
