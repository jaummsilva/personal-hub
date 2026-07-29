import type { Tag } from "@/domain/enterprise/tag";

export class TagsPresenter {
  static toHttp(tag: Tag) {
    return {
      id: tag.id.toString(),
      name: tag.name,
      color: tag.color,
      userId: tag.userId.toString(),
      user: tag.user
        ? {
            id: tag.userId.toString(),
            name: tag.user.name,
            cpf: tag.user.cpf,
          }
        : null,
    };
  }
}
