import React, { useContext, useEffect, useState } from "react";
import { ContaxtApi } from "../ContextApi";
import { Link } from "react-router-dom";

const Products = () => {
  const [allProduct, setAllProduct] = useState([]);
  const { cart, setCart } = useContext(ContaxtApi);
  useEffect(() => {
    fetch("/api/allCatProduct")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllProduct(data.apiData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleAddToCard = (id) => {
    let _cart = { ...cart };
    if (!_cart.item) {
      _cart.item = {};
    }
    if (!_cart.item[id]) {
      _cart.item[id] = 1;
    } else {
      _cart.item[id] += 1;
    }
    if (!_cart.totalItem) {
      _cart.totalItem = 1;
    } else {
      _cart.totalItem += 1;
    }
    setCart(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart));
  };
  return (
    <section className="mb-5">
      <div className="container">
        <div className="row mt-2 mb-4">
          <div className="col-md-3">
            <Link to={`/categoryItem/${"fashion"}`}>
              <button className="btn btn-secondary mt-2">Fashion</button>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to={`categoryItem/${"mobiles"}`}>
              <button className="btn btn-secondary mt-2">
                Mobiles And Laptops
              </button>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to={`categoryItem/${"electronics"}`}>
              <button className="btn btn-secondary mt-2">
                Electronics Item
              </button>
            </Link>
          </div>
          <div className="col-md-3">
            <button className="btn btn-secondary mt-2">Grocery</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {allProduct?.map((val, k) => (
            <div className="col-md-3 mt-2" key={val._id}>
              <img
                src={`${val.image}`}
                alt=""
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "10px",
                }}
              />
              <h4>{val.name}</h4>
              <p>{val.desc}</p>
              <p>Rs.{val.price}</p>
              <button
                className="btn btn-success me-2"
                onClick={() => {
                  handleAddToCard(val._id);
                }}
              >
                Add Card
              </button>
              <button className="btn btn-warning">View</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
