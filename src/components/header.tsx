import React from "react";
import { MdAccessTime } from "react-icons/md";
import SelectDefaultCurrency from "./selectDefaultCurrency";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type RootDispatch } from "../state/store";
import { changeDefaultCurrency } from "../state/mainSlice";
interface HeaderInterface {
     currencies: string[];
     currencyListIsOpen: { one: boolean; two: boolean; header: boolean };
     setCurrencyListIsOpen: React.Dispatch<
          React.SetStateAction<{ one: boolean; two: boolean; header: boolean }>
     >;
}
const Header: React.FC<HeaderInterface> = ({
     currencies,
     currencyListIsOpen,
     setCurrencyListIsOpen
}) => {
     const [time, setTime] = React.useState<string>(new Date().toString().slice(16, 25));
     const dispatch: RootDispatch = useDispatch();
     const userDefaultCurrency: string = useSelector(
          (store: RootState) => store.userData.userCurrency
     );
     const [targetCurrency, setTargetCurrency] = React.useState<string>(userDefaultCurrency);
     React.useEffect(() => {
          const timeInterval = setInterval(() => {
               const actualTime = new Date().toString().slice(16, 25);
               setTime(actualTime);
          }, 1000);
          return () => clearInterval(timeInterval);
     }, []);
     React.useEffect(() => {
          dispatch(changeDefaultCurrency({ newCurr: targetCurrency }));
          console.log("change");
     }, [targetCurrency]);
     return (
          <header className="header">
               <p className="header__titleStart">
                    Test<span className="header__titleEnd">Change</span>
               </p>
               <div className="header__links">
                    <Link to="/currencyList" className="header__currencyList">
                         Курсы валют
                    </Link>
                    <Link to="/" className="header__currencyList">
                         Конвертер валют
                    </Link>
               </div>
               <div className="header__payload">
                    <SelectDefaultCurrency
                         setCurrencyListIsOpen={setCurrencyListIsOpen}
                         currencyListIsOpen={currencyListIsOpen}
                         setTargetCurrency={setTargetCurrency}
                         targetCurrency={targetCurrency}
                         type="HEADER"
                         currencies={currencies}
                    ></SelectDefaultCurrency>
                    <div className="header__time">
                         <MdAccessTime color="grey" size={35}></MdAccessTime>
                         <p className="header__timeValue">{time}</p>
                    </div>
               </div>
          </header>
     );
};
export default Header;
