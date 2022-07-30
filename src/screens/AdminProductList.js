import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function AdminProductList(props) {
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  let mail = "";
  let adminCheck = false;
  if (props.user) {
    mail = props.user.email;
    adminCheck = props.user.isAdmin;
  }

  const binHandler = (index) => {
    console.log(index);
    deleteProduct(index);
  };

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  const deleteProduct = async (productId) => {
    try {
      let response = await fetch(
        `http://localhost:3000/api/product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "auth-token": cookies.get("jwt"),
          },
        }
      );
      let deletedInfo = await response.json();
      if (response.status === 200) {
        console.log(deletedInfo);
        showSuccess();
        props.getProducts();
      } else if (response.status === 401) {
        console.log("something went wrong");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log("not Authorized", err);
    }
  };

  const addProductHandle = () => {
    navigate("/adminpanel/upload");
  };

  return (
    <div>
      {adminCheck ? (
        <div>
          <div className="marginTop">
            <Alert severity="success">{mail}</Alert>
          </div>
          <div className="marginHr">
            <Button
              variant="contained"
              size="large"
              startIcon={<AddSharpIcon />}
              onClick={addProductHandle}
            >
              ADD NEW PRODUCT
            </Button>
          </div>

          {props.products ? (
            <div>
              <Demo>
                <List>
                  {props.products.map((product, index) => {
                    return (
                      <div className="productListAdm" key={index}>
                        {/* <ListItem>
                      <ListItemText primary={index + 1} />
                    </ListItem> */}
                        <ListItem
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={(event) => binHandler(product._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{ borderRadius: 0 }}
                              alt={product.name}
                              src={product.imageUrl}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.name}
                            secondary={product.price}
                          />
                          <ListItemText primary={product._id} />
                        </ListItem>
                      </div>
                    );
                  })}
                </List>
              </Demo>

              {success ? (
                <Alert variant="filled" severity="warning">
                  Item Deleted!
                </Alert>
              ) : (
                <div></div>
              )}

              {/* {props.products.map((product, index) => (
            <div key={index}>{product.name}</div>
          ))} */}
            </div>
          ) : (
            <div>no products</div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AdminProductList;
