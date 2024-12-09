import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContaxtApi } from "../ContextApi";

const Login = () => {
  const navigate = useNavigate();
  const { setEmail } = useContext(ContaxtApi);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const userInterData = { username, password };

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInterData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 200 && data.data.email === "admin@gmail.com") {
          setEmail(data.data.email);
          navigate("/dashboard");
          localStorage.setItem("email", data.data.email);
        } else if (
          data.status === 200 &&
          data.data.email !== "admin@gmail.com"
        ) {
          navigate("/");
          setEmail(data.data.email);
          localStorage.setItem("email", data.data.email);
        } else {
          setMessage(data.message);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <section id="loginContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h2 className="mt-2  text-center">Login Here!!!</h2>
            <p>{message}</p>
            <form onSubmit={(e) => handleForm(e)}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Please Enter Your Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Please Enter Your Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary form-control mt-2">
                Login
              </button>
            </form>
            <Link to="/createAccount">
              <button className="btn btn-secondary form-control mt-2">
                Create New Account
              </button>
            </Link>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Login;
