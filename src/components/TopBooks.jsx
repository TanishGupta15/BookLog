import React from "react";
import "./css/topBooks.css";

function TopBooks() {
  return (
    <div className="top-books-section">
      <div className="top-books-section-main">
        <div className="top-books-text-section">
          <div className="heading">
            <p>Top Books</p>
            <div className="underline"></div>
          </div>
          <input list="books" name="book" id="book" className="search-box" />
          <datalist id="books">
            <option value="Thriller" />
            <option value="Comedy" />
            <option value="Horror" />
            <option value="Romantic" />
            <option value="All" />
          </datalist>
        </div>

        <div className="books-corousel-section"></div>
      </div>
    </div>
  );
}

export default TopBooks;
