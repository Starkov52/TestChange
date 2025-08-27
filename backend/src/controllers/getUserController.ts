import express from "express";
import { prisma } from "../services/db.ts";

export async function getUser(req: express.Request, res: express.Response) {
     const cookieID: string = req.cookies.user_id;
     try {
          if (cookieID) {
               const result = await prisma.user.findUnique({
                    where: {
                         user_id: cookieID,
                    },
               });
               if (result) {
                    res.json(result);
               } else {
                    res.json({ message: "Пользователь не найден" });
               }
          } else {
               res.json({ message: "Пользователь не найден" });
          }
     } catch (error: any) {
          console.error("Error: ", error.message);
          res.status(502).json({ error: "Не удалось получить данные с БД :(" });
     }
}
