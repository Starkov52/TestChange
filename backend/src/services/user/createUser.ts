import { prisma } from "../db";
import { TypeUserData } from "../../types";
export async function createUser(userData: TypeUserData) {
     await prisma.$connect();
     return await prisma.user
          .create({
               data: { ...userData },
          })
          .catch((error: any) => {
               console.error("Error: " + error.message);
               throw error;
          });
}
