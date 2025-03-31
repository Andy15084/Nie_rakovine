import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientWithExtensions> | undefined
}

const prismaClientWithExtensions = () => {
  return new PrismaClient().$extends(withAccelerate())
}

export const prisma = globalForPrisma.prisma ?? prismaClientWithExtensions()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 