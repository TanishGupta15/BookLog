import React from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";

export const Navbar = () => {
  const LinkStyle = {
    // border: "none",
    textDecoration: "none",
    // color: "black",
    // color: "white",
  };
  return (
    <nav>
      <div className="logo-section">
        <div className="logo-img">{/* <img src="#" alt="" /> */}</div>

        <p>Booklog</p>
      </div>

      <div className="links-section">
        <ul>
          <li className="active">
            <Link to="/" style={LinkStyle}>
              Home
            </Link>
          </li>

          <li className="">
          <Link to="leaderboards" style={LinkStyle}>
           LeaderBoards
          </Link>
          </li>
          <li className="">
          <Link to="blogs" style={LinkStyle}>
           Blogs
          </Link>
          </li>
          <li className="">
          <Link to="another" style={LinkStyle}>
           Another
          </Link>
          </li>
        </ul>
      </div>

      <div className="buttons">
        <button className="login-btn">log in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </nav>
  );
};
