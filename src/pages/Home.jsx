import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSLice from "../state/cartSlice";
import axios from "axios";

function Home({ url }) {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchingData() {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);

      if (!data) {
        setError("some error");
        setLoading(false);
      } else {
        setMyData(data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.cartState);
  const { add } = cartSLice.actions;
  console.log(globalState);

  if (loading) {
    return (
      <div className="container-spinner">
        <p className="spinner"></p>
      </div>
    );
  }

  if (error) {
    return <div>Some Error! Try again</div>;
  }

  return (
    <div className="grid-system">
      {myData && myData.length > 0
        ? myData.map((product) => (
            <div className="cards" key={product.id}>
              <img src={product.image} alt={product.id} />
              <div className="width-btn">
                <button
                  className="add-button"
                  onClick={() => dispatch(add({ ...product, quantity: 1 }))}
                >
                  Add to Cart
                </button>
              </div>
              <div className="product-price">
                <div>{product.price} $</div>
                <div>{product.title.slice(0, 10)}</div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default Home;
