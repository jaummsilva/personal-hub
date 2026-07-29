import type { HttpServer } from '@/infra/http/http-server'
import { ZodDeleteProjectBodySchemaValidation } from '@/infra/validation/zod/project/zod-delete-project-body-schema-validation'
import { ZodRegisterProjectBodySchemaValidation } from '@/infra/validation/zod/project/zod-register-project-body-schema-validation'
import { ZodUpdateProjectBodySchemaValidation } from '@/infra/validation/zod/project/zod-update-project-body-schema-validation '

import { DeleteProjectController } from '../../controllers/project/delete'
import { UpdateProjectController } from '../../controllers/project/update'
import { RegisterProjectController } from '../../controllers/project/register'
import { FecthProjectsController } from '../../controllers/project/fetch-projects'
import { ZodFetchProjectsQuerySchemaValidation } from '@/infra/validation/zod/project/zod-fetch-projects-schema-validation'

export class ProjectRoutes {
  constructor(private httpServer: HttpServer) {}

  async init() {
    const isPrivateRoute = true

    const zodRegisterProjectBodySchemaValidation =
      new ZodRegisterProjectBodySchemaValidation()
    const registerProjectController = new RegisterProjectController(
      zodRegisterProjectBodySchemaValidation,
    )

    this.httpServer.register(
      'post',
      '/project',
      registerProjectController.handle.bind(registerProjectController),
      isPrivateRoute,
    )

    const zodFetchProjectsQuerySchemaValidation =
      new ZodFetchProjectsQuerySchemaValidation()
    const fecthProjectsController = new FecthProjectsController(
      zodFetchProjectsQuerySchemaValidation,
    )

    this.httpServer.register(
      'get',
      '/project',
      fecthProjectsController.handle.bind(fecthProjectsController),
      isPrivateRoute,
    )

    const zodUpdateProjectBodySchemaValidation =
      new ZodUpdateProjectBodySchemaValidation()
    const updateProjectController = new UpdateProjectController(
      zodUpdateProjectBodySchemaValidation,
    )

    this.httpServer.register(
      'put',
      '/project',
      updateProjectController.handle.bind(updateProjectController),
      isPrivateRoute,
    )

    const zodDeleteProjectBodySchemaValidation =
      new ZodDeleteProjectBodySchemaValidation()
    const deleteProjectController = new DeleteProjectController(
      zodDeleteProjectBodySchemaValidation,
    )

    this.httpServer.register(
      'delete',
      '/project/:projectId',
      deleteProjectController.handle.bind(deleteProjectController),
      isPrivateRoute,
    )
  }
}
