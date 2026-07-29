import type { User } from '@/domain/enterprise/user'

import type { MetaResponse } from '../utils/meta-response'

export interface FindManyParams {
  query?: string
  page?: number
  perPage?: number
}

export interface UsersRepository {
  create(data: User): Promise<User>
  update(data: User): Promise<User>
  findMany(
    params: FindManyParams,
  ): Promise<{ users: User[]; meta: MetaResponse }>
  findById(userId: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>
  delete(userId: string): Promise<boolean>
}
