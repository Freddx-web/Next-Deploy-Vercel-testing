require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

console.log('DATABASE_URL after dotenv:', process.env.DATABASE_URL);

// Try different constructor options
const options = [
  {},
  { datasources: { db: { url: "file:./dev.db" } },
  { datasourceUrl: "file:./dev.db" },
  { dataSources: { db: { url: "file:./dev.db" } },
  { dataSourceUrl: "file:./dev.db" }
];

for (let i = 0; i < options.length; i++) {
  try {
    console.log(`Trying option ${i}:`, JSON.stringify(options[i]));
    const prisma = new PrismaClient(options[i]);
    console.log(`Option ${i} SUCCESS`);
    prisma.$disconnect();
    break;
  } catch (error) {
    console.log(`Option ${i} FAILED:`, error.message);
  }
}
