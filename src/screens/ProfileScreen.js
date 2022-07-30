import {
  Alert,
  AlertTitle,
  Avatar,
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";

const cookies = new Cookies();

function ProfileScreen(props) {
  const [myorders, setMyOrders] = useState(null);

  let myTotOrders = 0;
  let name = "";
  let email = "";
  let joined = "";
  let isAdmin = false;
  let joinedDate = "";
  if (props.user) {
    name = props.user.name;
    email = props.user.email;
    joined = props.user.accCreated;
    isAdmin = props.user.isAdmin;

    joinedDate = new Date(joined).toLocaleDateString();
  }

  const getTheUserOrders = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/order/myorders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token": cookies.get("jwt"),
        },
      });
      let orderData = await response.json();
      if (response.status === 200) {
        setMyOrders(orderData);
      } else if (response.status === 401) {
        console.log("you are not autherized");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log("not Authorized", err);
    }
  };

  useEffect(() => {
    getTheUserOrders();
  }, []);

  if (myorders) {
    myTotOrders = myorders.length;
    // console.log(myorders.length);
  }

  const getOrderDate = (element) => {
    return new Date(element.createdAt).toLocaleDateString();
  };
  const getOrderTime = (element) => {
    return new Date(element.createdAt).toLocaleTimeString();
  };

  return (
    // <div>
    //   <h4>{name}</h4>
    //   <h6>{email}</h6>
    //   <p>{joined}</p>
    //   <p>{isAdmin ? "Admin User" : "user"}</p>
    // </div>

    <Container maxWidth="md">
      {/* <div className="loginWrap">
        <div className="formHeader">
          <Avatar
            alt={name.toUpperCase()}
            src="/static/images/avatar/sample.jpg"
          />
          <Typography variant="p">{isAdmin ? "Admin User" : "user"}</Typography>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h6">{email}</Typography>
          <Typography variant="p">{joined}</Typography>
        </div>
      </div> */}
      <div className="marginTop minHeightFull">
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "30px 0",
                  gap: "3px",
                }}
              >
                <Avatar alt={name.toUpperCase()} src="/s.jpg" />
                <Typography variant="p">
                  {isAdmin ? "Admin User" : "user"}
                </Typography>
                <Typography variant="h5">{name}</Typography>

                <Box>
                  <Typography variant="caption">E-mail :{email}</Typography>
                  <Typography variant="subtitle2">
                    Joined : {joinedDate}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Alert severity="info">
              <AlertTitle>{myTotOrders} Orders</AlertTitle>
              Your <strong>Orders</strong> will appear here!
            </Alert>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                margin: "10px 0",
                gap: "5px",
              }}
            >
              {myorders && myorders.length > 0 ? (
                myorders.map((order, index) => (
                  <Card
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
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
                  </Card>
                ))
              ) : (
                <div></div>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default ProfileScreen;
