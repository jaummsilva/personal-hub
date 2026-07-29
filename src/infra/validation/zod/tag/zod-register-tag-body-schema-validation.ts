import { z } from "zod";

import type { Validation } from "@/core/validation/validation";

const registerTagBodySchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome inválido",
    })
    .min(3, {
      message: "O nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "O nome deve ter no máximo 255 caracteres",
    }),
  color: z
    .string({
      required_error: "Cor é obrigatória",
      invalid_type_error: "Cor inválida",
    })
    .min(20, {
      message: "A cor deve ter no mínimo 20 caracteres",
    })
    .max(20, {
      message: "A cor deve ter no máximo 20 caracteres",
    }),
  userId: z
    .string({
      invalid_type_error: "Id do usuário inválido",
      required_error: "Id do usuário é obrigatório",
    })
    .uuid({
      message: "Id do usuário inválido",
    }),
});

// Tipo inferido a partir do esquema Zod
export type RegisterTagBodySchema = z.infer<typeof registerTagBodySchema>;

// Implementação da validação utilizando o esquema Zod
export class ZodRegisterTagBodySchemaValidation
  implements Validation<RegisterTagBodySchema>
{
  parse(input: object | undefined) {
    return registerTagBodySchema.parse(input);
  }
}
