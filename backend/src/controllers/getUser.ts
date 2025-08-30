import express from "express";
import { fetchUserById } from "../services/user/fetchUserById.ts";
export async function getUser(req: express.Request, res: express.Response) {
     const cookieID: string = req.cookies.user_id;

     try {
          if (!cookieID) {
               return res.json({ message: "Cookie пользователя отсутсвует" });
          }

          const user = await fetchUserById(cookieID);

          if (!user) {
               return res.json({ message: "Пользователь не найден" });
          }

          res.json(user);
     } catch (error: any) {
          console.error("Error:", error.message);
          res.status(502).json({ error: "Не удалось получить данные с БД :(" });
     }
}
