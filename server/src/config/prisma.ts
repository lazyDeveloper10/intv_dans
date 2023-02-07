import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
interface PrismaInterface {
    prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development
declare const global: PrismaInterface

export const prisma = global.prisma || new PrismaClient()
