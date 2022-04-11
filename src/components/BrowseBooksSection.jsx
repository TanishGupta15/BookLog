import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./css/browseBooks.css";

function BrowseBooks() {
  const linkStyle = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <div className="browse-books">
      <div className="heading-and-search">
        <div className="headings">
          <p>Browse Books</p>
          <div className="underline"></div>
        </div>

        <div className="search-box">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search Books" className="input-box" />
        </div>
      </div>

      <div className="genres">
        <Link style={linkStyle} to="/genres/Comedy">
          <p>Comedy</p>
        </Link>

        <Link style={linkStyle} to="/genres/Drama">
          <p>Drama</p>
        </Link>
        <Link style={linkStyle} to="/genres/Horror">
          <p>Horror</p>
        </Link>

        <Link style={linkStyle} to="/genres/Thriller">
          <p>Thriller</p>
        </Link>

        <Link style={linkStyle} to="/genres/Fiction">
          <p>Fiction</p>
        </Link>

        <Link style={linkStyle} to="/genres/Noval">
          <p>Noval</p>
        </Link>

        <Link style={linkStyle} to="/genres/Narrative">
          <p>Narrative</p>
        </Link>

        <Link style={linkStyle} to="/genres/Historical">
          <p>Historical</p>
        </Link>

        <Link style={linkStyle} to="/genres/Non Fiction">
          <p>Non-Fiction</p>
        </Link>

        <Link style={linkStyle} to="/genres/Science Fiction">
          <p>Science Fiction</p>
        </Link>

        <Link style={linkStyle} to="/genres/Mystery">
          <p>Mystery</p>
        </Link>

        <Link style={linkStyle} to="/genres/Romance">
          <p>Romance</p>
        </Link>
        <Link style={linkStyle} to="/genres/Fantasy">
          <p>Fantasy</p>
        </Link>
        <Link style={linkStyle} to="/genres/Biography">
          <p>Biography</p>
        </Link>
        <Link style={linkStyle} to="/genres/Adventure">
          <p>Adventure</p>
        </Link>
        <Link style={linkStyle} to="/genres/Poetry">
          <p>Poetry</p>
        </Link>
        <Link style={linkStyle} to="/genres/Detective">
          <p>Detective Noval</p>
        </Link>
        <Link style={linkStyle} to="/genres/Magical">
          <p>Magical</p>
        </Link>
        <Link style={linkStyle} to="/genres/Guide Book">
          <p>Guide Book</p>
        </Link>
        <Link style={linkStyle} to="/genres/Crime">
          <p>Crime</p>
        </Link>
      </div>
    </div>
  );
}

export default BrowseBooks;
