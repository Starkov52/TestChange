import { Router } from "express";
import { v4 as uuid } from "uuid";
import {DB} from "../main.ts"
import axios from "axios";
import type { TypeUserData } from "./postUserAPI.ts";
const RouterForGetUserAPI = Router()
RouterForGetUserAPI.get('/',(req,res) => {
    const cookieID:string = req.cookies.user_id
    if(cookieID) {

        axios.get(`${DB}/testChangeUsers.json`).then((response:any) => {
            let findUser:TypeUserData = {
                updated_at: "",
                user_id: "",
                favorites: [],
                created_at: "",
                base_currency: "s"
            };
           for(const [key,value] of Object.entries(response.data) as [string,TypeUserData][]) {
            if(value.user_id === cookieID) {
                findUser = value
                break;
               
            }
           }
           return findUser
        }).then((resp:TypeUserData) => {
if(resp?.base_currency.length > 1 && resp.created_at.length > 1 && resp?.user_id.length > 1 && resp?.updated_at.length >1) {
    res.json(resp)
} else {
    return res.status(400).json({ error: "Кука user_id отсутствует || аккаунт отсутсвтвуют в БД" });
}
        }).catch((error:any) => {
            console.error(error.message)
            throw new Error(error.message)
        })
    }
})
export default RouterForGetUserAPI