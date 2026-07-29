import { type Either, left, right } from '@/core/either'

import type { TagsRepository } from '../../repositories/tags-repository'
import { TagNotExistsError } from '../../errors/tag/tag-not-exists'

interface TagDeleteUseCaseRequest {
  tagId: string
}

type TagDeleteUseCaseResponse = Either<
  TagNotExistsError,
  { response: boolean }
>

export class DeleteTagUseCase {
  constructor(
    private tagsRepository: TagsRepository,
  ) {}

  async execute({
    tagId,
  }: TagDeleteUseCaseRequest): Promise<TagDeleteUseCaseResponse> {
    const tag = await this.tagsRepository.findById(tagId)
    if (!tag) {
      return left(new TagNotExistsError())
    }

    const response = await this.tagsRepository.delete(tagId)

    return right({ response })
  }
}