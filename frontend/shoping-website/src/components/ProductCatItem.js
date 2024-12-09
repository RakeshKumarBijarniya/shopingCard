import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContaxtApi } from "../ContextApi";

const ProductCatItem = () => {
  const { name } = useParams();
  const [productData, setProductData] = useState([]);
  const { cart, setCart } = useContext(ContaxtApi);
  useEffect(() => {
    fetch(`/api/getProductCat?category=${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setProductData(data.data);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [name]);

  const handleAddItem = (id) => {
    let _cart = { ...cart };
    if (!_cart.item) {
      _cart.item = {};
    }
    if (!_cart.item[id]) {
      _cart.item[id] = 1;
    } else {
      _cart.item += 1;
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
        <div className="row">
          {productData?.map((val, k) => (
            <div className="col-md-3 mt-3" key={val._id}>
              <img
                src={`/${val.image}`}
                alt=""
                style={{
                  height: "170px",
                  width: "200px",
                  borderRadius: "10px",
                }}
              />
              <h4>{val.name}</h4>
              <p>{val.desc}</p>
              <p>Rs.{val.price}</p>
              <button
                className="btn btn-success me-2"
                onClick={() => {
                  handleAddItem(val._id);
                }}
              >
                Add
              </button>
              <button className="btn btn-warning">View</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatItem;
