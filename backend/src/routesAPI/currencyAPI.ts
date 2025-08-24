import { Router } from "express";
import axios from "axios";
import {url} from "../main.ts";
import { Request, Response} from "express";
const routerForCurrencyAPI = Router()
export type cacheType<data> =  {
    data:data,
    time:number
}
const cacheObject:Record<string,cacheType<any>> = {}
const time:number = 1000 * 60 * 60
export function sendCache<DATA>(data:DATA,time:number,key:string,targetCache:Record<string,cacheType<any>>){
    targetCache[key] = {
    data:data,
    time:time + Date.now()
    }
}
export function getCache<data>(key:string,targetObject:Record<string,cacheType<any>>): data | undefined  {
    const targetCache = targetObject[key]
if(!targetCache) {
    return undefined;
} else if(targetCache.time > Date.now()) {
return targetCache.data
} else if(targetCache.time < Date.now()) {
    delete cacheObject[key]
}
}
routerForCurrencyAPI.get('/',async (request:Request,response:Response) => {
try {

    const cache = getCache('currency',cacheObject)
    
    if(cache) {
response.json(cache)
console.log("КЕЕЕШ")
    } else {
        axios.get(url + '/USD').then((responseAXIOS:any) => {
            const currencyes:string[] = Object.keys(responseAXIOS.data.conversion_rates ) 
    
        response.json(currencyes),
        sendCache(currencyes,time,'currency',cacheObject)
    }).catch((error:any) => {
        console.error('Error: '+ error.message)
    })
     
    }
    
} catch (error:any) {
    console.error(error.message)
    response.status(502).json({error: "Ошибка при взаимодействии с внешним API :("})
}
})
export default routerForCurrencyAPI
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