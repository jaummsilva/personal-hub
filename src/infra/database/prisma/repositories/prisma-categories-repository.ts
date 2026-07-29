import type { Prisma } from '@prisma/client'

import type {
  CategoriesRepository,
  FindManyCategoriesParams,
} from '@/domain/application/repositories/categories-repository'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import type { Category } from '@/domain/enterprise/category'
import { prisma } from '@/infra/database/prisma/prisma'

import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Category) {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        icon: data.icon,
        color: data.color,
        userId: data.userId.toString()
      },
    })
    return PrismaCategoryMapper.toDomain(category)
  }

  async findById(categoryId: string) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async update(data: Category) {
    const category = await prisma.category.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        name: data.name,
        icon: data.icon,
        color: data.color,
        userId: data.userId.toString()
      },
    })
    return PrismaCategoryMapper.toDomain(category)
  }

  async findMany(params: FindManyCategoriesParams) {
    const { query = '', page = 1, perPage = 10, userId } = params

    const skip = (page - 1) * perPage
    const take = perPage

    const buildConditions = (query: string): Prisma.CategoryWhereInput => {
      const conditions: Prisma.CategoryWhereInput = {
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

    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        where: conditions,
        skip,
        take,
        include: {
          user: true
        }
      }),
      prisma.category.count({
        where: conditions,
      }),
    ])

    const meta: MetaResponse = {
      pageIndex: page || 1,
      perPage,
      totalCount,
    }

    const categoriesMapped = categories.map((category) =>
      PrismaCategoryMapper.toDomain({
        ...category,
      }),
    )
    return { categories: categoriesMapped, meta }
  }

  async delete(categoryId: string) {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })

    return true
  }

  async findByUserId(userId: string) {
    const categories = await prisma.category.findMany({
      where: {
        userId,
      },
    })

    return categories.map((category) => PrismaCategoryMapper.toDomain(category))
  }
}
