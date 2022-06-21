import React, { useState } from "react";
import { Navbar } from "./Navbar";
import IMG from "../assets/images/bg.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const linkStyle = {
    color: "var(--main-color)",
  };
  const divStyle = {
    height: "40%",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="main active-dark">
        <img src={IMG} alt="" className="imgs" />
        <Navbar themeChanger={false} />
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              / Login
            </li>
          </ul>
        </nav>
        <div className="main2" style={divStyle}>
          <div className="head">
            <p>Login</p>
          </div>
          <div className="inputs">
            <div className="rows">
              <input
                type="text"
                placeholder="Email address"
                className="input large-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="rows">
              <input
                type="password"
                placeholder="Password"
                className="input large-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="btn">
            <button>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
