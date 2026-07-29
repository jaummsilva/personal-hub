import type { HttpServer } from '@/infra/http/http-server'
import { ZodDeleteTagBodySchemaValidation } from '@/infra/validation/zod/tag/zod-delete-tag-body-schema-validation'
import { ZodRegisterTagBodySchemaValidation } from '@/infra/validation/zod/tag/zod-register-tag-body-schema-validation'
import { ZodUpdateTagBodySchemaValidation } from '@/infra/validation/zod/tag/zod-update-tag-body-schema-validation '

import { DeleteTagController } from '../../controllers/tag/delete'
import { UpdateTagController } from '../../controllers/tag/update'
import { RegisterTagController } from '../../controllers/tag/register'
import { FecthTagsController } from '../../controllers/tag/fetch-tags'
import { ZodFetchTagsQuerySchemaValidation } from '@/infra/validation/zod/tag/zod-fetch-tags-schema-validation'

export class TagRoutes {
  constructor(private httpServer: HttpServer) {}

  async init() {
    const isPrivateRoute = true

    const zodRegisterTagBodySchemaValidation =
      new ZodRegisterTagBodySchemaValidation()
    const registerTagController = new RegisterTagController(
      zodRegisterTagBodySchemaValidation,
    )

    this.httpServer.register(
      'post',
      '/Tag',
      registerTagController.handle.bind(registerTagController),
      isPrivateRoute,
    )

    const zodFetchTagsQuerySchemaValidation =
      new ZodFetchTagsQuerySchemaValidation()
    const fecthTagsController = new FecthTagsController(
      zodFetchTagsQuerySchemaValidation,
    )

    this.httpServer.register(
      'get',
      '/Tag',
      fecthTagsController.handle.bind(fecthTagsController),
      isPrivateRoute,
    )

    const zodUpdateTagBodySchemaValidation =
      new ZodUpdateTagBodySchemaValidation()
    const updateTagController = new UpdateTagController(
      zodUpdateTagBodySchemaValidation,
    )

    this.httpServer.register(
      'put',
      '/Tag',
      updateTagController.handle.bind(updateTagController),
      isPrivateRoute,
    )

    const zodDeleteTagBodySchemaValidation =
      new ZodDeleteTagBodySchemaValidation()
    const deleteTagController = new DeleteTagController(
      zodDeleteTagBodySchemaValidation,
    )

    this.httpServer.register(
      'delete',
      '/Tag/:TagId',
      deleteTagController.handle.bind(deleteTagController),
      isPrivateRoute,
    )
  }
}
