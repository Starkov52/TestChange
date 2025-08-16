import React from "react";
import { IoMdStar } from "react-icons/io";
interface CurrencyLikeType {
     isLike: boolean;
}
const CurrencyItem: React.FC<CurrencyLikeType> = ({ isLike }) => {
     return (
          <div className="main__currencyListItem">
               <span className="main__currencyListItemName">USD</span>
               <span className="main__currencyListItemValue">3.33</span>
               <IoMdStar color={isLike ? "yellow" : "grey"} size={32}></IoMdStar>
          </div>
     );
};
export default CurrencyItem;
