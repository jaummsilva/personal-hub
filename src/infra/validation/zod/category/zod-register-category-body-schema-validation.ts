import { z } from "zod";

import type { Validation } from "@/core/validation/validation";

const registerCategoryBodySchema = z.object({
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
  icon: z
    .string({
      required_error: "Icone é obrigatório",
      invalid_type_error: "Icone inválido",
    })
    .min(50, {
      message: "O icone deve ter no mínimo 50 caracteres",
    })
    .max(50, {
      message: "O icone deve ter no máximo 50 caracteres",
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
export type RegisterCategoryBodySchema = z.infer<
  typeof registerCategoryBodySchema
>;

// Implementação da validação utilizando o esquema Zod
export class ZodRegisterCategoryBodySchemaValidation
  implements Validation<RegisterCategoryBodySchema>
{
  parse(input: object | undefined) {
    return registerCategoryBodySchema.parse(input);
  }
}
