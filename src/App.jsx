import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/cart" element={<ShoppingCart />}/>
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
