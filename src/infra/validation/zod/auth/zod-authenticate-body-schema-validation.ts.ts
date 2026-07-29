import { z } from 'zod'

import { isValidCPF } from '@/core/utils/valid-cpf'
import type { Validation } from '@/core/validation/validation'

const authenticateBodySchema = z.object({
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
  password: z
    .string({
      required_error: 'Senha é obrigatória',
      invalid_type_error: 'Senha inválida',
    })
    .min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres',
    }),
})

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

export class ZodAuthenticateBodySchemaValidation
  implements Validation<AuthenticateBodySchema>
{
  parse(input: object | undefined) {
    return authenticateBodySchema.parse(input)
  }
}
