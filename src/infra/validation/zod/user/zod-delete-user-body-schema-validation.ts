import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'

const deleteUserBodySchema = z.object({
  userId: z
    .string({
      invalid_type_error: 'Id do usuário inválido',
      required_error: 'Id do usuário é obrigatório',
    })
    .uuid({
      message: 'Id do usuário inválido',
    }),
})

// Tipo inferido a partir do esquema Zod
export type DeleteUserBodySchema = z.infer<typeof deleteUserBodySchema>

// Implementação da validação utilizando o esquema Zod
export class ZodDeleteUserBodySchemaValidation
  implements Validation<DeleteUserBodySchema>
{
  parse(input: object | undefined) {
    return deleteUserBodySchema.parse(input)
  }
}
