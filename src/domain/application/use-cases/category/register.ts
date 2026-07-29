import { type Either, left, right } from '@/core/either'
import { Category } from '@/domain/enterprise/category'

import { CategoryAlreadyExistsForCodeError } from '../../errors/category/category-already-exists-for-code'
import type { CategoriesRepository } from '../../repositories/categories-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UserNotExistsError } from '../../errors/user/user-not-exists'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface RegisterCategoryUseCaseRequest {
  name: string
  userId: string
  icon: string
  color: string
}

type RegisterCategoryUseCaseResponse = Either<
  CategoryAlreadyExistsForCodeError | UserNotExistsError,
  { category: Category }
>

export class RegisterCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository, private usersRepository: UsersRepository) {}

  async execute({
    name,
    userId,
    icon,
    color
  }: RegisterCategoryUseCaseRequest): Promise<RegisterCategoryUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotExistsError())
    }

    const category = Category.create({
      name,
      userId: new UniqueEntityID(userId),
      icon,
      color
    })

    const categoryCreated = await this.categoriesRepository.create(category)

    return right({ category: categoryCreated })
  }
}
