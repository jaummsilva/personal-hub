import { z } from 'zod'

import { isValidCPF } from '@/core/utils/valid-cpf'
import type { Validation } from '@/core/validation/validation'

// Definição do esquema Zod para o corpo de registro de usuário
const registerUserBodySchema = z.object({
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
})

// Tipo inferido a partir do esquema Zod
export type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

// Implementação da validação utilizando o esquema Zod
export class ZodRegisterUserBodySchemaValidation
  implements Validation<RegisterUserBodySchema>
{
  parse(input: object | undefined) {
    return registerUserBodySchema.parse(input)
  }
}
