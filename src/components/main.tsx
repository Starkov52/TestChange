import React from "react";
import MoneyChange from "./moneyChange";
import CurrencyList from "./currencyList";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
interface MainType {
     type: "CHANGE" | "LIST";
     currencies: string[];
}
const Main: React.FC<MainType> = ({ type, currencies }) => {
     const [difference, setDifference] = React.useState<string>("");
     const targetCurrency: string = useSelector((state: RootState) => state.userData.userCurrency);
     const userLikeCurrency: { name: string; value: string; isLike: boolean }[] | null =
          useSelector((state: RootState) => state.userData.userLikeCurrency);
     const handleGetCurrencys = async (from: string, to: string, isList?: boolean) => {
          try {
               const url: string = `https://v6.exchangerate-api.com/v6/13203235093b483f2f660a32/latest/${from}`;
               const response = await fetch(url, {
                    headers: {
                         "Content-Type": "application/json"
                    },
                    method: "GET"
               });
               const parseResponse = await response.json();
               const difference: string = parseResponse.conversion_rates[to.toUpperCase()];
               console.log(difference);
               const currencies: string[] = parseResponse.conversion_rates;
               setDifference(difference);
               if (isList) {
                    return currencies;
               }
          } catch (error: any) {
               console.error(error);
          }
     };
     const [currenciesAPI, setCurrenciesAPI] = React.useState<
          { name: string; value: string; isLike: boolean }[]
     >([]);

     React.useEffect(() => {
          const currs: { name: string; value: string; isLike: boolean }[] = [];
          handleGetCurrencys(targetCurrency, "#", true).then((res: any) => {
               for (const [key, value] of Object.entries(
                    res as { name: string; value: string; isLike: boolean }
               )) {
                    const item: { name: string; value: string; isLike: boolean } = {
                         name: key,
                         value: value as string,
                         isLike: false
                    };
                    currs.push(item);
               }
               console.log(currs);
               setCurrenciesAPI(currs);
          });
     }, [targetCurrency]);
     return (
          <main className="main">
               {type === "LIST" ? (
                    <CurrencyList
                         handleGetCurrencys={handleGetCurrencys}
                         setCurrenciesAPI={setCurrenciesAPI}
                         currenciesAPI={currenciesAPI}
                         userLikeCurrency={userLikeCurrency}
                    ></CurrencyList>
               ) : (
                    <MoneyChange
                         handleGetCurrencys={handleGetCurrencys}
                         currencies={currencies}
                         difference={difference}
                    ></MoneyChange>
               )}
          </main>
     );
};
export default Main;
