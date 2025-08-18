import React from "react";
interface SelectDefaultCurrencyType {
     setTargetCurrency: React.Dispatch<React.SetStateAction<string>>;
     currencies: string[];
}
import { ListItem, ListItemText } from "@mui/material";
const SelectDefaultCurrency: React.FC<SelectDefaultCurrencyType> = ({
     setTargetCurrency,
     currencies
}) => {
     return (
          <div className="selectList">
               {currencies.map((curr: string, index: number) => {
                    return (
                         <ListItem
                              onClick={() => setTargetCurrency(curr)}
                              key={index}
                              className="selectList__item"
                         >
                              <ListItemText className="selectList__itemName">
                                   {curr.toUpperCase()}
                              </ListItemText>
                         </ListItem>
                    );
               })}
          </div>
     );
};
export default SelectDefaultCurrency;
