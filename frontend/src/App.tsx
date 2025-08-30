import "./index.css";
import React from "react";
import Header from "./components/header";
import Main from "./components/main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/state/store";
function App() {
     const [currencies, setCurencies] = React.useState<string[]>([
          "usd",
          "eur",
          "gbp",
          "jpy",
          "cny",
          "aud",
          "cad",
          "chf",
          "rub",
          "byn",
          "uah",
          "pln",
          "brl",
          "inr",
          "krw",
          "mxn",
          "sek",
          "nok",
          "dkk",
          "sgd",
          "hkd",
          "try",
          "aed",
          "afn",
          "all",
          "amd",
          "ang",
          "aoa",
          "ars",
          "awg",
          "azn",
          "bam",
          "bbd",
          "bdt",
          "bgn",
          "bhd",
          "bif",
          "bmd",
          "bnd",
          "bob",
          "bsd",
          "btn",
          "bwp",
          "bzd",
          "cdf",
          "clp",
          "cop",
          "crc",
          "cup",
          "cve",
          "czk",
          "djf",
          "dop",
          "dzd",
          "egp",
          "ern",
          "etb",
          "fjd",
          "fkp",
          "fok",
          "gel",
          "ghs",
          "gip",
          "gmd",
          "gnf",
          "gtq",
          "gyd",
          "hnl",
          "hrk",
          "htg",
          "huf",
          "idr",
          "ils",
          "iqd",
          "irr",
          "isk",
          "jmd",
          "jod",
          "kes",
          "kgs",
          "khr",
          "kid",
          "kmf",
          "kwd",
          "kyd",
          "kzt",
          "lak",
          "lbp",
          "lkr",
          "lrd",
          "lsl",
          "lyd",
          "mad",
          "mdl",
          "mga",
          "mkd",
          "mmk",
          "mnt",
          "mop",
          "mru",
          "mur",
          "mvr",
          "mwk",
          "myr",
          "mzn",
          "nad",
          "ngn",
          "nio",
          "npr",
          "nzd",
          "omr",
          "pab",
          "pen",
          "pgk",
          "php",
          "pkr",
          "pyg",
          "qar",
          "ron",
          "rsd",
          "rwf",
          "sar",
          "sbd",
          "scr",
          "sdg",
          "shp",
          "sle",
          "sll",
          "sos",
          "srd",
          "ssp",
          "stn",
          "svc",
          "syp",
          "szl",
          "thb",
          "tjs",
          "tmt",
          "tnd",
          "top",
          "ttd",
          "tvd",
          "twd",
          "tzs",
          "ugx",
          "uyu",
          "uzs",
          "ves",
          "vnd",
          "vuv",
          "wst",
          "xaf",
          "xcd",
          "xdr",
          "xof",
          "xpf",
          "yer",
          "zar",
          "zmw",
          "zwl"
     ]);
     const [currencyListIsOpen, setCurrencyListIsOpen] = React.useState<{
          one: boolean;
          two: boolean;
          header: boolean;
     }>({ one: false, two: false, header: false });
     React.useEffect(() => {
          const handleCloseSelect = (event: MouseEvent) => {
               const targetElement = event.target as HTMLElement;
               console.log(targetElement);
               if (!targetElement) {
                    return;
               }
               if (
                    !targetElement.closest(".header__selectDefaultCurrency") &&
                    !targetElement.closest(".main__moneyChangeWindowSelect")
               ) {
                    setCurrencyListIsOpen({
                         one: false,
                         two: false,
                         header: false
                    });
               }
          };

          window.addEventListener("click", handleCloseSelect);
          return () => window.removeEventListener("click", handleCloseSelect);
     }, []);
     return (
          <>
               <Provider store={store}>
                    <Router>
                         <Header
                              currencyListIsOpen={currencyListIsOpen}
                              setCurrencyListIsOpen={setCurrencyListIsOpen}
                              currencies={currencies}
                         ></Header>
                         <Routes>
                              <Route
                                   path="/"
                                   element={
                                        <Main
                                             currencyListIsOpen={currencyListIsOpen}
                                             setCurrencyListIsOpen={setCurrencyListIsOpen}
                                             currencies={currencies}
                                             type="CHANGE"
                                        ></Main>
                                   }
                              ></Route>
                              <Route
                                   path="/currencyList"
                                   element={
                                        <Main
                                             currencyListIsOpen={currencyListIsOpen}
                                             setCurrencyListIsOpen={setCurrencyListIsOpen}
                                             currencies={currencies}
                                             setCurrencies={setCurencies}
                                             type="LIST"
                                        ></Main>
                                   }
                              ></Route>
                         </Routes>
                    </Router>
               </Provider>
          </>
     );
}

export default App;
