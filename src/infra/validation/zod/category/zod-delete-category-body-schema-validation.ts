import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'

const deleteCategoryBodySchema = z.object({
  categoryId: z
    .string({
      invalid_type_error: 'Id da categoria inválido',
      required_error: 'Id da categoria é obrigatório',
    })
    .uuid({
      message: 'Id da categoria inválido',
    }),
})

// Tipo inferido a partir do esquema Zod
export type DeleteCategoryBodySchema = z.infer<typeof deleteCategoryBodySchema>

// Implementação da validação utilizando o esquema Zod
export class ZodDeleteCategoryBodySchemaValidation
  implements Validation<DeleteCategoryBodySchema>
{
  parse(input: object | undefined) {
    return deleteCategoryBodySchema.parse(input)
  }
}
