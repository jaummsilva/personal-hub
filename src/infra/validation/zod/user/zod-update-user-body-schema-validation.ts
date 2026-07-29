import { z } from 'zod'

import { isValidCPF } from '@/core/utils/valid-cpf'
import type { Validation } from '@/core/validation/validation'

const updateUserBodySchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome inválido',
    })
    .min(3, {
      message: 'O nome deve ter no mínimo 3 caracteres',
    })
    .max(255, {
      message: 'O nome deve ter no máximo 255 caracteres',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
      invalid_type_error: 'Senha inválida',
    })
    .min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres',
    })
    .max(100, {
      message: 'A senha deve ter no máximo 100 caracteres',
    }),
  cpf: z
    .string({
      required_error: 'CPF é obrigatório',
      invalid_type_error: 'CPF inválido',
    })
    .max(14, {
      message: 'O CPF deve ter no máximo 14 caracteres',
    })
    .refine(isValidCPF, {
      message: 'CPF inválido',
    }),
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
export type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

// Implementação da validação utilizando o esquema Zod
export class ZodUpdateUserBodySchemaValidation
  implements Validation<UpdateUserBodySchema>
{
  parse(input: object | undefined) {
    return updateUserBodySchema.parse(input)
  }
}
