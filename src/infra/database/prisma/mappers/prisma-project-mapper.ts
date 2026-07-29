import type { Project as PrismaProject, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Project as DomainProject } from '@/domain/enterprise/project'
import {  User as DomainUser } from '@/domain/enterprise/user'

export class PrismaProjectMapper {
  static toDomain(raw: PrismaProject & {
    user?: PrismaUser
  }): DomainProject {
    return DomainProject.create(
      {
        name: raw.name,
        color: raw.color,
        icon: raw.icon,
        userId: new UniqueEntityID(raw.userId),
        description: raw.description,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
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

  static toPrisma(project: DomainProject): PrismaProject {
    return {
      id: project.id.toString(),
      name: project.name,
      color: project.color,
      icon: project.icon,
      description: project.description,
      userId: project.userId.toString(),
      createdAt: project.createdAt ?? new Date(),
      updatedAt: project.updatedAt ?? new Date(),
    }
  }
}
