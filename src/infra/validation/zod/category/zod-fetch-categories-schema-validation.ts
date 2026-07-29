import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'

// Defina o esquema de validação
const fetchCategoriesQuerySchema = z.object({
  query: z
    .string({
      invalid_type_error: 'Query inválida',
    })
    .optional(),
  page: z.coerce.number().min(1).default(1),
  perPage: z
    .enum(['10', '25', '50', '100'], {
      required_error: 'PerPage é obrigatório',
      message: 'PerPage deve ser 10, 25, 50 ou 100',
    })
    .transform(Number)
    .default('10'),
})

// Defina o tipo inferido do esquema de validação
export type FetchCategoriesQuerySchema = z.infer<
  typeof fetchCategoriesQuerySchema
>

// Implemente a validação
export class ZodFetchCategoriesQuerySchemaValidation
  implements Validation<FetchCategoriesQuerySchema>
{
  parse(input: object | undefined) {
    return fetchCategoriesQuerySchema.parse(input)
  }
}
