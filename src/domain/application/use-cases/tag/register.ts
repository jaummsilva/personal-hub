import { type Either, left, right } from '@/core/either'
import { Tag } from '@/domain/enterprise/tag'

import type { TagsRepository } from '../../repositories/tags-repository'
import type { UsersRepository } from '../../repositories/users-repository'
import { UserNotExistsError } from '../../errors/user/user-not-exists'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface RegisterTagUseCaseRequest {
  name: string
  userId: string
  color: string
}

type RegisterTagUseCaseResponse = Either<
  UserNotExistsError,
  { tag: Tag }
>

export class RegisterTagUseCase {
  constructor(private tagsRepository: TagsRepository, private usersRepository: UsersRepository) {}

  async execute({
    name,
    userId,
    color
  }: RegisterTagUseCaseRequest): Promise<RegisterTagUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotExistsError())
    }

    const tag = Tag.create({
      name,
      userId: new UniqueEntityID(userId),
      color
    })

    const tagCreated = await this.tagsRepository.create(tag)

    return right({ tag: tagCreated })
  }
}