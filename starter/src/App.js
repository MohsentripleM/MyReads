import "./App.css";
import * as BooksAPI from "./components/BooksAPI";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      if (data.error) setBooks([]);
      else setBooks(data);
      console.log(data);
    });
  }, []);

  const changeShelf = (book, newShelf) => {
    const updatedBook = books.map((b) => {
      if (b.id === book.id) {
        book.shelf = newShelf;

        return book;
      }

      return b;
    });
    setBooks(updatedBook);
    BooksAPI.update(book, newShelf);
  };
  useEffect(() => {
    if (query) {
      BooksAPI.search(query).then((data) => {
        if (data.error) setSearchResult([]);
        else setSearchResult(data);
        console.log(data);
      });
    }
  }, [query]);

  const updateQuery = (query) => {
    setQuery(query.trim());
    console.log(query);
  };

  return (
    <Routes className="app">
      <Route
        exact
        path="/"
        element={<ListBooks books={books} changeShelf={changeShelf} />}
      />

      <Route
        exact
        path="/search"
        element={
          <SearchBooks
            changeShelf={changeShelf}
            updateQuery={updateQuery}
            searchResult={searchResult}
          />
        }
      />
    </Routes>
  );
}

export default App;
