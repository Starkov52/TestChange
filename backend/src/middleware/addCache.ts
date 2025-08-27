import { Request, Response, NextFunction } from "express";
import { CACHE_FIVEMIN } from "../config";
type CacheType = { inner: any; time: number };
const cacheObject: Record<string, CacheType> = {};

export function addCache(req: Request, res: Response, next: NextFunction) {
     if (req.method === "GET") {
          const URLPathID: string = req.originalUrl;
          // @ts-ignore
          const targetCache: any = cacheObject[URLPathID];

          if (targetCache && targetCache.time > Date.now()) {
               res.json(targetCache.inner);
               console.log("данные из кеша");
          } else {
               const oldResponse = res.json;
               res.json = function (data: any) {
                    !(data?.message === "Пользователь не найден" || data.base === "USD")
                         ? (cacheObject[URLPathID] = {
                                inner: data,
                                time: Date.now() + CACHE_FIVEMIN,
                           })
                         : null;
                    console.log("КЕШ НА УРОВНЕ ЗАПРОСОВ");
                    return oldResponse.call(res, data);
               };
               next();
          }
     } else {
          return next();
     }
}
