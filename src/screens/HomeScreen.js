import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CartButton from "../components/CartButton";
import Products from "../components/Products";

function HomeScreen(props) {
  const navigate = useNavigate();
  const cartClickHandler = () => {
    navigate("/cart");
  };
  return (
    <div>
      <div className="productsContainer">
        <div className="titleContainer">
          <Typography variant="h4" m="5">
            <div className="homeHeader">Latest Products</div>
          </Typography>
          <div className="marginTop20">
            <div onClick={cartClickHandler}>
              <CartButton cartCount={props.cartCount} />
            </div>
          </div>
        </div>
        <Products products={props.products} />
      </div>
    </div>
  );
}

export default HomeScreen;
