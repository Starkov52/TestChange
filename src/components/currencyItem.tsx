import React from "react";
import { IoMdStar } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addLikeCurrency } from "../state/mainSlice";
import { type RootDispatch } from "../state/store";
interface CurrencyLikeType {
     isLike: boolean;
     name: string;
     value: string;
}
const CurrencyItem: React.FC<CurrencyLikeType> = ({ isLike, name, value }) => {
     const dispatch: RootDispatch = useDispatch();
     const handleAddLike = (name: string, value: string) => {
          dispatch(addLikeCurrency({ newLikeCurr: { name: name, value: value } }));
     };
     return (
          <div
               onClick={() => {
                    !isLike ? handleAddLike(name, value) : null;
               }}
               className="main__currencyListItem"
               style={{
                    background: isLike ? "gold" : null!
               }}
          >
               <span className="main__currencyListItemName">{name}</span>
               <span className="main__currencyListItemValue">{Number(value).toFixed(2)}</span>
               <IoMdStar
                    className="main__currencyListItemLike"
                    color={isLike ? "yellow" : "grey"}
                    size={32}
               ></IoMdStar>
          </div>
     );
};
export default CurrencyItem;
