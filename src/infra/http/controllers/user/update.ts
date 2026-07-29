import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'
import { UserAlreadyExistsWithCpfError } from '@/domain/application/errors/user/user-already-exists-with-cpf'
import { UserAlreadyExistsWithRegistrationError } from '@/domain/application/errors/user/user-already-exists-with-registration'
import { UserNotExistsError } from '@/domain/application/errors/user/user-not-exists'
import type { HttpRequest } from '@/infra/http/http-request'

import type { HttpResponse } from '../../http-response'
import { makeUpdateUserUseCase } from './factories/make-update-use-case'

export class UpdateUserController {
  constructor(
    private bodyValidation: Validation<{
      userId: string
      name: string
      password?: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { userId, name, password } = this.bodyValidation.parse(
        request.body,
      )

      const updateUserUseCase = makeUpdateUserUseCase()

      const result = await updateUserUseCase.execute({
        userId,
        name,
        password,
      })

      if (result.isLeft()) {
        const errorMapping = new Map([
          [UserAlreadyExistsWithRegistrationError, 409],
          [UserAlreadyExistsWithCpfError, 409],
          [UserNotExistsError, 404],
        ])

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
