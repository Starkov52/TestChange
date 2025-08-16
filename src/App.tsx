import "./index.css";
import Header from "./components/header";
import Main from "./components/main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/state/store";
function App() {
     return (
          <>
               <Provider store={store}>
                    <Router>
                         <Header></Header>
                         <Routes>
                              <Route path="/" element={<Main type="CHANGE"></Main>}></Route>
                              <Route
                                   path="/currencyList"
                                   element={<Main type="LIST"></Main>}
                              ></Route>
                         </Routes>
                    </Router>
               </Provider>
          </>
     );
}

export default App;
