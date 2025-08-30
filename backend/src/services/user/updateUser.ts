import { prisma } from "../db";
import { TypeUserData } from "../../types";

export async function updateUser(userData: TypeUserData) {
     await prisma.$connect();
     return await prisma.user
          .upsert({
               where: { user_id: userData.user_id },
               update: { ...userData },
               create: { ...userData },
          })
          .catch((error: any) => {
               console.error("Error: " + error.message);
               throw error;
          });
}
