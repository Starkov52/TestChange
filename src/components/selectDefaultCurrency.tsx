import React from "react";
import { MdOutlineFilterList } from "react-icons/md";
import SelectDefaultCurrencyList from "./selectDefaultCurrencyList";
interface CurrencyInterface {
     type: "HEADER" | "MAIN";
     onClick: () => void;
     isSelectOpen: boolean;
     setTargetCurrency: React.Dispatch<React.SetStateAction<string>>;
     targetCurrency: string;
}
const SelectDefaultCurrency: React.FC<CurrencyInterface> = ({
     type,
     isSelectOpen,
     onClick,
     targetCurrency,
     setTargetCurrency
}) => {
     return (
          <div
               onClick={onClick}
               className={
                    type === "HEADER"
                         ? "header__selectDefaultCurrency"
                         : "main__moneyChangeWindowSelect"
               }
          >
               <p className="header__selectDefaultCurrencyValue">{targetCurrency.toUpperCase()}</p>
               <MdOutlineFilterList size={40} color="black"></MdOutlineFilterList>
               {isSelectOpen ? (
                    <SelectDefaultCurrencyList
                         setTargetCurrency={setTargetCurrency}
                    ></SelectDefaultCurrencyList>
               ) : null}
          </div>
     );
};
export default SelectDefaultCurrency;
