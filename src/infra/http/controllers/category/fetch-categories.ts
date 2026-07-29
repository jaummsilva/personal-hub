import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'
import type { HttpResponse } from '@/infra/http/http-response'

import type { HttpRequest } from '../../http-request'
import { makeFetchCategoriesUseCase } from './factories/make-fetch-categories-use-case'
import { CategoriesPresenter } from './presenter/category-presenter'

export class FecthCategoriesController {
  constructor(
    private bodyValidation: Validation<{
      query?: string
      page?: number
      perPage?: number
      userId?: string
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { query, page, perPage, userId } = this.bodyValidation.parse(request.query)

      const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

      const result = await fetchCategoriesUseCase.execute({
        query,
        page,
        perPage,
        userId
      })

      if (result.isRight()) {
        const { categories, meta } = result.value

        return reply.status(200).json({
          categories: categories.map(CategoriesPresenter.toHttp),
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
