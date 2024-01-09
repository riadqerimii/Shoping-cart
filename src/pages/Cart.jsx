import { useDispatch, useSelector } from "react-redux";
import { CiSquareRemove } from "react-icons/ci";
import cartSlice from "../state/cartSlice";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

//
function Cart() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.cartState);

  const { remove, increase, decrease, clear } = cartSlice.actions;

  const cartTotal = globalState.reduce((acc, currenValue) => {
    return acc + currenValue.price.toFixed() * currenValue.quantity;
  }, 0);

  return (
    <div className="container-cart">
      {globalState.length < 1 && (
        <div className="container-shop">
          <h1 className="h1">Your Cart is empty</h1>
          <Link to="/" className="my-cart">
            <div>Shop</div>
            <AddShoppingCartIcon className="cart-icon" />
            <div>Here</div>
          </Link>
          <div className="footer">
            <h2>@Shopping Cart</h2>
          </div>
          <hr></hr>
        </div>
      )}
      {globalState.length > 0 && (
        <>
          <div className="flex">
            <div className="title">Image</div>
            <div className="price">price</div>
            <div className="quantity">quantity</div>
            <div className="subtotal">subTotal</div>
            <div className="delete"></div>
          </div>
          {globalState.map((product) => {
            return (
              <div className="flex-item" key={product?.id}>
                <div className="title">
                  <div className="flex-one">
                    <img src={product?.image} alt={product?.id} />
                    <div className="title-title">{product?.title}</div>
                  </div>
                </div>
                <div className="price">{product?.price} $</div>
                <div className="quantity">
                  <button onClick={() => dispatch(increase(product))}>+</button>
                  {product?.quantity}
                  <button
                    onClick={() => {
                      if (product?.quantity > 1) {
                        dispatch(decrease(product));
                      } else {
                        dispatch(remove(product));
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <div className="subtotal">
                  {(product?.price * product?.quantity).toFixed()}
                </div>
                <div
                  className="delete"
                  onClick={() => dispatch(remove(product))}
                >
                  <CiSquareRemove
                    size={40}
                    color="white"
                    fontSize={"1.2rem"}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex-item-card">
            <div className="cart-full">Total $ {cartTotal} </div>
            <div className="total-text">
              <button className="total-btn" onClick={() => dispatch(clear())}>
                Clear Cart
              </button>
            </div>
            <div className="center">
              <button className="total-btn">Buy</button>
            </div>
          </div>
          <div className="footer">@Shopping Cart</div>
        </>
      )}
    </div>
  );
}

export default Cart;
