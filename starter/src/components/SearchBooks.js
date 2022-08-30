import { Link } from "react-router-dom";
import Book from "./Book";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";

const SearchBooks = ({ changeShelf, updateQuery, searchResult }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => updateQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResult.map((b) => (
            <li key={b.id}>
              <Book book={b} changeShelf={changeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default SearchBooks;
