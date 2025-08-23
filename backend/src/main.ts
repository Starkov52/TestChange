import express from 'express'
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

const cacheObject:Record<string,{inner: any,time:number}> = {}

function addCache(req:express.Request,res:express.Response,next:express.NextFunction) {
    if(req.method === 'GET') {
    } else {
        return next()
    }
}



app.use('/api/currency',routerForCurrencyAPI)
setupSwagger(app)
app.use("/api/rates",routerForRates)

app.use("/api/user",routerForPostUserAPI)
app.use("/api/user",RouterForGetUserAPI)
app.listen(port, () => console.log('СЕРВ ЗАПУЩЕН'))
