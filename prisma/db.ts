import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const client =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['info'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;

export default client;