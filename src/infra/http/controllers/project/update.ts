import { z } from "zod";

import type { Validation } from "@/core/validation/validation";
import type { HttpResponse } from "@/infra/http/http-response";

import type { HttpRequest } from "../../http-request";
import { makeUpdateProjectUseCase } from "./factories/make-update-use-case";
import { UserNotExistsError } from "@/domain/application/errors/user/user-not-exists";
import { ProjectNotExistsError } from "@/domain/application/errors/project/project-not-exists";

export class UpdateProjectController {
  constructor(
    private bodyValidation: Validation<{
      projectId: string;
      name: string;
      icon: string;
      color: string;
      userId: string;
      description: string;
    }>,
  ) {}

  async handle(request: HttpRequest, reply: HttpResponse) {
    try {
      const { name, projectId, color, icon, userId, description } =
        this.bodyValidation.parse(request.body);

      const updateProjectUseCase = makeUpdateProjectUseCase();

      const result = await updateProjectUseCase.execute({
        projectId,
        name,
        userId,
        icon,
        color,
        description
      });

      if (result.isLeft()) {
        const errorMapping = new Map([
          [ProjectNotExistsError, 404],
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
