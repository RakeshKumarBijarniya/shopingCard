import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Left from "./Left";

const AdminProUpdate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("status", status);
    formData.append("image", image);

    fetch(`/api/updateProduct/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
      });
  };

  useEffect(() => {
    fetch(`/api/getUpdateProData/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setName(data.apiData.name);
        setDesc(data.apiData.desc);
        setPrice(data.apiData.price);
        setQty(data.apiData.quentity);
        setStatus(data.apiData.status);
        setImage(data.apiData.img);
      })
      .catch((e) => console.log(e.message));
  }, [id]);

  return (
    <section id="mid">
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
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                className="form-control"
              />
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

export default AdminProUpdate;
