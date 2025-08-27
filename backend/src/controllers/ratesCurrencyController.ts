import express from "express";

import { getCache } from "../utils/cache.ts";
import { sendCache } from "../utils/cache.ts";
import { type CacheType } from "../types/index.ts";
import { prisma } from "../services/db.ts";
import { currencies as allCurrency } from "../constans.ts";
import { CACHE_DAY as time } from "../config/index.ts";
import { ResponseType } from "../types/index.ts";
import { getDataByOuterAPI } from "../utils/dataOuterAPI.ts";
export async function ratesCurrency(request: express.Request, response: express.Response) {
     const cacheObject: Record<string, CacheType<any>> = {};
     const { baseCurrency } = request.params;
     console.log(baseCurrency);
     const cache = getCache(baseCurrency!, cacheObject);
     const cookieID: string = request.cookies.user_id;

     if (!cache) {
          try {
               if (baseCurrency && baseCurrency.length === 3 && allCurrency.includes(baseCurrency.toUpperCase())) {
                    const data = await getDataByOuterAPI(baseCurrency);
                    sendCache(data, time, baseCurrency, cacheObject);
                    response.json(data);
                    console.log("Базовая валюта указана");
               } else if (baseCurrency === "{baseCurrency}" && cookieID) {
                    const user = await prisma.user.findUnique({
                         where: {
                              user_id: cookieID,
                         },
                    });
                    const userBaseCurrency: string = user?.base_currency!;
                    const data = await getDataByOuterAPI(userBaseCurrency);
                    sendCache(data, time, userBaseCurrency, cacheObject);
                    response.json(data);
                    console.log("Базовая валюта не указана,но есть настройки пользователя");
               } else if (baseCurrency === "{baseCurrency}" && !cookieID) {
                    const data = await getDataByOuterAPI("USD");
                    sendCache(data, time, "USD", cacheObject);
                    response.json(data);
                    console.log("Базовая валюта не указана и нету настроек пользователя");
               } else {
                    response.json("Невалидный формат валюты");
               }
          } catch (error: any) {
               console.error("Error: " + error.message);
               response.status(502).json({ error: { message: "Произошла ошибка при взаимодействии с внешним API   0_0" } });
          }
     } else if (cache) {
          const data: CacheType<ResponseType> = getCache(baseCurrency!, cacheObject)!;
          console.log("КЕШ НА 24 ЧАСА");
          response.json(data);
     }
}
