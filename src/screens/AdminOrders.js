import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import ReceiptLongSharpIcon from "@mui/icons-material/ReceiptLongSharp";
import { Link } from "react-router-dom";

const cookies = new Cookies();

function AdminOrders() {
  const [orders, setOrders] = useState(null);

  let myTotOrders = 0;

  const getTheOrders = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/order/allorders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token": cookies.get("jwt"),
        },
      });
      let ordersData = await response.json();
      if (response.status === 200) {
        setOrders(ordersData);
      } else if (response.status === 401) {
        console.log("you are not autherized");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log("not Authorized", err);
    }
  };

  const gotoOrder = () => {};

  useEffect(() => {
    getTheOrders();
  }, []);

  if (orders) {
    myTotOrders = orders.length;
    // console.log(myTotOrders);
  }

  const getOrderDate = (element) => {
    return new Date(element.createdAt).toLocaleDateString();
  };
  const getOrderTime = (element) => {
    return new Date(element.createdAt).toLocaleTimeString();
  };

  return (
    <div>
      <div className="marginTop minHeightFull">
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Alert severity="info">
              <AlertTitle>{myTotOrders} Orders</AlertTitle>
              <strong>Welcome</strong> to Orders page!
            </Alert>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                margin: "10px 0",
                gap: "5px",
              }}
            >
              {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                  <Card
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                        margin: "10px 0 10px 20px",
                        gap: "3px",
                      }}
                    >
                      <Box>
                        <Typography variant="caption">
                          ref :{order._id}
                        </Typography>
                        <Typography variant="subtitle2">
                          Order Date : {getOrderDate(order)}
                        </Typography>
                        <Typography variant="subtitle2">
                          Time : {getOrderTime(order)}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1">
                        Order total: Rs {order.totalPrice}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                        margin: "10px 20px 10px 20px",
                        gap: "3px",
                      }}
                    >
                      <Link to={`/orderdetail/${order._id}`}>
                        <Button variant="outlined" onClick={gotoOrder}>
                          <ReceiptLongSharpIcon />
                        </Button>
                      </Link>
                    </Box>
                  </Card>
                ))
              ) : (
                <div></div>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminOrders;
