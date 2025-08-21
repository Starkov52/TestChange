import { Router } from "express";
import {DB} from "../main.ts"
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type { ResponseCurrencyItem } from "./ratesCurrencyAPI.ts";

const routerForPostUserAPI = Router()
export type TypeUserData = {
    user_id:string,
    base_currency:string,
    favorites: ResponseCurrencyItem[]
    created_at: string
    updated_at:string
}
routerForPostUserAPI.post("/", async (req,res) => {
    const cookieID:string = req.cookies.user_id
    try{
    if(cookieID) {
    const userData:TypeUserData  = {
        user_id:req.cookies.user_id,
        base_currency:req.body.base_currency,
        favorites: req.body.favorites,
        created_at: req.body.created_at,
        updated_at:new Date().toISOString().slice(0,10)
    }
    axios.post(`${DB}/testChangeUsers.json`,{
        userData
    }).then((response) => {
        res.json(response)
    })
} else {
    const userId = uuidv4()
    res.cookie("user_id",userId, {
    maxAge: 1000000,
    httpOnly:true,
    sameSite:'lax'

})
const userData:TypeUserData  = {
    user_id:userId,
    base_currency:req.body.base_currency,
    favorites: req.body.favorites,
    created_at: req.body.created_at,
    updated_at:new Date().toISOString().slice(0,10)
}
axios.post(`${DB}/testChangeUsers.json`,{
    userData
}).then((response) => {
    res.json(response)
}).catch((error:any) => {
    console.error(error)
    throw new Error(error.message)
})
}
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message)
    }
})
export default  routerForPostUserAPI