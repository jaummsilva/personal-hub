import type { HttpServer } from '@/infra/http/http-server'
import { ZodDeleteCategoryBodySchemaValidation } from '@/infra/validation/zod/category/zod-delete-category-body-schema-validation'
import { ZodFetchCategoriesQuerySchemaValidation } from '@/infra/validation/zod/category/zod-fetch-categories-schema-validation'
import { ZodRegisterCategoryBodySchemaValidation } from '@/infra/validation/zod/category/zod-register-category-body-schema-validation'
import { ZodUpdateCategoryBodySchemaValidation } from '@/infra/validation/zod/category/zod-update-category-body-schema-validation '

import { DeleteCategoryController } from '../../controllers/category/delete'
import { FecthCategoriesController } from '../../controllers/category/fetch-categories'
import { RegisterCategoryController } from '../../controllers/category/register'
import { UpdateCategoryController } from '../../controllers/category/update'

export class CategoryRoutes {
  constructor(private httpServer: HttpServer) {}

  async init() {
    const isPrivateRoute = true

    const zodRegisterCategoryBodySchemaValidation =
      new ZodRegisterCategoryBodySchemaValidation()
    const registerCategoryController = new RegisterCategoryController(
      zodRegisterCategoryBodySchemaValidation,
    )

    this.httpServer.register(
      'post',
      '/category',
      registerCategoryController.handle.bind(registerCategoryController),
      isPrivateRoute,
    )

    const zodFetchCategoriesQuerySchemaValidation =
      new ZodFetchCategoriesQuerySchemaValidation()
    const fecthCategoriesController = new FecthCategoriesController(
      zodFetchCategoriesQuerySchemaValidation,
    )

    this.httpServer.register(
      'get',
      '/category',
      fecthCategoriesController.handle.bind(fecthCategoriesController),
      isPrivateRoute,
    )

    const zodUpdateCategoryBodySchemaValidation =
      new ZodUpdateCategoryBodySchemaValidation()
    const updateCategoryController = new UpdateCategoryController(
      zodUpdateCategoryBodySchemaValidation,
    )

    this.httpServer.register(
      'put',
      '/category',
      updateCategoryController.handle.bind(updateCategoryController),
      isPrivateRoute,
    )

    const zodDeleteCategoryBodySchemaValidation =
      new ZodDeleteCategoryBodySchemaValidation()
    const deleteCategoryController = new DeleteCategoryController(
      zodDeleteCategoryBodySchemaValidation,
    )

    this.httpServer.register(
      'delete',
      '/category/:categoryId',
      deleteCategoryController.handle.bind(deleteCategoryController),
      isPrivateRoute,
    )
  }
}
