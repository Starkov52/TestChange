import { Router } from "express";
import { getUser } from "../controllers/getUser";

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
const RouterForGetUserAPI = Router();
RouterForGetUserAPI.get("/", getUser);
export default RouterForGetUserAPI;
