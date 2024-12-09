import React, { useState } from "react";
import Left from "./Left";

const AdminNewProductCategory = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("categoryVal", categoryVal);
    formData.append("image", image);

    fetch("/api/addCatProduct", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          setMessage(data.message);
          setName("");
          setDesc("");
          setPrice(0);
          setQty(0);
          setCategoryVal("");
          setImage();
        }
      })
      .catch((e) => console.log(e.message));
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
              <h2>Add new Product With Category Here!!!</h2>
              <p>{message}</p>
              <form onSubmit={handleForm}>
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Produt Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Product Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Produt Name"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Product Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Produt Name"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label>Product Quentity</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Produt Name"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <label>Product Category</label>
                <select
                  className="form-select"
                  value={categoryVal}
                  onChange={(e) => setCategoryVal(e.target.value)}
                >
                  <option value="">Choose Your Category</option>
                  <option value="fashion">Fashion</option>
                  <option value="mobiles">Mobiles</option>
                  <option value="grocery">Grocery</option>
                  <option value="electronics">Electronics</option>
                </select>
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
                <button className="btn btn-dark form-control mt-2">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminNewProductCategory;
