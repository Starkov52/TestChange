import { Router } from "express";
import axios from "axios";
import url from "../main.ts";
const routerForCurrencyAPI = Router()
type cacheType<data> =  {
    data:data,
    time:number
}
const cacheObject:Record<string,cacheType<any>> = {}
const time:number = 60 * 60
function sendCache<DATA>(data:DATA,time:number,key:string){
    cacheObject[key] = {
    data:data,
    time:time + Date.now()
    }
}
function getCache<data>(key:string): data | undefined  {
    const targetCahce = cacheObject[key]
if(!targetCahce) {
    return undefined;
} else if(targetCahce.time > Date.now()) {
return targetCahce.data
} else if(targetCahce.time < Date.now()) {
    delete cacheObject[key]
}
}
routerForCurrencyAPI.get('/',async (request,response) => {
try {

    const cache = getCache('currency')
    
    if(cache) {
response.json(cache)
console.log("КЕЕЕШ")
    } else {
        axios.get(url + '/USD').then((responseAXIOS) => {
            const currencyes:string[] = Object.keys(responseAXIOS.data.conversion_rates)
    
        response.json(currencyes),
        sendCache(currencyes,time,'currency')
    })
     
    }
    
} catch (error) {
    console.error(error)
}
})
export default routerForCurrencyAPI