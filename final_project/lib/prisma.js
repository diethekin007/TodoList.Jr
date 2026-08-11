const { PrismaClient } = require('../generated/prisma/index.js')

// Prevent multiple instances of Prisma Client in development
// In production (Vercel), create a single instance
let prisma

if (!global._prismaClient) {
  global._prismaClient = new PrismaClient({
    log: ['error'],
  })
}

prisma = global._prismaClient

module.exports = prisma
