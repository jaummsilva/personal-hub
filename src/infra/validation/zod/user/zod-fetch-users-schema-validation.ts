import { z } from 'zod'

import type { Validation } from '@/core/validation/validation'

// Defina o esquema de validação
const fetchUsersQuerySchema = z.object({
  query: z
    .string({
      invalid_type_error: 'Query inválida',
    })
    .optional(),
  page: z.coerce.number().min(1).default(1),
  status: z
    .enum(['S', 'N', 'ALL'], {
      message: 'Status deve S, N ou ALL',
      required_error: 'Status é obrigatório',
    })
    .default('ALL'),
  isServiceProvider: z
    .enum(['S', 'N', 'ALL'], {
      message: 'Status de provedor de serviço deve ser S, N ou ALL',
      required_error: 'Status de provedor de serviço é obrigatório',
    })
    .default('ALL'),
  perPage: z
    .enum(['10', '25', '50', '100'], {
      required_error: 'PerPage é obrigatório',
      message: 'PerPage deve ser 10, 25, 50 ou 100',
    })
    .transform(Number)
    .default('10'),
  filterBranch: z
    .string({
      invalid_type_error: 'Id da filial inválida',
    })
    .uuid({
      message: 'Id da filial inválida',
    })
    .optional(),
  filterCompany: z
    .string({
      invalid_type_error: 'Id da empresa inválida',
    })
    .uuid({
      message: 'Id da empresa inválida',
    })
    .optional(),
  filterConsultancy: z
    .string({
      invalid_type_error: 'Id da consultoria inválida',
    })
    .uuid({
      message: 'Id da consultoria inválida',
    })
    .optional(),
  filterFunction: z
    .string({
      invalid_type_error: 'Id da função inválida',
    })
    .uuid({
      message: 'Id da função inválida',
    })
    .optional(),
  filterShift: z
    .string({
      invalid_type_error: 'Id da função inválida',
    })
    .uuid({
      message: 'Id da função inválida',
    })
    .optional(),
  filterDepartment: z
    .string({
      invalid_type_error: 'Id do departamento inválida',
    })
    .uuid({
      message: 'Id do departamento inválida',
    })
    .optional(),
})

// Defina o tipo inferido do esquema de validação
export type FetchUsersQuerySchema = z.infer<typeof fetchUsersQuerySchema>

// Implemente a validação
export class ZodFetchUsersQuerySchemaValidation
  implements Validation<FetchUsersQuerySchema>
{
  parse(input: object | undefined) {
    return fetchUsersQuerySchema.parse(input)
  }
}
