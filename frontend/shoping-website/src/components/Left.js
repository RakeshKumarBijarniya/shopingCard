import React from "react";
import { Link } from "react-router-dom";

const Left = () => {
  return (
    <div>
      <Link to="/adminproducts">
        <button className="btn btn-success mt-2">Product Management</button>
      </Link>
      <Link to="/adminProductCategory">
        <button className="btn btn-success mt-2">Product Category</button>
      </Link>
    </div>
  );
};

export default Left;
