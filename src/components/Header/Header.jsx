import React from "react";
import { NavLink } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
function Header() {
  const globalState = useSelector((state) => state.cartState);

  const cartTotal = globalState.reduce((acc, currenValue) => {
    return acc + currenValue.quantity;
  }, 0);
  return (
    <nav className="my-market sticky ">
      <NavLink to="/">Shopping Cart</NavLink>

      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink className="all-link" to="/cart">
          <span>
            <AddShoppingCartIcon />
          </span>
          <span>{cartTotal}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
