import { Router } from "express";
import axios from "axios";
import url from "../main.ts";
const routerForRates = Router()
type ResponseCurrencyItem = {
    target:string,
    rate:string
}
type ResponseType = {
    base:string,
    targets: ResponseCurrencyItem[]
}
async function getDataByOuterAPI(base:string):Promise<ResponseType> {
    let result:ResponseType = {
        base: "",
        targets: [{
            target: "",
            rate: ""
        }]
    };
    await axios.get(url + `/${base}`).then((responseOuterAPI) => {
        
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
        console.error(error)
        throw new Error('Ошибка запроса: ' + error.message)
    })
    return result
}
const allCurrency:string[] = ["USD","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XCG","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL"]
routerForRates.get("/:baseCurrency", async (request,response) => {
    const {baseCurrency} = request.params
   if(baseCurrency && baseCurrency.length === 3 && allCurrency.includes(baseCurrency.toUpperCase())) {
    const data = await getDataByOuterAPI(baseCurrency)
    response.json(data)
   } else if(!baseCurrency) {
    const data = await getDataByOuterAPI('USD')
    response.json(data)
   } else {
    response.json('Невалидный формат валюты')
   }
  
})
export default routerForRates