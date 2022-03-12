import { Link } from "react-router-dom";
import "./css/navbar.css";

export const Navbar = () => {
  // For removing underline below navLinks
  const LinkStyle = {
    textDecoration: "none"
  };

  return (
    <nav>
      {/* Logo and Website Name */}
      <div className="logo-section">
        <div className="logo-img">{/* <img src="#" alt="" /> */}</div>
        <p>Booklog</p>
      </div>

      {/* Links section for navigation */}
      <div className="links-section">
        <ul>
          <li className="active">
            <Link to="/" style={LinkStyle}>
              Home
            </Link>
          </li>
          <li className="">
            <Link to="/leaderboards" style={LinkStyle}>
              LeaderBoards
            </Link>
          </li>
          <li className="">
            <Link to="/blogs" style={LinkStyle}>
              Blogs
            </Link>
          </li>
          <li className="">
            <Link to="/another" style={LinkStyle}>
              Another
            </Link>
          </li>
        </ul>
      </div>

      {/* Login Buttons */}
      <div className="buttons">
        <button className="login-btn">Log in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </nav>
  );
};