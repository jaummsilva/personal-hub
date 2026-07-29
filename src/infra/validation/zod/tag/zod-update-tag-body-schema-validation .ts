import { z } from "zod";

import type { Validation } from "@/core/validation/validation";

const updateTagBodySchema = z.object({
  tagId: z
    .string({
      invalid_type_error: "Id da tag inválido",
      required_error: "Id da tag é obrigatório",
    })
    .uuid({
      message: "Id da tag inválido",
    }),
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
export type UpdateTagBodySchema = z.infer<typeof updateTagBodySchema>;

// Implementação da validação utilizando o esquema Zod
export class ZodUpdateTagBodySchemaValidation
  implements Validation<UpdateTagBodySchema>
{
  parse(input: object | undefined) {
    return updateTagBodySchema.parse(input);
  }
}
