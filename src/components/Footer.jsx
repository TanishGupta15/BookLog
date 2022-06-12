import React from "react";
import "./css/footer.css";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-main">
        <div className="description-and-links">
          <div className="description">
            <div className="logo">
              <div className="logo-img"></div>
              <p>Booklog</p>
            </div>
            <p className="logo-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
              eget pretium laoreet vestibulum sollicitudin accumsan, elit. In
              vitae leo nunc vel.
            </p>
          </div>
          <div className="icons">
            <FaFacebookF className="icons-inside" />
            <AiOutlineInstagram className="icons-inside" />
            <AiOutlineTwitter className="icons-inside" />
            <FaYoutube className="icons-inside" />
          </div>
        </div>
        <div className="links">
          <div className="pages">
            <p className="pages-heading">Pages</p>
            <p className="pages-links">Home Page</p>
            <p className="pages-links">Leaderboards</p>
            <p className="pages-links">Blogs</p>
            <p className="pages-links">Home Page</p>
          </div>
          <div className="products">
            <p className="products-heading">Products</p>
            <p className="products-links">Home Page</p>
            <p className="products-links">Leaderboards</p>
            <p className="products-links">Blogs</p>
            <p className="products-links">Home Page</p>
          </div>
        </div>
        <div className="newsletter-section">
          <div className="newsletter-heading">
            <IoMdMail className="icon" />
            <p>Subscribe to our News Letter</p>
          </div>

          <div className="input-box">
            <input type="email" placeholder="email" />
          </div>

          <div className="button">
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
