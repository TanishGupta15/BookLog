import React from "react";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import "./css/registerPage.css";
import IMG from "../assets/images/bg.jpg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useState } from "react";

const Register = () => {
  const linkStyle = {
    color: "var(--main-color)",
  };

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const hasNumber = /\d/;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
            / Register
          </li>
        </ul>
      </nav>
      <div className="main2">
        <div className="head">
          <p>Register</p>
        </div>
        <div className="inputs">
          <div className="rows">
            <input
              type="text"
              className="small-input input"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="small-input input"
              placeholder="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="rows">
            <input
              type="text"
              className="input large-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="rows">
            <input
              type="password"
              className="input large-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="instructions">
          <div className="instruction">
            {password.length < 8 ? (
              <AiOutlineCloseCircle className="cross" />
            ) : (
              <TiTick className="correct" />
            )}
            <p>password should be greater than 8 characters</p>
          </div>
          <div className="instruction">
            {format.test(password) ? (
              <TiTick className="correct" />
            ) : (
              <AiOutlineCloseCircle className="cross" />
            )}
            <p>Special Characters</p>
          </div>
          <div className="instruction">
            {hasNumber.test(password) ? (
              <TiTick className="correct" />
            ) : (
              <AiOutlineCloseCircle className="cross" />
            )}
            <p>Numbers</p>
          </div>
        </div>
        <div className="btn">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
