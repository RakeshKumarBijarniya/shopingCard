import React, { useContext, useEffect, useState } from "react";
import { ContaxtApi } from "../ContextApi";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Cart = () => {
  let totalSum = 0;
  const { cart, setCart, email } = useContext(ContaxtApi);
  const [allCart, setAllCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart) {
      return;
    }
    fetch("/api/cartDetailng", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Object.keys(cart.item) }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCart(data.apiData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [cart]);

  const handleQty = (id) => {
    return cart.item[id];
  };

  const handleDeleteItem = (e, id) => {
    let qty = handleQty(id);
    let _cart = { ...cart };
    delete _cart.item[id];
    _cart.totalItem -= qty;
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
  };

  const handlePrice = (id, price) => {
    let qty = handleQty(id);
    let productPrice = qty * price;
    totalSum += productPrice;
    return productPrice;
  };

  const handleInc = (id, qty) => {
    const currentQty = handleQty(id);

    if (qty === currentQty) {
      alert("You reached maximum Quentity!!!");
      return;
    }
    let _cart = { ...cart };
    _cart.item[id] = currentQty + 1;
    _cart.totalItem += 1;
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
  };

  const handleDec = (id) => {
    const currentQty = handleQty(id);
    if (currentQty === 1) {
      alert("You reached Minimum  Quentity!!!");
      return;
    }
    let _cart = { ...cart };
    _cart.item[id] = currentQty - 1;
    _cart.totalItem -= 1;
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
  };

  const handleCheckoutItem = (e) => {
    if (!email) {
      navigate("/login");
    } else {
      const pData = { cart, email };
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 201) {
            alert(data.message);
            setCart("");
            navigate("/");
            localStorage.removeItem("cart");
          }
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <>
      {allCart.length !== 0 ? (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Quantity</th>
                      <th>Product Price</th>
                      <th>Product Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCart?.map((val, k) => (
                      <tr key={val._id}>
                        <td>{k + 1}</td>
                        <td>{val.name}</td>
                        <td className="d-flex align-items-center">
                          <h4
                            onClick={(e) => {
                              handleInc(val._id, val.quentity);
                            }}
                          >
                            <CiCirclePlus />
                          </h4>
                          {handleQty(val._id)}
                          <h4
                            onClick={(e) => {
                              handleDec(val._id);
                            }}
                          >
                            <CiCircleMinus />
                          </h4>
                        </td>
                        <td>{handlePrice(val._id, val.price)}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              handleDeleteItem(e, val._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan="5">
                        <h4>Total Amount: {totalSum}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5">
                        <button
                          className="btn btn-warning form-control"
                          onClick={(e) => {
                            handleCheckoutItem(e);
                          }}
                        >
                          Checkout
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="d-flex">
          <img
            src="./empty_cart_img.png"
            alt="Empty Cart"
            style={{ width: "50%", height: "400px" }}
          />
          <h1 className="cart-emt-txt">Your Cart is Empty</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
