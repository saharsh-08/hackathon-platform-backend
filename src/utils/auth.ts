import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaService } from "../database/prisma.service";

const prisma = new PrismaService();

export const auth = betterAuth({
  baseURL: process.env.BASE_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "PARTICIPANT",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 24 * 3600 * 30, // 30 days in seconds
    updateAge: 24 * 3600, // 24 hours in seconds
  },
});
