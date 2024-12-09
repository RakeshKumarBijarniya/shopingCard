import React, { useEffect, useState } from "react";
import Left from "./Left";
import { Link, useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const [allProduct, SetAllProduct] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/allProduct")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.apiData[0]);
        SetAllProduct(data.apiData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleDeleteItem = (id) => {
    fetch(`/api/deleteProduct/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setMessage(data.message);
          navigate("/adminproducts");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
    const filterData = allProduct.filter((val) => val._id !== id);
    SetAllProduct(filterData);
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
              <h2 className="text-center">Product Management</h2>
              <p>{message}</p>
              <Link to="/adminnewproducts">
                <button className="btn btn-primary form-control">
                  Add New Product
                </button>
              </Link>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Product Image</th>
                    <th>Product Quentity</th>
                    <th>Product status</th>
                    <th>Product Add Date</th>
                    <th>Product Update</th>
                    <th>Product Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allProduct?.map((val, k) => (
                    <tr key={val._id}>
                      <td>{k + 1}</td>
                      <td>{val.name}</td>
                      <td>{val.desc}</td>
                      <td>{val.price}</td>
                      <td>
                        <img
                          src={`/${val.img}`}
                          style={{ height: "80px", width: "80px" }}
                          alt="ProdutImage"
                        />
                      </td>
                      <td>{val.quentity}</td>
                      <td>{val.status}</td>
                      <td>{val.addProductDate}</td>
                      <td>
                        <Link to={`/adminProductForm/${val._id}`}>
                          <button className="btn btn-dark">Update</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeleteItem(val._id);
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
    </>
  );
};

export default AdminProduct;
