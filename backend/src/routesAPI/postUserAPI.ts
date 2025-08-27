import { Router } from "express";
import { postUser } from "../controllers/postUserController";
const routerForPostUserAPI = Router();
routerForPostUserAPI.post("/", postUser);
export default routerForPostUserAPI;

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
