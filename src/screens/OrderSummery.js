import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function OrderSummery(props) {
  const [activeLevel, setActiveLevel] = useState(1);
  const [success, setSuccess] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  //   if (props.cartItems && props.shippingInfo) {
  //     console.log(props.cartItems, props.shippingInfo);
  //   }

  let userId = "";
  let productsArr = [];
  let shipAddress = {};

  if (props.shippingInfo && props.cartItems && props.user) {
    userId = props.user.id;
    productsArr = props.cartItems;
    shipAddress = props.shippingInfo;
  }

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  //   const formSubmit = () => {
  //     // setActiveLevel(3);

  //     let orderReqData = {
  //       user: userId,
  //       orderItems: productsArr,
  //       shippingAddress: shipAddress,
  //     };

  //     console.log(orderReqData);
  //   };

  const formSubmit = async () => {
    setButtonClicked(true);

    let orderReqData = {
      user: userId,
      orderItems: productsArr,
      shippingAddress: shipAddress,
    };

    try {
      let res = await fetch("http://localhost:3000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token": cookies.get("jwt"),
        },
        body: JSON.stringify(orderReqData),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        // console.log(resJson);
        setActiveLevel(3);
        showSuccess();
        props.setCartItems([]);
        // navigate("/login");
      } else {
        console.log("Some error occured", resJson);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const focusHandle = () => {
    setActiveLevel(2);
  };

  let totalPrice = 0;

  const getTotalPrice = () => {
    props.cartItems.map((item) => {
      totalPrice = totalPrice + item.price * item.qty;
      return totalPrice;
    });
  };

  getTotalPrice();

  return (
    <>
      <div>
        <div className="loginWrap">
          <div className="formHeader">
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeLevel}>
                <Step>
                  <StepLabel>Shipping Address</StepLabel>
                  <Typography variant="caption">Required</Typography>
                </Step>
                <Step>
                  <StepLabel>Order Summery</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Completed</StepLabel>
                </Step>
              </Stepper>
            </Box>
            <Typography variant="h5">Shipping Address</Typography>
          </div>

          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              {props.cartItems ? (
                props.cartItems.map((item, index) => (
                  <Card
                    key={index}
                    sx={{ display: "flex", margin: "0 0 10px 0" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 10px",
                      }}
                    >
                      <Avatar
                        sx={{ borderRadius: 0 }}
                        alt={item.name}
                        src={item.img}
                      />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          {item.qty} x
                        </Typography>
                        {/* <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Mac Miller
                    </Typography> */}
                      </CardContent>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {item.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Rs {item.price}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                ))
              ) : (
                <div></div>
              )}

              <Card
                sx={{
                  display: "flex",
                  gap: "20px",
                  padding: "20px 0 20px 10px",
                }}
              >
                <Typography variant="h6">Total : </Typography>
                <Typography variant="h6">Rs {totalPrice}</Typography>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              {props.shippingInfo ? (
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "20px 0 20px 10px",
                  }}
                >
                  <Typography variant="h6">Address : </Typography>

                  <Typography variant="subtitle1">
                    {props.shippingInfo.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.shippingInfo.address}
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.shippingInfo.city}
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.shippingInfo.postalCode}
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.shippingInfo.state}
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.shippingInfo.country}
                  </Typography>
                </Card>
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>

          {props.shippingInfo && props.cartItems && !buttonClicked ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onFocus={focusHandle}
              onClick={formSubmit}
              size="large"
            >
              CONFIRM ORDER
            </Button>
          ) : (
            <Button
              fullWidth
              disabled
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              CONFIRM ORDER
            </Button>
          )}
          {success ? (
            <Alert variant="filled" severity="success">
              Order Completed!
            </Alert>
          ) : (
            <div></div>
          )}
          <br />
          {activeLevel === 3 ? (
            <Alert severity="success">
              You may get a call on confirming the purchase ❤
            </Alert>
          ) : (
            <div></div>
          )}
          <br />
        </div>
      </div>
    </>
  );
}

export default OrderSummery;
