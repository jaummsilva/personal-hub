import type { Prisma } from '@prisma/client'

import type {
  ProjectsRepository,
  FindManyProjectsParams,
} from '@/domain/application/repositories/projects-repository'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import type { Project } from '@/domain/enterprise/project'
import { prisma } from '@/infra/database/prisma/prisma'

import { PrismaProjectMapper } from '../mappers/prisma-project-mapper'

export class PrismaProjectsRepository implements ProjectsRepository {
  async create(data: Project) {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        icon: data.icon,
        color: data.color,
        description: data.description,
        userId: data.userId.toString()
      },
    })
    return PrismaProjectMapper.toDomain(project)
  }

  async findById(projectId: string) {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    })

    if (!project) {
      return null
    }

    return PrismaProjectMapper.toDomain(project)
  }

  async update(data: Project) {
    const project = await prisma.project.update({
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
    return PrismaProjectMapper.toDomain(project)
  }

  async findMany(params: FindManyProjectsParams) {
    const { query = '', page = 1, perPage = 10, userId } = params

    const skip = (page - 1) * perPage
    const take = perPage

    const buildConditions = (query: string): Prisma.ProjectWhereInput => {
      const conditions: Prisma.ProjectWhereInput = {
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

    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: conditions,
        skip,
        take,
        include: {
          user: true
        }
      }),
      prisma.project.count({
        where: conditions,
      }),
    ])

    const meta: MetaResponse = {
      pageIndex: page || 1,
      perPage,
      totalCount,
    }

    const projectsMapped = projects.map((project) =>
      PrismaProjectMapper.toDomain({
        ...project,
      }),
    )
    return { projects: projectsMapped, meta }
  }

  async delete(projectId: string) {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    })

    return true
  }

  async findByUserId(userId: string) {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    })

    return projects.map((project) => PrismaProjectMapper.toDomain(project))
  }
}
