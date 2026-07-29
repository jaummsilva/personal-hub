import type { Tag as PrismaTag, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Tag as DomainTag } from '@/domain/enterprise/tag'
import { User as DomainUser } from '@/domain/enterprise/user'

export class PrismaTagMapper {
  static toDomain(raw: PrismaTag & {
    user?: PrismaUser
  }): DomainTag {
    return DomainTag.create(
      {
        name: raw.name,
        color: raw.color,
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

  static toPrisma(tag: DomainTag): PrismaTag {
    return {
      id: tag.id.toString(),
      name: tag.name,
      color: tag.color,
      userId: tag.userId.toString(),
    }
  }
}