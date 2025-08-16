import React from "react";
import MoneyChange from "./moneyChange";
import CurrencyList from "./currencyList";
interface MainType {
     type: "CHANGE" | "LIST";
}
const Main: React.FC<MainType> = ({ type }) => {
     return (
          <main className="main">
               {type === "LIST" ? <CurrencyList></CurrencyList> : <MoneyChange></MoneyChange>}
          </main>
     );
};
export default Main;
