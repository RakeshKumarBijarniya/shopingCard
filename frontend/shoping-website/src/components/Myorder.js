import React, { useContext, useEffect, useState } from "react";
import { ContaxtApi } from "../ContextApi";

const Myorder = () => {
  const { email } = useContext(ContaxtApi);
  const [myOrderData, setMyOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/getMyOrder/${email}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setMyOrderData(data.data);
        } else {
          setMessage(data.message);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
    setIsLoading(true);
  }, [email]);
  return (
    <>
      {!isLoading ? (
        <p>Loading...</p>
      ) : myOrderData.length !== 0 ? (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Quantity</th>
                      <th>Product Price</th>
                      <th>Purchased Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myOrderData?.map((val, k) => (
                      <tr key={val._id}>
                        <td>{k + 1}</td>
                        <td>{val.pname}</td>
                        <td>{val.quentity}</td>
                        <td>{val.price}</td>
                        <td>{val.paddDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h2>{message}</h2>
      )}
    </>
  );
};

export default Myorder;
