import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./css/navbar.css";

export const Navbar = () => {
  // For removing underline below navLinks
  const LinkStyle = {
    textDecoration: "none",
  };

  useEffect(() => {
    
    if (JSON.parse(localStorage.getItem("darkMode")) == true){
      document.body.classList.add('active-dark');
      document.getElementById("chk").checked = true;
    }

  }, [])
  


  function toggleButton() {
    document.body.classList.toggle('active-dark');
    if(document.body.classList.contains('active-dark')){
      localStorage.setItem("darkMode", true);
    } else{
      localStorage.setItem("darkMode", false);
    }
  }
  
  

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
        <div className="toggle-button">
        <input type="checkbox" class="checkbox" id="chk" onClick={toggleButton}/>
          <label class="label" for="chk">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
            <div id="label-ball" class="ball"></div>
          </label>
        </div>
      </div>
    </nav>
  );
};
