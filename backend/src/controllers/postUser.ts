// controllers/userController.ts
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { TypeUserData } from "../types";
import { updateUser } from "../services/user/updateUser";
import { createUser } from "../services/user/createUser";

export async function postUser(req: express.Request, res: express.Response) {
     try {
          let cookieID: string = req.cookies.user_id;
          const baseCurrency: string = req.body.base_currency;
          const favorites = req.body.favorites;
          const updatedAt = new Date().toISOString().slice(0, 10);
          const createdAt = req.body.created_at || updatedAt;

          if (!baseCurrency || baseCurrency.length !== 3) {
               return res.status(400).json("Формат валюты должен быть ISO4217");
          }

          if (!cookieID) {
               cookieID = uuidv4();
               res.cookie("user_id", cookieID, {
                    maxAge: 1000000,
                    httpOnly: true,
                    sameSite: "lax",
               });
          }

          const userData: TypeUserData = {
               user_id: cookieID,
               base_currency: baseCurrency,
               favorites,
               created_at: createdAt,
               updated_at: updatedAt,
          };

          if (req.cookies.user_id) {
               await updateUser(userData);
          } else {
               await createUser(userData);
          }

          res.json(userData);
     } catch (error: any) {
          console.error("Error:", error.message);
          res.status(502).json({ error: "Не удалось отправить данные в БД :(" });
     }
}
