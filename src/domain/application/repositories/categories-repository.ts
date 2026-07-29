import type { Category } from '@/domain/enterprise/category'

import type { MetaResponse } from '../utils/meta-response'

export interface FindManyCategoriesParams {
  query?: string
  page?: number
  perPage?: number
  userId?: string
}

export interface CategoriesRepository {
  create(data: Category): Promise<Category>
  update(data: Category): Promise<Category>
  findMany(
    params: FindManyCategoriesParams,
  ): Promise<{ categories: Category[]; meta: MetaResponse }>
  findById(categoryId: string): Promise<Category | null>
  delete(categoryId: string): Promise<boolean>
  findByUserId(userId: string): Promise<Category[]>
}
