import React from "react";
import {BsSearch} from "react-icons/bs";
import "./css/browseBooks.css";

function BrowseBooks() {
  return (
    <div className="browse-books">
      <div className="heading-and-search">
        <div className="headings">
          <p>Browse Books</p>
          <div className="underline"></div>
        </div>

        <div className="search-box">
            <BsSearch className="search-icon"/>
          <input type="text" placeholder="Search Books" className="input-box"/>
        </div>
      </div>

      <div className="genres">
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
          <p>Comedy</p>
      </div>
    </div>
  );
}

export default BrowseBooks;
