import type { Prisma } from '@prisma/client'

import type {
  TagsRepository,
  FindManyTagsParams,
} from '@/domain/application/repositories/tags-repository'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import type { Tag } from '@/domain/enterprise/tag'
import { prisma } from '@/infra/database/prisma/prisma'

import { PrismaTagMapper } from '../mappers/prisma-tag-mapper'

export class PrismaTagsRepository implements TagsRepository {
  async create(data: Tag) {
    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        color: data.color,
        userId: data.userId.toString()
      },
    })
    return PrismaTagMapper.toDomain(tag)
  }

  async findById(tagId: string) {
    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    })

    if (!tag) {
      return null
    }

    return PrismaTagMapper.toDomain(tag)
  }

  async update(data: Tag) {
    const tag = await prisma.tag.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        name: data.name,
        color: data.color,
        userId: data.userId.toString()
      },
    })
    return PrismaTagMapper.toDomain(tag)
  }

  async findMany(params: FindManyTagsParams) {
    const { query = '', page = 1, perPage = 10, userId } = params

    const skip = (page - 1) * perPage
    const take = perPage

    const buildConditions = (query: string): Prisma.TagWhereInput => {
      const conditions: Prisma.TagWhereInput = {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      }

      if(userId) {
        conditions.userId = userId
      }

      return conditions
    }

    const conditions = buildConditions(query)

    const [tags, totalCount] = await Promise.all([
      prisma.tag.findMany({
        where: conditions,
        skip,
        take,
        include: {
          user: true
        }
      }),
      prisma.tag.count({
        where: conditions,
      }),
    ])

    const meta: MetaResponse = {
      pageIndex: page || 1,
      perPage,
      totalCount,
    }

    const tagsMapped = tags.map((tag) =>
      PrismaTagMapper.toDomain({
        ...tag,
      }),
    )
    return { tags: tagsMapped, meta }
  }

  async delete(tagId: string) {
    await prisma.tag.delete({
      where: {
        id: tagId,
      },
    })

    return true
  }

  async findByUserId(userId: string) {
    const tags = await prisma.tag.findMany({
      where: {
        userId,
      },
    })

    return tags.map((tag) => PrismaTagMapper.toDomain(tag))
  }
}