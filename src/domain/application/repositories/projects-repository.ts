import type { Project } from '@/domain/enterprise/project'

import type { MetaResponse } from '../utils/meta-response'

export interface FindManyProjectsParams {
  query?: string
  page?: number
  perPage?: number
  userId?: string
}

export interface ProjectsRepository {
  create(data: Project): Promise<Project>
  update(data: Project): Promise<Project>
  findMany(
    params: FindManyProjectsParams,
  ): Promise<{ projects: Project[]; meta: MetaResponse }>
  findById(projectId: string): Promise<Project | null>
  delete(projectId: string): Promise<boolean>
  findByUserId(userId: string): Promise<Project[]>
}
