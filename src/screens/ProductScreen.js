import {
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartButton from "../components/CartButton";

function ProductScreen(props) {
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const qtyChange = (event) => {
    setQuantity(event.target.value);
  };

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const backButton = () => {
    navigate("/");
  };

  const cartClickHandler = () => {
    navigate("/cart");
  };

  const addToCartHandle = () => {
    // console.log("item : ", product._id, "qty : ", quantity);

    const exist = props.cartItems.find((x) => x.itemId === product._id);

    if (exist) {
      // let newArray = [...cartItems]
      // newArray[existIndex].qty = exist.qty + quantity ;
      const newState = props.cartItems.map((x) => {
        // if id equals product id, update country property
        if (x.itemId === product._id) {
          return { ...x, qty: exist.qty + quantity };
        }

        //  otherwise return object as is
        return x;
      });

      props.setCartItems(newState);
    } else {
      props.setCartItems([
        ...props.cartItems,
        {
          itemId: product._id,
          name: product.name,
          price: product.price,
          qty: quantity,
          img: product.imageUrl,
        },
      ]);
    }
  };

  //   useEffect(() => {
  //     console.log(props.cartItems);
  //   }, [props.cartItems]);

  useEffect(() => {
    const getProductById = async () => {
      try {
        let response = await fetch(`http://localhost:3000/api/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        let productRes = await response.json();
        if (response.status === 200) {
          setProduct(productRes);
        } else if (response.status === 401) {
          console.log("you are not autherized");
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log("not Authorized", err);
      }
    };
    getProductById();
  }, [id]);

  return (
    <>
      <div className="marginTop productTopContainer">
        <Button variant="outlined" onClick={backButton}>
          <ArrowBackSharpIcon />
        </Button>
        <div onClick={cartClickHandler}>
          <CartButton cartCount={props.cartCount} />
        </div>
      </div>

      {product ? (
        <div className="productDetail marginTop">
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <img
                className="productImage"
                src={product.imageUrl}
                alt={product.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={12} xs={12}>
                  <div className="paddingAll darkGrey">
                    <Typography variant="h4">{product.name}</Typography>
                  </div>
                  <hr />
                  <div className="paddingAll darkGrey">
                    <Typography variant="p">
                      Availability : {product.countInStock} in Stock
                    </Typography>
                  </div>
                  <hr />
                  <div className="paddingAll darkGrey">
                    <Typography variant="subtitle1">
                      Rs {product.price}
                    </Typography>
                  </div>
                  <hr />
                  <div className="paddingAll darkGrey">
                    <Chip
                      style={{ borderRadius: "0px" }}
                      label={product.brand}
                      variant="outlined"
                    />
                    <Chip
                      style={{ borderRadius: "0px" }}
                      label={product.category}
                    />
                    <div className="marginTop">
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <Card variant="outlined">
                    <div className="paddingAll darkGrey ">
                      <Typography variant="subtitle1">
                        Rs {product.price}
                      </Typography>
                    </div>
                    <hr className="liteGrey" />
                    <div className="paddingAll darkGrey">
                      <Typography variant="subtitle1">
                        Status :{" "}
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Typography>
                    </div>
                    <hr className="liteGrey" />
                    <div className="paddingAll darkGrey">
                      <Typography variant="subtitle1">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Qty
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={quantity}
                            onChange={qtyChange}
                            label="Qty"
                          >
                            <MenuItem value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                          </Select>
                        </FormControl>
                      </Typography>
                    </div>
                    <hr className="liteGrey" />
                    <div className="paddingAll">
                      {product.countInStock > 0 ? (
                        <Button
                          variant="contained"
                          sx={{ width: 1 }}
                          onClick={addToCartHandle}
                        >
                          CHECKOUT
                        </Button>
                      ) : (
                        <Button variant="contained" disabled sx={{ width: 1 }}>
                          CHECKOUT
                        </Button>
                      )}
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="marginTop">
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default ProductScreen;
