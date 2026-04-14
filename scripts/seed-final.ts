import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// The working solution for Prisma 7.7.0
const prisma = new PrismaClient();

// Copy the rest of your original seed script here...
console.log('🌱 Starting seed...');

async function main() {
  try {
    console.log('PrismaClient initialized successfully!');
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully!');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
