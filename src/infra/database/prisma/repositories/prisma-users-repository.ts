import type { Prisma } from '@prisma/client'

import type {
  FindManyParams,
  UsersRepository,
} from '@/domain/application/repositories/users-repository'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import type { User } from '@/domain/enterprise/user'
import { prisma } from '@/infra/database/prisma/prisma'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: User) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        passwordHash: data.passwordHash,
        cpf: data.cpf,
      },
    })
    return PrismaUserMapper.toDomain(user)
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain({
      ...user,
    })
  }

  async update(data: User) {
    const user = await prisma.user.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        name: data.name,
        passwordHash: data.passwordHash,
        cpf: data.cpf,
      },
    })
    return PrismaUserMapper.toDomain({
      ...user,
    })
  }

  async findMany(params: FindManyParams) {
    const { query = '', page = 1, perPage = 10 } = params

    const skip = (page - 1) * perPage
    const take = perPage

    const buildConditions = (query: string): Prisma.UserWhereInput => {
      // Condições de pesquisa no nome, cpf ou email
      const conditions: Prisma.UserWhereInput = {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      }

      // Array para acumular as condições AND
      const andConditions: Prisma.UserWhereInput[] = []

      // Se houver condições AND, adiciona-as ao objeto final
      if (andConditions.length > 0) {
        conditions.AND = andConditions
      }

      return conditions
    }

    const conditions = buildConditions(query)

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: conditions,
        skip,
        take,
      }),
      prisma.user.count({
        where: conditions,
      }),
    ])

    const meta: MetaResponse = {
      pageIndex: page || 1,
      perPage,
      totalCount,
    }

    const usersMapped = users.map((user) =>
      PrismaUserMapper.toDomain({
        ...user,
      }),
    )
    return { users: usersMapped, meta }
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return true
  }

  async findByCpf(cpf: string) {
    const user = await prisma.user.findFirst({
      where: {
        cpf,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain({
      ...user,
    })
  }
}
