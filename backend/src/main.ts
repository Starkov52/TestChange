import express, { Request, Response, NextFunction } from 'express';
import cors from "cors"
import routerForCurrencyAPI from './routesAPI/currencyAPI.ts'
import routerForRates from './routesAPI/ratesCurrencyAPI.ts'
import cookieParser from 'cookie-parser'
import routerForPostUserAPI from './routesAPI/postUserAPI.ts'
import RouterForGetUserAPI from './routesAPI/getUserAPI.ts'
import { setupSwagger } from './swagger.ts'
const app = express()
const port:number = 3000
export const url: string = `https://v6.exchangerate-api.com/v6/13203235093b483f2f660a32/latest`;
export const DB:string = "https://telegrambotfishcombat-default-rtdb.firebaseio.com/"
app.use(express.json()) 
app.use(cors())
app.use(cookieParser())
type CacheType = {
    inner: any,time:number
}
const cacheObject:Record<string,CacheType> = {}

function addCache(req:Request,res:Response,next:NextFunction) {
    if(req.method === 'GET') {
        const URLPathID:string = req.originalUrl
        // @ts-ignore
        const targetCache:any = cacheObject[URLPathID]
        if(targetCache && targetCache.time > Date.now()) {
            res.json(targetCache?.inner)
            console.log('данные из кеша')
        } else  { 
    const oldResponse = res.json 
    res.json = function (data:any) {
   
        !(data?.message === 'Пользователь не найден') ? cacheObject[URLPathID]! = {
        inner: data,
        time: Date.now() + 300000
    } : null
    console.log('КЕШ НА УРОВНЕ ЗАПРОСОВ')
    return oldResponse.call(res,data)
}
next()
        } 
    }else { 
return next()
    }
}

app.use(addCache)

app.use('/api/currency',routerForCurrencyAPI)
setupSwagger(app)
app.use("/api/rates",routerForRates)

app.use("/api/user",routerForPostUserAPI)
app.use("/api/user",RouterForGetUserAPI)
app.listen(port, '0.0.0.0', () => console.log('СЕРВ ЗАПУЩЕН'))
