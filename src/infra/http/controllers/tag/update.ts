import { z } from "zod";

import type { Validation } from "@/core/validation/validation";
import type { HttpResponse } from "@/infra/http/http-response";

import type { HttpRequest } from "../../http-request";
import { UserNotExistsError } from "@/domain/application/errors/user/user-not-exists";
import { TagNotExistsError } from "@/domain/application/errors/tag/tag-not-exists";
import { makeUpdateTagUseCase } from "./factories/make-update-tag-use-case";

export class UpdateTagController {
  constructor(
    private bodyValidation: Validation<{
      tagId: string;
      name: string;
      color: string;
      userId: string;
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { name, tagId, color, userId } = this.bodyValidation.parse(
        request.body,
      );

      const updateTagUseCase = makeUpdateTagUseCase();

      const result = await updateTagUseCase.execute({
        tagId,
        name,
        userId,
        color,
      });

      if (result.isLeft()) {
        const errorMapping = new Map([
          [TagNotExistsError, 404],
          [UserNotExistsError, 404],
        ]);

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
