import { Request, Response, NextFunction } from "express";
import { CACHE_FIVEMIN } from "../config";

type CacheType = { inner: any; time: number };
const cacheObject: Record<string, CacheType> = {};

export function addCache(req: Request, res: Response, next: NextFunction) {
     if (req.method !== "GET") return next();

     const URLPathID: string = req.originalUrl;
     const targetCache: CacheType | undefined = cacheObject[URLPathID];

     if (targetCache && targetCache.time > Date.now()) {
          console.log("данные из кеша");
          return res.json(targetCache.inner);
     }

     const oldResponse = res.json;
     res.json = function (data: any) {
          if (!(data?.message === "Пользователь не найден" || data?.base === "USD")) {
               cacheObject[URLPathID] = {
                    inner: data,
                    time: Date.now() + CACHE_FIVEMIN,
               };
          }
          console.log("КЕШ НА УРОВНЕ ЗАПРОСОВ");
          return oldResponse.call(res, data);
     };

     next();
}
