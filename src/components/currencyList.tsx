import React from "react";
import CurrencyItem from "./currencyItem";
import { useSelector } from "react-redux";
import { type RootState } from "../state/store";
interface CurrencyListType {
     currenciesAPI: { name: string; value: string; isLike: boolean }[];
     userLikeCurrency: { name: string; value: string; isLike: boolean }[] | null;
     setCurrenciesAPI: React.Dispatch<
          React.SetStateAction<{ name: string; value: string; isLike: boolean }[]>
     >;
     handleGetCurrencys: (from: string, to: string, isList?: boolean) => any;
}

const CurrencyList = ({ currenciesAPI, userLikeCurrency }: CurrencyListType) => {
     const targetCurrency: string = useSelector((state: RootState) => state.userData.userCurrency);

     const [readyData, setReadyData] = React.useState<
          { name: string; value: string; isLike: boolean }[] | []
     >(currenciesAPI);
     const container = React.useRef<HTMLDivElement | null>(null);
     React.useEffect(() => {
          const dataWithoutDuplicat: { name: string; value: string; isLike: boolean }[] =
               currenciesAPI.filter((itemAPI: { name: string; value: string; isLike: boolean }) => {
                    return !userLikeCurrency?.some(
                         (itemLIKE: { name: string; value: string; isLike: boolean }) => {
                              return itemAPI.name === itemLIKE.name;
                         }
                    );
               });
          const userLikeCurrencyWithNewValue: { name: string; value: string; isLike: boolean }[] =
               currenciesAPI
                    .filter((item: { name: string; value: string; isLike: boolean }) => {
                         const findCurrency = userLikeCurrency?.find(
                              (itemJ) => itemJ.name === item.name
                         );
                         if (findCurrency) {
                              return item;
                         }
                    })
                    .map((i) => {
                         const newItem = {
                              ...i,
                              isLike: true
                         };
                         return newItem;
                    });
          const updateData: { name: string; value: string; isLike: boolean }[] = [
               ...(userLikeCurrencyWithNewValue || []),
               ...dataWithoutDuplicat
          ];
          setReadyData(updateData);
     }, [userLikeCurrency, targetCurrency, currenciesAPI]);

     return (
          <div className="main__currencyList">
               <div className="main__currencyListGlobal">
                    <p className="main__currencyListGlobalInfo">
                         Все валюты:
                         <span className="main__currencyListGlobalInfoDop">
                              {"1" + targetCurrency.toUpperCase()} =
                         </span>
                    </p>
                    <div ref={container} className="main__currencyListGlobalContainer">
                         {currenciesAPI.length > 1
                              ? readyData.map(
                                     (
                                          item: { name: string; value: string; isLike: boolean },
                                          index: number
                                     ) => {
                                          return (
                                               <CurrencyItem
                                                    name={item.name}
                                                    value={item.value}
                                                    isLike={item.isLike}
                                                    key={index}
                                               ></CurrencyItem>
                                          );
                                     }
                                )
                              : null}
                    </div>
               </div>
               <div className="main__currencyListLike">
                    <p className="main__currencyListLikeInfo">Понравившиеся валюты</p>
                    <div className="main__currencyListLikeContainer">
                         {userLikeCurrency?.map(
                              (item: { name: string; value: string }, index: number) => {
                                   return (
                                        <CurrencyItem
                                             name={item.name}
                                             value={"0"}
                                             isLike={true}
                                             key={index}
                                        ></CurrencyItem>
                                   );
                              }
                         )}
                    </div>
               </div>
          </div>
     );
};
export default CurrencyList;
