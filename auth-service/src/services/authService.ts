import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../packages/db/src/generated/prisma/index.js";
import { title } from "node:process";

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

// 2. Sign in service 
export const signinService = async ( email : string, password: string) => {
  try {
    //Finding user exist or not !
    const userExist =await  db.user.findUnique({
      where : {email}
    })
    // If user doesnot exist it will throw an error Email doesnot exist ! Sign up
    if(!userExist) {
      throw new Error("Email does not exist!");
    }

    const validatePassword = await bcrypt.compare(password, userExist.password);

    const token = jwt.sign(
    { userId: userExist.id, email: userExist.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
  return token;
  } catch (error) {
    
  }
}

export const meService = async (userId: number) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // remove password
  const { password, ...safeUser } = user;

  return safeUser;
};


export const getAllProblemsService = async (page: number, limit: number) => {
  try {
    //Talks to backend 
    const result = db.problem.findMany({
      skip: (page-1) * limit,
      take : limit
    });
    //Applies logic

    //Return result
    return result
    // 1. Write Prisma queries
    // 2. Process data if needed
    // 3. Return clean data
  } catch (error) {
    throw new Error("Error fetching problems");
  }
}

export const getSingleProblem = async (id: number) => {
  try {
    //Talk to db and apply logic 
    const result = await db.problem.findFirst({
      where : {
        id: id
      }
    })
    return result
  } catch (error) {
    throw new Error("Single Problem fetched !")
  }
}