import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'
import type { HttpRequest } from '@/infra/http/http-request'
import type { HttpResponse } from '@/infra/http/http-response'

import { makeFetchUsersUseCase } from './factories/make-fetch-users-use-case'
import { UsersPresenter } from './presenter/user-presenter'
export class FecthUsersController {
  constructor(
    private bodyValidation: Validation<{
      query?: string
      page?: number
      perPage?: number
      status: 'S' | 'N' | 'ALL'
      isServiceProvider: 'S' | 'N' | 'ALL'
      filterBranch?: string
      filterFunction?: string
      filterShift?: string
      filterDepartment?: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { query, page, perPage } = this.bodyValidation.parse(request.query)

      const fecthUsersUseCase = makeFetchUsersUseCase()

      const result = await fecthUsersUseCase.execute({
        query,
        page,
        perPage,
      })

      if (result.isRight()) {
        const { users, meta } = result.value

        return reply.status(200).json({
          users: users.map((user) => ({
            ...UsersPresenter.toHttp(user),
          })),
          meta,
        })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message)
        return reply.status(400).json({
          message: errorMessages[0],
        })
      }
      return reply.status(500).json({
        message: 'Erro interno servidor',
      })
    }
  }
}
