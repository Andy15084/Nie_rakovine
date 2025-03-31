import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await hash('admin123', 12)
  
  try {
    const admin = await prisma.user.upsert({
      where: { email: 'admin@nierakovine.org' },
      update: {},
      create: {
        email: 'admin@nierakovine.org',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    })

    console.log('Admin user created:', admin)
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 