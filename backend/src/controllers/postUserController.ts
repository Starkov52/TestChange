import express from "express";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../services/db.ts";
import { TypeUserData } from "../types/index.js";
export async function postUser(req: express.Request, res: express.Response) {
     const cookieID: string = req.cookies.user_id;
     try {
          if (cookieID) {
               const userData: TypeUserData = {
                    user_id: req.cookies.user_id.toString(),
                    base_currency: req.body.base_currency,
                    favorites: req.body.favorites,
                    created_at: req.body.created_at,
                    updated_at: new Date().toISOString().slice(0, 10),
               };
               await prisma.$connect();
               await prisma.user
                    .upsert({
                         where: {
                              user_id: cookieID.toString(),
                         },
                         update: {
                              ...userData,
                         },
                         create: {
                              ...userData,
                         },
                    })
                    .catch((error: any) => {
                         console.error("Error: " + error.message);
                    });
               res.json(userData);
          } else {
               const userId = uuidv4();
               res.cookie("user_id", userId, {
                    maxAge: 1000000,
                    httpOnly: true,
                    sameSite: "lax",
               });
               const userData: TypeUserData = {
                    user_id: userId.toString(),
                    base_currency: req.body.base_currency,
                    favorites: req.body.favorites,
                    created_at: req.body.created_at,
                    updated_at: new Date().toISOString().slice(0, 10),
               };
               if (req.body.base_currency.length === 3) {
                    await prisma.user.create({
                         data: {
                              ...userData,
                         },
                    });
                    res.json(userData);
               } else {
               }
               res.json("Формат валюты должен быть ISO4217");
          }
     } catch (error: any) {
          console.error(error.message);
          res.status(502).json({ error: "Не удалось отправить данные в БД :(" });
     }
}
