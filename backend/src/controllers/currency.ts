import axios, { AxiosResponse } from "axios";
import { EXCHANGE_API_URL as url } from "../config/index";
import { Request, Response } from "express";
import { CACHE_HOUR as time } from "../config";
import { getCache, sendCache } from "../utils/cache";
import { cacheStore } from "../utils/cache";

export async function getCurrency(request: Request, response: Response) {
     try {
          const cache = getCache("currency", cacheStore);
          if (!cache) {
               const responseAXIOS: AxiosResponse<any> = await axios.get(`${url}/USD`);
               const currencies: string[] = Object.keys(responseAXIOS.data.conversion_rates);

               response.json(currencies);
               sendCache(currencies, time, "currency", cacheStore);
          } else {
               response.json(cache);
               console.log("Кеш найден");
          }
     } catch (error: any) {
          console.error("Error:", error.message);
          response.status(502).json({ error: "Ошибка при взаимодействии с внешним API :(" });
     }
}
