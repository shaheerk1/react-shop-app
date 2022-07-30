import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen";
import AdminProductList from "./screens/AdminProductList";
import AdminAddProduct from "./screens/AdminAddProduct";
import Shipping from "./screens/Shipping";
import OrderSummery from "./screens/OrderSummery";
import AdminOrders from "./screens/AdminOrders";
import AdminOrderDetail from "./screens/AdminOrderDetail";

const cookies = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({});
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      let productAll = await response.json();
      if (response.status === 200) {
        setProducts(productAll);
      } else if (response.status === 401) {
        console.log("you are not autherized");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log("not Authorized", err);
    }
  };

  const getTheUserData = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/user/userdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "auth-token": cookies.get("jwt"),
        },
      });
      let userInfo = await response.json();
      if (response.status === 200) {
        setUserData(userInfo);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        console.log("you are not autherized");
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log("not Authorized", err);
      console.log(cookies.get("jwt"));
    }
  };

  useEffect(() => {
    getProducts();
    if (
      cookies.get("jwt") === null ||
      cookies.get("jwt") === "" ||
      cookies.get("jwt") === undefined
    ) {
      console.log("no token");
    } else {
      getTheUserData();
    }
  }, []);

  return (
    <div className="App">
      <Header
        loginStatus={isLoggedIn}
        loginState={setIsLoggedIn}
        user={userData}
      />
      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen products={products} cartCount={cartItems.length} />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate replace to="/" />
              ) : (
                <LoginScreen
                  loginState={setIsLoggedIn}
                  userDataProp={getTheUserData}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate replace to="/" /> : <RegisterScreen />
            }
          />
          <Route path="/profile" element={<ProfileScreen user={userData} />} />
          <Route
            path="/product/:id"
            element={
              <ProductScreen
                cartCount={cartItems.length}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartScreen cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route
            path="/checkout/shippingaddress"
            element={
              isLoggedIn ? (
                <Shipping setShippingInfo={setShippingInfo} />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/checkout/summery"
            element={
              isLoggedIn ? (
                <OrderSummery
                  user={userData}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  shippingInfo={shippingInfo}
                />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/adminpanel/products"
            element={
              isLoggedIn && userData.isAdmin ? (
                <AdminProductList
                  user={userData}
                  products={products}
                  getProducts={getProducts}
                />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/adminpanel/allorders"
            element={
              isLoggedIn && userData.isAdmin ? (
                <AdminOrders />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/orderdetail/:id"
            element={
              isLoggedIn && userData.isAdmin ? (
                <AdminOrderDetail />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/adminpanel/upload"
            element={
              isLoggedIn && userData.isAdmin ? (
                <AdminAddProduct user={userData} getProducts={getProducts} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
