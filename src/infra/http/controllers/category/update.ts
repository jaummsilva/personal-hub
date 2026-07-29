import { z } from "zod";

import type { Validation } from "@/core/validation/validation";
import { CategoryNotExistsError } from "@/domain/application/errors/category/category-not-exists";
import type { HttpResponse } from "@/infra/http/http-response";

import type { HttpRequest } from "../../http-request";
import { makeUpdateCategoryUseCase } from "./factories/make-update-use-case";
import { UserNotExistsError } from "@/domain/application/errors/user/user-not-exists";

export class UpdateCategoryController {
  constructor(
    private bodyValidation: Validation<{
      categoryId: string;
      name: string;
      icon: string;
      color: string;
      userId: string;
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { name, categoryId, color, icon, userId } =
        this.bodyValidation.parse(request.body);

      const updateCategoryUseCase = makeUpdateCategoryUseCase();

      const result = await updateCategoryUseCase.execute({
        categoryId,
        name,
        userId,
        icon,
        color,
      });

      if (result.isLeft()) {
        const errorMapping = new Map([
          [CategoryNotExistsError, 404],
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
