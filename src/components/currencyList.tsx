import React from "react";
import CurrencyItem from "./currencyItem";
const CurrencyList = () => {
     return (
          <div className="main__currencyList">
               <div className="main__currencyListGlobal">
                    <p className="main__currencyListGlobalInfo">Все валюты</p>
                    <div className="main__currencyListGlobalContainer">
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                         <CurrencyItem isLike={false}></CurrencyItem>
                    </div>
               </div>
               <div className="main__currencyListLike">
                    <p className="main__currencyListLikeInfo">Понравившиеся валюты</p>
                    <div className="main__currencyListLikeContainer">
                         <CurrencyItem isLike={true}></CurrencyItem>
                    </div>
               </div>
          </div>
     );
};
export default CurrencyList;
