import { type Either, left, right } from '@/core/either'
import { Tag } from '@/domain/enterprise/tag'

import type { TagsRepository } from '../../repositories/tags-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import type { FindManyTagsParams } from '../../repositories/tags-repository'
import type { MetaResponse } from '@/domain/application/utils/meta-response'
import { UserNotExistsError } from '../../errors/user/user-not-exists'

interface FetchTagsUseCaseRequest extends FindManyTagsParams {}

type FetchTagsUseCaseResponse = Either<
  UserNotExistsError,
  { tags: Tag[]; meta: MetaResponse }
>

export class FetchTagsUseCase {
  constructor(private tagsRepository: TagsRepository, private usersRepository: UsersRepository) {}

  async execute({
    query,
    page,
    perPage,
    userId
  }: FetchTagsUseCaseRequest): Promise<FetchTagsUseCaseResponse> {
    // If userId is provided, verify the user exists
    if (userId) {
      const user = await this.usersRepository.findById(userId)
      if (!user) {
        return left(new UserNotExistsError())
      }
    }

    const result = await this.tagsRepository.findMany({
      query,
      page,
      perPage,
      userId
    })

    return right(result)
  }
}