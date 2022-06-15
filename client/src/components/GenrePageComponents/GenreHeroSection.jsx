import React from "react";
import "../css/GenreHeroSection.css";
import { Link } from "react-router-dom";

function HeroSection({ genre }) {
  const linkStyle = {
    color: "var(--main-color)",
  };
  return (
    <>
      <nav aria-label="breadcrumb">
        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            / {genre}
          </li>
        </ul>
      </nav>

      <div className="hero">
        <div className="hero-main">
          <div className="text-area">
            <p className="text-area-heading">{genre}</p>
            <p className="text-area-description">
              some text about particular genre
            </p>
          </div>

          <div className="button">
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
