import type { HttpServer } from '@/infra/http/http-server'
// import { ZodDeleteUserBodySchemaValidation } from '@/infra/validation/zod/user/zod-delete-user-body-schema-validation'
import { ZodRegisterUserBodySchemaValidation } from '@/infra/validation/zod/user/zod-register-user-body-schema-validation'
import { ZodUpdateUserBodySchemaValidation } from '@/infra/validation/zod/user/zod-update-user-body-schema-validation'
import { RegisterAppUserController } from '../../controllers/user/register'
import { FecthUsersController } from '../../controllers/user/fetch-users'
import { UpdateUserController } from '../../controllers/user/update'
import { ZodFetchUsersQuerySchemaValidation } from '@/infra/validation/zod/user/zod-fetch-users-schema-validation'

export class UserRoutes {
  constructor(private httpServer: HttpServer) {}

  async init() {
    const isPrivateRoute = true
    const zodRegisterUserBodySchemaValidation =
      new ZodRegisterUserBodySchemaValidation()
    const userController = new RegisterAppUserController(
      zodRegisterUserBodySchemaValidation,
    )

    this.httpServer.register(
      'post',
      '/user',
      userController.handle.bind(userController),
      isPrivateRoute,
    )

    const zodFetchUsersBodySchemaValidation =
      new ZodFetchUsersQuerySchemaValidation()
    const fetchUsersController = new FecthUsersController(
      zodFetchUsersBodySchemaValidation,
    )

    this.httpServer.register(
      'get',
      '/user',
      fetchUsersController.handle.bind(fetchUsersController),
      isPrivateRoute,
    )

    const zodUpdateUserBodySchemaValidation =
      new ZodUpdateUserBodySchemaValidation()
    const updateUsercontroller = new UpdateUserController(
      zodUpdateUserBodySchemaValidation,
    )

    this.httpServer.register(
      'put',
      '/user',
      updateUsercontroller.handle.bind(updateUsercontroller),
      isPrivateRoute,
    )

    // const zodDeleteUserBodySchemaValidation =
    //   new ZodDeleteUserBodySchemaValidation()
    // const deleteUserController = new DeleteUserController(
    //   zodDeleteUserBodySchemaValidation,
    // )

    // this.httpServer.register(
    //   'delete',
    //   '/admin/user/:userId',
    //   deleteUserController.handle.bind(deleteUserController),
    //   isPrivateRoute,
    // )
  }
}
