import {
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function CartScreen(props) {
  const navigate = useNavigate();
  const backButton = () => {
    navigate(-1);
  };

  let totalQty = 0;
  let totalPrice = 0;

  const checkoutHandle = () => {
    // console.log("Items : ", props.cartItems);

    navigate("/checkout/shippingaddress");
  };

  const getTotalQty = () => {
    props.cartItems.map((item) => {
      totalQty = totalQty + item.qty;
      return totalQty;
    });
  };

  getTotalQty();

  const getTotalPrice = () => {
    props.cartItems.map((item) => {
      totalPrice = totalPrice + item.price * item.qty;
      return totalPrice;
    });
  };

  getTotalPrice();

  const binHandler = (index) => {
    // console.log(index);
    let newArray = props.cartItems;
    newArray.splice(index, 1);
    props.setCartItems([...newArray]);
  };

  return (
    <div>
      <div className="marginTop">
        <Button variant="outlined" onClick={backButton}>
          <ArrowBackSharpIcon />
        </Button>
      </div>

      <div className="marginTop">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Shopping cart
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <div className="carttItemList">
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                  <Demo>
                    <List>
                      {props.cartItems.map((product, index) => {
                        let price = `Rs ${product.price}`;
                        let qty = `${product.qty} x`;
                        return (
                          <div key={index}>
                            <ListItem>
                              <ListItemText primary={qty} />
                            </ListItem>
                            <ListItem
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={(event) => binHandler(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ borderRadius: 0 }}
                                  alt={product.name}
                                  src={product.img}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={product.name}
                                secondary={price}
                              />
                            </ListItem>
                          </div>
                        );
                      })}
                    </List>
                  </Demo>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div>
              <Card variant="outlined">
                <div className="paddingAll darkGrey ">
                  <Typography variant="subtitle1">
                    Subtotal : {totalQty} items
                  </Typography>
                </div>
                <hr className="liteGrey" />
                <div className="paddingAll ">
                  <Typography variant="subtitle1">Rs{totalPrice}.00</Typography>
                </div>

                <hr className="liteGrey" />
                <div className="paddingAll">
                  {totalQty > 0 ? (
                    <Button
                      variant="contained"
                      sx={{ width: 1 }}
                      onClick={checkoutHandle}
                    >
                      PROCEED TO CHECKOUT
                    </Button>
                  ) : (
                    <Button variant="contained" disabled sx={{ width: 1 }}>
                      PROCEED TO CHECKOUT
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CartScreen;
