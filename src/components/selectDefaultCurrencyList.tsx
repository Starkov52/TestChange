import React from "react";
interface SelectDefaultCurrencyType {
     setTargetCurrency: React.Dispatch<React.SetStateAction<string>>;
     currencies: string[];
}
const SelectDefaultCurrency: React.FC<SelectDefaultCurrencyType> = ({
     setTargetCurrency,
     currencies
}) => {
     return (
          <div className="selectList">
               {currencies.map((curr: string, index: number) => {
                    return (
                         <div
                              onClick={() => setTargetCurrency(curr)}
                              key={index}
                              className="selectList__item"
                         >
                              <span className="selectList__itemName">{curr.toUpperCase()}</span>
                         </div>
                    );
               })}
          </div>
     );
};
export default SelectDefaultCurrency;
