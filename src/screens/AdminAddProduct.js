import {
  Alert,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function AdminAddProduct(props) {
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  // const [file, setFile] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCatgory] = useState("");
  const [description, setDescription] = useState("");

  let userId = "";
  let adminCheck = false;

  if (props.user) {
    userId = props.user.id;
    adminCheck = props.user.isAdmin;
  }

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  const postForm = async (e) => {
    const imageFile = document.querySelector("#imageInput").files[0];
    const data = new FormData();
    data.append("image", imageFile);
    data.append("name", name);
    data.append("price", price);
    data.append("countInStock", stock);
    data.append("user", userId);
    data.append("brand", brand);
    data.append("category", category);
    data.append("description", description);

    try {
      let res = await fetch("http://localhost:3000/api/product/upload ", {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token": cookies.get("jwt"),
        },
        body: data,
      });
      let resUpoad = await res.json();
      if (res.status === 200) {
        console.log(resUpoad);
        showSuccess();
        props.getProducts();
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmit = () => {
    // console.log(name);
    // console.log(file);
    // console.log(price);
    // console.log(stock);
    // console.log(brand);
    // console.log(category);
    // console.log(description);
    // console.log(userId);
    postForm();
  };

  return (
    <>
      {adminCheck ? (
        <div className="loginWrap">
          <div className="formHeader">
            <Typography variant="h5">Add Product</Typography>
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />

          <InputLabel
            sx={{ position: "relative", left: "15px", top: "10px" }}
            htmlFor="outlined-adornment-amount"
          >
            Price
          </InputLabel>
          <OutlinedInput
            fullWidth
            type="number"
            id="outlined-adornment-amount"
            onChange={(e) => setPrice(e.target.value)}
            startAdornment={
              <InputAdornment position="start">Rs</InputAdornment>
            }
            label="Amount"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="count"
            label="Count In Stock"
            type="number"
            name="count"
            onChange={(e) => setStock(e.target.value)}
          />
          <br />
          <br />
          <InputLabel>Image : </InputLabel>
          <br />

          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              id="imageInput"
              hidden
              // onChange={(e) => setFile(e.target.value)}
            />
          </Button>

          <br />

          <TextField
            margin="normal"
            required
            fullWidth
            id="brand"
            label="Brand"
            name="brand"
            onChange={(e) => setBrand(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            onChange={(e) => setCatgory(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="desc"
            label="Description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={formSubmit}
            size="large"
          >
            ADD
          </Button>
          {success ? (
            <Alert variant="filled" severity="success">
              Successfully Added Product!
            </Alert>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default AdminAddProduct;
