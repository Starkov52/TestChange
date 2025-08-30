import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import SelectDefaultCurrency from "./selectDefaultCurrency";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import type { currencyListType } from "../types";
interface MoneyChangeType {
     currencies: string[];
     handleGetCurrencys: (from: string, to: string) => void;
     difference: string;
     currencyListIsOpen: currencyListType;
     setCurrencyListIsOpen: React.Dispatch<React.SetStateAction<currencyListType>>;
}
const MoneyChange: React.FC<MoneyChangeType> = ({
     currencies,
     handleGetCurrencys,
     difference,
     currencyListIsOpen,
     setCurrencyListIsOpen
}) => {
     const defaultCurr: string = useSelector((state: RootState) => state.userData.userCurrency);
     const [inputCurrency, setInputCurrency] = React.useState<string>("");
     const [outputCurrency, setOutputCurrency] = React.useState<string>("");
     const [targetOneCurrency, setTargetOneCurrency] = React.useState<string>(defaultCurr);
     const [targetTwoCurrency, setTargetTwoCurrency] = React.useState<string>("usd");

     const handleCalculate = (
          event: React.ChangeEvent<HTMLInputElement> | null,
          difference: string,
          auto: boolean
     ) => {
          if (targetTwoCurrency) {
               const value: string | undefined = event?.currentTarget.value;

               const result: number = Number(!auto ? value : inputCurrency) * Number(difference);
               const newInput: string = auto ? inputCurrency : (value as string);

               if (!Number.isNaN(result)) {
                    setInputCurrency(newInput);
                    setOutputCurrency(result.toString());
               } else if (Number.isNaN(value) && event) {
                    event.currentTarget.placeholder = "Введите число!";
                    event.currentTarget.style.background = "red";
               }
          }
     };
     React.useEffect(() => {
          setTargetOneCurrency(defaultCurr);
     }, [defaultCurr]);
     React.useEffect(() => {
          if (targetOneCurrency !== "" && targetTwoCurrency !== "") {
               handleGetCurrencys(targetOneCurrency, targetTwoCurrency);
          }
     }, [targetOneCurrency, targetTwoCurrency]);
     React.useEffect(() => {
          if (targetOneCurrency !== "" && targetTwoCurrency !== "" && inputCurrency !== "") {
               handleCalculate(null, difference, true);
          }
     }, [difference]);
     React.useEffect(() => {
          handleGetCurrencys(targetOneCurrency, targetTwoCurrency);
     }, [difference]);
     return (
          <section className="main__moneyChange">
               <p className="main__moneyChangeInfo">Среднерыночный обменный курс</p>
               <div className="main__moneyChangeCourse">
                    <span className="main__menyChangeCourseOne">
                         1 {targetOneCurrency.toUpperCase()} =
                    </span>
                    <span className="main__menyChangeCourseTwo">
                         {" "}
                         {difference} {targetTwoCurrency.toUpperCase()}
                    </span>
               </div>
               <div className="main__moneyChangeWindow">
                    <div className="main__moneyChangeWindowSum">
                         <p className="main__moneyChangeWindowSumLabel">Сумма</p>
                         <input
                              onChange={(event) => handleCalculate(event, difference, false)}
                              type="text"
                              className="main__moneyChangeWindowSumInput"
                              value={inputCurrency}
                              placeholder="Введите необходимую сумму"
                         ></input>
                         <SelectDefaultCurrency
                              setCurrencyListIsOpen={setCurrencyListIsOpen}
                              currencyListIsOpen={currencyListIsOpen}
                              type="ONE"
                              setTargetCurrency={setTargetOneCurrency}
                              targetCurrency={targetOneCurrency}
                              currencies={currencies}
                         ></SelectDefaultCurrency>
                    </div>
                    <FaExchangeAlt size={40} color="blue"></FaExchangeAlt>
                    <div className="main__moneyChangeWindowResult">
                         <p className="main__moneyChangeWindowResultLabel">Итог</p>
                         <input
                              type="text"
                              className="main__moneyChangeWindowResultInput"
                              onChange={() => setOutputCurrency("")}
                              value={Number(outputCurrency).toFixed(2)}
                         ></input>
                         <SelectDefaultCurrency
                              currencyListIsOpen={currencyListIsOpen}
                              setCurrencyListIsOpen={setCurrencyListIsOpen}
                              currencies={currencies}
                              type="TWO"
                              setTargetCurrency={setTargetTwoCurrency}
                              targetCurrency={targetTwoCurrency}
                         ></SelectDefaultCurrency>
                    </div>
               </div>
          </section>
     );
};
export default MoneyChange;
