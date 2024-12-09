import React, { useState } from "react";
import Left from "./Left";

const AdminNewProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();

  const handleForm = function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("image", image);
    // const newProductData = { name, desc, price, qty };
    fetch("/api/addProduct", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 201) {
          setMessage(data.message);
          setName("");
          setDesc("");
          setPrice(0);
          setQty(0);
          setImage();
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section id="mid">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Left />
            </div>
            <div className="col-md-9">
              <h2 className="text-center">Add New Product Here!!!</h2>
              <p>{message}</p>
              <form onSubmit={handleForm}>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label>Product Quentity</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <label>Image</label>
                <input
                  type="file"
                  filename={image}
                  className="form-control"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  accept="image/*"
                />
                <button className="btn btn-success  mt-2 me-2" type="submit">
                  Add
                </button>
                <button className="btn btn-danger mt-2 " type="reset">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminNewProduct;
