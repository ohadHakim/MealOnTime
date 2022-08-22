import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//import Counter from "./Counter/Counter";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import Order from "./Order/Order";

function App() {
  return (
    //  <Counter initCounter={1000}/>
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu defaultDisplay="grid" />} />
          <Route path="order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
