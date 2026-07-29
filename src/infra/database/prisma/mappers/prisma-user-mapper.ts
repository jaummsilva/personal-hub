import type {
  User as PrismaUser,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User as DomainUser } from '@/domain/enterprise/user'

export class PrismaUserMapper {
  static toDomain(
    raw: PrismaUser ,
  ): DomainUser {
    return DomainUser.create(
      {
       
        name: raw.name,
        passwordHash: raw.passwordHash,
        cpf: raw.cpf,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: DomainUser): PrismaUser {
    return {
      id: user.id.toString(),
      name: user.name,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt ? user.createdAt : new Date(),
      updatedAt: user.updatedAt ? user.updatedAt : new Date(),
      cpf: user.cpf,
    }
  }
}
