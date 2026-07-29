import { type Either, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import type { Category } from '@/domain/enterprise/category'
import type { CategoriesRepository } from '../../repositories/categories-repository'

interface FetchCategoriesUseCaseRequest {
  query?: string
  page?: number
  perPage?: number
  userId?: string
}

type FetchCategoriesUseCaseResponse = Either<
  ResourceNotFoundError,
  { categories: Category[]; meta: MetaResponse }
>

export class FetchCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    query,
    page,
    perPage,
    userId
  }: FetchCategoriesUseCaseRequest): Promise<FetchCategoriesUseCaseResponse> {
    const result = await this.categoriesRepository.findMany({
      page,
      query,
      perPage,
      userId
    })

    const categories = result.categories
    const meta = result.meta

    return right({ categories, meta })
  }
}
