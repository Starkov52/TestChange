import { Router } from "express";
import { v4 as uuid } from "uuid";
import {DB} from "../main.ts"
import axios from "axios";
import type { TypeUserData } from "./postUserAPI.ts";
import { PrismaClient } from "../generated/prisma/index.js";
const RouterForGetUserAPI = Router()
const prisma = new PrismaClient()
RouterForGetUserAPI.get('/',async (req,res) => {
    const cookieID:string = req.cookies.user_id
    try {
    if(cookieID) {
       const result =  await prisma.user.findUnique({
        where:{
            user_id: cookieID
        }
       })
       if(result) {
        res.json(result)
       } else {
        res.json({message:'Пользователь не найден'})
       }
    }
    else {
        res.json({message:'Пользователь не найден'})
       }
} catch (error:any) {
    console.error('Error: ',error.message)
    res.status(502).json({error: "Не удалось получить данные с БД :("})

}
})
export default RouterForGetUserAPI

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Поиск пользователя по 'user_id'
 *     parameters:
 *       - in: cookie
 *         name: user_id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID пользователя берётся автоматически из cookie браузера, вручную указывать не нужно
 *     responses:
 *       200:
 *         description: response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 base_currency:
 *                   type: string
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *       400:
 *         description: Ошибка
 */
