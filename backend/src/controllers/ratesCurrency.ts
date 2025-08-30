import express from "express";
import { getCache, sendCache } from "../utils/cache";
import { ResponseType, CacheType } from "../types";
import { currencies as allCurrency } from "../constans";
import { CACHE_DAY as time } from "../config";
import { getUserBaseCurrency } from "../services/user/getUserBaseCurrency";
import { getDataByOuterAPI } from "../utils/dataOuterAPI";
import { cacheStore as cacheObject } from "../utils/cache";
export async function ratesCurrency(request: express.Request, response: express.Response) {
     const { baseCurrency } = request.params;
     const cookieID: string = request.cookies.user_id;
     const nullParametres: string = "{baseCurrency}";
     const cache = getCache(baseCurrency!, cacheObject);
     let targetBaseCurrency: string = "USD";
     if (!cache) {
          try {
               if (baseCurrency && baseCurrency.length === 3 && allCurrency.includes(baseCurrency.toUpperCase())) {
                    targetBaseCurrency = baseCurrency;
                    console.log("Базовая валюта указана");
               } else if (baseCurrency === nullParametres && cookieID) {
                    const userBaseCurrency = await getUserBaseCurrency(cookieID);
                    targetBaseCurrency = userBaseCurrency!;
                    console.log("Базовая валюта не указана,но есть настройки пользователя");
               } else if (baseCurrency === nullParametres && !cookieID) {
                    targetBaseCurrency = "USD";
                    console.log("Базовая валюта не указана и нету настроек пользователя");
               } else {
                    response.json("Невалидный формат валюты");
               }
               const data = await getDataByOuterAPI(targetBaseCurrency);
               sendCache(data, time, targetBaseCurrency, cacheObject);
               response.json(data);
          } catch (error: any) {
               console.error("Error: " + error.message);
               response.status(502).json({ error: { message: "Произошла ошибка при взаимодействии с внешним API   0_0" } });
          }
          return;
     } else {
          console.log("КЕШ НА 24 ЧАСА");
          response.json(cache);
     }
}
