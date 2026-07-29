import { type Either, left, right } from '@/core/either'
import { Tag } from '@/domain/enterprise/tag'

import type { TagsRepository } from '../../repositories/tags-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UserNotExistsError } from '../../errors/user/user-not-exists'
import { TagNotExistsError } from '../../errors/tag/tag-not-exists'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface UpdateTagUseCaseRequest {
  tagId: string
  name: string
  color: string
  userId: string
}

type UpdateTagUseCaseResponse = Either<
  UserNotExistsError | TagNotExistsError,
  { tag: Tag }
>

export class UpdateTagUseCase {
  constructor(private tagsRepository: TagsRepository, private usersRepository: UsersRepository) {}

  async execute({
    tagId,
    name,
    color,
    userId
  }: UpdateTagUseCaseRequest): Promise<UpdateTagUseCaseResponse> {
    // Verify user exists
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotExistsError())
    }

    // Verify tag exists
    const tagExists = await this.tagsRepository.findById(tagId)
    if (!tagExists) {
      return left(new TagNotExistsError())
    }

    const tag = Tag.create({
      name,
      color,
      userId: new UniqueEntityID(userId)
    })

    const tagUpdated = await this.tagsRepository.update(tag)

    return right({ tag: tagUpdated })
  }
}