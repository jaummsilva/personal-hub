import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'
import { UserAlreadyExistsError } from '@/domain/application/errors/user/user-already-exists'
import type { HttpRequest } from '@/infra/http/http-request'
import type { HttpResponse } from '@/infra/http/http-response'

import { makeRegisterUserUseCase } from './factories/make-register-use-case'

export class RegisterAppUserController {
  constructor(
    private bodyValidation: Validation<{
      password: string
      name: string
      cpf: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { password, name, cpf } = this.bodyValidation.parse(request.body)

      const registerUserUseCase = makeRegisterUserUseCase()

      const result = await registerUserUseCase.execute({
        name,
        password,
        cpf,
      })

      if (result.isLeft()) {
        const errorMapping = new Map([[UserAlreadyExistsError, 404]])

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
