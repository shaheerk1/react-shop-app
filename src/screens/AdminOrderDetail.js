import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

function AdminOrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();

    const getOrderById = async () => {
      try {
        let response = await fetch(`http://localhost:3000/api/order/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "auth-token": cookies.get("jwt"),
          },
        });
        let orderRes = await response.json();
        if (response.status === 200) {
          setOrder(orderRes);
        } else if (response.status === 401) {
          console.log("you are not autherized");
        } else {
          console.log("Some error occured");
        }
      } catch (err) {
        console.log("not Authorized", err);
      }
    };
    getOrderById();
  }, [id]);

  //   console.log(order);
  return (
    <>
      {order ? (
        <div>
          <div className="loginWrap">
            <div style={{ alignItems: "flex-start" }} className="formHeader">
              <Typography variant="h6">Order {order._id}</Typography>
            </div>

            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                {order.orderItems.length > 0 ? (
                  order.orderItems.map((item, index) => (
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
                          src={item.image}
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
                  <Typography variant="h6">Rs {order.totalPrice}</Typography>
                </Card>
              </Grid>
              <Grid item md={6} xs={12}>
                {order.shippingAddress ? (
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
                      {order.shippingAddress.name}
                    </Typography>
                    <Typography variant="subtitle2">
                      Contact Info : {order.shippingAddress.mobile}
                    </Typography>
                    <Typography variant="subtitle2">
                      {order.shippingAddress.address}
                    </Typography>
                    <Typography variant="subtitle2">
                      {order.shippingAddress.city}
                    </Typography>
                    <Typography variant="subtitle2">
                      {order.shippingAddress.postalCode}
                    </Typography>
                    <Typography variant="subtitle2">
                      {order.shippingAddress.state}
                    </Typography>
                    <Typography variant="subtitle2">
                      {order.shippingAddress.country}
                    </Typography>
                  </Card>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default AdminOrderDetail;
