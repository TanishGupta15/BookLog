import React from "react";
import "./css/heroSection.css";
import captain from "../assets/images/captain-america-book.png";
import iron from "../assets/images/iron-man-book.png";
import spider from "../assets/images/spider-man-book.png";
import uglyTruth from "../assets/images/an-ugly-truth-book.png";


function HeroSection() {
  return (
    <div className="hero-section">
      <div className="text-section">
          <p className="text-section-main-heading"><span>Light</span> up your <br/> mind</p>
          <p className="text-section-description">This is a little description of the website</p>
          <button>Log In</button>
      </div>

      <div className="books-showcase-section">
          <div className="books">
              <img id="first-book" src={captain} alt="" />
              <img src={iron} alt="" />
              <img src={spider} alt="" />
              <img id="tilted-book" src={uglyTruth} alt="" />
          </div>
          <div className="book-shelf"></div>
      </div>
    </div>
  );
}
export default HeroSection;