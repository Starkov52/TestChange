import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import SelectDefaultCurrency from "./selectDefaultCurrency";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
interface MoneyChangeType {}
const MoneyChange: React.FC<MoneyChangeType> = () => {
     const defaultCurr: string = useSelector((state: RootState) => state.userData.userCurrency);
     const [inputCurrency, setInputCurrency] = React.useState<string>("");
     const [outputCurrency, setOutputCurrency] = React.useState<string>("");
     const [isSelectOpenSum, setIsSelectOpenSum] = React.useState<boolean>(false);
     const [isSelectOpenResult, setIsSelectOpenResult] = React.useState<boolean>(false);
     const [targetOneCurrency, setTargetOneCurrency] = React.useState<string>(defaultCurr);
     const [targetTwoCurrency, setTargetTwoCurrency] = React.useState<string>("");
     const [difference, setDifference] = React.useState<string>("");
     const handleGetCurrencys = async (from: string, to: string) => {
          try {
               const url: string = `https://v6.exchangerate-api.com/v6/13203235093b483f2f660a32/latest/${from}`;
               const response = await fetch(url, {
                    headers: {
                         "Content-Type": "application/json"
                    },
                    method: "GET"
               });
               const parseResponse = await response.json();
               const difference: string = parseResponse.conversion_rates[to.toUpperCase()];
               console.log(difference);
               setDifference(difference);
          } catch (error: any) {
               console.error(error);
          }
     };
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
                         ></SelectDefaultCurrency>
                    </div>
                    <FaExchangeAlt size={40} color="blue"></FaExchangeAlt>
                    <div className="main__moneyChangeWindowResult">
                         <p className="main__moneyChangeWindowResultLabel">Итог</p>
                         <input
                              type="text"
                              className="main__moneyChangeWindowResultInput"
                              onChange={() => setOutputCurrency("")}
                              value={outputCurrency.slice(0, 5)}
                         ></input>
                         <SelectDefaultCurrency
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
