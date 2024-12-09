import React, { useEffect, useState } from "react";
import Left from "./Left";
import { Link } from "react-router-dom";

const AdminProductCat = () => {
  const [allCatData, setAllCatData] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/allCatProduct")
      .then((response) => response.json())
      .then((data) => setAllCatData(data.apiData))
      .catch((e) => console.log(e.message));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/deleteCatProduct/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((e) => {
        console.log(e.message);
      });
    const filterData = allCatData.filter((val) => {
      return val._id !== id;
    });
    setAllCatData(filterData);
  };

  return (
    <section id="mid">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Left />
          </div>
          <div className="col-md-9">
            <h2 className="text-center">Product Management With Category</h2>
            <p>{message}</p>
            <Link to="/adminNewProductCategory">
              <button className="btn btn-primary form-control">
                Add New Product
              </button>
            </Link>
            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allCatData?.map((item, k) => (
                  <tr key={item._id}>
                    <td>{k + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        src={`/${item.image}`}
                        alt="ProductImage"
                        style={{ width: "70px", height: "70px" }}
                      />
                    </td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/adminCatProductForm/${item._id}`}>
                        <button className="btn btn-secondary">Update</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProductCat;
