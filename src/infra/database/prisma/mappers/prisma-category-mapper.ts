import type { Category as PrismaCategory, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category as DomainCategory } from '@/domain/enterprise/category'
import {  User as DomainUser } from '@/domain/enterprise/user'

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory & {
    user?: PrismaUser
  }): DomainCategory {
    return DomainCategory.create(
      {
        name: raw.name,
        color: raw.color,
        icon: raw.icon,
        userId: new UniqueEntityID(raw.userId),
        user: raw.user
          ? DomainUser.create(
              {
                name: raw.user.name,
                cpf: raw.user.cpf,
                passwordHash: raw.user.passwordHash,
              },
              new UniqueEntityID(raw.user.id),
            )
          : undefined,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(category: DomainCategory): PrismaCategory {
    return {
      id: category.id.toString(),
      name: category.name,
      color: category.color,
      icon: category.icon,
      userId: category.userId.toString(),
    }
  }
}
