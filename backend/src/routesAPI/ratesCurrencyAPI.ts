import { Router } from "express";
import axios from "axios";
import { Request, Response } from "express";
import {url} from "../main.ts";
import { getCache } from "./currencyAPI.ts";
import { sendCache } from "./currencyAPI.ts";
import { type cacheType } from "./currencyAPI.ts";
import { PrismaClient } from "../generated/prisma/index.js";
const routerForRates = Router()
export type ResponseCurrencyItem = {
    target:string,
    rate:string
}
type ResponseType = {
    base:string,
    targets: ResponseCurrencyItem[]
}
const prisma = new PrismaClient()
const cacheObject:Record<string,cacheType<any>> = {}
async function getDataByOuterAPI(base:string):Promise<ResponseType> {
    let result:ResponseType = {
        base: "",
        targets: [{
            target: "",
            rate: ""
        }]
    };
    await axios.get(url + `/${base}`).then((responseOuterAPI:any) => {
        
        const targets: ResponseCurrencyItem[] = []
        
        for(const [key,value] of Object.entries(responseOuterAPI.data.conversion_rates)) {
            const item:ResponseCurrencyItem = {
                target: key,
                rate:value as string
            }
            targets.push(item)
        }
        const targetCurrencyes:ResponseType ={
            base: base.toUpperCase(),
            targets: targets
        }
        result = targetCurrencyes
    }).catch((error:any) => {
        console.error('Ошибка запроса: ' + error.message)

    })
    return result
}
const allCurrency:string[] = ["USD","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XCG","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL"]
routerForRates.get("/:baseCurrency", async (request:Request,response:Response) => {
    const {baseCurrency} = request.params
    console.log(baseCurrency)
    const cache = getCache(baseCurrency!,cacheObject)
    const cookieID:string = request.cookies.user_id
   
    if(!cache) {
        try {
   if(baseCurrency && baseCurrency.length === 3 && allCurrency.includes(baseCurrency.toUpperCase())) {
    const data = await getDataByOuterAPI(baseCurrency)
    sendCache(data,1000 * 60 * 60 * 24,baseCurrency,cacheObject)
    response.json(data)
    console.log('Базовая валюта указана')
   } else if(baseCurrency === '{baseCurrency}' && cookieID) {
    const user = await prisma.user.findUnique({
        where:{
            user_id: cookieID
        }
    })
    const userBaseCurrency:string = user?.base_currency!
    const data = await getDataByOuterAPI(userBaseCurrency)
    sendCache(data,86400,userBaseCurrency,cacheObject)
    response.json(data)
    console.log('Базовая валюта не указана,но есть настройки пользователя')
   }
   
   else if(baseCurrency === '{baseCurrency}' && !cookieID) {
    const data = await getDataByOuterAPI('USD')
    sendCache(data,86400,'USD',cacheObject)
    response.json(data)
    console.log('Базовая валюта не указана и нету настроек пользователя')
   } else {
    response.json('Невалидный формат валюты')
   }
} catch(error:any) {
    console.error('Error: ' + error.message)
    response.status(502).json({error:{message: 'Произошла ошибка при взаимодействии с внешним API   0_0'}})
}

 
} else if(cache) {
const data:cacheType<ResponseType> = getCache(baseCurrency!,cacheObject)!
console.log('КЕШ НА 24 ЧАСА')
response.json(data)
}
})
export default routerForRates
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
