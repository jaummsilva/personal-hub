import { z } from "zod";

import type { Validation } from "@/core/validation/validation";

const deleteTagBodySchema = z.object({
  tagId: z
    .string({
      invalid_type_error: "Id da tag inválido",
      required_error: "Id da tag é obrigatório",
    })
    .uuid({
      message: "Id da tag inválido",
    }),
});

// Tipo inferido a partir do esquema Zod
export type DeleteTagBodySchema = z.infer<typeof deleteTagBodySchema>;

// Implementação da validação utilizando o esquema Zod
export class ZodDeleteTagBodySchemaValidation
  implements Validation<DeleteTagBodySchema>
{
  parse(input: object | undefined) {
    return deleteTagBodySchema.parse(input);
  }
}
