import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Use the correct Prisma 7.7.0 constructor syntax
const prisma = new PrismaClient();

// Rest of the seed script remains the same...
console.log('PrismaClient created successfully!');
prisma.$disconnect();
