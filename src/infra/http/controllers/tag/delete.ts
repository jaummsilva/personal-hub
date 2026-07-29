import { z } from "zod";

import type { Validation } from "@/core/validation/validation";
import type { HttpResponse } from "@/infra/http/http-response";

import type { HttpRequest } from "../../http-request";
import { makeDeleteTagUseCase } from "./factories/make-delete-tag-use-case";
import { TagNotExistsError } from "@/domain/application/errors/tag/tag-not-exists";

export class DeleteTagController {
  constructor(
    private bodyValidation: Validation<{
      tagId: string;
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { tagId } = this.bodyValidation.parse(request.params);

      const deleteTagUseCase = makeDeleteTagUseCase();

      const result = await deleteTagUseCase.execute({
        tagId,
      });

      if (result.isLeft()) {
        const errorMapping = new Map([[TagNotExistsError, 404]]);

        for (const [ErrorClass, statusCode] of errorMapping) {
          if (result.value instanceof ErrorClass) {
            return reply
              .status(statusCode)
              .json({ message: result.value.message });
          }
        }
      }

      return reply.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return reply.status(400).json({
          message: errorMessages[0],
        });
      }
    }
  }
}
