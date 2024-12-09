import React, { useContext } from "react";
import { ContaxtApi } from "../ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

const Header = () => {
  const { email, setEmail, cart } = useContext(ContaxtApi);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    navigate("/login");
    setEmail(localStorage.removeItem("email"));
  };

  if (email) {
    if (email === "admin@gmail.com") {
      return (
        <section id="adminHeader">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4>Welcome {email}</h4>
              </div>
              <div className="col-md-8">
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section id="adminHeader">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h4>Welcome {email}</h4>
              </div>
              <div className="col-md-8">
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </button>
                <Link to="/cart">
                  <button className="cart-button me-2">
                    <IoMdCart />: {cart?.totalItem ? cart.totalItem : 0}
                  </button>
                </Link>
                <Link to="/myOrder">
                  <button className="btn btn-dark me-2">My Order</button>
                </Link>
                <Link to="/">
                  <button className="btn btn-primary me-2">Products</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }
  } else {
    return (
      <section id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8">
              <Link to="/cart">
                <button className="btn btn-warning me-2">
                  <IoMdCart /> : {cart?.totalItem ? cart.totalItem : 0}
                </button>
              </Link>
              <Link to="/">
                <button className="btn btn-primary me-2">Products</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-dark me-2">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Header;
