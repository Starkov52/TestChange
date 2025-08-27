import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import SelectDefaultCurrencyList from "./selectDefaultCurrencyList";
import type { currencyListType } from "../types";
interface CurrencyInterface {
     type: "HEADER" | "ONE" | "TWO";

     setTargetCurrency: React.Dispatch<React.SetStateAction<string>>;
     targetCurrency: string;
     currencies: string[];
     currencyListIsOpen: currencyListType;
     setCurrencyListIsOpen: React.Dispatch<React.SetStateAction<currencyListType>>;
}
const SelectDefaultCurrency: React.FC<CurrencyInterface> = ({
     type,
     targetCurrency,
     setTargetCurrency,
     currencies,
     currencyListIsOpen,
     setCurrencyListIsOpen
}) => {
     return (
          <div
               onClick={() =>
                    setCurrencyListIsOpen((prev) => {
                         return {
                              one: type === "ONE" ? !prev.one : false,
                              two: type === "TWO" ? !prev.two : false,
                              header: type === "HEADER" ? !prev.header : false
                         };
                    })
               }
               className={
                    type === "HEADER"
                         ? "header__selectDefaultCurrency"
                         : "main__moneyChangeWindowSelect"
               }
          >
               <p className="header__selectDefaultCurrencyValue">{targetCurrency.toUpperCase()}</p>
               <MdOutlineFilterList size={40} color="black"></MdOutlineFilterList>
               {type === "HEADER" && currencyListIsOpen.header ? (
                    <SelectDefaultCurrencyList
                         currencies={currencies}
                         setTargetCurrency={setTargetCurrency}
                    ></SelectDefaultCurrencyList>
               ) : type === "ONE" && currencyListIsOpen.one ? (
                    <SelectDefaultCurrencyList
                         currencies={currencies}
                         setTargetCurrency={setTargetCurrency}
                    ></SelectDefaultCurrencyList>
               ) : type === "TWO" && currencyListIsOpen.two ? (
                    <SelectDefaultCurrencyList
                         currencies={currencies}
                         setTargetCurrency={setTargetCurrency}
                    ></SelectDefaultCurrencyList>
               ) : null}
          </div>
     );
};
export default SelectDefaultCurrency;
