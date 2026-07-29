import type { Category } from "@/domain/enterprise/category";

export class CategoriesPresenter {
  static toHttp(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      icon: category.icon,
      color: category.color,
      userId: category.userId.toString(),
      user: category.user
        ? {
            id: category.userId.toString(),
            name: category.user.name,
            cpf: category.user.cpf,
          }
        : null,
    };
  }
}
