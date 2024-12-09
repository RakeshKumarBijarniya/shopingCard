import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Left from "./Left";

const AdminCatProUpdate = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/getUpdateCaData/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setName(data.data.name);
          setDesc(data.data.desc);
          setPrice(data.data.price);
          setQty(data.data.quentity);
          setImage(data.data.image);
          setStatus(data.data.status);
          setCategory(data.data.category);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [id]);

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("quentity", qty);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("image", image);
    alert(image);
    fetch(`/api/updateCatProduct/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setMessage("Item update Successfully!!!");
        } else {
          setMessage(data.message);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <section id="mid ">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-3">
            <Left />
          </div>
          <div className="col-md-9">
            <h2 className="text-center">Update Your Product Here!!!</h2>
            <p>{message}</p>
            <form onSubmit={handleForm}>
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Product Description</label>
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
              <label>Product qty</label>
              <input
                type="number"
                className="form-control"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <label className="me-2">Update Image</label>
              <img
                src={`/${image}`}
                alt="upImage"
                style={{ width: "80px", height: "80px" }}
              />
              <input
                type="file"
                filename={image}
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
              />
              <label>Product Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Your Category</option>
                <option value="fashion">Fashion</option>
                <option value="mobiles">Mobiles</option>
                <option value="grocery">Grocery</option>
                <option value="electronics">Electronics</option>
              </select>
              <p>Update Status</p>
              <label className="me-2">Active</label>
              <input
                type="radio"
                value="active"
                className="form-check-input me-2"
                name="status"
                checked={status === "active"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className="me-2">Suspend</label>
              <input
                type="radio"
                value="suspend"
                name="status"
                className="form-check-input"
                checked={status === "suspend"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <button className="form-control btn btn-secondary mt-2">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCatProUpdate;
