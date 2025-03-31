import { PrismaClient } from '@prisma/client/edge'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma } 