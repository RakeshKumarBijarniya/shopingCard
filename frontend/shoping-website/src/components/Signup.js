import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [message,setMessage] = useState("")

  const handleForm = (e) => {
    e.preventDefault();
    const userDetails = { fname, lname, email, password, cPassword };
    fetch("/api/createAccount", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.status===200){
          setMessage(data.message)
        }
        else{
          setMessage(data.message)
        }
      })
      .catch((e) => {
        console.log(e.message)
      });
    setFname("")
    setLname("")
    setPassword("")
    setCPassword("")
    setEmail("")
  };

  return (
    <section className="create-account-container">
      <div className="container">
        <div className="row ">
          <div className="col-md-3"></div>
          <div className="col-md-6 ">
            <h2 className="mt-2 text-center">Create Your Account Here!!!</h2>
            <p>{message}</p>
            <p></p>
            <form onSubmit={(e) => handleForm(e)}>
              <label>Fist Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your First Name Here"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Last Name Here"
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email Here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password Here"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your confirm Password Here"
                value={cPassword}
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
              />
              <button className="form-control btn btn-success mt-2">
                Create Account
              </button>
            </form>
            <Link to="/login">
              <button className="form-control btn btn-danger mt-3">
                You Have Already Account ?
              </button>
            </Link>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
