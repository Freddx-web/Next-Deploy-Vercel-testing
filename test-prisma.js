const { PrismaClient } = require('@prisma/client');

console.log('DATABASE_URL:', process.env.DATABASE_URL);

try {
  const prisma = new PrismaClient();
  console.log('PrismaClient created successfully');
  prisma.$disconnect();
} catch (error) {
  console.error('Error creating PrismaClient:', error.message);
}
