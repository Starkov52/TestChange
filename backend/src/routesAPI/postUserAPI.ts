import { Router } from "express";
import {DB} from "../main.ts"
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type { ResponseCurrencyItem } from "./ratesCurrencyAPI.ts";
import { PrismaClient } from "../generated/prisma/index.js";


const routerForPostUserAPI = Router()
export type TypeUserData = {
    user_id:string,
    base_currency:string,
    favorites: string[]
    created_at: string
    updated_at:string
}
const prisma = new PrismaClient()
routerForPostUserAPI.post("/", async (req,res) => {
    const cookieID:string = req.cookies.user_id
    try{
    if(cookieID) {
    const userData:TypeUserData  = {
        user_id:req.cookies.user_id.toString(),
        base_currency:req.body.base_currency,
        favorites: req.body.favorites,
        created_at: req.body.created_at,
        updated_at:new Date().toISOString().slice(0,10)
    }
   await prisma.user.upsert({
    where:{
        user_id: cookieID.toString()
    },
        update:{
           ...userData
        },
        create:{
            ...userData
        }
    }).catch((error:any) => {
        console.error('Error: ' + error.message)
    })
    res.json(userData)
} else {
    const userId = uuidv4()
    res.cookie("user_id",userId, {
    maxAge: 1000000,
    httpOnly:true,
    sameSite:'lax'

})
const userData:TypeUserData  = {
    user_id:userId.toString(),
    base_currency:req.body.base_currency,
    favorites: req.body.favorites,
    created_at: req.body.created_at,
    updated_at:new Date().toISOString().slice(0,10)
}
await prisma.user.create({
    data:{
      ...userData
    }
})
res.json(userData)
}
    } catch (error:any) {
        console.error(error.message)
        res.status(502).json({error: "Не удалось отправить данные в БД :("})
        
    }
})
export default  routerForPostUserAPI

/**
 * openapi: 3.0.0
 * @swagger
 * /api/user:
 *   post:
 *     summary: Сохранение нового объекта User
 *     requestBody:
 *       description: POST запрос к базе данных с обьектом User
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               base_currency:
 *                 type: string
 *               favorites:
 *                 type: array
 *                 items:
 *                   type: string
 *               created_at:
 *                 type: string
 *               updated_at:
 *                 type: string
 *             required:
 *               - user_id
 *               - base_currency
 *               - favorites
 *               - created_at
 *               - updated_at
 *     responses:
 *       200:
 *         description: POST
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
 *         description: Ошибка данных
 */
