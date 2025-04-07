import { PrismaClient } from '@prisma/client';

// Create a new Prisma Client instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // Declare `prisma` on the global object for development to reuse the instance
  var prisma: PrismaClient | undefined;
}

// Use the existing instance if it exists, otherwise create a new one
const prisma = global.prisma ?? prismaClientSingleton();

// In development, assign the instance to `global.prisma`
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
