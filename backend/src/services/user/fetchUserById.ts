import { prisma } from "../db.ts";
export async function fetchUserById(userId: string) {
     return await prisma.user.findUnique({
          where: {
               user_id: userId,
          },
     });
}
