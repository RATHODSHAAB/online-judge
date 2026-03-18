import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../packages/db/src/generated/prisma/index.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });


export const signupService = async (
  username: string,
  email: string,
  password: string
) => {
  // 1. Check if user exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const newUser = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  // 4. Generate JWT
  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // 5. Return result
  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
    token,
  };
};

