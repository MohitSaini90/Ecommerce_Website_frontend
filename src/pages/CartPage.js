import React, { useContext } from "react";
import Layout from "./../components/layout/Layout";
import { AuthContext } from "../context/auth";
import { CartContext } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const CartPage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //place order
  const handlePlaceOrder = async () => {
    try {
      const buyerID = auth?.user?._id;
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/place-order`, {
        cart,
        buyerID,
      });
      if (res?.data?.success) toast.success(res?.data?.message);
      else toast.error(res?.data?.message);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row"></div>
        <div className="row">
          <h4 className="text-center ">
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "Please Login to checkout"
                }`
              : "Your cart is empty"}
          </h4>
          <div className="container">
            <div className="col-md-9">
              <table className="table table-bordered">
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                  <tr>
                    <th style={{ border: "none" }}>Picture</th>
                    <th style={{ border: "none" }}>Name</th>
                    <th style={{ border: "none" }}>Description</th>
                    <th style={{ border: "none" }}>Price</th>
                    <th style={{ border: "none" }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((p) => (
                    <tr key={p._id} style={{ height: "30px" }}>
                      <td style={{ border: "none" }}>
                        <img
                          className="card-img-top"
                          src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                          alt={p.name}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </td>
                      <td style={{ border: "none" }}>{p.name}</td>
                      <td style={{ border: "none" }}>
                        {p.description.substring(0, 30)}
                      </td>
                      <td style={{ color: "green", border: "none" }}>
                        ₹{p.price}
                      </td>
                      <td style={{ border: "none" }}>
                        <button
                          className="btn btn-link btn-circle"
                          onClick={() => removeCartItem(p._id)}
                          style={{ color: "red" }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th colSpan="2">Cart Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "none" }}>Total:</td>
                <td style={{ color: "green", border: "none" }}>
                  ₹{totalPrice()}
                </td>
              </tr>
              {auth?.user?.address && (
                <tr>
                  <td style={{ border: "none" }}>Current Address:</td>
                  <td style={{ border: "none" }}>{auth.user.address}</td>
                </tr>
              )}
              <tr>
                <td colSpan="2" style={{ textAlign: "center", border: "none" }}>
                  {auth?.user?.address ? (
                    <button
                      className="btn btn-outline-primary btn-block btn-lg"
                      onClick={() => navigate("/dashboard/user/profile")}
                      style={{ width: "100%", textTransform: "capitalize" }}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary btn-block btn-lg"
                      onClick={() => navigate("/login", { state: "/cart" })}
                      style={{ width: "100%", textTransform: "capitalize" }}
                    >
                      Please Login
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", border: "none" }}>
                  {cart?.length ? (
                    <button
                      className="btn btn-primary btn-block btn-lg"
                      onClick={handlePlaceOrder}
                      disabled={!auth?.user?.address}
                      style={{ width: "100%", textTransform: "capitalize" }}
                    >
                      Place Order
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
