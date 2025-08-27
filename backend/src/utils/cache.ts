import { CacheType } from "../types";

export function sendCache<DATA>(data: DATA, time: number, key: string, targetCache: Record<string, CacheType<any>>) {
     targetCache[key] = {
          data: data,
          time: time + Date.now(),
     };
}

export function getCache<T>(key: string, targetObject: Record<string, CacheType<any>>): T | undefined {
     const targetCache = targetObject[key];
     if (!targetCache) {
          return undefined;
     } else if (targetCache.time > Date.now()) {
          return targetCache.data as T;
     } else if (targetCache.time < Date.now()) {
          delete targetObject[key];
          return undefined;
     }
}
