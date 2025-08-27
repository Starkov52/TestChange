import { Router } from "express";
import { ratesCurrency } from "../controllers/ratesCurrencyController";
const routerForRates = Router();
routerForRates.get("/:baseCurrency", ratesCurrency);
export default routerForRates;
/**
 * @swagger
 * /api/rates/{baseCurrency}:
 *   get:
 *     summary: Получение курсов валют относительно базовой валюты
 *     parameters:
 *       - in: path
 *         name: baseCurrency
 *         required: false
 *         schema:
 *           type: string
 *         description: Базовая валюта (например, USD)
 *     responses:
 *       200:
 *         description: Список курсов валют
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base:
 *                   type: string
 *                 targets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       target:
 *                         type: string
 *                       rate:
 *                         type: string
 *       400:
 *         description: Невалидный формат валюты
 */
