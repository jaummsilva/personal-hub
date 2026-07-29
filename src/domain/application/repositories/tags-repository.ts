import type { Tag } from '@/domain/enterprise/tag'

import type { MetaResponse } from '../utils/meta-response'

export interface FindManyTagsParams {
  query?: string
  page?: number
  perPage?: number
  userId?: string
}

export interface TagsRepository {
  create(data: Tag): Promise<Tag>
  update(data: Tag): Promise<Tag>
  findMany(
    params: FindManyTagsParams,
  ): Promise<{ tags: Tag[]; meta: MetaResponse }>
  findById(tagId: string): Promise<Tag | null>
  delete(tagId: string): Promise<boolean>
  findByUserId(userId: string): Promise<Tag[]>
}