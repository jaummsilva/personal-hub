import { z } from 'zod'

import { UnauthorizedError } from '@/core/errors/unauthorized'
import type { Validation } from '@/core/validation/validation'
import { UserNotExistsError } from '@/domain/application/errors/user/user-not-exists'
import type { HttpResponse } from '@/infra/http/http-response'
import type { HttpServer } from '@/infra/http/http-server'

import { makeAuthenticateUseCase } from './factories/make-authenticate-use-case'
import type { HttpRequest } from '../../http-request'

export class AuthenticateController {
  constructor(
    private httpServer: HttpServer,
    private bodyValidation: Validation<{
      cpf: string
      password: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { cpf, password } = this.bodyValidation.parse(request.body)

      const authenticateUsersCase = makeAuthenticateUseCase()

      const result = await authenticateUsersCase.execute({ cpf, password })

      if (result.isLeft()) {
        const errorMapping = new Map([
          [UserNotExistsError, 404],
          [UnauthorizedError, 401],
        ])

        for (const [ErrorClass, statusCode] of errorMapping) {
          if (result.value instanceof ErrorClass) {
            return reply
              .status(statusCode)
              .json({ message: result.value.message })
          }
        }
      } else {
        const { user } = result.value

        const { token } = this.httpServer.signJwt(
          user.id.toString(),
        )

        return reply.status(200).json({
          token,
        })
      }
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
