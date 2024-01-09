import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home url="https://fakestoreapi.com/products" />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
