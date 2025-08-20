import express from 'express'
import cors from "cors"
import routerForCurrencyAPI from './routesAPI/currencyAPI.ts'
import routerForRates from './routesAPI/ratesCurrencyAPI.ts'
import cookieParser from 'cookie-parser'
const app = express()
const port:number = 3000
const url: string = `https://v6.exchangerate-api.com/v6/13203235093b483f2f660a32/latest`;
app.use(express.json()) 
app.use(cors())
app.use(cookieParser())
app.use('/api/currency',routerForCurrencyAPI)


app.use("/api/rates",routerForRates)

app.listen(port, () => console.log('СЕРВ ЗАПУЩЕН'))
export default url