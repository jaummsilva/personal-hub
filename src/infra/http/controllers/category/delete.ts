import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'
import { CategoryNotExistsError } from '@/domain/application/errors/category/category-not-exists'
import type { HttpResponse } from '@/infra/http/http-response'

import type { HttpRequest } from '../../http-request'
import { makeDeleteCategoryUseCase } from './factories/make-delete-category'

export class DeleteCategoryController {
  constructor(
    private bodyValidation: Validation<{
      categoryId: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { categoryId } = this.bodyValidation.parse(request.params)

      const deleteCategoryUseCase = makeDeleteCategoryUseCase()

      const result = await deleteCategoryUseCase.execute({
        categoryId,
      })

      if (result.isLeft()) {
        const errorMapping = new Map([[CategoryNotExistsError, 404]])

        for (const [ErrorClass, statusCode] of errorMapping) {
          if (result.value instanceof ErrorClass) {
            return reply
              .status(statusCode)
              .json({ message: result.value.message })
          }
        }
      }

      return reply.status(204).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message)
        return reply.status(400).json({
          message: errorMessages[0],
        })
      }
    }
  }
}
