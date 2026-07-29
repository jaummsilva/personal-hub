import { type Either, left, right } from "@/core/either";
import { Category } from "@/domain/enterprise/category";

import { CategoryNotExistsError } from "../../errors/category/category-not-exists";
import type { CategoriesRepository } from "../../repositories/categories-repository";
import type { UsersRepository } from "../../repositories/users-repository";
import { UserNotExistsError } from "../../errors/user/user-not-exists";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface UpdateCategoryUseCaseRequest {
  categoryId: string;
  name: string;
  userId: string;
  icon: string;
  color: string;
}

type UpdateCategoryUseCaseResponse = Either<
  CategoryNotExistsError,
  { category: Category }
>;

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository, private usersRepository: UsersRepository) {}

  async execute({
    name,
    categoryId,
    color,
    icon,
    userId
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return left(new CategoryNotExistsError());
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new UserNotExistsError());
    }
    
    category.name = name;
    category.color = color;
    category.icon = icon;
    category.userId = new UniqueEntityID(userId);

    await this.categoriesRepository.update(category);
    return right({ category });
  }
}
