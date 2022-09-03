import "./App.css";
import * as BooksAPI from "./components/BooksAPI";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import PropTypes from "prop-types";

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchUI, setSearchUI] = useState([]);
  const [library, setLibrary] = useState(new Map());

  useEffect(() => {
    const getBooks = async () => {
      const data = await BooksAPI.getAll();

      if (data.error) {
        setBooks([]);
      } else {
        setBooks(data);
        setLibrary(createMap(data));
        console.log(data);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      BooksAPI.search(query).then((data) => {
        if (data.error) setSearchResult([]);
        else setSearchResult(data);
        console.log(data);
      });
    } else {
      setSearchResult([]);
    }
  }, [query]);

  useEffect(() => {
    const booksToUI = searchResult.map((book) => {
      if (library.has(book.id)) {
        return library.get(book.id);
      } else {
        return book;
      }
    });

    setSearchUI(booksToUI);
  }, [searchResult, library]);

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

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const createMap = (books) => {
    const map = new Map();
    books.map((book) => {
      return map.set(book.id, book);
    });
    return map;
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
            searchUI={searchUI}
          />
        }
      />
    </Routes>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

SearchBooks.propTypes = {
  searchUI: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
};

export default App;
