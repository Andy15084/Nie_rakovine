import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function changePassword() {
  const email = 'admin@nierakovine.org'; // The admin email
  const newPassword = '133580Ax'; // The new admin password

  try {
    const hashedPassword = await hash(newPassword, 12);
    
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log('Password updated successfully!');
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

changePassword(); 