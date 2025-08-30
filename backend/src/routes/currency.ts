import { Router } from "express";
import { getCurrency } from "../controllers/currency";

/**
 * @swagger
 * /api/currency:
 *   get:
 *     summary: Получение списка содеражащего в себе все валюты в формате ISO4217
 *     responses:
 *      200:
 *        description: Список валют
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               type: string
 *      400:
 *        description: ОШИБКА
 *
 */
const routerForCurrencyAPI = Router();
routerForCurrencyAPI.get("/", getCurrency);
export default routerForCurrencyAPI;
