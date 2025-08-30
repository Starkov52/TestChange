import axios from "axios";
import { ResponseType, ResponseCurrencyItem } from "../types";
import { EXCHANGE_API_URL as url } from "../config/index";
export async function getDataByOuterAPI(base: string): Promise<ResponseType> {
     let result: ResponseType = {
          base: "",
          targets: [
               {
                    target: "",
                    rate: "",
               },
          ],
     };
     await axios
          .get(url + `/${base}`)
          .then((responseOuterAPI: any) => {
               const targets: ResponseCurrencyItem[] = [];

               for (const [key, value] of Object.entries(responseOuterAPI.data.conversion_rates)) {
                    const item: ResponseCurrencyItem = {
                         target: key,
                         rate: value as string,
                    };
                    targets.push(item);
               }
               const targetCurrencyes: ResponseType = {
                    base: base.toUpperCase(),
                    targets: targets,
               };
               result = targetCurrencyes;
          })
          .catch((error: any) => {
               console.error("Ошибка запроса: " + error.message);
          });
     return result;
}
