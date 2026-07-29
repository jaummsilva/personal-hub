// prisma.config.ts
import 'dotenv/config' // 1. Certifique-se de ter o dotenv instalado (npm i dotenv)

import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // 2. Adicione um fallback ou um log para debugar se necessário
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'tsx ./prisma/seed.ts',
  },
})
