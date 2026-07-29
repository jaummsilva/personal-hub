import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: string
      companyId?: string
      consultancyId?: string
      branchId?: string
      roleId?: string
    }
  }
}
