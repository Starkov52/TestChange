import axios from "axios";
import { url } from "../main.ts";
import { Request, Response } from "express";
import { CACHE_HOUR as time } from "../config/index.ts";
import { getCache, sendCache } from "../utils/cache.ts";
import { CacheType } from "../types/index.ts";
export async function getCurrency(request: Request, response: Response) {
     const cacheObject: Record<string, CacheType<any>> = {};
     try {
          const cache = getCache("currency", cacheObject);

          if (cache) {
               response.json(cache);
               console.log("КЕЕЕШ");
          } else {
               axios.get(url + "/USD")
                    .then((responseAXIOS: any) => {
                         const currencyes: string[] = Object.keys(responseAXIOS.data.conversion_rates);

                         (response.json(currencyes), sendCache(currencyes, time, "currency", cacheObject));
                    })
                    .catch((error: any) => {
                         console.error("Error: " + error.message);
                    });
          }
     } catch (error: any) {
          console.error(error.message);
          response.status(502).json({ error: "Ошибка при взаимодействии с внешним API :(" });
     }
}
