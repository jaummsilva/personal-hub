import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'
import { CategoryAlreadyExistsForCodeError } from '@/domain/application/errors/category/category-already-exists-for-code'
import type { HttpResponse } from '@/infra/http/http-response'

import type { HttpRequest } from '../../http-request'
import { makeRegisterCategoriesUseCase } from './factories/make-register-categories-use-case'
import { UserNotExistsError } from '@/domain/application/errors/user/user-not-exists'

export class RegisterCategoryController {
  constructor(
    private bodyValidation: Validation<{
      name: string
      icon: string
      color: string
      userId: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { name, color, icon, userId } = this.bodyValidation.parse(request.body)

      const registerCategoriesUseCase = makeRegisterCategoriesUseCase()

      const result = await registerCategoriesUseCase.execute({
        name,
        userId,
        icon,
        color,
      })

      if (result.isLeft()) {
        const errorMapping = new Map([[CategoryAlreadyExistsForCodeError, 409], [UserNotExistsError, 404]])

        for (const [ErrorClass, statusCode] of errorMapping) {
          if (result.value instanceof ErrorClass) {
            return reply
              .status(statusCode)
              .json({ message: result.value.message })
          }
        }
      }

      return reply.status(201).send()
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
