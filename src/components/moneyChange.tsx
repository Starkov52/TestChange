import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import SelectDefaultCurrency from "./selectDefaultCurrency";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
interface MoneyChangeType {
     currencies: string[];
     handleGetCurrencys: (from: string, to: string) => void;
     difference: string;
}
const MoneyChange: React.FC<MoneyChangeType> = ({ currencies, handleGetCurrencys, difference }) => {
     const defaultCurr: string = useSelector((state: RootState) => state.userData.userCurrency);
     const [inputCurrency, setInputCurrency] = React.useState<string>("");
     const [outputCurrency, setOutputCurrency] = React.useState<string>("");
     const [isSelectOpenSum, setIsSelectOpenSum] = React.useState<boolean>(false);
     const [isSelectOpenResult, setIsSelectOpenResult] = React.useState<boolean>(false);
     const [targetOneCurrency, setTargetOneCurrency] = React.useState<string>(defaultCurr);
     const [targetTwoCurrency, setTargetTwoCurrency] = React.useState<string>("");

     const handleCalculate = (
          event: React.ChangeEvent<HTMLInputElement> | null,
          difference: string,
          auto: boolean
     ) => {
          const value: string | undefined = event?.currentTarget.value;

          const result: number = Number(!auto ? value : inputCurrency) * Number(difference);
          value ? setInputCurrency(value) : null;
          setOutputCurrency(result.toString());
     };
     React.useEffect(() => {
          setTargetOneCurrency(defaultCurr);
     }, [defaultCurr]);
     React.useEffect(() => {
          if (targetOneCurrency !== "" && targetTwoCurrency !== "") {
               handleGetCurrencys(targetOneCurrency, targetTwoCurrency);
               handleCalculate(null, difference, true);
               setInputCurrency("");
               setOutputCurrency("");
          }
     }, [targetOneCurrency, targetTwoCurrency]);
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
                         ></input>
                         <SelectDefaultCurrency
                              onClick={() => setIsSelectOpenSum((prevState) => !prevState)}
                              isSelectOpen={isSelectOpenSum}
                              type="MAIN"
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
                              currencies={currencies}
                              onClick={() => setIsSelectOpenResult((prevState) => !prevState)}
                              isSelectOpen={isSelectOpenResult}
                              type="MAIN"
                              setTargetCurrency={setTargetTwoCurrency}
                              targetCurrency={targetTwoCurrency}
                         ></SelectDefaultCurrency>
                    </div>
               </div>
          </section>
     );
};
export default MoneyChange;
