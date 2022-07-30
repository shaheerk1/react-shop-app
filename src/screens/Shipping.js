import {
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Shipping(props) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Sri Lanka");

  const formSubmit = () => {
    let shippingData = {
      name: name,
      mobile: mobile,
      address: address,
      city: city,
      postalCode: postalCode,
      state: state,
      country: country,
    };

    // console.log(shippingData);

    props.setShippingInfo(shippingData);

    navigate("/checkout/summery");
  };

  return (
    <>
      <div>
        <div className="loginWrap">
          <div className="formHeader">
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={0}>
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
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Mobile"
            name="mobile"
            placeholder="076XXXXXXX"
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Address"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="City"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Postal Code"
            name="postalcode"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="State/Region"
            name="state"
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Country"
            name="country"
            value="Sri Lanka"
            onChange={(e) => setCountry(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={formSubmit}
            size="large"
          >
            NEXT
          </Button>
        </div>
      </div>
    </>
  );
}

export default Shipping;
