import { z } from "zod";

import type { Validation } from "@/core/validation/validation";

// Defina o esquema de validação
const fetchProjectsQuerySchema = z.object({
  query: z
    .string({
      invalid_type_error: "Query inválida",
    })
    .optional(),
  page: z.coerce.number().min(1).default(1),
  perPage: z
    .enum(["10", "25", "50", "100"], {
      required_error: "PerPage é obrigatório",
      message: "PerPage deve ser 10, 25, 50 ou 100",
    })
    .transform(Number)
    .default("10"),
  userId: z
    .string({
      invalid_type_error: "Id do usuário inválido",
      required_error: "Id do usuário é obrigatório",
    })
    .uuid({
      message: "Id do usuário inválido",
    })
    .optional(),
});

// Defina o tipo inferido do esquema de validação
export type FetchProjectsQuerySchema = z.infer<typeof fetchProjectsQuerySchema>;

// Implemente a validação
export class ZodFetchProjectsQuerySchemaValidation
  implements Validation<FetchProjectsQuerySchema>
{
  parse(input: object | undefined) {
    return fetchProjectsQuerySchema.parse(input);
  }
}
