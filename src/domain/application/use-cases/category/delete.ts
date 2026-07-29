import { Either, left, right } from '@/core/either'
import { CategoryNotExistsError } from '../../errors/category/category-not-exists'
import type { CategoriesRepository } from '../../repositories/categories-repository'


interface CategoryDeleteUseCaseRequest {
  categoryId: string
}

type CategoryDeleteUseCaseResponse = Either<
  CategoryNotExistsError,
  { response: boolean }
>

export class DeleteCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    categoryId,
  }: CategoryDeleteUseCaseRequest): Promise<CategoryDeleteUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId)
    if (!category) {
      return left(new CategoryNotExistsError())
    }

    const response = await this.categoriesRepository.delete(categoryId)

    return right({ response })
  }
}
