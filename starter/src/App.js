import "./App.css";
import * as BooksAPI from "./components/BooksAPI";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Shelves from "./components/Shelves";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      console.log(data);
    });
  }, []);

  const changeShelf = (book, newShelf) => {
    const updatedBook = books.map((b) => {
      if (b.id === book.id) {
        book.shelf = newShelf;
        return book;

        console.log(books);
        console.log(newShelf);
      }

      return b;
    });
    setBooks(updatedBook);
    BooksAPI.update(book, newShelf).then((data) => console.log(data));
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelves books={books} changeShelf={changeShelf} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
