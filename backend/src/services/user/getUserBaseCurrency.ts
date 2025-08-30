import { prisma } from "../db";
export async function getUserBaseCurrency(userId: string) {
     const user = await prisma.user
          .findUnique({
               where: { user_id: userId },
          })
          .catch((error: any) => {
               console.error("Error: " + error.message);
               throw error;
          });
     return user?.base_currency;
}
