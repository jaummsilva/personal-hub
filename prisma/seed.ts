import { hash } from 'bcryptjs'

import { prisma } from '@/infra/database/prisma/prisma'

async function main() {
  const name = 'João Vitor da Silva'

  console.log('🌱 Seeding database...')

  const user = await prisma.user.upsert({
    where: { cpf: '000.000.000-00' },
    update: {},
    create: {
      name,
      passwordHash: await hash('12345678', 10),
      cpf: '000.000.000-00',
    },
  })

  console.log(`✅ User ${user.name} created or already exists.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
