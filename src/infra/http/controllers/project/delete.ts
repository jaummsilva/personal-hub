import { z } from "zod";

import type { Validation } from "@/core/validation/validation";
import { ProjectNotExistsError } from "@/domain/application/errors/project/project-not-exists";
import type { HttpResponse } from "@/infra/http/http-response";

import type { HttpRequest } from "../../http-request";
import { makeDeleteProjectUseCase } from "./factories/make-delete-project";

export class DeleteProjectController {
  constructor(
    private bodyValidation: Validation<{
      projectId: string;
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { projectId } = this.bodyValidation.parse(request.params);

      const deleteProjectUseCase = makeDeleteProjectUseCase();

      const result = await deleteProjectUseCase.execute({
        projectId,
      });

      if (result.isLeft()) {
        const errorMapping = new Map([[ProjectNotExistsError, 404]]);

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
