import { Link } from "react-router-dom";
import Book from "./Book";

const SearchBooks = ({ changeShelf, updateQuery, searchUI }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={(e) => updateQuery("")}>
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
          {searchUI.map((b) => (
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
