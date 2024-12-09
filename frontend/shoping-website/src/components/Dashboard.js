import React from "react";
import Left from "./Left";

const Dashboard = () => {
  return (
    <>
      <section id="mid">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Left />
            </div>
            <div className="col-md-9"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
