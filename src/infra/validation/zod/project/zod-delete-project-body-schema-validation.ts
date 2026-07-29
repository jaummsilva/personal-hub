import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'

const deleteProjectBodySchema = z.object({
  projectId: z
    .string({
      invalid_type_error: 'Id do projeto inválido',
      required_error: 'Id do projeto é obrigatório',
    })
    .uuid({
      message: 'Id do projeto inválido',
    }),
})

// Tipo inferido a partir do esquema Zod
export type DeleteProjectBodySchema = z.infer<typeof deleteProjectBodySchema>

// Implementação da validação utilizando o esquema Zod
export class ZodDeleteProjectBodySchemaValidation
  implements Validation<DeleteProjectBodySchema>
{
  parse(input: object | undefined) {
    return deleteProjectBodySchema.parse(input)
  }
}
